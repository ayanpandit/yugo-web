"use client";
// ──────────────────────────────────────────────────────────────────────────────
import Image from "next/image";

// Gallery images — add / reorder as needed
const galleryImages = [
    "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg",
    "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg",
    "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
    "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
];

import { useState } from "react";

export default function VibeGallery() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <section className="bg-white w-full py-16 font-sans overflow-hidden">

            <style>{`
        @keyframes scrollGallery {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-track {
          animation: scrollGallery 30s linear infinite;
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
      `}</style>

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-12 px-6">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <span>Community Moments</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Real Memories Made<br />With YouGO
                </h2>
            </div>

            {/* ── Scrolling strip ─────────────────────────────────────────────────── */}
            {/*
        The track is doubled (images × 2) so the loop is seamless.
        translateX(-50%) brings it back to the start position after one loop.
      */}
            <div className="relative w-full">
                {/* Left/right edge fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="gallery-track flex gap-4 w-max">
                    {[...galleryImages, ...galleryImages].map((src, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 rounded-2xl overflow-hidden ${i % 3 === 1 ? "w-56 h-80" : "w-52 h-72"
                                } hover:scale-[1.03] transition-transform duration-500`}
                        >
                            <Image
                                src={src}
                                alt={`Travel story ${(i % galleryImages.length) + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 45vw, 220px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1300px] mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6 px-6 md:px-12 lg:px-16">
                <p className="text-[#0d2b2b] text-sm font-medium">
                    Tag <span className="font-bold">#YouGOJourneys</span> to get featured and inspire the next traveler.
                </p>
                <div
                    className="hero2-btn flex items-center cursor-pointer overflow-hidden border border-[#1a3c3c] bg-transparent"
                    style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        className="left-div bg-[#1a3c3c] flex items-center justify-center text-white font-semibold text-base flex-shrink-0 h-full"
                        style={{
                            width: "75%",
                            borderRadius: isHovered ? "20px 0 0 20px" : "20px",
                            marginLeft: "-1px",
                            transition: "border-radius 0.3s ease",
                        }}
                    >
                        Explore The Vibes
                    </div>
                    <div
                        className="right-wrapper flex items-center justify-center flex-shrink-0 h-full"
                        style={{
                            width: "25%",
                            padding: isHovered ? "2px" : "2px 2px 2px 7px",
                            transition: "padding 0.3s ease, margin 0.3s ease",
                        }}
                    >
                        <div
                            className="right-div bg-[#1a3c3c] flex items-center justify-center w-full h-full"
                            style={{
                                borderRadius: isHovered ? "0 20px 20px 0" : "20px",
                                transition: "border-radius 0.3s ease",
                            }}
                        >
                            <svg
                                className="arrow-svg"
                                width="18"
                                height="18"
                                viewBox="0 0 14 14"
                                fill="none"
                                style={{
                                    transition: "transform 0.3s ease",
                                    transform: isHovered ? "rotate(45deg)" : "rotate(0deg)"
                                }}
                            >
                                <path
                                    d="M2 12L12 2M12 2H5M12 2V9"
                                    stroke="#fff"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}