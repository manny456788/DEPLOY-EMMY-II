"use client";

import { useState } from "react";

type DevProject = {
  id: number;
  name: string;
  description: string;
  technology: string;
  status: "Planning" | "Building" | "Testing" | "Completed";
};

export default function DeveloperPage() {
  const [projects, setProjects] = useState<DevProject[]>([
    {
      id: 1,
      name: "Manny OS",
      description:
        "Personal digital operating system and productivity workspace.",
      technology: "Next.js + TypeScript",
      status: "Building",
    },
    {
      id: 2,
      name: "Manny AI",
      description:
        "AI assistant designed to work with the Manny OS ecosystem.",
      technology: "AI + API",
      status: "Planning",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [status, setStatus] =
    useState<DevProject["status"]>("Planning");

  function addProject() {
    if (!name.trim()) return;

    const newProject: DevProject = {
      id: Date.now(),
      name,
      description,
      technology,
      status,
    };

    setProjects((current) => [newProject, ...current]);

    setName("");
    setDescription("");
    setTechnology("");
    setStatus("Planning");
    setShowForm(false);
  }

  function deleteProject(id: number) {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
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
              Developer
            </h1>

            <p className="text-gray-400 mt-3">
              Your technical workspace for building software.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
          >
            + New Dev Project
          </button>

        </div>

        {/* Developer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Projects
            </p>

            <p className="text-3xl font-bold mt-2">
              {projects.length}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Building
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                projects.filter(
                  (project) => project.status === "Building"
                ).length
              }
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Testing
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                projects.filter(
                  (project) => project.status === "Testing"
                ).length
              }
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                projects.filter(
                  (project) => project.status === "Completed"
                ).length
              }
            </p>
          </div>

        </div>

        {/* New Project Form */}
        {showForm && (
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">

            <h2 className="text-xl font-semibold">
              New Development Project
            </h2>

            <div className="space-y-4 mt-5">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Project description"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
              />

              <input
                value={technology}
                onChange={(e) =>
                  setTechnology(e.target.value)
                }
                placeholder="Technology e.g. Next.js, Flutter, Python"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as DevProject["status"]
                  )
                }
                className="w-full bg-[#11131a] border border-white/10 rounded-xl px-4 py-3 outline-none"
              >
                <option value="Planning">
                  Planning
                </option>

                <option value="Building">
                  Building
                </option>

                <option value="Testing">
                  Testing
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <div className="flex gap-3">

                <button
                  onClick={addProject}
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

              <div className="flex items-center justify-between gap-3">

                <span className="text-xs bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                  {project.technology || "Technology not set"}
                </span>

                <span className="text-xs text-gray-500">
                  {project.status}
                </span>

              </div>

              <h2 className="text-xl font-semibold mt-5">
                {project.name}
              </h2>

              <p className="text-gray-400 text-sm mt-3 leading-6">
                {project.description ||
                  "No description provided."}
              </p>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">

                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Open project →
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
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