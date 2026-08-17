"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Finish Manny OS dashboard",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Connect Manny OS to GitHub",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      title: "Plan next YouTube video",
      priority: "Low",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] =
    useState<Task["priority"]>("Medium");

  function addTask() {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      priority,
      completed: false,
    };

    setTasks((current) => [task, ...current]);
    setNewTask("");
    setPriority("Medium");
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  }

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-blue-400 text-sm font-medium">
            MANNY OS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Tasks
          </h1>

          <p className="text-gray-400 mt-3">
            Organize your work and keep moving forward.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Total
            </p>

            <p className="text-3xl font-bold mt-2">
              {tasks.length}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <p className="text-3xl font-bold mt-2">
              {completed}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <p className="text-gray-500 text-sm">
              Remaining
            </p>

            <p className="text-3xl font-bold mt-2">
              {tasks.length - completed}
            </p>
          </div>

        </div>

        {/* Add Task */}
        <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">

          <h2 className="text-xl font-semibold">
            Add Task
          </h2>

          <div className="flex flex-col md:flex-row gap-3 mt-5">

            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="What needs to be done?"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as Task["priority"]
                )
              }
              className="bg-[#11131a] border border-white/10 rounded-xl px-4 py-3 outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              onClick={addTask}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-medium transition"
            >
              Add Task
            </button>

          </div>

        </div>

        {/* Task List */}
        <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6">

          <h2 className="text-xl font-semibold">
            My Tasks
          </h2>

          <div className="mt-5 space-y-3">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 border border-white/10 rounded-xl p-4"
              >

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                    task.completed
                      ? "bg-blue-600 border-blue-600"
                      : "border-white/20"
                  }`}
                >
                  {task.completed && "✓"}
                </button>

                <div className="flex-1">

                  <p
                    className={
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }
                  >
                    {task.title}
                  </p>

                  <span className="text-xs text-gray-500">
                    {task.priority} priority
                  </span>

                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm text-gray-500 hover:text-red-400"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

          {tasks.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No tasks yet.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}