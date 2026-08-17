"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Manny");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-400 text-sm font-medium">
            MANNY OS
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Settings
          </h1>

          <p className="text-gray-400 mt-3">
            Configure your Manny OS workspace.
          </p>
        </div>

        {/* Profile */}
        <section className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-5">

          <h2 className="text-xl font-semibold">
            Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Basic information about your workspace.
          </p>

          <div className="space-y-4 mt-6">

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>
        </section>

        {/* Preferences */}
        <section className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-5">

          <h2 className="text-xl font-semibold">
            Preferences
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Control how Manny OS behaves.
          </p>

          <div className="mt-6 space-y-5">

            {/* Notifications */}
            <div className="flex items-center justify-between gap-5">

              <div>
                <p className="font-medium">
                  Notifications
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Receive reminders and workspace notifications.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className={`w-12 h-7 rounded-full p-1 transition ${
                  notifications
                    ? "bg-blue-600"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition ${
                    notifications
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>

            </div>

            {/* AI */}
            <div className="flex items-center justify-between gap-5">

              <div>
                <p className="font-medium">
                  Manny AI
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Allow Manny AI features inside your workspace.
                </p>
              </div>

              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`w-12 h-7 rounded-full p-1 transition ${
                  aiEnabled
                    ? "bg-blue-600"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition ${
                    aiEnabled
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>

            </div>

          </div>
        </section>

        {/* System */}
        <section className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 mb-6">

          <h2 className="text-xl font-semibold">
            System
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium">
                  Platform
                </p>

                <p className="text-sm text-gray-500">
                  Manny OS Web
                </p>
              </div>

              <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                Online
              </span>

            </div>

            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium">
                  Version
                </p>

                <p className="text-sm text-gray-500">
                  0.1.0
                </p>
              </div>

              <span className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                Development
              </span>

            </div>

          </div>
        </section>

        {/* Save */}
        <div className="flex items-center gap-4">

          <button
            onClick={saveSettings}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-medium transition"
          >
            Save Settings
          </button>

          {saved && (
            <span className="text-sm text-green-400">
              ✓ Settings saved
            </span>
          )}

        </div>

      </div>
    </main>
  );
}