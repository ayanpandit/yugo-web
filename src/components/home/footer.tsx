// ─── Asset Imports ────────────────────────────────────────────────────────────
const img1 = "/footer/1.jpg";
const img2 = "/footer/2.jpg";
const img3 = "/footer/3.jpg";
const img4 = "/footer/4.jpg";
const img5 = "/footer/5.jpg";
const img6 = "/footer/6.jpg";
const img7 = "/footer/7.jpg";
const img8 = "/footer/8.jpg";
const img9 = "/footer/9.jpg";
// ──────────────────────────────────────────────────────────────────────────────

const services = [
    { icon: "🌿", label: "Luxury & Budget Travel" },
    { icon: "🛂", label: "Visa Assistance" },
    { icon: "🏨", label: "Hotel Bookings" },
    { icon: "🚗", label: "Transfers & Rentals" },
    { icon: "✈️", label: "Custom Tours" },
    { icon: "🌍", label: "Worldwide Destinations" },
];

const footerLinks = {
    Pages: ["Home", "About", "Tours", "Book a Trip"],
    Documentation: ["Blogs", "Privacy Policy", "Terms & Conditions"],
    "Other Pages": ["404"],
};

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

export default function Footer() {
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
            <div className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>
                {/* Background */}
                <img src={img1} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-36"
                    style={{ minHeight: "520px" }}>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-xl">
                        Turn Your Travel<br />Dreams Into Reality
                    </h2>
                    <p className="text-white/65 text-base mt-4 max-w-md">
                        From the first idea to the final detail, we design journeys you'll remember forever.
                    </p>
                    <div className="flex items-center gap-1 mt-8">
                        <button className="bg-white text-[#0d2b2b] font-semibold text-sm px-7 py-3 rounded-l-full hover:bg-gray-100 transition-colors">
                            Book a trip
                        </button>
                        <button className="bg-white text-[#0d2b2b] w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </button>
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
                                    <li key={link}>
                                        <a href="#" className="text-white text-sm font-medium hover:text-white/60 transition-colors">
                                            {link}
                                        </a>
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
                    <p className="text-white/40 text-xs">All rights reserved for @Traavellio</p>
                    <p className="text-white/40 text-xs">Designed by Jitu Raut @fremix.design</p>
                </div>
            </div>
        </footer>
    );
}