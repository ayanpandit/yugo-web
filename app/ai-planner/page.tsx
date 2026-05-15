"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Sparkles, MapPin, Calendar, Clock, Send, Bot, Wand2, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function AIPlannerPage() {
  const [query, setQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-10 pb-12">
        {/* Hero Header */}
        <div className="relative rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-6 md:p-12 overflow-hidden shadow-2xl shadow-green-100">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-green-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 border border-white/30">
               <Sparkles size={12} className="animate-pulse text-yellow-300" />
               AI Powered Assistant
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 leading-tight">
              Where would you like to go next?
            </h1>
            <p className="text-green-50 text-sm md:text-lg opacity-90 leading-relaxed mb-6 md:mb-8">
              Our AI travel planner will generate a personalized itinerary, suggest the best times to visit, and estimate your total costs in seconds.
            </p>
            
            {/* Input Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-[28px] border border-white/30 group-focus-within:bg-white/30 transition-all" />
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-2 gap-2">
                <div className="hidden sm:flex pl-4 text-white/50">
                   <Bot size={24} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything: '5 days in Tokyo'..." 
                  className="flex-1 bg-transparent border-none outline-none py-3 md:py-4 px-4 sm:px-6 text-white placeholder:text-white/40 font-medium text-sm md:text-base"
                />
                <button className="bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                   <span>Generate</span> <Wand2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: MapPin, title: "Smart Locations", desc: "AI-curated spots based on your interests.", color: "bg-green-50 text-green-600" },
            { icon: Clock, title: "Optimized Routes", desc: "Save time with the best sequences.", color: "bg-emerald-50 text-emerald-600" },
            { icon: Sparkles, title: "Local Secrets", desc: "Hidden gems not in guidebooks.", color: "bg-teal-50 text-teal-600" }
          ].map((f, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group">
              <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform group-hover:scale-110", f.color)}>
                <f.icon size={20} />
              </div>
              <h3 className="text-gray-800 font-bold text-base md:text-lg mb-1 md:mb-2">{f.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for results */}
        <div className="border-2 border-dashed border-green-100 rounded-[32px] md:rounded-[40px] p-10 md:p-20 flex flex-col items-center justify-center text-center bg-green-50/20">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6">
             🤖
           </div>
           <h3 className="text-lg md:text-xl font-bold text-green-800 mb-1 md:mb-2">Ready to plan?</h3>
           <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto px-4">
             Enter your dream destination above and let our AI craft the perfect adventure for you.
           </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
