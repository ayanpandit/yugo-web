import TourPackages from "@/components/home/tours";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tours & Packages — YouGO",
    description: "Curated budget-friendly international tours. Real trips, realistic budgets, unforgettable experiences.",
};

export default function ToursPage() {
    return (
        <div className="pt-32 min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <p className="text-sm font-semibold tracking-widest uppercase text-[#8CB45C] mb-4">Tours & Packages</p>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0d2b2b] tracking-tight font-serif mb-6 leading-tight">
                    Explore the World<br />Without Breaking the Bank
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Handpicked international destinations at realistic budgets. Every package is crafted for the modern Indian traveler who wants more for less.
                </p>
            </div>
            <TourPackages />
        </div>
    );
}
