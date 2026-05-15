"use client";

import React from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Heart, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-10">
        {/* Discover World Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Discover World <span className="text-xl">🌈</span>
            </h2>
            <div className="flex gap-4 md:gap-8 text-xs md:text-[15px] overflow-x-auto no-scrollbar pb-2 md:pb-0">
              <button className="text-green-500 font-bold whitespace-nowrap relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-green-500">Popular Places</button>
              <button className="text-gray-400 font-medium whitespace-nowrap hover:text-gray-600">Recommended</button>
              <button className="text-gray-400 font-medium whitespace-nowrap hover:text-gray-600">Near Me</button>
            </div>
            <button className="hidden md:flex items-center gap-1 text-green-500 text-sm font-semibold hover:gap-2 transition-all">
              View all <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Mt. Merbabu", location: "Semarang, Indonesia", price: 450, img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600" },
              { title: "Mt. Mandala", location: "Papua, Indonesia", price: 570, img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600" },
              { title: "Mt. Semeru", location: "Malang, Indonesia", price: 690, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" }
            ].map((place, i) => (
              <div key={i} className="group relative bg-white rounded-[32px] p-4 shadow-sm border border-gray-50 hover:shadow-xl transition-all cursor-pointer overflow-hidden h-[340px]">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <img src={place.img} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 hover:bg-white hover:text-red-500 transition-all">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="px-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{place.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                    <MapPin size={12} className="text-gray-300" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-green-500 font-bold">
                      ${place.price}<span className="text-gray-300 text-xs font-medium ml-1">/day</span>
                    </div>
                    <button className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      i === 0 ? "bg-green-500 text-white shadow-lg shadow-green-100" : "bg-green-50 text-green-500 border border-green-100 hover:bg-green-500 hover:text-white"
                    )}>
                      <Heart size={18} fill={i === 0 ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Dates Section */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Event Dates <span className="text-xl">🚀</span>
            </h2>
            <button className="flex items-center gap-1 text-green-500 text-sm font-semibold hover:gap-2 transition-all">
              View all <ChevronRight size={16} />
            </button>
          </div>

          {/* Calendar Strip */}
          <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm mb-6 md:mb-10 overflow-x-auto no-scrollbar gap-4">
            {[
              { d: "Sun", n: 12 }, { d: "Mon", n: 13 }, { d: "Tue", n: 14, active: true },
              { d: "Wed", n: 15 }, { d: "Thu", n: 16 }, { d: "Fri", n: 17 },
              { d: "Sat", n: 18 }, { d: "Sun", n: 19 }, { d: "Mon", n: 20 },
              { d: "Tue", n: 21, active: true }
            ].map((day, i) => (
              <div key={i} className={cn(
                "flex flex-col items-center gap-2 min-w-[50px] py-2 rounded-xl transition-all cursor-pointer",
                day.active ? "bg-green-500 text-white shadow-lg shadow-green-100 scale-110" : "text-gray-400 hover:bg-gray-50"
              )}>
                <span className="text-[10px] uppercase font-bold tracking-wider">{day.d}</span>
                <span className="text-[15px] font-bold">{day.n}</span>
              </div>
            ))}
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Mt. Kerinci", location: "Jambi, Indonesia", price: 320, active: true },
              { title: "Mt. Slamet", location: "Tegal, Indonesia", price: 560 },
              { title: "Mt. Latuk", location: "Kalimantan, Indonesia", price: 440 },
              { title: "Mt. Cereme", location: "Majalengka, Indonesia", price: 680 }
            ].map((event, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 md:p-5 flex items-center gap-4 md:gap-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                   <img src={`https://images.unsplash.com/photo-${1501785888041 + i}?auto=format&fit=crop&q=80&w=200`} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <h4 className="text-gray-800 font-bold text-sm md:text-[15px] mb-1 truncate">{event.title}</h4>
                   <p className="text-gray-400 text-[10px] md:text-xs mb-2 md:mb-3 truncate">{event.location}</p>
                   <div className="text-green-500 font-bold text-sm">
                      ${event.price}<span className="text-gray-300 text-[10px] font-medium ml-1">/day</span>
                   </div>
                </div>
                <button className={cn(
                   "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all",
                   event.active ? "bg-green-500 text-white shadow-lg shadow-green-100" : "bg-green-50 text-green-500 border border-green-50"
                )}>
                   <Heart size={14} fill={event.active ? "currentColor" : "none"} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
