"use client";

import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState("Home");

  const menu = [
    { name: "Home", icon: "⌂" },
    { name: "Manny AI", icon: "✦" },
    { name: "Projects", icon: "▣" },
    { name: "Tasks", icon: "✓" },
    { name: "Notes", icon: "□" },
    { name: "Calendar", icon: "◷" },
    { name: "Creator", icon: "▶" },
    { name: "Developer", icon: "</>" },
  ];

  return (
    <main className="min-h-screen bg-[#08090d] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0d0f14] p-5 hidden md:flex flex-col">
        
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">
            Manny<span className="text-blue-500">OS</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Your digital command center
          </p>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                active === item.name
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white">
            ⚙ Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        
        {/* Top Bar */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-10">
          <div>
            <p className="text-sm text-gray-500">Monday, August 17</p>
            <h2 className="text-xl font-semibold">{active}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10">
              🔔
            </button>

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
              M
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <div className="p-6 md:p-10">
          
          <div className="mb-10">
            <p className="text-gray-500 mb-2">Welcome back</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Good morning, Manny.
            </h1>
            <p className="text-gray-400 mt-3 max-w-xl">
              Everything you need, organized in one digital workspace.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-gray-500 text-sm">Projects</p>
              <p className="text-3xl font-bold mt-2">4</p>
              <p className="text-xs text-green-400 mt-2">Active projects</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-gray-500 text-sm">Tasks</p>
              <p className="text-3xl font-bold mt-2">12</p>
              <p className="text-xs text-blue-400 mt-2">To keep moving</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-gray-500 text-sm">Notes</p>
              <p className="text-3xl font-bold mt-2">27</p>
              <p className="text-xs text-purple-400 mt-2">Ideas captured</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-gray-500 text-sm">Productivity</p>
              <p className="text-3xl font-bold mt-2">82%</p>
              <p className="text-xs text-yellow-400 mt-2">Keep it going</p>
            </div>

          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-5 mt-6">

            {/* Quick Actions */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <p className="text-sm text-gray-500 mt-1">
                Jump straight into your workspace.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                
                <button className="text-left rounded-xl bg-blue-600/10 border border-blue-500/20 p-5 hover:bg-blue-600/20 transition">
                  <div className="text-2xl">✦</div>
                  <h4 className="font-semibold mt-3">Ask Manny AI</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Get help, ideas and answers.
                  </p>
                </button>

                <button className="text-left rounded-xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] transition">
                  <div className="text-2xl">▣</div>
                  <h4 className="font-semibold mt-3">Create Project</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Start something new.
                  </p>
                </button>

                <button className="text-left rounded-xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] transition">
                  <div className="text-2xl">✓</div>
                  <h4 className="font-semibold mt-3">Add Task</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Capture your next action.
                  </p>
                </button>

                <button className="text-left rounded-xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] transition">
                  <div className="text-2xl">□</div>
                  <h4 className="font-semibold mt-3">Write Note</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Save an idea before it disappears.
                  </p>
                </button>

              </div>
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-sm">Manny OS project created</p>
                  <p className="text-xs text-gray-500 mt-1">Just now</p>
                </div>

                <div>
                  <p className="text-sm">Next.js environment configured</p>
                  <p className="text-xs text-gray-500 mt-1">Today</p>
                </div>

                <div>
                  <p className="text-sm">GitHub repository created</p>
                  <p className="text-xs text-gray-500 mt-1">Today</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}