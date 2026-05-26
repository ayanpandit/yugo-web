"use client";

import React from "react";

export default function MessagesPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/50 backdrop-blur-sm h-full">
      <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl mb-6 animate-bounce">
        💬
      </div>
      <h3 className="text-xl font-black text-gray-800 mb-2">Select a conversation</h3>
      <p className="text-gray-400 text-sm max-w-sm mx-auto">
        Pick a traveler from your list to start planning your next journey together.
      </p>
    </div>
  );
}
