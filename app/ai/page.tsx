"use client";

import { useState } from "react";

export default function MannyAI() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-400 text-sm font-medium">MANNY OS</p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Manny AI
          </h1>

          <p className="text-gray-400 mt-3 max-w-2xl">
            Your intelligent workspace assistant. Ask questions, develop
            ideas, analyze information, or get help with your projects.
          </p>
        </div>

        {/* AI Status */}
        <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

            <div>
              <p className="font-semibold">
                Manny AI is ready
              </p>

              <p className="text-sm text-gray-500">
                Waiting for your first request
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden">

          <div className="h-[420px] p-6 flex items-center justify-center">
            <div className="text-center max-w-md">

              <div className="text-5xl mb-5">
                ✦
              </div>

              <h2 className="text-2xl font-semibold">
                How can I help?
              </h2>

              <p className="text-gray-500 mt-3">
                Ask Manny AI anything. This interface will become the
                central intelligence layer of Manny OS.
              </p>

            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">

            <div className="flex gap-3">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Manny AI..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />

              <button
                onClick={() => {
                  if (!message.trim()) return;

                  alert(`You asked Manny AI: ${message}`);
                  setMessage("");
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition"
              >
                Send
              </button>

            </div>

          </div>

        </div>

        {/* Suggested Prompts */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">

          <button className="text-left p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
            <p className="font-medium">💡 Brainstorm</p>
            <p className="text-sm text-gray-500 mt-2">
              Help me develop an idea.
            </p>
          </button>

          <button className="text-left p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
            <p className="font-medium">📝 Write</p>
            <p className="text-sm text-gray-500 mt-2">
              Help me write something.
            </p>
          </button>

          <button className="text-left p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition">
            <p className="font-medium">🔎 Research</p>
            <p className="text-sm text-gray-500 mt-2">
              Help me understand a topic.
            </p>
          </button>

        </div>

      </div>
    </main>
  );
}