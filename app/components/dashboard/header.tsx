"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, SlidersHorizontal, User } from "lucide-react";
import { useAuth } from "@/app/components/providers/auth-provider";

export default function Header() {
  const { user } = useAuth();
  
  // Create a display name (fallback to Guest)
  const displayName = user?.name || user?.username || "Guest";
  const firstName = displayName.split(" ")[0];

  return (
    <header className="relative z-50">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-[#f8fafb] gap-4 md:gap-6">
        <div className="flex-1 w-full max-w-xl md:pl-0 pl-12 lg:pl-0">
          <div className="flex flex-col mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              Hello, {firstName}! <span className="text-xl">🤙</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm">Welcome back and explore the world</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search Destination"
                className="w-full bg-white border-none rounded-xl py-3 md:py-3.5 pl-10 md:pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-green-500/20 outline-none text-xs md:text-sm placeholder:text-gray-300"
              />
            </div>
            <button className="p-3 md:p-3.5 bg-green-500 rounded-xl text-white shadow-lg shadow-green-100 hover:bg-green-600 transition-colors">
              <SlidersHorizontal size={16} />
            </button>
            <button className="hidden sm:block px-6 md:px-8 py-3 md:py-3.5 bg-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-100 hover:bg-green-600 transition-colors text-sm md:text-base">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 self-end md:self-start mt-0 md:mt-2">
          <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center relative shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-2.5 md:top-3 right-2.5 md:right-3 w-3.5 h-3.5 md:w-4 md:h-4 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center text-[7px] md:text-[8px] text-white font-bold">
              1
            </span>
          </button>
          
          <Link 
            href="/profile"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-50 text-gray-600 shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            <User size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
