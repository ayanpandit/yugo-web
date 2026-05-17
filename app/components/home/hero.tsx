"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/providers/auth-provider";
const bgVideo = "/final_home/hero/back_vid.mp4";
const img1 = "/final_home/hero/medium-shot-couple-hiking-together.jpg";
const img2 = "/final_home/hero/joyful-family-picnic-around-burning-coal-generated-by-ai.jpg";
const img3 = "/final_home/hero/pexels-anastasia-shuraeva-8070812.jpg";
const img4 = "/final_home/hero/pexels-sosyalogretmen-29754398.jpg";

const navLinks = [
    { label: "Why YouGO", href: "/#why-yougo" },
    { label: "Explore Trips", href: "/#tours" },
    { label: "Travel Stories", href: "/#blogs" },
];

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
    const { user } = useAuth();
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [bookHovered, setBookHovered] = useState(false);
 
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
 
    const handleExploreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (user) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative w-screen min-h-dvh overflow-hidden flex items-center justify-center">

            {/* ── Pill Navbar ─────────────────────────────────────────────── */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[60] flex justify-center pointer-events-none">
                <button
                    onClick={() => setMenuOpen(true)}
                    className="pointer-events-auto flex items-center justify-between gap-10 px-8 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] text-white hover:bg-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="YouGO Logo"
                            width={28}
                            height={28}
                            className="w-7 h-7 object-contain drop-shadow-md"
                            priority
                        />
                        <span className="font-extrabold text-2xl tracking-tight leading-none drop-shadow-md">
                            <span className="text-white">You</span><span className="text-[#3b82f6]">GO</span>
                        </span>
                    </div>
                    {/* Hamburger */}
                    <div className="flex flex-col gap-[5px] opacity-90 items-center justify-center">
                        <span className="w-5 h-[2px] bg-white rounded-full shadow-sm"></span>
                        <span className="w-5 h-[2px] bg-white rounded-full shadow-sm"></span>
                    </div>
                </button>
            </div>

            {/* ── Fullscreen Menu Overlay ─────────────────────────────────────────── */}
            <div
                className={`fixed inset-0 z-[70] flex flex-col bg-[#051313]/70 backdrop-blur-3xl transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    menuOpen ? "translate-y-0" : "translate-y-full"
                }`}
            >
                {/* Logo inside menu */}
                <div className="absolute top-10 left-10 md:left-16 z-[80] flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="YouGO"
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain drop-shadow-md"
                        priority
                    />
                    <span className="font-extrabold text-2xl tracking-tight leading-none drop-shadow-md">
                        <span className="text-white">You</span><span className="text-[#3b82f6]">GO</span>
                    </span>
                </div>

                <div className="absolute top-10 right-10 md:right-16 z-[80]">
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-10 md:px-24 lg:px-40 gap-12 md:gap-32 w-full h-full pt-24 pb-24">
                    {/* Left: Image */}
                    <div className="hidden md:block w-[320px] h-[420px] lg:w-[380px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 transform rotate-[-2deg] relative">
                        <Image
                            src="/final_home/navbar/1.jpg"
                            alt="Travel Destination"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 70vw, 380px"
                        />
                    </div>

                    {/* Right: Links */}
                    <div className="flex flex-col gap-6">
                        {[
                            { label: "Home", href: "/" },
                            { label: "About Us", href: "/about" },
                            { label: "Tours", href: "/#tours" },
                            { label: "Blogs", href: "/#blogs" },
                            { label: "Explore", href: "/#explore" },
                        ].map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="text-white text-5xl sm:text-6xl md:text-7xl font-bold hover:text-[#3b82f6] transition-colors duration-300 leading-tight tracking-tight"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer inside menu */}
                <div className="absolute bottom-10 left-10 md:left-16 flex flex-col gap-1">
                    <span className="text-white/60 font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
                    <a href="mailto:info@yougo.co" className="text-white font-bold text-xl hover:text-[#3b82f6] transition-colors">info@yougo.co</a>
                </div>

                <div className="absolute bottom-10 right-10 md:right-16 flex items-center gap-4">
                    {/* Social icons */}
                    <a href="#" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                </div>
            </div>


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
                    <div className="relative w-full h-full">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover block select-none pointer-events-none"
                            sizes="(max-width: 640px) 50vw, 25vw"
                            priority={i === 0}
                        />
                    </div>
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
                    className="font-extrabold leading-[1.08] tracking-tight drop-shadow-2xl mb-5 text-[clamp(2.2rem,6vw,5.2rem)]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Friends Cancelled?,<br />YouGO Anyway.
                </h1>

                <p
                    className="opacity-90 tracking-wide drop-shadow-md mb-9 text-[clamp(0.9rem,2vw,1.12rem)]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Find trusted travel partners, plan trips with AI, and explore the world without waiting for anyone.
                </p>

                {/* Button */}
                <Link
                    href="/explore"
                    onClick={handleExploreClick}
                    className="hero2-btn flex items-center cursor-pointer mt-8 overflow-hidden border border-white bg-transparent mx-auto"
                    style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Left — Get Template */}
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
                </Link>
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