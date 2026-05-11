"use client";
// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/final_home/booking/1.jpg";   // full-page background
import Image from "next/image";
import { useState } from "react";

// ── Feature data ──────────────────────────────────────────────────────────────
const features = [
    {
        img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg",
        title: "AI Trip Planning",
        desc: "Personalized itineraries built around your budget, vibe, and travel style.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M17 17c0-3-2-6-5-6s-5 3-5 6" />
                <line x1="12" y1="11" x2="12" y2="7" />
                <path d="M8 7c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                <line x1="5" y1="17" x2="19" y2="17" />
            </svg>
        ),
    },
    {
        img: "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg",
        title: "Find Your Travel People",
        desc: "Connect with verified travelers who actually match your energy.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M12 2c0 0-1 2-1 4s1 3 1 3" />
                <path d="M9 2c0 0-1 2-1 4s1 3 1 3" />
                <path d="M15 2c0 0-1 2-1 4s1 3 1 3" />
                <path d="M5 11h14l-1.5 8H6.5L5 11z" />
            </svg>
        ),
    },
    {
        img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
        title: "Safer Social Travel",
        desc: "Chat, plan, and connect before joining any trip.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
    {
        img: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
        title: "Discover Better Experiences",
        desc: "Hidden gems, local cafés, road trips, adventures, and unforgettable memories.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M17 11.5C17 14.5 12 21 12 21S7 14.5 7 11.5a5 5 0 0 1 10 0z" />
                <circle cx="12" cy="11" r="2" />
                <path d="M5 7.5C3 9 2 11 2 13" />
                <path d="M19 7.5C21 9 22 11 22 13" />
            </svg>
        ),
    },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function WhyTravelWithUs() {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <section id="why-yougo" className="relative w-full min-h-screen overflow-hidden font-sans">

            {/* ── Full-page background ─────────────────────────────────────────────── */}
            <Image
                src={img1}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-[#0a2e2e]/80" />

            {/* ── Content ─────────────────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center px-6 md:px-12 lg:px-16 py-16">

                {/* Header */}
                <div className="flex flex-col items-center text-center gap-3 mb-12">
                    <div className="flex items-center gap-2 text-white/70 text-sm font-semibold tracking-widest uppercase">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                        <span>WHY PEOPLE USE YOUGO</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl">
                        Travel Smarter.<br />Travel Together.
                    </h2>
                </div>

                {/* ── Two-column body ──────────────────────────────────────────────── */}
                <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* LEFT – sliding image strip ─────────────────────────────────────── */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[520px]">
                        {/*
              All 4 images sit side-by-side in a strip.
              We slide the strip left/right by translating -activeIdx × 100%.
            */}
                        <div
                            className="flex h-full"
                            style={{
                                width: `${features.length * 100}%`,
                                transform: `translateX(-${(activeIdx * 100) / features.length}%)`,
                                transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            {features.map(({ img, title }, i) => (
                                <div
                                    key={i}
                                    className="relative flex-shrink-0 h-full"
                                    style={{ width: `${100 / features.length}%` }}
                                >
                                    <Image
                                        src={img}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Subtle vignette on right edge to hint more images */}
                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />

                        {/* Dot indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {features.map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full transition-all duration-400 ${i === activeIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT – feature list ────────────────────────────────────────────── */}
                    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                        {features.map(({ icon, title, desc }, i) => (
                            <div key={i}>
                                {/* Feature row */}
                                <div
                                    className={`flex items-start gap-5 px-8 py-7 cursor-pointer transition-colors duration-200 ${activeIdx === i ? "bg-white/10" : "hover:bg-white/[0.06]"
                                        }`}
                                    onMouseEnter={() => setActiveIdx(i)}
                                >
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 mt-0.5 transition-colors duration-300 ${activeIdx === i ? "text-white" : "text-white/60"
                                        }`}>
                                        {icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col gap-1">
                                        <h3 className={`font-extrabold text-xl leading-tight transition-colors duration-300 ${activeIdx === i ? "text-white" : "text-white/75"
                                            }`}>
                                            {title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeIdx === i ? "text-white/75" : "text-white/45"
                                            }`}>
                                            {desc}
                                        </p>
                                    </div>

                                    {/* Active arrow indicator */}
                                    <div className={`ml-auto flex-shrink-0 transition-all duration-300 ${activeIdx === i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                                        }`}>
                                        <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Divider (not after last item) */}
                                {i < features.length - 1 && (
                                    <div className="h-px bg-white/10 mx-8" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}