"use client";

import { useState } from "react";

type Content = {
  id: number;
  title: string;
  type: "Video" | "Short" | "Post";
  status: "Idea" | "Writing" | "Ready" | "Published";
};

export default function CreatorPage() {
  const [content, setContent] = useState<Content[]>([
    {
      id: 1,
      title: "The Psychology of Silent Attraction",
      type: "Video",
      status: "Writing",
    },
    {
      id: 2,
      title: "5 Signs Someone Secretly Likes You",
      type: "Short",
      status: "Idea",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<Content["type"]>("Video");
  const [status, setStatus] =
    useState<Content["status"]>("Idea");

  function addContent() {
    if (!title.trim()) return;

    const newContent: Content = {
      id: Date.now(),
      title,
      type,
      status,
    };

    setContent((current) => [newContent, ...current]);

    setTitle("");
    setType("Video");
    setStatus("Idea");
    setShowForm(false);
  }

  function deleteContent(id: number) {
    setContent((current) =>
      current.filter((item) => item.id !== id)
    );
  }

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
              Creator
            </h1>

            <p className="text-gray-400 mt-3">
              Your command center for creating and managing content.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
          >
            + New Content
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Total
            </p>

            <p className="text-3xl font-bold mt-2">
              {content.length}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Ideas
            </p>

            <p className="text-3xl font-bold mt-2">
              {content.filter(
                (item) => item.status === "Idea"
              ).length}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              In Progress
            </p>

            <p className="text-3xl font-bold mt-2">
              {content.filter(
                (item) =>
                  item.status === "Writing" ||
                  item.status === "Ready"
              ).length}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Published
            </p>

            <p className="text-3xl font-bold mt-2">
              {content.filter(
                (item) => item.status === "Published"
              ).length}
            </p>
          </div>

        </div>

        {/* Create Content */}
        {showForm && (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">

            <h2 className="text-xl font-semibold">
              Create Content
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Content title"
                className="md:col-span-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value as Content["type"]
                  )
                }
                className="bg-[#11131a] border border-white/10 rounded-xl px-4 py-3 outline-none"
              >
                <option value="Video">Video</option>
                <option value="Short">Short</option>
                <option value="Post">Post</option>
              </select>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as Content["status"]
                  )
                }
                className="bg-[#11131a] border border-white/10 rounded-xl px-4 py-3 outline-none"
              >
                <option value="Idea">Idea</option>
                <option value="Writing">Writing</option>
                <option value="Ready">Ready</option>
                <option value="Published">Published</option>
              </select>

            </div>

            <div className="flex gap-3 mt-5">

              <button
                onClick={addContent}
                className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
              >
                Create
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

        {/* Content Library */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {content.map((item) => (
            <div
              key={item.id}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:bg-white/[0.05] transition"
            >

              <div className="flex items-center justify-between">

                <span className="text-xs bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                  {item.type}
                </span>

                <span className="text-xs text-gray-500">
                  {item.status}
                </span>

              </div>

              <h2 className="text-xl font-semibold mt-5">
                {item.title}
              </h2>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Open →
                </button>

                <button
                  onClick={() => deleteContent(item.id)}
                  className="text-sm text-gray-500 hover:text-red-400"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}