"use client";

import { useState } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Manny OS Development",
      date: "2026-08-17",
      time: "10:00",
    },
    {
      id: 2,
      title: "YouTube Planning",
      date: "2026-08-18",
      time: "15:00",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function addEvent() {
    if (!title.trim() || !date || !time) return;

    const newEvent: Event = {
      id: Date.now(),
      title,
      date,
      time,
    };

    setEvents((current) => [...current, newEvent]);

    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
  }

  function deleteEvent(id: number) {
    setEvents((current) =>
      current.filter((event) => event.id !== id)
    );
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
                className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
              >
                Add Event
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

            {sortedEvents.map((event) => (
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
            ))}

          </div>

          {events.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No events scheduled.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}