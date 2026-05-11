"use client";
const img1 = "/final_home/about/pexels-kiran-kr-936377-29481959.jpg";
const img2 = "/final_home/about/pexels-kuldeep-rajora-207144812-11888576.jpg";
const img3 = "/final_home/about/pexels-ezequielfiliberto-6891416.jpg";
const img4 = "/final_home/about/pexels-lara-jameson-8886968.jpg";
const img5 = "/final_home/about/pexels-smit-prajapati-130663561-30525536.jpg";
const img6 = "/final_home/about/pexels-sufail-pc-1776010-15164332.jpg";
const img7 = "/final_home/about/pexels-tufan-kuzucuoglu-1677261930-31403782.jpg";

import Image from "next/image";
import { useEffect, useState } from "react";

const carouselImages = [img2, img3, img4, img5, img6, img7];

export default function AboutUs() {
    // ── Carousel state ──────────────────────────────────────────────────────────
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % carouselImages.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">

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
                        <span className="tracking-wide">Why YouGO?</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight">
                        Travel Feels
                        <br />
                        Better With
                        <br />
                        The Right People
                    </h1>

                    {/* Body */}
                    <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                        YouGO helps travelers discover meaningful trips, connect with trusted people, and explore without depending on flaky plans or random strangers.
                        Whether you’re solo, spontaneous, or simply tired of cancelled trips — your next journey starts here.
                    </p>

                    {/* CTA button */}
                    <div
                        className="hero2-btn flex items-center cursor-pointer mt-2 overflow-hidden border border-[#1a3c3c] bg-transparent"
                        style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Left — Get Template */}
                        <div
                            className="left-div bg-[#1a3c3c] flex items-center justify-center text-white font-semibold text-base flex-shrink-0 h-full"
                            style={{
                                width: "75%",
                                borderRadius: isHovered ? "20px 0 0 20px" : "20px",
                                marginLeft: "-1px",
                                transition: "border-radius 0.3s ease",
                            }}
                        >
                            Know More
                        </div>

                        {/* Right — Arrow */}
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

                    {/* Bottom image (asset 1) */}
                    <div className="rounded-2xl overflow-hidden mt-2 w-full aspect-[16/9] lg:aspect-[4/3] relative">
                        <Image
                            src={img1}
                            alt="Travel scene 1"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* ── Right column – carousel ──────────────────────────────────────── */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gray-200">
                    {/* Fixed tall aspect ratio on desktop, 16/9 on mobile */}
                    <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full relative">
                        {carouselImages.map((src, idx) => (
                            <Image
                                key={idx}
                                src={src}
                                alt={`Destination ${idx + 5}`}
                                fill
                                className={`object-cover transition-opacity duration-500 ease-in-out ${idx === current ? "opacity-100" : "opacity-0"}`}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority={idx === 0}
                            />
                        ))}

                        {/* Dot indicators */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {carouselImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
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