"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Search, Filter, MapPin, Calendar, Users, ChevronRight, Star, Heart } from "lucide-react";
import { cn } from "@/app/lib/utils";

export default function ExplorePage() {
  const trips = [
    {
      id: 1,
      title: "Summer Vibes in Bali",
      author: "Sarah Jenkins",
      authorAvatar: "👩‍🦳",
      location: "Bali, Indonesia",
      date: "July 15 - July 25",
      price: 1200,
      rating: 4.9,
      reviews: 24,
      slots: 4,
      maxSlots: 6,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
      tags: ["Beach", "Yoga", "Relax"]
    },
    {
      id: 2,
      title: "Alpine Hiking Adventure",
      author: "Marc Roiss",
      authorAvatar: "👨‍",
      location: "Swiss Alps, Switzerland",
      date: "August 05 - August 12",
      price: 2100,
      rating: 5.0,
      reviews: 12,
      slots: 2,
      maxSlots: 4,
      image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=600",
      tags: ["Hiking", "Mountain", "Extreme"]
    },
    {
      id: 3,
      title: "Tokyo Nightlife & Food",
      author: "Kenji Sato",
      authorAvatar: "👨‍🍳",
      location: "Tokyo, Japan",
      date: "Sept 10 - Sept 18",
      price: 1850,
      rating: 4.8,
      reviews: 45,
      slots: 8,
      maxSlots: 10,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600",
      tags: ["Food", "City", "Nightlife"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Explore Trips 🔭</h1>
            <p className="text-gray-400 text-sm">Browse and join upcoming trips posted by fellow travelers.</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-gray-100">
              <Search className="text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Where do you want to go?" 
                className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-300"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 border-r border-gray-100">
              <Calendar className="text-gray-400" size={18} />
              <span className="text-sm text-gray-400 cursor-pointer">Any Date</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2">
              <Users className="text-gray-400" size={18} />
              <span className="text-sm text-gray-400 cursor-pointer">Travelers</span>
            </div>
            <button className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-100 hover:bg-green-600 transition-colors">
              Find Trips
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium">
               <Filter size={14} /> All Filters
            </button>
            {["Beaches", "Mountains", "City Breaks", "Adventure", "Foodie", "Budget"].map((tag, i) => (
              <button key={i} className="px-5 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-500 hover:border-green-500 hover:text-green-500 transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Grid - Updated to match Dashboard Card Design */}
        <div className="grid grid-cols-3 gap-6">
          {trips.map((trip, i) => (
            <div key={trip.id} className="group relative bg-white rounded-[32px] p-4 shadow-sm border border-gray-50 hover:shadow-xl transition-all cursor-pointer overflow-hidden min-h-[420px]">
              {/* Image Section */}
              <div className="relative h-52 rounded-2xl overflow-hidden mb-4">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 hover:bg-white hover:text-red-500 transition-all">
                  <Heart size={20} />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                   {trip.tags.slice(0, 2).map((tag, i) => (
                     <span key={i} className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[9px] text-white font-bold uppercase tracking-wider border border-white/20">
                        {tag}
                     </span>
                   ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="px-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs">{trip.authorAvatar}</div>
                     <span className="text-[11px] font-bold text-gray-800">{trip.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded-lg">
                     <Star className="text-yellow-400 fill-yellow-400" size={10} />
                     <span>{trip.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-green-500 transition-colors">{trip.title}</h3>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                     <MapPin size={12} className="text-gray-300" />
                     <span className="truncate">{trip.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                     <Users size={12} className="text-gray-300" />
                     <span>{trip.slots}/{trip.maxSlots} slots filled</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-green-500 font-bold text-lg">
                      ${trip.price}
                    </span>
                    <span className="text-gray-300 text-[10px] font-medium -mt-1">Estimated Cost</span>
                  </div>
                  <button className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all bg-green-50 text-green-500 border border-green-50 hover:bg-green-500 hover:text-white"
                  )}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
