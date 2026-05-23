"use client";

import React from "react";
import { MapPin, Calendar, ChevronRight, Star, Heart } from "lucide-react";
import { FeedTrip } from "../../types/feed";
import { cn } from "@/app/lib/utils";

interface FeedCardProps {
  trip: FeedTrip;
  onViewDetails?: (tripId: string) => void;
}

export default function FeedCard({ trip, onViewDetails }: FeedCardProps) {
  // Safe UI fallbacks for null/missing fields (Rule 4)
  const coverImage = trip.coverImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600";
  const destination = trip.destination || "Scenic Destination";
  const tripType = trip.tripType || "Leisure";
  const totalDays = trip.totalDays ? `${trip.totalDays} Days` : "Multi-Day";
  const experienceType = trip.experienceType || "Unspecified";
  const perPersonCost = trip.perPersonCost
    ? `₹${trip.perPersonCost.toLocaleString()}`
    : "Price on Request";

  const creatorUsername = trip.creator.username || "Anonymous Traveler";
  const creatorAvatar = trip.creator.image ? (
    <img
      src={trip.creator.image}
      alt={creatorUsername}
      className="w-full h-full object-cover rounded-full"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 uppercase text-[10px]">
      {creatorUsername.charAt(0)}
    </div>
  );

  return (
    <div className="group relative bg-white rounded-[32px] p-4 shadow-sm border border-gray-50 hover:shadow-xl transition-all cursor-pointer overflow-hidden min-h-[420px] flex flex-col justify-between">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 md:h-52 rounded-2xl overflow-hidden mb-4">
          <img
            src={coverImage}
            alt={destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy" // Optimized image rendering (Rule 13)
          />
          <button className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 hover:bg-white hover:text-red-500 transition-all">
            <Heart size={18} />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[8px] md:text-[9px] text-white font-bold uppercase tracking-wider border border-white/20">
              {tripType}
            </span>
            <span className="px-2.5 py-1 bg-green-500/80 backdrop-blur-md rounded-lg text-[8px] md:text-[9px] text-white font-bold uppercase tracking-wider">
              {experienceType}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                {creatorAvatar}
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-gray-800">@{creatorUsername}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded-lg">
              <Star className="text-yellow-400 fill-yellow-400" size={10} />
              <span>4.9</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight group-hover:text-green-500 transition-colors line-clamp-2">
            {destination}
          </h3>

          <div className="flex flex-col gap-1 md:gap-1.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] md:text-[11px]">
              <MapPin size={12} className="text-gray-300" />
              <span className="truncate">{destination}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] md:text-[11px]">
              <Calendar size={12} className="text-gray-300" />
              <span>{totalDays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-1 pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
        <div className="flex flex-col">
          <span className="text-green-500 font-bold text-base md:text-lg">
            {perPersonCost}
          </span>
          <span className="text-gray-300 text-[9px] md:text-[10px] font-medium -mt-1">Estimated Cost</span>
        </div>
        <button
          onClick={() => onViewDetails?.(trip.tripId)}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all bg-green-50 text-green-500 border border-green-50 hover:bg-green-500 hover:text-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
