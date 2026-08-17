"use client";

import { useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Manny OS Vision",
      content:
        "Build Manny OS into a personal digital command center that brings productivity, AI, creativity and development together.",
      createdAt: "Today",
    },
    {
      id: 2,
      title: "Ideas",
      content:
        "Create a powerful workspace where projects, tasks, notes and AI work together.",
      createdAt: "Today",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  function saveNote() {
    if (!title.trim() || !content.trim()) return;

    if (editingId !== null) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title,
                content,
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
        createdAt: "Just now",
      };

      setNotes((current) => [newNote, ...current]);
    }

    setShowEditor(false);
    setTitle("");
    setContent("");
    setEditingId(null);
  }

  function deleteNote(id: number) {
    setNotes((current) =>
      current.filter((note) => note.id !== id)
    );
  }

  const filteredNotes = notes.filter((note) => {
    const text =
      `${note.title} ${note.content}`.toLowerCase();

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
              {editingId !== null
                ? "Edit Note"
                : "Create Note"}
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
                  className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
                >
                  Save Note
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
        {filteredNotes.length > 0 ? (
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