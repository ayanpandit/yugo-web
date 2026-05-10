"use client";

const packages = [
    {
        img: "https://images.pexels.com/photos/15447033/pexels-photo-15447033.jpeg",
        duration: "6 Days / 5 Nights",
        title: "Vang Vieng, Laos",
        price: "From ₹53,700 / Person",
    },
    {
        img: "https://images.pexels.com/photos/18381857/pexels-photo-18381857.jpeg",
        duration: "6 Days / 5 Nights",
        title: "Tbilisi, Georgia",
        price: "From ₹55,000 / Person",
    },
    {
        img: "https://images.pexels.com/photos/30459671/pexels-photo-30459671.jpeg",
        duration: "7 Days / 6 Nights",
        title: "Albanian Riviera, Albania",
        price: "From ₹91,500 / Person",
    },
    {
        img: "https://images.pexels.com/photos/4619987/pexels-photo-4619987.jpeg",
        duration: "8 Days / 7 Nights",
        title: "Bacalar, Mexico",
        price: "From ₹133,000 / Person",
    },
];

import { useState } from "react";

export default function TourPackages() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <section id="tours" className="bg-white w-full px-6 md:px-12 lg:px-16 py-14 font-sans">

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center mb-12 gap-3">
                {/* Label */}
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 20 L8 10 L12 16 L16 8 L21 20 Z" />
                    </svg>
                    <span>Budget Friendly International Trips</span>
                </div>
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Explore stunning international destinations without spending a fortune.
                </h2>
                {/* Small Text */}
                <p className="text-gray-500 text-base max-w-2xl mt-2">
                    Real trips, realistic budgets, unforgettable experiences.
                </p>
            </div>

            {/* ── Cards ───────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
                {packages.map(({ img, duration, title, price }, i) => (
                    <div key={i} className="flex flex-col gap-4 group cursor-pointer">
                        {/* Image if present, else badge only */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 flex items-start">
                            {img ? (
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                                />
                            ) : null}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-[#1a3c3c]/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                    {duration}
                                </span>
                            </div>
                        </div>
                        {/* Info */}
                        <div className="flex flex-col gap-1 px-1">
                            <h3 className="text-[#0d2b2b] font-extrabold text-xl leading-tight">
                                {title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <p className="text-[#0d2b2b] text-sm font-medium">
                    Explore more journeys waiting for you
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
                        View Packages
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