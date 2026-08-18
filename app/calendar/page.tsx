"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadEvents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("calendar_events")
      .select("id, title, event_date, event_time")
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Error loading events:", error);
      setLoading(false);
      return;
    }

    setEvents(
      (data ?? []).map((event) => ({
        id: event.id,
        title: event.title,
        date: event.event_date,
        time: event.event_time || "",
      }))
    );

    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function addEvent() {
    if (!title.trim() || !date || !time || saving) return;

    setSaving(true);

    const { error } = await supabase.from("calendar_events").insert({
      title: title.trim(),
      event_date: date,
      event_time: time,
    });

    if (error) {
      console.error("Error creating event:", error);
      setSaving(false);
      return;
    }

    await loadEvents();

    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
    setSaving(false);
  }

  async function deleteEvent(id: number) {
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting event:", error);
      return;
    }

    setEvents((current) => current.filter((event) => event.id !== id));
  }

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(`${a.date}T${a.time}`).getTime() -
      new Date(`${b.date}T${b.time}`).getTime()
  );

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <p className="text-blue-400 text-sm font-medium">
              MANNY OS
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Calendar
            </h1>

            <p className="text-gray-400 mt-3">
              Keep track of important events and plans.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
          >
            + New Event
          </button>
        </div>

        {/* Create Event */}
        {showForm && (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold">
              Create Event
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={addEvent}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-5 py-3 rounded-xl font-medium"
              >
                {saving ? "Saving..." : "Add Event"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upcoming */}
        <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6">
          <h2 className="text-xl font-semibold">
            Upcoming
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Your scheduled events.
          </p>

          <div className="mt-6 space-y-3">
            {loading ? (
              <div className="text-center py-16 text-gray-500">
                Loading events...
              </div>
            ) : (
              sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-white/10 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-blue-400">
                      {new Date(
                        `${event.date}T${event.time}`
                      ).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>

                    <span className="text-xl font-bold">
                      {new Date(
                        `${event.date}T${event.time}`
                      ).getDate()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(
                        `${event.date}T${event.time}`
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" • "}
                      {event.time}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-sm text-gray-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {!loading && events.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No events scheduled.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}