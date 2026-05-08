// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/vibe/1.jpg";
const img2 = "/vibe/2.jpg";
const img3 = "/vibe/3.jpg";
const img4 = "/vibe/4.jpg";
const img5 = "/vibe/5.jpg";
const img6 = "/vibe/6.jpg";
const img7 = "/vibe/7.jpg";
const img8 = "/vibe/8.jpg";
const img9 = "/vibe/9.jpg";
// ──────────────────────────────────────────────────────────────────────────────

// Gallery images — add / reorder as needed
const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export default function VibeGallery() {
    return (
        <section className="bg-white w-full py-16 font-sans overflow-hidden">

            <style>{`
        @keyframes scrollGallery {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-track {
          animation: scrollGallery 30s linear infinite;
        }
        .gallery-track:hover {
          animation-play-state: paused;
        }
      `}</style>

            {/* ── Header ──────────────────────────────────────────────────────────── */}
            <div className="flex flex-col items-center text-center gap-3 mb-12 px-6">
                <div className="flex items-center gap-2 text-[#1a3c3c] text-sm font-semibold tracking-wide">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <span>Vibe with Us</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0d2b2b] leading-tight max-w-2xl">
                    Real Travel Stories From Around<br />The World
                </h2>
            </div>

            {/* ── Scrolling strip ─────────────────────────────────────────────────── */}
            {/*
        The track is doubled (images × 2) so the loop is seamless.
        translateX(-50%) brings it back to the start position after one loop.
      */}
            <div className="relative w-full">
                {/* Left/right edge fades */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="gallery-track flex gap-4 w-max">
                    {[...galleryImages, ...galleryImages].map((src, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 rounded-2xl overflow-hidden ${i % 3 === 1 ? "w-56 h-80" : "w-52 h-72"
                                } hover:scale-[1.03] transition-transform duration-500`}
                        >
                            <img
                                src={src}
                                alt={`Travel story ${(i % galleryImages.length) + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer row ──────────────────────────────────────────────────────── */}
            <div className="max-w-[1300px] mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6 px-6 md:px-12 lg:px-16">
                <p className="text-[#0d2b2b] text-sm font-medium">
                    Tag <span className="font-bold">#VibeWithTravellio</span> to get featured.
                </p>
                <div className="flex items-center gap-1">
                    <button className="bg-[#1a3c3c] text-white text-sm font-semibold px-7 py-3 rounded-l-full hover:bg-[#153030] transition-colors">
                        View Gallery
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