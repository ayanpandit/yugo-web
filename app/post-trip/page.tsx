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
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Post a New Trip ✈️</h1>
            <p className="text-gray-400 text-sm">Share your journey and find travel partners to join you.</p>
          </div>
          
          {/* AI Planner MVP Button */}
          <Link href="/ai-planner">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:shadow-xl hover:scale-105 transition-all group">
              <Sparkles size={18} className="animate-pulse" />
              <span>AI Trip Planner</span>
              <div className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-[10px] uppercase tracking-wider">MVP</div>
            </button>
          </Link>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
          {[
            { step: 1, label: "Basic Info" },
            { step: 2, label: "Details & Costs" },
            { step: 3, label: "Photos & Tags" }
          ].map((s) => (
            <div key={s.step} className="flex-1 flex items-center gap-3 px-4 py-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                activeStep === s.step ? "bg-green-500 text-white shadow-lg" : "bg-gray-100 text-gray-400"
              )}>
                {s.step}
              </div>
              <span className={cn(
                "text-sm font-medium",
                activeStep === s.step ? "text-gray-800" : "text-gray-400"
              )}>{s.label}</span>
              {s.step < 3 && <ChevronRight size={16} className="text-gray-200 ml-auto" />}
            </div>
          ))}
        </div>

        {/* Main Form Area */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-50 space-y-10">
          
          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Trip Title</label>
              <input 
                type="text" 
                placeholder="e.g. Summer Backpacking in Europe" 
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Select dates" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Group Size</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="number" 
                  placeholder="How many partners?" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Trip Description</label>
            <textarea 
              rows={5}
              placeholder="Tell others about your plan, what to expect, and what kind of travel partners you're looking for..." 
              className="w-full bg-gray-50 border-none rounded-3xl p-6 text-sm outline-none focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
            ></textarea>
          </div>

          {/* Photo Upload Area */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Cover Photo</label>
            <div className="w-full h-48 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 hover:border-green-300 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-green-500 group-hover:scale-110 transition-all">
                <Camera size={24} />
              </div>
              <p className="text-xs text-gray-400 font-medium">Click to upload or drag and drop</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
               <Info size={14} />
               <span>You can edit this later after posting</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-8 py-3 text-gray-400 font-bold hover:text-gray-600 transition-colors">Save Draft</button>
              <button className="px-10 py-3 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all">
                Post Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
