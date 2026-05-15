"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Sparkles, MapPin, Calendar, Clock, Send, Bot, Wand2, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function AIPlannerPage() {
  const [query, setQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10 pb-12">
        {/* Hero Header - Updated to Green Theme */}
        <div className="relative rounded-[40px] bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-12 overflow-hidden shadow-2xl shadow-green-100">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
               <Sparkles size={14} className="animate-pulse text-yellow-300" />
               AI Powered Assistant
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Where would you like to go next?
            </h1>
            <p className="text-green-50 text-lg opacity-90 leading-relaxed mb-8">
              Our AI travel planner will generate a personalized itinerary, suggest the best times to visit, and estimate your total costs in seconds.
            </p>
            
            {/* Input Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-[28px] border border-white/30 group-focus-within:bg-white/30 transition-all" />
              <div className="relative flex items-center p-2">
                <div className="pl-6 text-white/50">
                   <Bot size={24} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything: 'Plan a 5-day food trip in Tokyo'..." 
                  className="flex-1 bg-transparent border-none outline-none py-4 px-6 text-white placeholder:text-white/40 font-medium"
                />
                <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                   Generate Plan <Wand2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Smart Locations", desc: "AI-curated spots based on your interests.", color: "bg-green-50 text-green-600" },
            { icon: Clock, title: "Optimized Routes", desc: "Save time with the best travel sequences.", color: "bg-emerald-50 text-emerald-600" },
            { icon: Sparkles, title: "Local Secrets", desc: "Hidden gems not found in guidebooks.", color: "bg-teal-50 text-teal-600" }
          ].map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", f.color)}>
                <f.icon size={24} />
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for results */}
        <div className="border-2 border-dashed border-green-100 rounded-[40px] p-20 flex flex-col items-center justify-center text-center bg-green-50/20">
           <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-3xl mb-6">
             🤖
           </div>
           <h3 className="text-xl font-bold text-green-800 mb-2">Ready to plan?</h3>
           <p className="text-gray-400 max-w-sm mx-auto">
             Enter your dream destination above and let our AI craft the perfect adventure for you.
           </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
