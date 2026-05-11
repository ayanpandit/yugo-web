"use client";

import { useState } from "react";

const faqs = [
    {
        q: "Is YouGO safe for meeting new travelers?",
        a: "Yes. Profiles are verified, trip requests are controlled, and you decide who joins your journey. You can also chat and connect before accepting anyone.",
    },
    {
        q: "Can I use YouGO if I’m traveling solo?",
        a: "Absolutely. YouGO is perfect for solo travelers who want to explore safely, meet like-minded people, or simply find travel companions who match their vibe.",
    },
    {
        q: "How does the AI trip planner work?",
        a: "Just enter your destination, budget, travel style, and number of days. Our AI instantly creates a personalized day-wise itinerary for you.",
    },
    {
        q: "What if my friends cancel the trip?",
        a: "That’s exactly why YouGO exists. You can post your trip publicly and connect with verified travelers who are interested in joining.",
    },
    {
        q: "Can I chat with travelers before joining a trip?",
        a: "Yes. You can message, discuss plans, understand travel vibes, and decide compatibility before accepting or joining any trip.",
    },
    {
        q: "What kind of trips can I find on YouGO?",
        a: "Everything from backpacking adventures and road trips to café hopping, workations, trekking, luxury escapes, and weekend getaways.",
    },
    {
        q: "Do I need to know my destination before using YouGO?",
        a: "Not at all. You can explore curated destinations, trending trips, hidden gems, and AI-generated travel ideas based on your vibe.",
    },
    {
        q: "Is YouGO only for group travel?",
        a: "No. YouGO works for solo travelers, couples, friends, and groups. Whether you want company or complete independence — the platform adapts to you.",
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

    // Split into two columns
    const left = faqs.filter((_, i) => i % 2 === 0);
    const right = faqs.filter((_, i) => i % 2 !== 0);

    return (
        <section className="bg-[#f7f7f8] w-full px-6 md:px-12 lg:px-16 py-16 font-sans">

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Everything You Need To Know<br />Before You Travel
                </h2>
            </div>

            {/* ── FAQ grid ─────────────────────────────────────────────────────────── */}
            <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[left, right].map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                        {col.map((item, ri) => {
                            const globalIdx = ri * 2 + ci;
                            const isOpen = openIdx === globalIdx;
                            return (
                                <div
                                    key={globalIdx}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${isOpen ? "border-[#1a3c3c]/20 shadow-md" : "border-gray-200"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggle(globalIdx)}
                                        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                                    >
                                        <span className={`font-bold text-base sm:text-lg leading-snug transition-colors duration-200 ${isOpen ? "text-[#0d2b2b]" : "text-[#0d2b2b]"
                                            }`}>
                                            {item.q}
                                        </span>
                                        {/* + / × icon */}
                                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
                                            ? "bg-[#1a3c3c] border-[#1a3c3c] rotate-45"
                                            : "bg-white border-gray-300 group-hover:border-[#1a3c3c]"
                                            }`}>
                                            <svg className={`w-4 h-4 transition-colors duration-300 ${isOpen ? "text-white" : "text-[#0d2b2b]"}`}
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                                strokeLinecap="round">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </span>
                                    </button>

                                    {/* Answer panel */}
                                    <div
                                        className="overflow-hidden transition-all duration-400 ease-in-out"
                                        style={{ maxHeight: isOpen ? "200px" : "0px" }}
                                    >
                                        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
}