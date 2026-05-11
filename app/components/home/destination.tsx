"use client";
// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/final_home/destination/pexels-kushal-verma-123877130-9963738.jpg";   // group 1 – background
const img2 = "/final_home/destination/pexels-debphotography-16635815.jpg";   // group 1 – center card
const img3 = "/final_home/destination/pexels-charanpreet-singh-2058010617-29230111.jpg";   // group 2 – background
const img4 = "/final_home/destination/pexels-santosh-bhagat-164427997-34568382.jpg";   // group 2 – center card
const img5 = "/final_home/destination/pexels-kr-mohaniyan-2230943-4059604.jpg";   // group 3 – background
const img6 = "/final_home/destination/pexels-felix-young-449360607-17575036.jpg";   // group 3 – center card
const img7 = "/final_home/destination/pexels-sudipto-chakrabarty-2152424918-36613304.jpg";   // group 4 – background
const img8 = "/final_home/destination/pexels-chandi-saha-706198694-18728098.jpg";   // group 4 – center card
const img9 = "/final_home/destination/pexels-chandi-saha-706198694-18728098.jpg";   // extra (used in hover fans)
// ──────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const GROUPS = [
    {
        bg: img1,
        card: img2,
        name: "Tungnath",
        desc: "The highest Shiva temple in the world,",
        // Other groups' center cards shown as fan on hover
        fanCards: [img4, img6, img8],
    },
    {
        bg: img3,
        card: img4,
        name: "Kachchh",
        desc: "A massive white salt desert that shines under moonlight",
        fanCards: [img2, img6, img8],
    },
    {
        bg: img5,
        card: img6,
        name: "Indira Point",
        desc: "The southernmost tip of the Indian mainland is Kanyakumari ",
        fanCards: [img2, img4, img9],
    },
    {
        bg: img7,
        card: img8,
        name: "Varanasi",
        desc: "One of the world's oldest continuously inhabited cities",
        fanCards: [img2, img4, img6],
    },
];

// Each group takes this many px of scroll to complete its flip
const SCROLL_PER_GROUP = 1000;

