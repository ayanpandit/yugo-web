"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata cannot be exported from a "use client" file.
// Move it to a layout.tsx inside (home)/book-a-trip if needed.

function AnimatedButton({ label, fullWidth = false }: { label: string; fullWidth?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="hero2-btn flex items-center cursor-pointer overflow-hidden border border-[#1a3c3c] bg-transparent"
            style={{
                borderRadius: "20px",
                width: fullWidth ? "100%" : "260px",
                height: "60px",
                fontFamily: "sans-serif",
                fontWeight: 500,
                fontSize: "1.1rem",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="bg-[#1a3c3c] flex items-center justify-center text-white font-semibold flex-shrink-0 h-full"
                style={{
                    width: "80%",
                    borderRadius: isHovered ? "20px 0 0 20px" : "20px",
                    marginLeft: "-1px",
                    transition: "border-radius 0.3s ease",
                }}
            >
                {label}
            </div>
            <div
                className="flex items-center justify-center flex-shrink-0 h-full"
                style={{
                    width: "20%",
                    padding: isHovered ? "2px" : "2px 2px 2px 6px",
                    transition: "padding 0.3s ease",
                }}
            >
                <div
                    className="bg-[#1a3c3c] flex items-center justify-center w-full h-full"
                    style={{
                        borderRadius: isHovered ? "0 20px 20px 0" : "20px",
                        transition: "border-radius 0.3s ease",
                    }}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{
                            transition: "transform 0.3s ease",
                            transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                    >
                        <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function BookATripPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-gray-50 font-sans">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">Plan Your Escape</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-6 leading-tight">
                        Your Dream Trip,<br />Built in Seconds
                    </h1>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        Tell us a bit about your ideal adventure — our AI will craft a personalized itinerary just for you.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <form className="space-y-8">
                        {/* Destination */}
                        <div>
                            <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">
                                Where do you want to go?
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Kyoto, Japan or Amalfi Coast..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all"
                            />
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-600 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">End Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-600 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all"
                                />
                            </div>
                        </div>

                        {/* Travelers & Budget */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">Travelers</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-600 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all">
                                    <option>Just me (Solo Trip)</option>
                                    <option>Couple (2 people)</option>
                                    <option>Small Group (3–5 people)</option>
                                    <option>Large Group (6+ people)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">Budget Range</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-600 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all">
                                    <option>Budget-friendly</option>
                                    <option>Moderate</option>
                                    <option>Luxury</option>
                                    <option>Ultra-Luxury</option>
                                </select>
                            </div>
                        </div>

                        {/* Travel Vibe */}
                        <div>
                            <label className="block text-xs font-bold text-[#0d2b2b] mb-2 uppercase tracking-widest">Describe Your Vibe</label>
                            <textarea
                                rows={4}
                                placeholder="e.g. 'I want to relax on secluded beaches, eat local street food, and avoid crowded tourist traps...'"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#8CB45C] focus:ring-1 focus:ring-[#8CB45C] transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="pt-2 flex justify-center">
                            <AnimatedButton label="Get My Itinerary" />
                        </div>
                    </form>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
                    {["AI-Powered Planning", "Personalized Results", "Free to Use"].map((badge) => (
                        <div key={badge} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#8CB45C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{badge}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
