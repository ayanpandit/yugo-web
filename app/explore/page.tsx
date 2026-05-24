"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Search, Filter, Calendar, Users, RefreshCw } from "lucide-react";
import { useFeedStore } from "../store/feed.store";
import FeedCard from "../components/feed/feed-card";
import FeedSkeleton from "../components/feed/feed-skeleton";

export default function ExplorePage() {
  const router = useRouter();
  const { trips, loading, error, fetchFeed } = useFeedStore();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleViewDetails = (tripId: string) => {
    // Navigate to the AI planner details view (decoupled detail view - Rule 6, 16)
    router.push(`/ai-planner?id=${tripId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="pl-16">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Explore Trips 🔭</h1>
            <p className="text-gray-400 text-xs md:text-sm">Browse and join upcoming trips posted by fellow travelers.</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 md:gap-4 bg-white p-2 md:p-2 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-100">
              <Search className="text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent border-none outline-none text-xs md:text-sm placeholder:text-gray-300"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-100">
              <Calendar className="text-gray-400" size={16} />
              <span className="text-xs md:text-sm text-gray-400 cursor-pointer">Any Date</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2">
              <Users className="text-gray-400" size={16} />
              <span className="text-xs md:text-sm text-gray-400 cursor-pointer">Travelers</span>
            </div>
            <button className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-green-100 hover:bg-green-600 transition-colors">
              Find Trips
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-800 text-white rounded-full text-xs md:text-sm font-medium shrink-0">
              <Filter size={12} /> All Filters
            </button>
            {["Beaches", "Mountains", "City Breaks", "Adventure", "Foodie", "Budget"].map((tag, i) => (
              <button key={i} className="px-4 md:px-5 py-2 bg-white border border-gray-100 rounded-full text-xs md:text-sm text-gray-500 hover:border-green-500 hover:text-green-500 transition-all shrink-0">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Feed View */}
        {loading ? (
          <FeedSkeleton />
        ) : error ? (
          // Rich aesthetic Retry State (Rule 8)
          <div className="bg-white rounded-[32px] border border-gray-50 p-8 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-500">
              ⚠️
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Unable to load feed</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{error}</p>
            <button
              onClick={() => fetchFeed()}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-green-100 transition-all"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Retry Connection
            </button>
          </div>
        ) : trips.length === 0 ? (
          // Elegant Empty State (Rule 8)
          <div className="bg-white rounded-[32px] border border-gray-50 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="text-4xl">🗺️</div>
            <h3 className="font-bold text-gray-800 text-lg">No trips generated yet</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Be the pioneer traveler! Use the AI Planner to generate your first custom expedition, and it will automatically list on this discovery feed.
            </p>
            <button
              onClick={() => router.push("/post-trip")}
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-green-100 transition-all"
            >
              Plan with AI 🚀
            </button>
          </div>
        ) : (
          // Premium social feed grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <FeedCard
                key={trip.tripId} // Strict unique react keys (Rule 7)
                trip={trip}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

