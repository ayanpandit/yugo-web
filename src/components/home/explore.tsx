// ─── Asset Imports ───────────────────────────────────────────────────────────
const img1 = "/explore/1.jpg";
const img2 = "/explore/1.jpg";
const img3 = "/explore/1.jpg";
const img4 = "/explore/1.jpg";
const img5 = "/explore/1.jpg";
const img6 = "/explore/1.jpg";
const img7 = "/explore/1.jpg";
const img8 = "/explore/1.jpg";
const img9 = "/explore/1.jpg";
// ─────────────────────────────────────────────────────────────────────────────

const experiences = [
    {
        img: img1,
        title: "Travel to the Future",
        desc: "A city of luxury and innovation, where tomorrow comes alive.",
        imageFirst: true, // image on top, text below
    },
    {
        img: img2,
        title: "Travel Into Nature",
        desc: "Stunning landscapes and pure alpine beauty of the nature.",
        imageFirst: false, // text on top, image below
    },
    {
        img: img3,
        title: "Travel Through Culture",
        desc: "A blend of traditions, colors, heritage and spices.",
        imageFirst: true,
    },
    {
        img: img4,
        title: "Travel Back in Time",
        desc: "Explore ancient wonders, monuments & stories in stone.",
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
                    <span>Explore by Experience</span>
                </div>

                {/* Main heading */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Experience Diverse Worlds On One Planet
                </h2>
            </div>

            {/* ── Cards grid ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1400px] mx-auto">
                {experiences.map(({ img, title, desc, imageFirst }, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        {imageFirst ? (
                            <>
                                {/* Image top */}
                                <div className="rounded-2xl overflow-hidden flex-shrink-0 aspect-[3/4]">
                                    <img
                                        src={img}
                                        alt={title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                                <div className="rounded-2xl overflow-hidden flex-shrink-0 aspect-[3/4]">
                                    <img
                                        src={img}
                                        alt={title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1400px] mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <p className="text-[#0d2b2b] text-sm font-medium">
                    Explore more journeys waiting for you
                </p>
                <div className="flex items-center gap-1">
                    <button className="bg-[#1a3c3c] text-white text-sm font-semibold px-7 py-3 rounded-l-full hover:bg-[#153030] transition-colors">
                        View Packages
                    </button>
                    <button className="bg-[#1a3c3c] text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#153030] transition-colors">
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}