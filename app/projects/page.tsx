"use client";

import { useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Planning" | "Completed";
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Manny OS",
      description: "Personal digital command center.",
      status: "Active",
    },
    {
      id: 2,
      name: "YouTube Automation",
      description: "Content creation and publishing system.",
      status: "Planning",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createProject() {
    if (!name.trim()) return;

    const newProject: Project = {
      id: Date.now(),
      name,
      description,
      status: "Planning",
    };

    setProjects((current) => [...current, newProject]);

    setName("");
    setDescription("");
    setShowForm(false);
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
              Projects
            </h1>

            <p className="text-gray-400 mt-3">
              Manage everything you're building in one place.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
          >
            + New Project
          </button>

        </div>

        {/* Create Project Form */}
        {showForm && (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">

            <h2 className="text-xl font-semibold">
              Create a project
            </h2>

            <div className="mt-5 space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this project about?"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
              />

              <div className="flex gap-3">

                <button
                  onClick={createProject}
                  className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
                >
                  Create Project
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        )}

        {/* Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:bg-white/[0.05] transition"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-xl font-semibold">
                    {project.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {project.description}
                  </p>
                </div>

                <span className="text-xs bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                  {project.status}
                </span>

              </div>

              <div className="mt-8 pt-4 border-t border-white/10">

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Open project →
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}