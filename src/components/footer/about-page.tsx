import AboutUs from "@/components/home/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About YouGO — Our Story",
    description: "Discover how YouGO is redefining travel with authentic experiences, AI-powered planning, and a community of passionate explorers.",
};

export default function AboutPage() {
    return (
        <div className="pt-32 min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">Our Story</p>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-6 leading-tight">
                    Built for People Who<br />Actually Want to Travel
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    YouGO was born from a single frustration — the moment your friends cancel again.
                    We built a platform so that trip is never cancelled. Not because of us. Because of you.
                </p>
            </div>
            <AboutUs />
        </div>
    );
}
