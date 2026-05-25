import React from "react";

interface ProfileStatsProps {
  tripsCount: number;
  followersCount: number;
  followingCount: number;
  isMobile?: boolean;
}

export function ProfileStats({ tripsCount, followersCount, followingCount, isMobile = false }: ProfileStatsProps) {
  if (isMobile) {
    return (
      <div className="flex flex-1 justify-around items-center md:hidden pt-1">
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">{tripsCount}</span>
          <span className="text-gray-400 text-[10px] sm:text-xs font-light">trips</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">{followersCount}</span>
          <span className="text-gray-400 text-[10px] sm:text-xs font-light">followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">{followingCount}</span>
          <span className="text-gray-400 text-[10px] sm:text-xs font-light">following</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center justify-start gap-12 py-1">
      <div className="text-sm md:text-base">
        <span className="font-bold text-gray-900">{tripsCount} </span>
        <span className="text-gray-500 font-light">trips planned</span>
      </div>
      <div className="text-sm md:text-base">
        <span className="font-bold text-gray-900">{followersCount} </span>
        <span className="text-gray-500 font-light">followers</span>
      </div>
      <div className="text-sm md:text-base">
        <span className="font-bold text-gray-900">{followingCount} </span>
        <span className="text-gray-500 font-light">following</span>
      </div>
    </div>
  );
}
