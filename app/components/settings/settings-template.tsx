"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Lock, Shield, Settings2, AlertCircle, FolderOpen, Trash2, Sparkles, PenTool, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "../../hooks/useSettings";
import { cn } from "@/app/lib/utils";
import { useAuth } from "../providers/auth-provider";
import { apiFetch } from "@/app/lib/api";
import { tripDetailService } from "../../services/trip-detail.service";
import { useRouter } from "next/navigation";

interface SettingsTemplateProps {
  user: any;
}

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Settings2 },
  { id: "saved", label: "Saved", icon: FolderOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "security", label: "Security", icon: Lock },
];

interface SettingsToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function SettingsToggle({ label, description, checked, onChange, disabled }: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-gray-50/80 transition-colors">
      <div className="flex-1 pr-4 text-left">
        <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={cn(
          "w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer shrink-0 border border-transparent",
          checked ? "bg-green-500" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "w-4.5 h-4.5 rounded-full bg-white absolute top-[2px] transition-transform shadow-sm",
            checked ? "translate-x-5.5" : "translate-x-[2px]"
          )}
        />
      </button>
    </div>
  );
}

export function SettingsTemplate({ user }: SettingsTemplateProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const { settings, loading, error, updateSetting, retry } = useSettings();
  const { refreshSession } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get("tab");
      if (tabParam && TABS.some(t => t.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);
  
  // Profile Form State
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleProfileSubmit = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const res = await apiFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          bio: formData.bio,
        }),
      });
      if (res.ok) {
        setSaveMessage({ type: "success", text: "Profile updated successfully!" });
        refreshSession();
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        const err = await res.json();
        setSaveMessage({ type: "error", text: err.message || "Failed to update profile." });
      }
    } catch (err) {
      setSaveMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const form = new FormData();
      form.append("image", file);

      const res = await apiFetch("/auth/profile/image", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        refreshSession();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to upload image");
      }
    } catch (err) {
      alert("An error occurred during image upload");
    } finally {
      setIsUploadingImage(false);
    }
  };

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
                className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Personal Information</h3>
              <p className="text-xs md:text-sm text-gray-500 mb-8">Update your photo and personal details here.</p>
              
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-200 relative">
                    <img 
                      src={user?.image || "/logo.png"} 
                      alt="Avatar" 
                      className={`w-full h-full object-cover transition-opacity ${isUploadingImage ? 'opacity-50' : 'opacity-100'} ${!user?.image ? 'p-3 bg-emerald-50' : ''}`}
                    />
                    {isUploadingImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <label className="px-4 py-2 border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium text-sm rounded-lg mb-2 transition-colors cursor-pointer inline-block">
                    {isUploadingImage ? 'Uploading...' : 'Change Avatar'}
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleImageUpload} disabled={isUploadingImage} />
                  </label>
                  <span className="text-[11px] md:text-xs font-semibold text-gray-500">JPG, GIF or PNG. Max size of 5MB</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 mb-8"></div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                    Email Address <span className="text-xs text-gray-400 font-normal ml-2">(Cannot be changed here)</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 font-medium transition-all resize-none"
                />
              </div>
              <div className="text-right text-xs font-bold text-gray-500 mb-8">
                {150 - (formData.bio?.length || 0)} characters left
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex-1 text-left w-full sm:w-auto">
                  {saveMessage && (
                    <span className={`text-sm font-bold ${saveMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {saveMessage.text}
                    </span>
                  )}
                </div>
                <div className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setFormData({ name: user?.name || "", username: user?.username || "", bio: user?.bio || "" })}
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleProfileSubmit}
                    disabled={isSaving || (formData.bio?.length || 0) > 150}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-black transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center min-w-[140px]"
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy settings Tab */}
          {activeTab === "privacy" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Privacy & Permissions</h3>
                <p className="text-xs md:text-sm text-gray-500">Configure search discoverability, account privacy, and direct messages boundaries.</p>
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="h-20 bg-gray-100 rounded-2xl"></div>
                </div>
              ) : error ? (
                <div className="text-center py-6 bg-red-50/50 rounded-2xl border border-red-100">
                  <AlertCircle className="text-red-500 mx-auto mb-2" size={28} />
                  <p className="text-xs text-red-700 font-semibold mb-3">Failed to load privacy settings</p>
                  <button onClick={retry} className="px-4 py-2 bg-red-100 text-red-800 text-xs font-bold rounded-xl cursor-pointer">
                    Retry
                  </button>
                </div>
              ) : settings ? (
                <div className="space-y-4">
                  <SettingsToggle
                    label="Private Profile"
                    description="When enabled, only accepted followers can view your trips, connections list, and activity."
                    checked={settings.isPrivate}
                    onChange={(val) => updateSetting("isPrivate", val)}
                  />

                  <SettingsToggle
                    label="Discoverable in Search"
                    description="Allow other travelers to find your username and profile via user search discovery results."
                    checked={settings.isDiscoverable}
                    onChange={(val) => updateSetting("isDiscoverable", val)}
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-gray-50/80 transition-colors gap-3">
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-900">Direct Messages Permissions</h4>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                        Control who can initiate new direct conversations and send you chat messages.
                      </p>
                    </div>
                    <select
                      value={settings.messagingPermission}
                      onChange={(e) => updateSetting("messagingPermission", e.target.value as any)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-gray-800"
                    >
                      <option value="ANYONE">Anyone</option>
                      <option value="FOLLOWINGS">Followers Only</option>
                      <option value="NO_ONE">No One</option>
                    </select>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Notifications Preferences Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm space-y-8">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Notification Settings</h3>
                <p className="text-xs md:text-sm text-gray-500">Enable or disable specific notifications for your account.</p>
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                </div>
              ) : error ? (
                <div className="text-center py-6 bg-red-50/50 rounded-2xl border border-red-100">
                  <AlertCircle className="text-red-500 mx-auto mb-2" size={28} />
                  <p className="text-xs text-red-700 font-semibold mb-3">Failed to load settings</p>
                  <button onClick={retry} className="px-4 py-2 bg-red-100 text-red-800 text-xs font-bold rounded-xl cursor-pointer">
                    Retry
                  </button>
                </div>
              ) : settings ? (
                <div className="space-y-4">
                  <SettingsToggle
                    label="Email Notifications"
                    description="Receive email summaries, itinerary creation validations, and major security updates."
                    checked={settings.notifyEmail}
                    onChange={(val) => updateSetting("notifyEmail", val)}
                  />

                  <SettingsToggle
                    label="Message Alerts"
                    description="Notify you instantly when you receive a direct chat message from another traveler."
                    checked={settings.notifyMessages}
                    onChange={(val) => updateSetting("notifyMessages", val)}
                  />

                  <SettingsToggle
                    label="Follow Request Notifications"
                    description="Receive background alerts when other users request to follow your private profile."
                    checked={settings.notifyFollowRequests}
                    onChange={(val) => updateSetting("notifyFollowRequests", val)}
                  />
                </div>
              ) : null}
            </div>
          )}

          {/* Saved Tab */}
          {activeTab === "saved" && (
            <SavedTripsSection router={router} />
          )}

          {/* Under construction tabs */}
          {activeTab !== "profile" && activeTab !== "privacy" && activeTab !== "notifications" && activeTab !== "saved" && (
             <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 max-w-4xl shadow-sm min-h-[300px] md:min-h-[400px] flex items-center justify-center text-center">
                <p className="text-gray-500 font-medium">This section is currently under construction.</p>
             </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

function SavedTripsSection({ router }: { router: any }) {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Deletion state
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadSaved() {
      try {
        setLoading(true);
        setError(null);
        const data = await tripDetailService.fetchSavedTrips();
        setTrips(data);
      } catch (err: any) {
        console.error("Failed to load saved trips:", err);
        setError(err.message || "Unable to retrieve saved trips.");
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, []);

  const handleDelete = async (generationId: string) => {
    try {
      setIsDeleting(true);
      const res = await apiFetch(`/api/v1/generate/${generationId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTrips(prev => prev.filter(t => t.generationId !== generationId));
        setTripToDelete(null);
      } else {
        alert("Failed to delete the saved expedition.");
      }
    } catch (err) {
      console.error("Error deleting saved trip:", err);
      alert("An error occurred during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(n => (
          <div key={n} className="h-64 bg-gray-150 rounded-3xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50/50 rounded-[32px] border border-red-100 p-6">
        <AlertCircle className="text-red-500 mx-auto mb-2" size={28} />
        <p className="text-sm text-red-700 font-semibold mb-3">{error}</p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-4xl shadow-sm text-center py-20 space-y-4 mx-auto">
        <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
          🔖
        </div>
        <h3 className="font-extrabold text-gray-800 text-lg">No Saved Trips</h3>
        <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          You don't have any unpublished trips yet. Create a trip using the manual studio or AI planner and save it to resume editing later!
        </p>
        <button
          onClick={() => router.push("/post-trip")}
          className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
        >
          Create a Trip
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => {
          const isAI = trip.type === "AI_model";
          const destination = trip.destination || "Scenic Destination";
          const coverImage = trip.coverImage || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600";
          const daysCount = trip.totalDays || 1;

          return (
            <div
              key={trip.generationId}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              {/* Cover image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={coverImage}
                  alt={destination}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Delete button overlay */}
                <button
                  onClick={() => setTripToDelete(trip.generationId)}
                  className="absolute top-4 right-4 p-2 bg-white/95 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full backdrop-blur-sm transition-colors z-10 cursor-pointer shadow-sm"
                  title="Delete Draft"
                >
                  <Trash2 size={15} />
                </button>

                {/* Badge Type */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {isAI ? (
                    <span className="px-2.5 py-1.5 bg-gradient-to-r from-green-600 to-teal-700 backdrop-blur-md rounded-xl text-[9px] text-white font-black uppercase tracking-wider flex items-center gap-1 shadow-sm border border-emerald-500/20">
                      <Sparkles size={10} /> AI Plan
                    </span>
                  ) : (
                    <span className="px-2.5 py-1.5 bg-[#E6F4EA] backdrop-blur-md rounded-xl text-[9px] text-[#006A4E] font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-100 shadow-sm">
                      <PenTool size={10} /> Manual Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Trip details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-gray-900 text-base truncate">
                    {destination}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
                    <span className="flex items-center gap-1"><Clock size={12} /> {daysCount} Days</span>
                    <span>•</span>
                    <span className="truncate">{trip.experienceType || "Custom"}</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                    Last modified: {new Date(trip.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => router.push(`/post-trip?mode=${isAI ? "ai" : "manual"}&draftId=${trip.generationId}`)}
                  className="w-full bg-[#006A4E] hover:bg-[#00523C] text-white py-3 rounded-2xl font-bold text-xs md:text-sm transition-colors shadow-md shadow-emerald-950/10 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isAI ? "Review Itinerary" : "Resume Drafting"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete confirmation modal */}
      {tripToDelete && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full mx-4 shadow-2xl relative animate-[zoomIn_0.2s_ease-out]">
            <div className="w-16 h-16 bg-red-50 text-red-555 rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Delete Draft?</h3>
            <p className="text-gray-500 text-sm text-center mb-8 font-medium leading-relaxed">
              This action is permanent. Once deleted, this saved draft and all its parameters will be lost.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setTripToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-gray-650 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(tripToDelete)}
                disabled={isDeleting}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-650 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
