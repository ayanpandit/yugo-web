import Blogs from "@/components/home/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Travel Journal — YouGO",
    description: "Real travel stories, smart tips, hidden gems, and inspiration for your next journey.",
};

export default function BlogsPage() {
    return (
        <div className="pt-32 min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">Travel Journal</p>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-6 leading-tight">
                    Stories That Make You<br />Want to Pack Instantly
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Real experiences, honest travel tips, hidden gems, and raw inspiration from a community of people who actually went.
                </p>
            </div>
            <Blogs />
        </div>
    );
}
