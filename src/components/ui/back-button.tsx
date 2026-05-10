"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackButton() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything on the server to prevent hydration mismatch
    // and don't render on the home page
    if (!mounted || pathname === "/") {
        return null;
    }

    return (
        <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
            <Link 
                href="/"
                className="group flex items-center gap-2 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white px-5 py-3 rounded-full transition-all duration-300 shadow-xl border border-white/10 hover:border-white/30"
            >
                <svg 
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-semibold text-sm tracking-wide">Back to Home</span>
            </Link>
        </div>
    );
}
