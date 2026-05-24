import React, { useRef, useState } from "react";
import { 
  MapPin, Calendar, ChevronDown, Upload, ArrowRight, 
  Sparkles, Zap, Lock, DollarSign, Eye, EyeOff, Compass
} from "lucide-react";
import { usePostTripStore } from "./../../store/post-trip.store";

interface StepDetailsProps {
  onNext: () => void;
}

export default function StepDetails({ onNext }: StepDetailsProps) {
  const { formData, updateFormData, uploadCover, loading } = usePostTripStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [loadingImageGen, setLoadingImageGen] = useState<"v1" | "v2" | null>(null);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ destination: e.target.value });
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ origin: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ startDate: e.target.value });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ budgetINR: Number(e.target.value) || 0 });
  };

  const handleSelectChange = (field: "luxuryLevel" | "travelStyle" | "foodPreference" | "experienceType" | "baseCurrency", val: string) => {
    updateFormData({ [field]: val });
  };

  const handleRoundTripToggle = (isRound: boolean) => {
    updateFormData({ 
      isRoundTrip: isRound,
      tripType: isRound ? "Round Trip" : "One Way"
    });
  };

  const handleTotalPersonsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    const currentTravelers = [...formData.travelers];
    
    if (currentTravelers.length < count) {
      for (let i = currentTravelers.length; i < count; i++) {
        currentTravelers.push({ sex: "M", age: 22 + i });
      }
    } else if (currentTravelers.length > count) {
      currentTravelers.splice(count);
    }

    updateFormData({
      totalPersons: count,
      travelers: currentTravelers
    });
  };

  const handleTravelerChange = (index: number, field: "sex" | "age", value: string | number) => {
    const updatedTravelers = [...formData.travelers];
    if (updatedTravelers[index]) {
      updatedTravelers[index] = {
        ...updatedTravelers[index],
        [field]: field === "age" ? Number(value) : value
      };
      updateFormData({ travelers: updatedTravelers });
    }
  };

  const handleTravelMediumToggle = (medium: "bus" | "car" | "bike" | "train" | "flights") => {
    const currentMedium = { ...formData.travelMedium };
    currentMedium[medium] = {
      ...currentMedium[medium],
      selected: !currentMedium[medium].selected
    };
    updateFormData({ travelMedium: currentMedium });
  };

  const handleCarConfigChange = (field: "type" | "ownership", val: string) => {
    const currentMedium = { ...formData.travelMedium };
    currentMedium.car = {
      ...currentMedium.car,
      [field]: val
    };
    updateFormData({ travelMedium: currentMedium });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadCover(file);
    }
  };

  const triggerFileSelector = () => {
    fileInputRef.current?.click();
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.state || "Delhi";
            const country = data.address.country || "India";
            const locationString = `${city}, ${country}`;
            updateFormData({ 
              destination: locationString,
              origin: locationString 
            });
          } else {
            alert("Failed to parse coordinates. Defaulting to capital region.");
            updateFormData({ 
              destination: "New Delhi, India",
              origin: "New Delhi, India"
            });
          }
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          alert("Location lookup failed. Please type manually.");
        } finally {
          setFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error", error);
        setFetchingLocation(false);
        alert("Failed to access your location. Please type manually.");
      }
    );
  };

  const generateUnsplashV1 = async () => {
    const dest = formData.destination.trim();
    if (!dest) {
      alert("Please enter a destination first to generate an image.");
      return;
    }
    setLoadingImageGen("v1");
    try {
      const apiKey = "_PebCYiTPmY8mhijeEYDlvetrxRKdpu73EZURgVYKos";
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(dest)}&per_page=1&client_id=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;
          updateFormData({ imageUrl });
        } else {
          alert("No images found for this destination on Unsplash.");
        }
      } else {
        throw new Error("Unsplash API response error");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch image from Unsplash. Please try again.");
    } finally {
      setLoadingImageGen(null);
    }
  };

  const generatePexelsV2 = async () => {
    const dest = formData.destination.trim();
    if (!dest) {
      alert("Please enter a destination first to generate an image.");
      return;
    }
    setLoadingImageGen("v2");
    try {
      const apiKey = "dXkpu0KlnAohz3iKqFAGHxi1jLtIgG423iVkuCkxXhHbYDmxb2HrMYny";
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(dest)}&per_page=1`,
        {
          headers: {
            Authorization: apiKey
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          const imageUrl = data.photos[0].src.large2x || data.photos[0].src.large;
          updateFormData({ imageUrl });
        } else {
          alert("No images found for this destination on Pexels.");
        }
      } else {
        throw new Error("Pexels API response error");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch image from Pexels. Please try again.");
    } finally {
      setLoadingImageGen(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 flex flex-col pb-12">

      {/* Mountain Banner Header (Dynamic Image Cover) */}
      <div className="relative h-72 md:h-80 w-full rounded-[32px] overflow-hidden shadow-sm border border-gray-150">
        <img
          src={formData.imageUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"}
          alt="Destination Landscape"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

        {/* Top Indicators */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="bg-[#10B981] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            Premium Intake
          </div>
        </div>

        {/* Bottom Banner Details */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 truncate">
              {formData.destination || "Destination Intake"}
            </h1>
            <p className="text-gray-200 text-sm font-medium leading-relaxed">
              Design the visual soul of your trip. Auto-generate high-res banners from Unsplash or upload directly to Cloudinary.
            </p>
          </div>

          {/* Cloudinary Upload & V1/V2 Generators */}
          <div className="flex gap-3 shrink-0">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" 
            />
            
            {/* Upload Cover */}
            <button 
              onClick={triggerFileSelector}
              disabled={loading}
              className="w-20 h-20 rounded-2xl border-2 border-dashed border-white/50 flex flex-col items-center justify-center text-white hover:bg-white/10 transition-all bg-black/40 backdrop-blur-sm active:scale-95 shadow-lg"
            >
              <Upload size={20} className="mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{loading ? "Uploading..." : "Upload"}</span>
            </button>

            {/* Gen v1 (Unsplash) */}
            <button 
              onClick={generateUnsplashV1}
              disabled={loadingImageGen !== null}
              className="w-20 h-20 rounded-2xl border border-white/30 flex flex-col items-center justify-center text-white hover:bg-white/10 transition-all bg-[#006A4E]/60 backdrop-blur-sm active:scale-95 shadow-lg"
            >
              <Sparkles size={20} className="mb-1 text-emerald-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{loadingImageGen === "v1" ? "Gen..." : "v1"}</span>
            </button>

            {/* Gen v2 (Pexels) */}
            <button 
              onClick={generatePexelsV2}
              disabled={loadingImageGen !== null}
              className="w-20 h-20 rounded-2xl border border-white/30 flex flex-col items-center justify-center text-white hover:bg-white/10 transition-all bg-[#006A4E]/60 backdrop-blur-sm active:scale-95 shadow-lg"
            >
              <Zap size={20} className="mb-1 text-yellow-350" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{loadingImageGen === "v2" ? "Gen..." : "v2"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Origin & Destination Route Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-extrabold text-gray-800 text-base flex items-center gap-2 border-b border-gray-50 pb-3">
          <Compass size={18} className="text-[#006A4E]" />
          <span>Core Route & Logistics</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Starting Point (Origin)</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={formData.origin}
                onChange={handleOriginChange}
                placeholder="e.g. Ghaziabad"
                className="w-full bg-[#F4F5F6] border border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold text-gray-800 outline-none focus:border-[#006A4E]/30 focus:bg-white transition-all animate-in"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Final Destination</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006A4E]" size={18} />
              <input
                type="text"
                value={formData.destination}
                onChange={handleDestinationChange}
                placeholder="e.g. Manali, India"
                className="w-full bg-[#F4F5F6] border border-transparent rounded-2xl pl-12 pr-28 py-4 text-sm font-semibold text-gray-800 outline-none focus:border-[#006A4E]/30 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={fetchCurrentLocation}
                disabled={fetchingLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-[#E6F4EA] text-[#006A4E] hover:bg-[#D5EFE0] px-3 py-1.5 rounded-xl active:scale-95 transition-all flex items-center gap-1 shadow-sm shrink-0"
              >
                <span>📍</span>
                <span>{fetchingLocation ? "GPS..." : "GPS"}</span>
              </button>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={formData.startDate}
                onChange={handleStartDateChange}
                className="w-full bg-[#F4F5F6] border border-transparent rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#006A4E]/30 focus:bg-white transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Target Budget (INR)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                value={formData.budgetINR}
                onChange={handleBudgetChange}
                placeholder="45000"
                className="w-full bg-[#F4F5F6] border border-transparent rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#006A4E]/30 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1">Direction Style</label>
            <div className="flex bg-[#F4F5F6] p-1 rounded-2xl border border-transparent min-h-[50px] items-center">
              <button 
                onClick={() => handleRoundTripToggle(true)}
                className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${formData.isRoundTrip ? "bg-[#006A4E] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Round Trip
              </button>
              <button 
                onClick={() => handleRoundTripToggle(false)}
                className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all ${!formData.isRoundTrip ? "bg-[#006A4E] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                One Way
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Travel Preferences Section */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-extrabold text-gray-800 text-base flex items-center gap-2 border-b border-gray-50 pb-3">
          <Compass size={18} className="text-[#006A4E]" />
          <span>Intake Preferences</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Luxury Level</label>
            <div className="relative">
              <select
                value={formData.luxuryLevel}
                onChange={(e) => handleSelectChange("luxuryLevel", e.target.value)}
                className="w-full appearance-none bg-[#F4F5F6] border-none rounded-2xl pl-5 pr-12 py-4 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-150 cursor-pointer transition-colors"
              >
                <option value="budget">Budget (Eco/Hostels)</option>
                <option value="moderate">Moderate (Boutique Hotels)</option>
                <option value="luxury">Luxury (Five Star/Resorts)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Travel Style</label>
            <div className="relative">
              <select
                value={formData.travelStyle}
                onChange={(e) => handleSelectChange("travelStyle", e.target.value)}
                className="w-full appearance-none bg-[#F4F5F6] border-none rounded-2xl pl-5 pr-12 py-4 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-150 cursor-pointer transition-colors"
              >
                <option value="adventure">Adventure & Outdoor</option>
                <option value="relaxed">Relaxed Leisure</option>
                <option value="sightseeing">Culture & Sightseeing</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Food Preference</label>
            <div className="relative">
              <select
                value={formData.foodPreference}
                onChange={(e) => handleSelectChange("foodPreference", e.target.value)}
                className="w-full appearance-none bg-[#F4F5F6] border-none rounded-2xl pl-5 pr-12 py-4 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-150 cursor-pointer transition-colors"
              >
                <option value="veg">Pure Vegetarian (Veg)</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="any">Any / Local Food Adaptable</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Medium Selection */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
        <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3 flex items-center justify-between">
          <span>Active Transit Mediums</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Select one or more</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(["car", "flights", "bus", "train", "bike"] as const).map((medium) => {
            const isSelected = formData.travelMedium[medium].selected;
            return (
              <button
                key={medium}
                type="button"
                onClick={() => handleTravelMediumToggle(medium)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${isSelected ? "border-[#006A4E] bg-emerald-50/20 text-[#006A4E]" : "border-gray-100 bg-[#F9FAFB] text-gray-500 hover:bg-gray-50 hover:border-gray-250"}`}
              >
                <span className="text-xl capitalize mb-1">
                  {medium === "flights" ? "✈️" : medium === "car" ? "🚗" : medium === "bus" ? "🚌" : medium === "train" ? "🚂" : "🏍️"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">{medium === "flights" ? "Flights" : medium}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Car Sub-Config (Nested Conditional Fields) */}
        {formData.travelMedium.car.selected && (
          <div className="bg-[#F9FAFB] border border-gray-150 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">🚗 Car Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Car Body Type</label>
                <div className="relative">
                  <select
                    value={formData.travelMedium.car.type || "suv"}
                    onChange={(e) => handleCarConfigChange("type", e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-xs font-semibold text-gray-700 outline-none"
                  >
                    <option value="suv">SUV (Mahindra Thar / Fortuner)</option>
                    <option value="sedan">Sedan (Honda City / Verna)</option>
                    <option value="hatchback">Hatchback (Swift / i20)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Car Ownership</label>
                <div className="relative">
                  <select
                    value={formData.travelMedium.car.ownership || "rented"}
                    onChange={(e) => handleCarConfigChange("ownership", e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-xs font-semibold text-gray-700 outline-none"
                  >
                    <option value="rented">Self Drive Rented</option>
                    <option value="owned">Owned Personal Vehicle</option>
                    <option value="chauffeur">Chauffeur Driven Cab</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Travelers Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3 px-2">
          <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest">Traveler Count:</span>
          <div className="relative">
            <select
              value={formData.totalPersons}
              onChange={handleTotalPersonsChange}
              className="appearance-none bg-[#F4F5F6] border-none rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-gray-800 outline-none cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.travelers.map((traveler, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#006A4E] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {index + 1}
                </div>
                <span className="font-bold text-gray-800 text-sm">
                  {index === 0 ? "Primary Traveler" : `Companion ${index}`}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Age</label>
                  <div className="relative">
                    <select
                      value={traveler.age}
                      onChange={(e) => handleTravelerChange(index, "age", e.target.value)}
                      className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      {Array.from({ length: 80 }, (_, i) => i + 18).map((age) => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Sex</label>
                  <div className="relative">
                    <select
                      value={traveler.sex}
                      onChange={(e) => handleTravelerChange(index, "sex", e.target.value)}
                      className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="pt-10 pb-6 flex flex-col items-center justify-center space-y-4">
        <button
          onClick={onNext}
          className="w-full md:w-80 bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
        >
          Next
          <ArrowRight size={18} />
        </button>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold">
          <Lock size={12} className="text-gray-400" />
          <span>Safe & encrypted planning for your next summit.</span>
        </div>
      </div>

    </div>
  );
}
