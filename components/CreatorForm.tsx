"use client";
import React, { useState } from "react";

export default function CreatorForm() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLink = (email: string) => {
    const encoded = btoa(email);
    return `${window.location.origin}/heartnote/${encoded}`;
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 700));
    const generated = generateLink(email);
    setLink(generated);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 🔹 Animated rolling background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-roll"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?cs=srgb&dl=pexels-andrew-3178786.jpg&fm=jpg')",
        }}
      ></div>

      {/* 🔹 Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-pink-100/20"></div>

      {/* 🔹 Main Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10 z-10">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-2xl shadow-md flex items-center justify-center animate-pulse-slow">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8l8 5 8-5m-8 5v8"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            NoteBack
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Share & receive heartfelt anonymous reflections 💌
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold text-sm mb-2"
            >
              Your Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm bg-white/70"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 rounded-xl font-semibold text-white text-lg
              bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600
              disabled:opacity-70 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isGenerating ? "Creating your link..." : "Generate My NoteBack 💫"}
          </button>
        </form>

        {/* Link Display */}
        {link && (
          <div className="mt-8 bg-gradient-to-r from-pink-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-md text-center">
            <h3 className="text-lg font-semibold text-indigo-700 mb-3">
              Your NoteBack Link is Ready!
            </h3>
            <div className="flex items-center gap-2 bg-white rounded-lg border p-3 overflow-x-auto">
              <input
                value={link}
                readOnly
                className="flex-1 text-gray-700 text-sm font-mono bg-transparent outline-none truncate"
              />
              <button
                onClick={copyToClipboard}
                className="text-sm px-4 py-2 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Share this link to let others send reflections 💌
            </p>
          </div>
        )}
      </div>

      {/* 🔹 Keyframes for rolling background */}
      <style>{`
        @keyframes roll {
          0% { background-position: 0 0; }
          100% { background-position: -2000px 0; }
        }
        .animate-roll {
          animation: roll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
