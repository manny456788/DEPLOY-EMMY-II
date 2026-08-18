"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

function formatDate(date: string) {
  const d = new Date(date);
  const now = new Date();

  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  if (sameDay) return "Today";

  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadNotes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("notes")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading notes:", error);
      setLoading(false);
      return;
    }

    setNotes(
      (data ?? []).map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: formatDate(note.created_at),
      }))
    );

    setLoading(false);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  function openNewNote() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setShowEditor(true);
  }

  function openEditNote(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setShowEditor(true);
  }

  async function saveNote() {
    if (!title.trim() || !content.trim() || saving) return;

    setSaving(true);

    if (editingId !== null) {
      const { error } = await supabase
        .from("notes")
        .update({
          title: title.trim(),
          content: content.trim(),
        })
        .eq("id", editingId);

      if (error) {
        console.error("Error updating note:", error);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("notes").insert({
        title: title.trim(),
        content: content.trim(),
      });

      if (error) {
        console.error("Error creating note:", error);
        setSaving(false);
        return;
      }
    }

    await loadNotes();

    setShowEditor(false);
    setTitle("");
    setContent("");
    setEditingId(null);
    setSaving(false);
  }

  async function deleteNote(id: number) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
      return;
    }

    setNotes((current) => current.filter((note) => note.id !== id));
  }

  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-blue-400 text-sm font-medium">
              MANNY OS
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Notes
            </h1>

            <p className="text-gray-400 mt-3">
              Capture ideas before they disappear.
            </p>
          </div>

          <button
            onClick={openNewNote}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
          >
            + New Note
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your notes..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Editor */}
        {showEditor && (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold">
              {editingId !== null ? "Edit Note" : "Create Note"}
            </h2>

            <div className="mt-5 space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={saveNote}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-5 py-3 rounded-xl font-medium"
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>

                <button
                  onClick={() => setShowEditor(false)}
                  className="bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading notes...
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:bg-white/[0.05] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold">
                    {note.title}
                  </h2>

                  <span className="text-xs text-gray-600">
                    {note.createdAt}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-4 leading-6">
                  {note.content}
                </p>

                <div className="flex gap-4 mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openEditNote(note)}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-sm text-gray-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No notes found.
          </div>
        )}
      </div>
    </main>
  );
}