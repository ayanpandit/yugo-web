"use client";

import React, { useState } from "react";
import { Search, Bell, SlidersHorizontal, User, X, LogOut, Settings, Heart, Ticket } from "lucide-react";
import { MOCK_USER } from "@/app/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-[#f8fafb] gap-4 md:gap-6">
        <div className="flex-1 w-full max-w-xl md:pl-0 pl-12 lg:pl-0">
          <div className="flex flex-col mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              Hello, {MOCK_USER.name.split(" ")[0]}! <span className="text-xl">🤙</span>
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
          
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all border-2",
              isProfileOpen ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-50 text-gray-600 shadow-sm hover:bg-gray-50"
            )}
          >
            {isProfileOpen ? <X size={18} /> : <User size={18} />}
          </button>
        </div>
      </div>

      {/* Profile Slide-down Drawer */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40"
            />
            
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-full right-4 md:right-8 w-[calc(100vw-32px)] sm:w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="bg-[#8ec7db] p-6 md:p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-full bg-[url('/bg-clouds.png')] bg-cover opacity-60" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 p-1 mx-auto mb-4">
                    <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-md overflow-hidden flex items-center justify-center text-2xl md:text-3xl">
                      🧑‍💻
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg">{MOCK_USER.name}</h3>
                  <p className="text-white/80 text-[10px] md:text-xs">{MOCK_USER.title}</p>
                </div>
              </div>

              <div className="p-4 md:p-6 space-y-1">
                {[
                  { icon: User, label: "My Profile", color: "text-blue-500" },
                  { icon: Ticket, label: "My Bookings", color: "text-green-500" },
                  { icon: Heart, label: "Favorites", color: "text-red-500" },
                  { icon: Settings, label: "Account Settings", color: "text-gray-500" },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                    <item.icon size={16} className={cn(item.color, "transition-transform group-hover:scale-110")} />
                    <span className="text-xs md:text-sm font-medium text-gray-700">{item.label}</span>
                  </button>
                ))}
                
                <div className="my-2 border-t border-gray-50" />
                
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group text-left">
                  <LogOut size={16} className="text-red-500 transition-transform group-hover:scale-110" />
                  <span className="text-xs md:text-sm font-medium text-red-600">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
