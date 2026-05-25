"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ChevronRight, Star, Heart, X, Loader2 } from "lucide-react";
import { FeedTrip, TripLiker } from "../../types/feed";
import { cn, timeAgo } from "@/app/lib/utils";
import { likeService } from "../../services/like.service";

interface FeedCardProps {
  trip: FeedTrip;
  onViewDetails?: (tripId: string) => void;
  onToggleLike?: (tripId: string) => void;
}
export default function FeedCard({ trip, onViewDetails, onToggleLike }: FeedCardProps) {
  const [showLikesOverlay, setShowLikesOverlay] = useState(false);
  const [likers, setLikers] = useState<TripLiker[]>([]);
  const [isLoadingLikers, setIsLoadingLikers] = useState(false);
  const router = useRouter();

  const handleShowLikes = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLikesOverlay(true);
    setIsLoadingLikers(true);
    try {
      const res = await likeService.getTripLikes(trip.tripId);
      setLikers(res.data);
    } catch (err) {
      console.error("Failed to fetch likers");
    } finally {
      setIsLoadingLikers(false);
    }
  };
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
    <div 
      onClick={() => onViewDetails?.(trip.tripId)}
      className="group relative bg-white rounded-[32px] p-4 shadow-sm border border-gray-50 hover:shadow-xl transition-all cursor-pointer overflow-hidden min-h-[420px] flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 md:h-52 rounded-2xl overflow-hidden mb-4">
          <img
            src={coverImage}
            alt={destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy" // Optimized image rendering (Rule 13)
          />
          <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike?.(trip.tripId);
              }}
              className="w-9 h-9 md:w-10 md:h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 hover:bg-white hover:text-red-500 transition-all shadow-sm"
            >
              <Heart 
                size={18} 
                className={cn(
                  "transition-all duration-300", 
                  trip.isLiked ? "fill-red-500 text-red-500 scale-110" : "fill-transparent"
                )} 
              />
            </button>
            {trip.likesCount > 0 && (
              <button 
                onClick={handleShowLikes}
                className="text-white text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
              >
                {trip.likesCount}
              </button>
            )}
          </div>
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
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/profile/${creatorUsername}`);
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
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

      {/* Instagram-style Slide-Up Likes Overlay */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[65%] bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 flex flex-col transition-transform duration-300 ease-out z-20",
          showLikesOverlay ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/50 shrink-0">
          <h4 className="font-bold text-gray-800">Liked by</h4>
          <button 
            onClick={() => setShowLikesOverlay(false)}
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Likers List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          {isLoadingLikers ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-green-500" size={24} />
            </div>
          ) : likers.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-10">
              No one has liked this yet.
            </div>
          ) : (
            likers.map((liker) => (
              <div key={liker.user.id} className="flex items-center justify-between">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/${liker.user.username}`);
                  }}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-50 shrink-0 flex items-center justify-center">
                    {liker.user.image ? (
                      <img src={liker.user.image} alt={liker.user.username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-400 text-xs uppercase">{liker.user.username.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 leading-tight">
                      {liker.user.username}
                    </span>
                    {liker.user.name && (
                      <span className="text-xs text-gray-400">{liker.user.name}</span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-gray-300 font-medium shrink-0">
                  {timeAgo(liker.likedAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
