"use client";

import React, { useState } from "react";
import { Search, Bell, SlidersHorizontal, User, X, ArrowLeft, Mail, Shield, MapPin, Calendar } from "lucide-react";
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
            onClick={() => setIsProfileOpen(true)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-50 text-gray-600 shadow-sm hover:bg-gray-50 transition-all"
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Full-screen Profile Overlay */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            {/* Header / Back Button */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100">
                  <ArrowLeft size={20} />
                </div>
                <span className="font-bold">Back to Dashboard</span>
              </button>
              <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider">
                 Verified Profile
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="max-w-3xl mx-auto px-6 py-12">
                
                {/* Profile Visual */}
                <div className="flex flex-col items-center text-center mb-16">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-green-50 p-1">
                      <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-5xl md:text-6xl border-4 border-white shadow-xl">
                         🧑‍💻
                      </div>
                    </div>
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 text-white rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                       <User size={18} />
                    </button>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">{MOCK_USER.name}</h2>
                  <p className="text-green-500 font-bold uppercase tracking-widest text-sm">{MOCK_USER.title}</p>
                </div>

                {/* Account Details Card */}
                <div className="bg-[#f8fafb] rounded-[40px] p-8 md:p-12 space-y-10 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                         <User size={16} />
                         <span className="text-xs font-bold uppercase tracking-wider">Full Name</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{MOCK_USER.name}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                         <Mail size={16} />
                         <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">raffialdo.bayu@yougo.com</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                         <MapPin size={16} />
                         <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">Semarang, Indonesia</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                         <Shield size={16} />
                         <span className="text-xs font-bold uppercase tracking-wider">Member Since</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">March 2024</p>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-4">
                    <button className="w-full sm:flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all">
                      Edit Personal Info
                    </button>
                    <button className="w-full sm:flex-1 bg-white text-red-500 border-2 border-red-50 py-4 rounded-2xl font-bold hover:bg-red-50 transition-all">
                      Sign Out Account
                    </button>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-gray-400 text-xs">
                    Managing your YouGO account information. Need help? <span className="text-green-500 font-bold underline cursor-pointer">Contact Support</span>
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
