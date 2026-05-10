"use client";

import Link from "next/link";
import { useState } from "react";

export default function NotFoundPage() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-32 font-sans">
            {/* Big 404 */}
            <div className="relative mb-8 select-none">
                <span className="text-[160px] md:text-[220px] font-extrabold text-[#0d2b2b] leading-none opacity-[0.04] absolute inset-0 flex items-center justify-center pointer-events-none">
                    404
                </span>
                <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#0d2b2b]/5 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#0d2b2b]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Text */}
            <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">404 — Lost in Transit</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-5 leading-tight">
                Looks Like You&apos;re Lost<br />in the Wild
            </h1>
            <p className="text-lg text-gray-500 max-w-md mx-auto mb-12 leading-relaxed">
                The page you were looking for doesn&apos;t exist — but your next adventure does. Let&apos;s get you back on the right path.
            </p>

            {/* CTA Button */}
            <Link href="/" passHref>
                <div
                    className="hero2-btn flex items-center cursor-pointer overflow-hidden border border-[#1a3c3c] bg-transparent"
                    style={{ borderRadius: "20px", width: "220px", height: "60px", fontWeight: 500, fontSize: "1.1rem" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="bg-[#1a3c3c] flex items-center justify-center text-white font-semibold flex-shrink-0 h-full"
                        style={{
                            width: "75%",
                            borderRadius: isHovered ? "20px 0 0 20px" : "20px",
                            marginLeft: "-1px",
                            transition: "border-radius 0.3s ease",
                        }}
                    >
                        Back to Home
                    </div>
                    <div
                        className="flex items-center justify-center flex-shrink-0 h-full"
                        style={{ width: "25%", padding: isHovered ? "2px" : "2px 2px 2px 7px", transition: "padding 0.3s ease" }}
                    >
                        <div
                            className="bg-[#1a3c3c] flex items-center justify-center w-full h-full"
                            style={{ borderRadius: isHovered ? "0 20px 20px 0" : "20px", transition: "border-radius 0.3s ease" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 14 14" fill="none"
                                style={{ transition: "transform 0.3s ease", transform: isHovered ? "rotate(45deg)" : "rotate(0deg)" }}
                            >
                                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