// ── Fan card rotations / translations ────────────────────────────────────────
const FAN = [
    { rotate: -20, tx: -85, ty: 10 },
    { rotate: 5, tx: 15, ty: -10 },
    { rotate: 22, tx: 100, ty: 20 },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function DestinationsHero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [groupIdx, setGroupIdx] = useState(0);
    const [flipAngle, setFlipAngle] = useState(0);   // 0 → 180 deg
    const [hovered, setHovered] = useState(false);
    const [marqueeKey, setMarqueeKey] = useState(0);   // remount marquee when dest changes

    // ── Scroll handler ──────────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current;
            if (!el) return;

            // How many px the section top has scrolled past the viewport top
            const scrolled = -el.getBoundingClientRect().top;

            if (scrolled <= 0) { setGroupIdx(0); setFlipAngle(0); return; }

            const maxScroll = SCROLL_PER_GROUP * (GROUPS.length - 1);

            if (scrolled >= maxScroll) {
                setGroupIdx(GROUPS.length - 1);
                setFlipAngle(0);
                return;
            }

            const raw = scrolled / SCROLL_PER_GROUP;
            const gi = Math.floor(raw);
            const progress = raw - gi;          // 0 → 1 within this group

            setGroupIdx(gi);
            setFlipAngle(progress * 180);       // 0 → 180 deg
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Remount marquee when visible destination changes
    const visibleIdx = flipAngle > 90
        ? Math.min(groupIdx + 1, GROUPS.length - 1)
        : groupIdx;

    useEffect(() => { setMarqueeKey(v => v + 1); }, [visibleIdx]);

    const curr = GROUPS[groupIdx];
    const nextIdx = Math.min(groupIdx + 1, GROUPS.length - 1);
    const next = GROUPS[nextIdx];
    const display = GROUPS[visibleIdx];

    // Background: cross-fade current → next across the full 180-deg flip
    const bgNextOpacity = flipAngle / 180;

    // ── Render ──────────────────────────────────────────────────────────────────
    return (
        <>
            {/* Keyframes */}
            <style>{`
        @keyframes scrollMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner { animation: scrollMarquee 18s linear infinite; }

        @keyframes fanSpread {
          from { opacity: 0; transform: var(--fan-from); }
          to   { opacity: 1; transform: var(--fan-to); }
        }
        .fan-card { animation: fanSpread 0.35s cubic-bezier(.34,1.56,.64,1) forwards; }

        /* Smooth marquee fade when destination changes */
        @keyframes fadeInMarquee {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .marquee-wrapper { animation: fadeInMarquee 0.5s ease forwards; }
      `}</style>

            {/*
        Outer div height = (N-1) groups × SCROLL_PER_GROUP  +  100vh
        The extra 100vh lets the last sticky frame breathe before
        the next section enters.
      */}
            <div
                ref={sectionRef}
                style={{
                    height: `calc(${SCROLL_PER_GROUP * (GROUPS.length - 1)}px + 100vh)`,
                }}
                className="relative"
            >
                {/* ── Sticky viewport ──────────────────────────────────────────────── */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* ── Backgrounds ────────────────────────────────────────────────── */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="relative w-full h-full">
                            <Image
                                src={curr.bg}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                            <Image
                                src={next.bg}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="100vw"
                                style={{ opacity: bgNextOpacity }}
                            />
                            {/* Gradient vignette */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
                        </div>
                    </div>

                    {/* ── Foreground ─────────────────────────────────────────────────── */}
                    <div className="relative z-10 h-full flex flex-col items-center">

                        {/* Nav removed: Traavellio and hamburger menu deleted as requested */}

                        {/* Label */}
                        <div className="flex items-center gap-2 text-white/75 text-xs font-semibold tracking-[0.2em] uppercase mt-3">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            Most Loved Destinations
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center leading-tight mt-3 px-6 max-w-3xl">
                            Explore The World's Most<br />Popular Destinations
                        </h2>

                        {/* ── 3-D Flip Card ─────────────────────────────────────────────── */}
                        <div
                            className="mt-7 relative"
                            style={{ perspective: "1400px" }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            {/* Arrow button (stays above 3-D layer) */}
                            <button
                                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                aria-label="Explore"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </button>

                            {/* Card shell – rotates on scroll */}
                            <div
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: `rotateX(${flipAngle}deg)`,
                                    width: "clamp(290px, 44vw, 490px)",
                                    height: "clamp(210px, 34vh, 365px)",
                                    position: "relative",
                                }}
                            >
                                {/* ── FRONT: current group ────────────────────────────────── */}
                                <CardFace
                                    img={curr.card}
                                    name={curr.name}
                                    desc={curr.desc}
                                    fanCards={curr.fanCards}
                                    showFan={hovered && flipAngle <= 90}
                                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                                />

                                {/* ── BACK: next group ─────────────────────────────────────── */}
                                <CardFace
                                    img={next.card}
                                    name={next.name}
                                    desc={next.desc}
                                    fanCards={next.fanCards}
                                    showFan={hovered && flipAngle > 90}
                                    style={{
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateX(180deg)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Progress dots */}
                        <div className="flex gap-2 mt-5">
                            {GROUPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full transition-all duration-500 ${i === visibleIdx
                                        ? "w-6 h-2 bg-white"
                                        : "w-2 h-2 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* ── Marquee ──────────────────────────────────────────────────── */}
                        <div
                            key={marqueeKey}
                            className="marquee-wrapper absolute bottom-4 left-0 right-0 overflow-hidden select-none pointer-events-none"
                        >
                            {/* Double the items so the loop is seamless */}
                            <div className="marquee-inner flex items-center gap-10 whitespace-nowrap">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="text-white font-extrabold shrink-0"
                                        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
                                    >
                                        {display.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── CardFace sub-component ────────────────────────────────────────────────────
interface CardFaceProps {
    img: string;
    name: string;
    desc: string;
    fanCards: string[];
    showFan: boolean;
    style: React.CSSProperties;
}

function CardFace({ img, name, desc, fanCards, showFan, style }: CardFaceProps) {
    return (
        <div
            style={style}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
        >
            {/* Main image */}
            <div className="relative w-full h-full">
                <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 490px"
                />
            </div>

            {/* Hover fan cards */}
            {showFan && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {fanCards.slice(0, 3).map((fc, i) => {
                        const { rotate, tx, ty } = FAN[i];
                        return (
                            <div
                                key={i}
                                className="fan-card absolute rounded-xl overflow-hidden shadow-2xl border-[2.5px] border-white"
                                style={{
                                    width: "clamp(90px, 14vw, 130px)",
                                    height: "clamp(115px, 18vw, 165px)",
                                    zIndex: i + 1,
                                    "--fan-from": `rotate(0deg) translate(0px, 30px) scale(0.7)`,
                                    "--fan-to": `rotate(${rotate}deg) translate(${tx}px, ${ty}px) scale(1)`,
                                } as React.CSSProperties}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={fc}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 30vw, 130px"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Text gradient */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <h3 className="text-white font-extrabold text-2xl leading-tight">{name}</h3>
                <p className="text-white/65 text-sm mt-1 leading-snug">{desc}</p>
            </div>
        </div>
    );
}