"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { X } from "lucide-react";

// Dummy data based on the provided mockup
const DUMMY_USERS = [
  { 
    id: 1, 
    name: "Sarah Jenkins", 
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1", 
    initials: "SJ", 
    online: true 
  },
  { 
    id: 2, 
    name: "David Chen", 
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1", 
    initials: "DC", 
    online: true 
  },
  { 
    id: 3, 
    name: "Elena Rodriguez", 
    avatar: null, 
    initials: "EL", 
    online: false 
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-4xl">
        
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-md shadow-sm border border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 text-gray-700"
          />
          {searchQuery ? (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={18} />
            </button>
          ) : (
            <X size={18} className="text-gray-400" />
          )}
        </div>

        {/* Results Container */}
        <div className="flex flex-wrap gap-4">
          {DUMMY_USERS.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-md p-3 min-w-[220px] shadow-sm hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative shrink-0">
                {user.avatar ? (
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                    {user.initials}
                  </div>
                )}
                {/* Status dot */}
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${user.online ? 'bg-emerald-500' : 'bg-gray-500'}`} />
              </div>
              <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
            </div>
          ))}
        </div>

        {/* Skeletons Container */}
        <div className="flex flex-wrap gap-4 mt-8">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-md p-3 min-w-[220px] shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-gray-100 animate-pulse shrink-0"></div>
              <div className="w-20 h-4 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
