"use client";

import React, { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Shield, 
  Lock, 
  Grid, 
  Bookmark, 
  Heart, 
  Compass, 
  Globe, 
  Calendar, 
  Sparkles, 
  LogOut, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { useAuth } from "@/app/components/providers/auth-provider";
import { apiFetch, API_URL } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function ProfileContent() {
  const { user, refreshSession } = useAuth();
  const router = useRouter();
  
  // Avatar upload ref and state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"trips" | "saved" | "tagged">("trips");

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      // Direct call to Hono backend profile image upload route
      const res = await fetch(`${API_URL}/auth/profile/image`, {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMsg("Profile picture updated successfully!");
        await refreshSession();
      } else {
        setErrorMsg(result.message || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMsg("An error occurred during upload. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };
  
  // Form states
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : ""
  );
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || "");
  const [interests, setInterests] = useState(user?.interests?.join(", ") || "");
  const [languages, setLanguages] = useState(user?.languages?.join(", ") || "");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      await refreshSession();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const parsedInterests = interests
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
      
    const parsedLanguages = languages
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    try {
      const res = await apiFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: name || null,
          username,
          bio: bio || null,
          gender: gender || null,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
          country: country || null,
          city: city || null,
          travelStyle: travelStyle || null,
          interests: parsedInterests,
          languages: parsedLanguages,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMsg("Profile updated successfully!");
        await refreshSession();
        setTimeout(() => {
          setIsEditing(false);
          setSuccessMsg("");
        }, 1000);
      } else {
        setErrorMsg(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // Static travel posts for Instagram grid look
  const mockTrips = [
    {
      id: 1,
      title: "Alpine Adventure",
      location: "Zermatt, Switzerland",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      likes: 142,
      comments: 28,
    },
    {
      id: 2,
      title: "Kyoto Serenity",
      location: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      likes: 218,
      comments: 42,
    },
    {
      id: 3,
      title: "Sunset Majesty",
      location: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      likes: 310,
      comments: 57,
    },
    {
      id: 4,
      title: "Safari Explorers",
      location: "Maasai Mara, Kenya",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
      likes: 189,
      comments: 19,
    },
    {
      id: 5,
      title: "Nordic Auroras",
      location: "Tromso, Norway",
      image: "https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=600&q=80",
      likes: 275,
      comments: 38,
    },
    {
      id: 6,
      title: "Desert Gold",
      location: "Petra, Jordan",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80",
      likes: 195,
      comments: 24,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#fcfdfe]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2 shadow-sm animate-[fadeIn_0.2s_ease-out]">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{errorMsg}</span>
            <button type="button" onClick={() => setErrorMsg("")} className="ml-auto hover:opacity-75 text-red-400 text-xs cursor-pointer font-bold border-none bg-transparent">✕</button>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs md:text-sm font-semibold flex items-center gap-2 shadow-sm animate-[fadeIn_0.2s_ease-out]">
            <Check size={16} className="flex-shrink-0" />
            <span>{successMsg}</span>
            <button type="button" onClick={() => setSuccessMsg("")} className="ml-auto hover:opacity-75 text-emerald-400 text-xs cursor-pointer font-bold border-none bg-transparent">✕</button>
          </div>
        )}

        {/* Instagram Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 pb-8 md:pb-10 border-b border-gray-150">
          
          {/* Avatar and Stats Row container (stacked horizontally on mobile) */}
          <div className="flex items-center gap-6 md:gap-16 w-full md:w-auto">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div 
                  onClick={handleImageChangeClick}
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shadow-md cursor-pointer transition-all hover:rotate-6"
                >
                  <div className="w-full h-full rounded-full bg-white p-0.5 sm:p-1 relative overflow-hidden">
                    {uploadingImage ? (
                      <div className="w-full h-full rounded-full bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-[10px] sm:text-xs text-green-600 font-bold animate-pulse">
                        <span>Uploading...</span>
                      </div>
                    ) : user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name || user.username} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl shadow-inner select-none font-bold text-green-700">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div 
                  onClick={handleImageChangeClick}
                  className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold cursor-pointer"
                >
                  {uploadingImage ? "Processing..." : "Change Photo"}
                </div>
                
                {/* Hidden file input */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingImage}
                />
              </div>
            </div>

            {/* Mobile-Only Stats (Horizontal stack on the right side of avatar) */}
            <div className="flex flex-1 justify-around items-center md:hidden pt-1">
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-gray-900 text-sm sm:text-base">12</span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-light">trips</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-gray-900 text-sm sm:text-base">8</span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-light">cities</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-extrabold text-gray-900 text-sm sm:text-base">47</span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-light">travelers</span>
              </div>
            </div>
          </div>

          {/* Right Profile Meta Section */}
          <div className="flex-1 space-y-4 md:space-y-6 w-full text-left">
            
            {/* Top row: Username + Desktop buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-xl md:text-2xl font-light text-gray-800 tracking-wide font-sans text-left">
                @{user.username}
              </h2>
              
              {/* Desktop-only action buttons (hidden below sm) */}
              <div className="hidden sm:flex items-center gap-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-1.5 bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] font-bold text-xs md:text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 md:p-2 bg-white border border-gray-250 text-red-500 hover:bg-red-50 active:scale-[0.98] rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* Desktop-Only Stats Row (hidden on mobile) */}
            <div className="hidden md:flex items-center justify-start gap-12 py-1">
              <div className="text-sm md:text-base">
                <span className="font-bold text-gray-900">12 </span>
                <span className="text-gray-500 font-light">trips planned</span>
              </div>
              <div className="text-sm md:text-base">
                <span className="font-bold text-gray-900">8 </span>
                <span className="text-gray-500 font-light">cities visited</span>
              </div>
              <div className="text-sm md:text-base">
                <span className="font-bold text-gray-900">47 </span>
                <span className="text-gray-500 font-light">travelers met</span>
              </div>
            </div>

            {/* Info bio / description row - ALWAYS left-aligned */}
            {!isEditing ? (
              <div className="space-y-2 md:space-y-3 font-sans w-full text-left">
                <h3 className="font-bold text-gray-900 text-sm md:text-base text-left">
                  {user.name || "Traveller Name"}
                </h3>
                {user.bio ? (
                  <p className="text-gray-600 text-sm font-light leading-relaxed whitespace-pre-wrap text-left">
                    {user.bio}
                  </p>
                ) : (
                  <p className="text-gray-300 text-xs italic font-light text-left">No bio added yet.</p>
                )}

                {/* Badges and tags */}
                <div className="pt-1 space-y-1.5 text-left">
                  {/* Location */}
                  {(user.city || user.country) && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium justify-start">
                      <MapPin size={14} className="text-gray-400" />
                      <span>
                        {[user.city, user.country].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Travel style */}
                  {user.travelStyle && (
                    <div className="flex items-center gap-1.5 text-xs text-[#006644] font-bold justify-start">
                      <Sparkles size={14} className="text-green-500" />
                      <span>Style: {user.travelStyle}</span>
                    </div>
                  )}

                  {/* Interests */}
                  {user.interests && user.interests.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 justify-start">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Interests:</span>
                      {user.interests.map((interest: string, i: number) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] md:text-xs rounded-full font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Languages */}
                  {user.languages && user.languages.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 justify-start">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Languages:</span>
                      {user.languages.map((lang: string, i: number) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 bg-emerald-50 text-[#006644] text-[10px] md:text-xs rounded-full font-bold border border-emerald-100"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Mobile-only action buttons (visible below sm) */}
            <div className="flex sm:hidden items-center gap-2 w-full pt-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 py-2 bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] font-bold text-xs rounded-lg shadow-sm transition-all text-center cursor-pointer"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              <button 
                onClick={handleLogout}
                className="px-3 py-2 bg-white border border-gray-250 text-red-500 hover:bg-red-50 active:scale-[0.98] rounded-lg shadow-sm transition-all flex items-center justify-center cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>

          </div>

          </div>
        </div>

        {/* Live Instagram Editor Form */}
        {isEditing ? (
          <div className="py-10 animate-[fadeIn_0.3s_ease-out]">
            <form onSubmit={handleSave} className="bg-white border border-gray-150 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base md:text-lg flex items-center gap-2">
                  ⚙️ Edit Travel Profile
                </h3>
                <span className="text-xs text-gray-400 font-medium">Configure account details</span>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2">
                  <Check size={16} />
                  {successMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter unique username"
                    required
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Bio</label>
                    <span className="text-[10px] text-gray-400 font-medium">{bio.length}/150 chars</span>
                  </div>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 150))}
                    placeholder="Tell us about your wanderlust..."
                    rows={3}
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all resize-none"
                  />
                </div>

                {/* Location: City */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kyoto"
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Location: Country */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Japan"
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer Not To Say">Prefer Not To Say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all cursor-pointer"
                  />
                </div>

                {/* Travel Style */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Travel Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all cursor-pointer"
                  >
                    <option value="">Select Travel Style</option>
                    <option value="Backpacker">🎒 Backpacker</option>
                    <option value="Adventure">🧗 Adventure</option>
                    <option value="Luxury">💎 Luxury</option>
                    <option value="Solo Traveler">🚶 Solo Traveler</option>
                    <option value="Foodie / Culinary">🍜 Foodie</option>
                    <option value="Relaxation / Beach">🏖️ Beach & Relaxation</option>
                  </select>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Interests (Comma separated)</label>
                  <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Hiking, Sushi, Photography"
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* Languages */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Languages Spoken (Comma separated)</label>
                  <input
                    type="text"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="English, Japanese, Spanish"
                    className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all"
                  />
                </div>

                {/* RESTRICTED SECURITY SECTION */}
                <div className="md:col-span-2 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50/20 p-4 rounded-xl border border-red-50/50">
                  
                  {/* Email (Disabled) */}
                  <div className="space-y-2 relative group">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <Lock size={12} />
                      <span>Email Address (Locked)</span>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 text-gray-400 rounded-xl px-4 py-3 text-sm cursor-not-allowed select-none font-medium outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔒
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                      Email address cannot be changed to protect account safety.
                    </p>
                  </div>

                  {/* Password (Disabled) */}
                  <div className="space-y-2 relative group">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <Shield size={12} />
                      <span>Account Password (Locked)</span>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value="••••••••••••"
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 text-gray-400 rounded-xl px-4 py-3 text-sm cursor-not-allowed select-none font-medium outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔑
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                      Passwords can only be reset securely via Auth Credentials dashboard.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-500 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#006644] hover:bg-[#005533] active:scale-[0.98] text-white rounded-xl font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Instagram style Tabs navigation */}
        <div className="mt-10">
          <div className="flex items-center justify-center gap-12">
            <button
              onClick={() => setActiveTab("trips")}
              className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "trips"
                  ? "border-gray-800 text-gray-800"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid size={16} />
              <span>My Trips</span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "saved"
                  ? "border-gray-800 text-gray-800"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Bookmark size={16} />
              <span>Saved</span>
            </button>

            <button
              onClick={() => setActiveTab("tagged")}
              className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === "tagged"
                  ? "border-gray-800 text-gray-800"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <User size={16} className="stroke-[2.5]" />
              <span>Tagged</span>
            </button>
          </div>

          {/* Grid Layout Cards */}
          <div className="mt-8">
            {activeTab === "trips" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.4s_ease-out]">
                {mockTrips.map((trip) => (
                  <div 
                    key={trip.id} 
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={trip.image} 
                        alt={trip.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover stats overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm md:text-base">
                        <span className="flex items-center gap-1.5">
                          <Heart size={18} fill="white" /> {trip.likes}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bookmark size={18} fill="white" /> {trip.comments}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-1 bg-white">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">
                        {trip.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate flex items-center gap-1">
                        <MapPin size={12} />
                        {trip.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="py-20 text-center space-y-4 max-w-sm mx-auto animate-[fadeIn_0.4s_ease-out]">
                <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
                  🔖
                </div>
                <h4 className="font-bold text-gray-800 text-lg">No Saved Trips</h4>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  Save itineraries or plans created by the community. They will securely populate here.
                </p>
              </div>
            )}

            {activeTab === "tagged" && (
              <div className="py-20 text-center space-y-4 max-w-sm mx-auto animate-[fadeIn_0.4s_ease-out]">
                <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
                  🏷️
                </div>
                <h4 className="font-bold text-gray-800 text-lg">No Tagged Travels</h4>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  When other travelers tag you in their group trips or itineraries, you will see them here.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
