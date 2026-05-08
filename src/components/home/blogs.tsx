// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/blogs/1.jpg";
const img2 = "/blogs/2.jpg";
const img3 = "/blogs/3.jpg";
const img4 = "/blogs/4.jpg";
const img5 = "/blogs/5.jpg";
const img6 = "/blogs/6.jpg";
const img7 = "/blogs/7.jpg";
const img8 = "/blogs/8.jpg";
const img9 = "/blogs/9.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const blogs = [
    {
        img: img1,
        date: "25 Feb 2026",
        title: "Discovering Island Life Beyond Luxury",
    },
    {
        img: img2,
        date: "10 Mar 2026",
        title: "Experiencing Europe Beyond Tourist Routes",
    },
];

export default function Blogs() {
    return (
        <section className="bg-white w-full px-6 md:px-12 lg:px-16 py-16 font-sans">

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-12">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Blogs</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Inspiration And Tips For Your<br />Next Travel Journey
                </h2>
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
                    Explor stories that inspire travel
                </p>
                <div className="flex items-center gap-1">
                    <button className="bg-[#1a3c3c] text-white text-sm font-semibold px-7 py-3 rounded-l-full hover:bg-[#153030] transition-colors">
                        View All
                    </button>
                    <button className="bg-[#1a3c3c] text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#153030] transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}