"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  async function loadTasks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("task")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading tasks:", error);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    if (!title.trim()) return;

    setAdding(true);

    const { error } = await supabase.from("task").insert({
      title: title.trim(),
      description: description.trim() || null,
      completed: false,
    });

    if (error) {
      console.error("Error adding task:", error);
      alert("Could not create task.");
      setAdding(false);
      return;
    }

    setTitle("");
    setDescription("");
    setAdding(false);

    await loadTasks();
  }

  async function toggleTask(task: Task) {
    const { error } = await supabase
      .from("task")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }

    await loadTasks();
  }

  async function deleteTask(id: number) {
    const { error } = await supabase
      .from("task")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    await loadTasks();
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm text-gray-500">Manny OS</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Tasks
          </h1>

          <p className="text-gray-400 mt-3">
            Capture, organize and complete the things that matter.
          </p>
        </div>

        {/* Add Task */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">
          <h2 className="text-xl font-semibold">
            Create a task
          </h2>

          <div className="mt-5 space-y-4">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-blue-500"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              disabled={adding || !title.trim()}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {adding ? "Creating..." : "＋ Create Task"}
            </button>

          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Your Tasks
            </h2>

            <span className="text-sm text-gray-500">
              {tasks.length} task{tasks.length === 1 ? "" : "s"}
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-gray-500">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <div className="text-4xl mb-4">✓</div>

              <h3 className="text-lg font-semibold">
                No tasks yet
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first task above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">

              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4"
                >

                  <button
                    onClick={() => toggleTask(task)}
                    className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-white/20 hover:border-blue-500"
                    }`}
                  >
                    {task.completed && "✓"}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold ${
                        task.completed
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-500 hover:text-red-400 transition"
                    title="Delete task"
                  >
                    🗑
                  </button>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </main>
  );
}