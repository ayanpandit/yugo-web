// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/tours/1.jpg";
const img2 = "/tours/2.jpg";
const img3 = "/tours/3.jpg";
const img4 = "/tours/4.jpg";
const img5 = "/tours/5.jpg";
const img6 = "/tours/6.jpg";
const img7 = "/tours/7.jpg";
const img8 = "/tours/8.jpg";
const img9 = "/tours/9.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const packages = [
    {
        img: img1,
        duration: "8 Days / 7 Nights",
        title: "Morocco Desert Journey",
        price: "1,600",
    },
    {
        img: img2,
        duration: "7 Days / 6 Nights",
        title: "Italy Classic",
        price: "1,400",
    },
    {
        img: img3,
        duration: "8 Days / 7 Nights",
        title: "Africa Experience",
        price: "2,200",
    },
    {
        img: img4,
        duration: "7 Days / 6 Nights",
        title: "Japan Spring",
        price: "1,200",
    },
];

export default function TourPackages() {
    return (
        <section className="bg-white w-full px-6 md:px-12 lg:px-16 py-14 font-sans">

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center mb-12 gap-3">

                {/* Label */}
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    {/* Mountain icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 20 L8 10 L12 16 L16 8 L21 20 Z" />
                    </svg>
                    <span>Handcrafted Tour Packages</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Journeys Designed For Every<br />Travel Style
                </h2>
            </div>

            {/* ── Cards ───────────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
                {packages.map(({ img, duration, title, price }, i) => (
                    <div key={i} className="flex flex-col gap-4 group cursor-pointer">

                        {/* Image + badge */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Duration badge */}
                            <div className="absolute top-4 left-4">
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
                                From ${" "}
                                <span className="text-[#0d2b2b] font-bold text-base">${price}</span>
                                {" "}/ Per Person
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
                <div className="flex items-center gap-1">
                    <button className="bg-[#1a3c3c] text-white text-sm font-semibold px-7 py-3 rounded-l-full hover:bg-[#153030] transition-colors">
                        View Packages
                    </button>
                    <button className="bg-[#1a3c3c] text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#153030] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}