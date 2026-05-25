import React, { useState } from "react";
import { Shield, Lock, AlertCircle, Check } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

interface ProfileEditFormProps {
  user: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProfileEditForm({ user, onSuccess, onCancel }: ProfileEditFormProps) {
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
        onSuccess();
      } else {
        setErrorMsg(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-[#f8fafb] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#006644]/20 outline-none text-gray-800 font-medium transition-all cursor-pointer"
            />
          </div>

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

          <div className="md:col-span-2 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50/20 p-4 rounded-xl border border-red-50/50">
            <div className="space-y-2 relative group">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Lock size={12} />
                <span>Email Address (Locked)</span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 text-gray-400 rounded-xl px-4 py-3 text-sm cursor-not-allowed select-none font-medium outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                Email address cannot be changed to protect account safety.
              </p>
            </div>

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
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                Passwords can only be reset securely via Auth Credentials dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-gray-100 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-green-500 text-white font-bold text-sm rounded-xl hover:bg-green-600 shadow-md shadow-green-500/20 transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
