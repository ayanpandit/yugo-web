"use client";
import { useEffect, useState } from "react";
const bgVideo = "/home/1.mp4";
const img1 = "/home/1.jpg";
const img2 = "/home/2.jpg";
const img3 = "/home/3.jpg";
const img4 = "/home/4.jpg";

const floatingImages = [
    {
        src: img1,
        alt: "Mountain landscape",
        className:
            "top-[5%] left-[2%] w-[370px] h-[260px] " +
            "max-sm:top-[3%] max-sm:left-[-10px] max-sm:w-[180px] max-sm:h-[130px]",
    },
    {
        src: img2,
        alt: "Sphinx and pyramids",
        className:
            "bottom-[8%] left-[2%] w-[360px] h-[255px] " +
            "max-sm:bottom-[15%] max-sm:left-[-10px] max-sm:w-[180px] max-sm:h-[130px]",
    },
    {
        src: img3,
        alt: "Viaduct scenery",
        className:
            "top-[5%] right-[2%] w-[380px] h-[265px] " +
            "max-sm:top-[3%] max-sm:right-[-10px] max-sm:w-[180px] max-sm:h-[130px]",
    },
    {
        src: img4,
        alt: "Taj Mahal",
        className:
            "bottom-[8%] right-[2%] w-[365px] h-[260px] " +
            "max-sm:bottom-[15%] max-sm:right-[-10px] max-sm:w-[180px] max-sm:h-[130px]",
    },
];

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative w-screen min-h-dvh overflow-hidden flex items-center justify-center">

            {/* ── Full-screen background video ── */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={bgVideo}
                autoPlay
                muted
                loop
                playsInline
            />

            {/* ── Dark gradient overlay ── */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/10 to-black/40 pointer-events-none" />

            {/* ── Navbar ── */}
            <nav
                className={`
          absolute top-6 left-1/2 -translate-x-1/2 z-20
          transition-opacity duration-700
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
            >
                <div className="flex items-center gap-5 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5">
                    <span
                        className="flex items-center gap-2 text-white font-bold text-base tracking-tight whitespace-nowrap"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <path
                                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                        Traavellio
                    </span>

                    <button aria-label="Menu" className="flex flex-col gap-[5px] p-0.5 bg-transparent border-none cursor-pointer">
                        <span className="block w-5 h-0.5 bg-white rounded" />
                        <span className="block w-5 h-0.5 bg-white rounded" />
                    </button>
                </div>
            </nav>

            {/* ── Four floating destination images ── */}
            {floatingImages.map((img, i) => (
                <div
                    key={i}
                    className={`
            absolute z-10 overflow-hidden rounded-2xl
            border border-white/10 shadow-2xl
            transition-transform duration-500 ease-in-out
            will-change-transform
            cursor-pointer
            ${loaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-6"}
            ${img.className}
            group hover:rotate-6 hover:scale-105
          `}
                    style={{ transitionDelay: `${0.18 + i * 0.13}s` }}
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover block select-none pointer-events-none"
                    />
                </div>
            ))}

            {/* ── Hero text ── */}
            <main
                className={`
          relative z-10 text-center text-white max-w-3xl px-6
          transition-all duration-700 ease-out
          ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
                style={{ transitionDelay: "0.08s" }}
            >
                <h1
                    className="font-extrabold leading-[1.08] tracking-tight drop-shadow-2xl mb-5
                     text-[clamp(2.2rem,6vw,5.2rem)]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Experience the World,<br />Not Just the Map
                </h1>

                <p
                    className="opacity-90 tracking-wide drop-shadow-md mb-9 text-[clamp(0.9rem,2vw,1.12rem)]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Curated Journeys Designed To Be Felt, Not Rushed.
                </p>

                <button
                    className="
            inline-flex items-center gap-2.5
            bg-white text-black font-semibold text-base
            rounded-full px-7 py-3.5 cursor-pointer
            shadow-xl hover:scale-105 hover:shadow-2xl
            transition-transform duration-200 border-none
          "
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Book a trip
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black text-white text-sm shrink-0">
                        ↗
                    </span>
                </button>
            </main>

            {/* ── Stats bar ── */}
            <footer
                className={`
          absolute bottom-7 left-1/2 -translate-x-1/2 z-10
          flex items-center gap-10 whitespace-nowrap
          max-sm:flex-col max-sm:gap-3 max-sm:bottom-5
          transition-opacity duration-700
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
                style={{ transitionDelay: "0.55s" }}
            >
                {[
                    {
                        label: "4.9 stars (541k Reviews)",
                        icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                                <path d="M12 6v6l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        ),
                    },
                    {
                        label: "50k travellers",
                        icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.5" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        ),
                    },
                    {
                        label: "1+ million followers",
                        icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" />
                                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
                                <circle cx="17.5" cy="6.5" r="1" fill="white" />
                            </svg>
                        ),
                    },
                ].map((s, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 text-white text-[0.92rem] font-medium drop-shadow"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        {s.icon}
                        {s.label}
                    </div>
                ))}
            </footer>
        </div>
    );
}