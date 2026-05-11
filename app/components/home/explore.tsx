// ─── Asset Imports ───────────────────────────────────────────────────────────
const img1 = "/final_home/explore/1.png";
const img2 = "/final_home/explore/2.png";
const img3 = "/final_home/explore/3.png";
const img4 = "/final_home/explore/4.png";
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";

const experiences = [
    {
        img: img1,
        title: "You Have The Plan. But Not The People.",
        desc: "Post your trip idea, find trusted travelers, match vibes, and make the journey happen.",
        imageFirst: true,
    },
    {
        img: img2,
        title: "You Have Friends. But No Actual Plan.",
        desc: "Let AI build your personalized itinerary in seconds — budget, places, food, stays, everything.",
        imageFirst: false,
    },
    {
        img: img3,
        title: "You Want To Travel. But Don’t Know Where To Start.",
        desc: "Discover curated destinations, hidden gems, verified stays, and travel ideas built for your vibe.",
        imageFirst: true,
    },
    {
        img: img4,
        title: "Your Friends Cancelled. Again.",
        desc: "Stop waiting for \"next month pakka\". Travel with people who actually want to go.",
        imageFirst: false,
    },
];

export default function ExperienceSection() {
    return (
        <section className="bg-white w-full px-6 md:px-12 lg:px-16 py-12 font-sans">
            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center mb-12 gap-3">
                {/* Label */}
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    {/* Plane / compass icon */}
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22l-4-9-9-4 19-7z" />
                    </svg>
                    <span>Explore by Situation</span>
                </div>

                {/* Main heading */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    No Matter What Situation You’re In…
                    YouGO Has Your Back.
                </h2>
            </div>

            {/* ── Cards grid ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
                {experiences.map(({ img, title, desc, imageFirst }, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        {imageFirst ? (
                            <>
                                {/* Image top */}
                                <div className="rounded-2xl overflow-hidden flex-shrink-0 aspect-[3/4] relative">
                                    <Image
                                        src={img}
                                        alt={title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                {/* Text below */}
                                <div className="flex flex-col gap-1 px-1">
                                    <h3 className="text-lg font-bold text-[#0d2b2b]">{title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Text top */}
                                <div className="flex flex-col gap-1 px-1 pt-1">
                                    <h3 className="text-lg font-bold text-[#0d2b2b]">{title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                                {/* Image below */}
                                <div className="rounded-2xl overflow-hidden flex-shrink-0 aspect-[3/4] relative">
                                    <Image
                                        src={img}
                                        alt={title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto mt-10 flex flex-col items-center justify-center gap-4 border-t border-gray-200 pt-6">
                <div
                    className="hero2-btn flex items-center cursor-pointer mt-2 overflow-hidden border border-white bg-transparent mx-auto"
                    style={{ borderRadius: "20px", width: "210px", height: "54px", fontFamily: 'Funnel Display, sans-serif', fontWeight: 500, fontSize: "1.1rem" }}
                >
                    <div
                        className="left-div bg-white flex items-center justify-center text-black font-semibold text-base flex-shrink-0 h-full"
                        style={{
                            width: "75%",
                            borderRadius: "20px 0 0 20px",
                            marginLeft: "-1px",
                            transition: "border-radius 0.3s ease",
                        }}
                    >
                        Start Your Journey
                    </div>
                    <div
                        className="right-wrapper flex items-center justify-center flex-shrink-0 h-full"
                        style={{
                            width: "25%",
                            padding: "2px 2px 2px 7px",
                            transition: "padding 0.3s ease, margin 0.3s ease",
                        }}
                    >
                        <div
                            className="right-div bg-white flex items-center justify-center w-full h-full"
                            style={{
                                borderRadius: "0 20px 20px 0",
                                transition: "border-radius 0.3s ease",
                            }}
                        >
                            <svg
                                className="arrow-svg"
                                width="18"
                                height="18"
                                viewBox="0 0 14 14"
                                fill="none"
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
        </section>
    );
}