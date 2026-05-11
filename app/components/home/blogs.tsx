"use client";

// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "final_home/blogs/1.jpg";
const img2 = "final_home/blogs/2.jpg";
const img3 = "final_home/blogs/3.jpg";
const img4 = "final_home/blogs/4.jpg";
const img5 = "final_home/blogs/5.jpg";
const img6 = "final_home/blogs/6.jpg";
const img7 = "final_home/blogs/7.jpg";
const img8 = "final_home/blogs/8.jpg";
const img9 = "final_home/blogs/9.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const blogs = [
    {
        img: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
        date: "25 Feb 2026",
        title: "How To Plan An International Trip On A Budget From India",
    },
    {
        img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg",
        date: "10 Mar 2026",
        title: "What To Do When Your Friends Cancel The Trip Last Minute",
    },
];

import { useState } from "react";

export default function Blogs() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <section id="blogs" className="bg-[#fcfafa] w-full px-6 md:px-12 lg:px-16 py-16 font-sans">

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Travel Stories</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Travel Stories & Ideas<br />For Your Next Escape
                </h2>
                <p className="text-gray-500 text-base max-w-2xl mt-2">
                    Real experiences, smart travel tips, hidden gems, and inspiration for your next journey.
                </p>
            </div>

            {/* ── Blog cards ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map(({ img, date, title }, i) => (
                    <div key={i} className="group flex flex-col gap-4 cursor-pointer">

                        {/* Image + arrow button */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Arrow button top-right */}
                            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </button>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-col gap-1 px-1">
                            <p className="text-gray-400 text-sm">{date}</p>
                            <h3 className="text-[#0d2b2b] font-extrabold text-xl leading-snug group-hover:underline underline-offset-2 transition-all">
                                {title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1300px] mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <p className="text-[#0d2b2b] text-sm font-medium">
                    Explore stories that make you want to pack instantly.
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
                        Explore All Stories
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