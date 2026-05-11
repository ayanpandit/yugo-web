"use client";

// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "final_home/footer/pexels-jean-paul-wettstein-677916508-32514307.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const services = [
    { icon: "👥", label: "Find Travel Partners" },
    { icon: "🧠", label: "AI Trip Planner" },
    { icon: "🎒", label: "Backpacking Trips" },
    { icon: "✈️", label: "Solo Travel" },
    { icon: "🔒", label: "Verified Travelers" },
    { icon: "🌍", label: "Hidden Gems" },
    { icon: "☕", label: "Café Hopping" },
    { icon: "🏕", label: "Adventure Trips" },
    { icon: "🚗", label: "Roadtrip Vibes" },
    { icon: "📍", label: "Curated Destinations" },
    { icon: "💬", label: "Match Your Vibe" },
    { icon: "🎉", label: "Group Adventures" },
    { icon: "🌄", label: "Weekend Escapes" },
    { icon: "📸", label: "Travel Stories" },
];

const footerLinks = {
    Pages: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Tours", href: "/tours" },
        { name: "Explore", href: "/explore" }
    ],
    Documentation: [
        { name: "Blogs", href: "/blogs" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-conditions" }
    ],
    "Other Pages": [
        { name: "404", href: "/not-found-example" }
    ],
};

import Link from "next/link";

const socials = [
    {
        label: "Facebook",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: "X / Twitter",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

import { useState } from "react";

export default function Footer() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <footer className="w-full font-sans">

            <style>{`
        @keyframes scrollServices {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .services-track { animation: scrollServices 22s linear infinite; }
      `}</style>

            {/* ── CTA hero ────────────────────────────────────────────────────────── */}
            <div className="relative w-full overflow-hidden min-h-screen" style={{ minHeight: "100vh" }}>
                {/* Background */}
                <img src={img1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-36 min-h-screen" style={{ minHeight: "100vh" }}>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-xl">
                        Turn Your Travel<br />Dreams Into Reality
                    </h2>
                    <p className="text-white/65 text-base mt-4 max-w-md">
                        From the first idea to the final detail, we design journeys you'll remember forever.
                    </p>
                    <div
                        className="hero2-btn flex items-center cursor-pointer mt-8 overflow-hidden border border-white bg-transparent mx-auto"
                        style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="left-div bg-white flex items-center justify-center text-black font-semibold text-base flex-shrink-0 h-full"
                            style={{
                                width: "75%",
                                borderRadius: isHovered ? "20px 0 0 20px" : "20px",
                                marginLeft: "-1px",
                                transition: "border-radius 0.3s ease",
                            }}
                        >
                            Explore
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
                                className="right-div bg-white flex items-center justify-center w-full h-full"
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
                                        stroke="#000"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Services marquee — overlaps bottom of hero ─────────────────────── */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm overflow-hidden py-4 border-t border-white/10">
                    <div className="services-track flex items-center gap-8 w-max whitespace-nowrap">
                        {[...services, ...services].map(({ icon, label }, i) => (
                            <div key={i} className="flex items-center gap-2 text-white text-sm font-semibold flex-shrink-0">
                                <span>{icon}</span>
                                <span>{label}</span>
                                <span className="ml-4 text-white/40">•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Links grid ──────────────────────────────────────────────────────── */}
            <div className="bg-[#0d1a1a] px-6 md:px-12 lg:px-16 pt-14 pb-10">
                <div className="max-w-[1300px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10">

                    {/* Nav columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="flex flex-col gap-4">
                            <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase">{title}</h4>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-white text-sm font-medium hover:text-white/60 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social column */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white/50 text-xs font-semibold tracking-widest uppercase">Social</h4>
                        <div className="flex items-center gap-3">
                            {socials.map(({ label, icon }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Copyright bar ───────────────────────────────────────────────────── */}
            <div className="bg-[#0a1515] border-t border-white/10 px-6 md:px-12 lg:px-16 py-5">
                <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-white/40 text-xs">All rights reserved for @YouGO</p>
                    
                </div>
            </div>
        </footer>
    );
}