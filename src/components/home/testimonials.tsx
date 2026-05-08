"use client";
// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/explore/1.jpg";// testimonial 1 – background
const img2 = "/explore/1.jpg";// testimonial 2 – background
const img3 = "/explore/1.jpg";// testimonial 3 – background
const img4 = "/explore/1.jpg";// testimonial 1 – avatar
const img5 = "/explore/1.jpg";
const img6 = "/explore/1.jpg";
const img7 = "/explore/1.jpg";
const img8 = "/explore/1.jpg";
const img9 = "/explore/1.jpg";
// ──────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

const testimonials = [
    {
        bg: img1,
        avatar: img4,
        stars: 5,
        quote: "Traveling with this team completely changed how I see group travel. Everything was thoughtfully planned",
        name: "Emily Carter",
        role: "Solo Traveler",
    },
    {
        bg: img2,
        avatar: img5,
        stars: 5,
        quote: "From the moment we landed, every detail was taken care of. A truly magical experience I will never forget.",
        name: "James & Lena Park",
        role: "Couple Travelers",
    },
    {
        bg: img3,
        avatar: img6,
        stars: 5,
        quote: "The cultural immersion was unlike anything we had ever experienced. Our guide was knowledgeable and warm.",
        name: "Marco Rivera",
        role: "Adventure Traveler",
    },
];

type Phase = "idle" | "out" | "in";

export default function Testimonials() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [phase, setPhase] = useState<Phase>("idle");
    const [busy, setBusy] = useState(false);

    const handleSelect = (idx: number) => {
        if (idx === activeIdx || busy) return;
        setBusy(true);

        // Step 1 — bg + text both fade OUT
        setPhase("out");

        setTimeout(() => {
            // Step 2 — swap content at invisible midpoint
            setActiveIdx(idx);
            // Step 3 — bg + text both fade IN
            setPhase("in");

            setTimeout(() => {
                setPhase("idle");
                setBusy(false);
            }, 400);
        }, 360);
    };

    const t = testimonials[activeIdx];

    const bgClass = phase === "out" ? "bg-fade-out" : phase === "in" ? "bg-fade-in" : "";
    const textClass = phase === "out" ? "txt-fade-out" : phase === "in" ? "txt-fade-in" : "";

    return (
        <section className="bg-white w-full px-6 md:px-12 lg:px-16 py-16 font-sans">

            <style>{`
        @keyframes bgFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes bgFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .bg-fade-out { animation: bgFadeOut 0.36s ease forwards; }
        .bg-fade-in  { animation: bgFadeIn  0.36s ease forwards; }

        @keyframes txtFadeOut {
          from { opacity: 1; transform: translateY(0px);  }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes txtFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0px);  }
        }
        .txt-fade-out { animation: txtFadeOut 0.25s ease forwards; }
        .txt-fade-in  { animation: txtFadeIn  0.35s ease forwards; }
      `}</style>

            {/* ── Header ────────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-10">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="14" rx="2" />
                        <path d="M3 17l4-4h13" />
                    </svg>
                    <span>Testimonials</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Words From Those Who<br />Traveled With Us
                </h2>
            </div>

            {/* ── Card frame — never moves ─────────────────────────────────────────── */}
            <div
                className="relative w-full max-w-[1300px] mx-auto rounded-3xl overflow-hidden"
                style={{ minHeight: "480px" }}
            >
                {/* Background image — fades out then in */}
                <img
                    key={activeIdx}
                    src={t.bg}
                    alt={t.name}
                    className={`absolute inset-0 w-full h-full object-cover ${bgClass}`}
                />

                {/* Static gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Text content — fades out then in */}
                <div
                    className={`relative z-10 flex flex-col justify-between p-8 sm:p-12 ${textClass}`}
                    style={{ minHeight: "480px" }}
                >
                    {/* Stars + quote + author */}
                    <div className="flex flex-col gap-6 max-w-lg">
                        {/* Stars */}
                        <div className="flex gap-1">
                            {Array.from({ length: t.stars }).map((_, i) => (
                                <svg key={i} className="w-6 h-6 fill-yellow-400" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-white font-bold text-xl sm:text-2xl leading-snug">
                            {t.quote}
                        </p>

                        {/* Author */}
                        <p className="text-white/60 text-base">
                            — {t.name}, {t.role}
                        </p>
                    </div>
                </div>

                {/* Avatars — pinned absolutely, never faded, always clickable */}
                <div className="absolute bottom-8 left-8 sm:left-12 z-20 flex items-center gap-3">
                    {testimonials.map(({ avatar, name }, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            aria-label={`View testimonial from ${name}`}
                            disabled={busy}
                            className={`rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 focus:outline-none ${i === activeIdx
                                    ? "w-16 h-16 opacity-100 scale-110"
                                    : "w-12 h-12 opacity-50 hover:opacity-80 hover:scale-105"
                                }`}
                            style={
                                i === activeIdx
                                    ? { boxShadow: "0 0 0 3px white, 0 0 0 6px rgba(255,255,255,0.25)" }
                                    : {}
                            }
                        >
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}