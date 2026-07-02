"use client";

import React, { useState } from "react";
import { User, Bell, Lock, Shield, Settings2, Pencil } from "lucide-react";
import { motion } from "framer-motion";

interface SettingsTemplateProps {
  user: any;
}

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Settings2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "security", label: "Security", icon: Lock },
];

export function SettingsTemplate({ user }: SettingsTemplateProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-[#f8fafb] text-[#111] h-full">
      {/* Settings Navigation (Sidebar on Desktop, Horizontal Tabs on Mobile) */}
      <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-[#f8fafb] pt-4 md:pt-12 px-2 md:px-6 z-10 sticky top-0 md:static">
        <h1 className="hidden md:block text-3xl font-bold text-gray-900 mb-8 tracking-tight">Settings</h1>
        
        <nav className="flex flex-row md:flex-col overflow-x-auto no-scrollbar space-x-2 md:space-x-0 md:space-y-2 pb-2 md:pb-0 px-2 md:px-0">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 md:px-12 md:py-12 bg-white/50">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 tracking-tight">
          {TABS.find(t => t.id === activeTab)?.label} Settings
        </h2>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Personal Information</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-8">Update your photo and personal details here.</p>
              
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-200">
                    <img 
                      src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#111] rounded-full flex items-center justify-center text-white shadow-md border-2 border-white hover:bg-gray-800 transition-colors">
                    <Pencil size={12} />
                  </button>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium text-sm rounded-lg mb-2 transition-colors">
                    Change Avatar
                  </button>
                  <span className="text-[11px] md:text-xs font-semibold text-gray-500">JPG, GIF or PNG. Max size of 800K</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 mb-8"></div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || user?.username || "John Doe"}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || "john.doe@example.com"}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Product Designer focusing on minimal, highly functional enterprise software interfaces."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all resize-none"
                />
              </div>
              <div className="text-right text-xs font-bold text-gray-500 mb-8">
                275 characters left
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4">
                <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium text-sm rounded-xl transition-colors shadow-sm">
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-black transition-colors shadow-md">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== "profile" && (
             <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm min-h-[300px] md:min-h-[400px] flex items-center justify-center text-center">
                <p className="text-gray-500 font-medium">This section is currently under construction.</p>
             </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

