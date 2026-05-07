"use client";
const img1 = "/about/1.jpg";
const img2 = "/about/2.jpg";
const img3 = "/about/3.jpg";
const img4 = "/about/4.jpg";
const img5 = "/about/5.jpg";
const img6 = "/about/6.jpg";
const img7 = "/about/1.jpg";
const img8 = "/about/2.jpg";
const img9 = "/about/3.jpg";


import { useEffect, useState } from "react";

const carouselImages = [img5, img6, img7, img8, img9];

export default function AboutUs() {
    // ── Carousel state ──────────────────────────────────────────────────────────
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            setVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % carouselImages.length);
                // Fade in
                setVisible(true);
            }, 400); // 400 ms cross-fade window
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* ── Navbar ──────────────────────────────────────────────────────────── */}
            <nav className="flex justify-center pt-5 pb-4 px-6">
                <div className="flex items-center gap-4 bg-[#1a3c3c] text-white rounded-full px-7 py-3 shadow-lg">
                    <span className="text-xl font-bold tracking-tight">Traavellio</span>
                    <button
                        aria-label="Menu"
                        className="flex flex-col gap-[5px] ml-2 group"
                    >
                        <span className="block w-5 h-[2px] bg-white rounded-full" />
                        <span className="block w-5 h-[2px] bg-white rounded-full" />
                    </button>
                </div>
            </nav>

            {/* ── Main grid ───────────────────────────────────────────────────────── */}
            <main className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-start">
                {/* ── Left column ───────────────────────────────────────────────────── */}
                <div className="flex flex-col gap-6">
                    {/* About Us label */}
                    <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-medium">
                        <svg
                            className="w-5 h-5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="8.5" strokeLinecap="round" />
                            <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
                        </svg>
                        <span className="tracking-wide">About Us</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight">
                        Meaningful Travel
                        <br />
                        Experiences,
                        <br />
                        Thoughtfully Crafted
                    </h1>

                    {/* Body */}
                    <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                        We are passionate travel experts creating unforgettable journeys
                        beyond sightseeing. Every itinerary combines comfort, discovery,
                        and meaningful experiences.
                    </p>

                    {/* CTA button */}
                    <div className="flex items-center gap-0 w-fit mt-2">
                        <button className="bg-[#1a3c3c] text-white text-sm font-semibold px-6 py-3 rounded-l-full hover:bg-[#153030] transition-colors">
                            Know More
                        </button>
                        <button className="bg-[#1a3c3c] text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#153030] transition-colors ml-1">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom image (asset 1) */}
                    <div className="rounded-2xl overflow-hidden mt-2 w-full aspect-[16/9] lg:aspect-[4/3]">
                        <img
                            src={img1}
                            alt="Travel scene 1"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Optional thumbnail strip for assets 2,3,4 */}
                    <div className="hidden sm:grid grid-cols-3 gap-3 mt-1">
                        {[img2, img3, img4].map((src, i) => (
                            <div
                                key={i}
                                className="rounded-xl overflow-hidden aspect-square"
                            >
                                <img
                                    src={src}
                                    alt={`Travel scene ${i + 2}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right column – carousel ──────────────────────────────────────── */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gray-200">
                    {/* Fixed tall aspect ratio on desktop, 16/9 on mobile */}
                    <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full relative">
                        {carouselImages.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Destination ${idx + 5}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    opacity: idx === current ? (visible ? 1 : 0) : 0,
                                    transition: "opacity 0.4s ease-in-out",
                                }}
                            />
                        ))}

                        {/* Dot indicators */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {carouselImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setVisible(false);
                                        setTimeout(() => {
                                            setCurrent(idx);
                                            setVisible(true);
                                        }, 300);
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}