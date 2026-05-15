"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { MapPin, Calendar, Users, Camera, Sparkles, ChevronRight, Info } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

export default function PostTripPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Post a New Trip ✈️</h1>
            <p className="text-gray-400 text-xs md:text-sm">Share your journey and find travel partners to join you.</p>
          </div>
          
          <Link href="/ai-planner" className="w-full md:w-auto">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:shadow-xl hover:scale-[1.02] transition-all group">
              <Sparkles size={18} className="animate-pulse" />
              <span>AI Trip Planner</span>
              <div className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-[10px] uppercase tracking-wider">MVP</div>
            </button>
          </Link>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 md:gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-50 overflow-x-auto no-scrollbar">
          {[
            { step: 1, label: "Basic" },
            { step: 2, label: "Details" },
            { step: 3, label: "Photos" }
          ].map((s) => (
            <div key={s.step} className="flex-1 min-w-[100px] flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 shrink-0">
              <div className={cn(
                "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-sm transition-all shrink-0",
                activeStep === s.step ? "bg-green-500 text-white shadow-lg" : "bg-gray-100 text-gray-400"
              )}>
                {s.step}
              </div>
              <span className={cn(
                "text-[10px] md:text-sm font-medium",
                activeStep === s.step ? "text-gray-800" : "text-gray-400"
              )}>{s.label}</span>
              {s.step < 3 && <ChevronRight size={14} className="text-gray-200 ml-auto" />}
            </div>
          ))}
        </div>

        {/* Main Form Area */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-50 space-y-6 md:space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Trip Title</label>
              <input 
                type="text" 
                placeholder="e.g. Summer Backpacking" 
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-10 md:pl-12 pr-4 py-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="text" 
                  placeholder="Select dates" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-10 md:pl-12 pr-4 py-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Group Size</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  type="number" 
                  placeholder="How many partners?" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-10 md:pl-12 pr-4 py-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs md:text-sm font-bold text-gray-700 ml-1">Trip Description</label>
            <textarea 
              rows={4}
              placeholder="Tell others about your plan..." 
              className="w-full bg-gray-50 border-none rounded-3xl p-4 md:p-6 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-4">
            <label className="text-xs md:text-sm font-bold text-gray-700 ml-1 text-center block">Cover Photo</label>
            <div className="w-full h-40 md:h-48 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 hover:border-green-300 transition-all cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all">
                <Camera size={20} />
              </div>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">Click to upload or drag and drop</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-50 gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs text-center md:text-left">
               <Info size={14} className="shrink-0" />
               <span>You can edit this later after posting</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-6 md:px-8 py-3 text-gray-400 font-bold text-xs md:text-sm hover:text-gray-600 transition-colors">Draft</button>
              <button className="flex-[2] md:flex-none px-8 md:px-10 py-3 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all text-xs md:text-sm">
                Post Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
