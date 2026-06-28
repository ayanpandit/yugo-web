"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, MapPin, Calendar, Wallet, Users, 
  Car, Bike, Train, Plane, Bus, Plus, Trash, Wand2 
} from "lucide-react";

interface Traveler {
  sex: string;
  age: number;
}

interface TravelMediumOption {
  selected: boolean;
  type?: string;
  sharing?: string;
  ownership?: string;
  class?: string;
}

interface TravelMediums {
  car: TravelMediumOption;
  bike: TravelMediumOption;
  train: TravelMediumOption;
  flights: TravelMediumOption;
  bus: TravelMediumOption;
  mixed_best_suitable: boolean;
}

interface AIPayload {
  trip_details: {
    origin: string;
    destination: string;
    startDate: string;
    days: number;
    budgetINR: number;
    isRoundTrip: boolean;
  };
  party_composition: {
    totalPersons: number;
    travelers: Traveler[];
  };
  preferences: {
    food_preference: string;
    travel_style: string;
    luxury_level: string;
  };
  travel_medium: TravelMediums;
}

interface AIFormProps {
  onSubmit: (payload: AIPayload) => void;
  loading: boolean;
}

export default function AIForm({ onSubmit, loading }: AIFormProps) {
  const [activeTab, setActiveTab] = useState<"dest" | "pref" | "party" | "transit">("dest");

  // State fields matching the generation schema
  const [origin, setOrigin] = useState("Ghaziabad");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("2026-06-15");
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(45000);
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const [foodPreference, setFoodPreference] = useState("veg");
  const [travelStyle, setTravelStyle] = useState("adventure");
  const [luxuryLevel, setLuxuryLevel] = useState("moderate");

  const [totalPersons, setTotalPersons] = useState(2);
  const [travelers, setTravelers] = useState<Traveler[]>([
    { sex: "M", age: 21 },
    { sex: "M", age: 22 }
  ]);

  const [travelMedium, setTravelMedium] = useState<TravelMediums>({
    mixed_best_suitable: false,
    car: { selected: true, type: "suv", ownership: "rented" },
    bike: { selected: false, type: "off_road", sharing: "two_on_one", ownership: "rented" },
    train: { selected: false, class: "3AC" },
    flights: { selected: false, class: "economy" },
    bus: { selected: false, class: "ac_sleeper" }
  });

  // Keep travelers sync'd with totalPersons count
  useEffect(() => {
    const diff = totalPersons - travelers.length;
    if (diff > 0) {
      // Add travelers
      const newTravelers = [...travelers];
      for (let i = 0; i < diff; i++) {
        newTravelers.push({ sex: "M", age: 25 });
      }
      setTravelers(newTravelers);
    } else if (diff < 0) {
      // Remove travelers
      setTravelers(travelers.slice(0, totalPersons));
    }
  }, [totalPersons]);

  const handleTravelerChange = (index: number, field: keyof Traveler, value: any) => {
    const updated = [...travelers];
    updated[index] = {
      ...updated[index],
      [field]: field === "age" ? Number(value) : value
    };
    setTravelers(updated);
  };

  const handleMediumToggle = (key: keyof Omit<TravelMediums, "mixed_best_suitable">) => {
    setTravelMedium(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        selected: !prev[key].selected
      }
    }));
  };

  const handleMediumChange = (key: keyof Omit<TravelMediums, "mixed_best_suitable">, field: string, value: any) => {
    setTravelMedium(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: AIPayload = {
      trip_details: {
        origin,
        destination,
        startDate,
        days: Number(days),
        budgetINR: Number(budget),
        isRoundTrip
      },
      party_composition: {
        totalPersons: Number(totalPersons),
        travelers: travelers.map(t => ({ sex: t.sex, age: Number(t.age) }))
      },
      preferences: {
        food_preference: foodPreference,
        travel_style: travelStyle,
        luxury_level: luxuryLevel
      },
      travel_medium: travelMedium
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto no-scrollbar">
        {[
          { id: "dest", label: "Destination", icon: MapPin },
          { id: "pref", label: "Preferences", icon: Sparkles },
          { id: "party", label: "Travelers", icon: Users },
          { id: "transit", label: "Transit Mode", icon: Car }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[120px] py-4 px-6 text-xs md:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                isActive 
                  ? "border-[#006A4E] text-[#006A4E] bg-white" 
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="p-6 md:p-8 min-h-[300px]">
        {activeTab === "dest" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Origin</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    required
                    placeholder="Enter city of origin"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-150 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none text-sm font-medium text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block flex justify-between">
                  <span>Destination</span>
                  <span className="text-[10px] text-emerald-600 font-normal lowercase">(optional - leave blank to let AI decide!)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="Where to? (e.g. Manali)"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-150 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none text-sm font-medium text-gray-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-150 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none text-sm font-medium text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Duration (Days)</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={days}
                    onChange={e => setDays(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-150 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none text-sm font-medium text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Is Round Trip?</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRoundTrip(true)}
                    className={`flex-1 py-3 text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                      isRoundTrip 
                        ? "bg-emerald-50 border-[#006A4E] text-[#006A4E]" 
                        : "border-gray-200 text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRoundTrip(false)}
                    className={`flex-1 py-3 text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                      !isRoundTrip 
                        ? "bg-emerald-50 border-[#006A4E] text-[#006A4E]" 
                        : "border-gray-200 text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pref" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Budget in INR (₹)</label>
                <div className="relative">
                  <Wallet className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input
                    type="number"
                    min={1000}
                    step={1000}
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    required
                    placeholder="Enter max budget (e.g. 45000)"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-150 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none text-sm font-medium text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Luxury Level</label>
                <div className="flex gap-2">
                  {["budget", "moderate", "luxury"].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setLuxuryLevel(level)}
                      className={`flex-1 py-3 text-sm font-bold rounded-2xl border capitalize transition-all cursor-pointer ${
                        luxuryLevel === level 
                          ? "bg-emerald-50 border-[#006A4E] text-[#006A4E]" 
                          : "border-gray-200 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Food Preference</label>
                <div className="flex gap-2">
                  {[
                    { id: "veg", label: "Pure Veg" },
                    { id: "non_veg", label: "Non Veg" },
                    { id: "any", label: "Any food" }
                  ].map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFoodPreference(option.id)}
                      className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                        foodPreference === option.id 
                          ? "bg-emerald-50 border-[#006A4E] text-[#006A4E]" 
                          : "border-gray-200 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Travel Style</label>
                <div className="flex flex-wrap gap-2">
                  {["adventure", "leisure", "cultural", "spiritual"].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setTravelStyle(style)}
                      className={`flex-1 min-w-[80px] py-3 text-xs md:text-sm font-bold rounded-2xl border capitalize transition-all cursor-pointer ${
                        travelStyle === style 
                          ? "bg-emerald-50 border-[#006A4E] text-[#006A4E]" 
                          : "border-gray-200 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "party" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 max-w-md">
              <Users className="text-[#006A4E]" size={20} />
              <div className="flex-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Travelers</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={totalPersons}
                  onChange={e => setTotalPersons(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-3 py-1.5 rounded-xl border border-gray-200 focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E] outline-none font-bold text-gray-800 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {travelers.map((tr, index) => (
                <div key={index} className="bg-white border border-gray-150 rounded-2xl p-4 space-y-4 shadow-sm relative animate-[fadeIn_0.2s_ease-out]">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span className="text-xs font-extrabold text-[#006A4E]">Traveler #{index + 1}</span>
                    <span className="text-[10px] text-gray-400 font-bold">Details</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Gender</label>
                      <select
                        value={tr.sex}
                        onChange={e => handleTravelerChange(index, "sex", e.target.value)}
                        className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Age</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={tr.age}
                        onChange={e => handleTravelerChange(index, "age", e.target.value)}
                        className="w-full bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "transit" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100 mb-2">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-gray-800">Mixed Travel Medium</h4>
                <p className="text-[11px] text-gray-400 font-medium">Let AI mix and match planes, trains, and cabs automatically</p>
              </div>
              <button
                type="button"
                onClick={() => setTravelMedium(prev => ({ ...prev, mixed_best_suitable: !prev.mixed_best_suitable }))}
                className={`w-12 h-6.5 rounded-full p-1 transition-all duration-300 cursor-pointer ${
                  travelMedium.mixed_best_suitable ? "bg-[#006A4E] flex justify-end" : "bg-gray-200 flex justify-start"
                }`}
              >
                <span className="w-4.5 h-4.5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Car Medium details */}
              <div className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-white shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={travelMedium.car.selected}
                    onChange={() => handleMediumToggle("car")}
                    className="w-4 h-4 text-[#006A4E] rounded border-gray-300 focus:ring-[#006A4E]"
                  />
                  <Car size={18} className={travelMedium.car.selected ? "text-[#006A4E]" : "text-gray-400"} />
                  <span className="text-xs font-bold text-gray-800">Car Expedition</span>
                </label>

                {travelMedium.car.selected && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Car Class</label>
                      <select
                        value={travelMedium.car.type}
                        onChange={e => handleMediumChange("car", "type", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="suv">SUV / Off-Road</option>
                        <option value="sedan">Sedan</option>
                        <option value="hatchback">Hatchback</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Car Ownership</label>
                      <select
                        value={travelMedium.car.ownership}
                        onChange={e => handleMediumChange("car", "ownership", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="rented">Rented Car</option>
                        <option value="personal">Personal Car</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Flight Medium details */}
              <div className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-white shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={travelMedium.flights.selected}
                    onChange={() => handleMediumToggle("flights")}
                    className="w-4 h-4 text-[#006A4E] rounded border-gray-300 focus:ring-[#006A4E]"
                  />
                  <Plane size={18} className={travelMedium.flights.selected ? "text-[#006A4E]" : "text-gray-400"} />
                  <span className="text-xs font-bold text-gray-800">Flight Journey</span>
                </label>

                {travelMedium.flights.selected && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Cabin Class</label>
                      <select
                        value={travelMedium.flights.class}
                        onChange={e => handleMediumChange("flights", "class", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Train Medium details */}
              <div className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-white shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={travelMedium.train.selected}
                    onChange={() => handleMediumToggle("train")}
                    className="w-4 h-4 text-[#006A4E] rounded border-gray-300 focus:ring-[#006A4E]"
                  />
                  <Train size={18} className={travelMedium.train.selected ? "text-[#006A4E]" : "text-gray-400"} />
                  <span className="text-xs font-bold text-gray-800">Indian Railways</span>
                </label>

                {travelMedium.train.selected && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Ticket Class</label>
                      <select
                        value={travelMedium.train.class}
                        onChange={e => handleMediumChange("train", "class", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="1AC">1AC Sleeper</option>
                        <option value="2AC">2AC Sleeper</option>
                        <option value="3AC">3AC Sleeper</option>
                        <option value="sleeper">Sleeper Class (SL)</option>
                        <option value="chair_car">AC Chair Car (CC)</option>
                        <option value="general">Unreserved / General</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Bike Medium details */}
              <div className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-white shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={travelMedium.bike.selected}
                    onChange={() => handleMediumToggle("bike")}
                    className="w-4 h-4 text-[#006A4E] rounded border-gray-300 focus:ring-[#006A4E]"
                  />
                  <Bike size={18} className={travelMedium.bike.selected ? "text-[#006A4E]" : "text-gray-400"} />
                  <span className="text-xs font-bold text-gray-800">Motorcycle Trip</span>
                </label>

                {travelMedium.bike.selected && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-7 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bike Type</label>
                      <select
                        value={travelMedium.bike.type}
                        onChange={e => handleMediumChange("bike", "type", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="off_road">Adventure / Off-Road</option>
                        <option value="normal_city">City Cruiser</option>
                        <option value="sports">Sports</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Riding Share</label>
                      <select
                        value={travelMedium.bike.sharing}
                        onChange={e => handleMediumChange("bike", "sharing", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="individual">Solo rider</option>
                        <option value="two_on_one">Double (Pillion)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bike Ownership</label>
                      <select
                        value={travelMedium.bike.ownership}
                        onChange={e => handleMediumChange("bike", "ownership", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="rented">Rented Bike</option>
                        <option value="personal">Personal Bike</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Bus Medium details */}
              <div className="border border-gray-100 rounded-2xl p-4 space-y-4 bg-white shadow-xs">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={travelMedium.bus.selected}
                    onChange={() => handleMediumToggle("bus")}
                    className="w-4 h-4 text-[#006A4E] rounded border-gray-300 focus:ring-[#006A4E]"
                  />
                  <Bus size={18} className={travelMedium.bus.selected ? "text-[#006A4E]" : "text-gray-400"} />
                  <span className="text-xs font-bold text-gray-800">Bus Journey</span>
                </label>

                {travelMedium.bus.selected && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bus Class</label>
                      <select
                        value={travelMedium.bus.class}
                        onChange={e => handleMediumChange("bus", "class", e.target.value)}
                        className="bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 outline-none w-full"
                      >
                        <option value="ac_sleeper">AC Sleeper</option>
                        <option value="ac_seater">AC Seater</option>
                        <option value="volvo">Volvo Multi-Axle</option>
                        <option value="non_ac">Ordinary Non-AC</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Action Footer */}
      <div className="border-t border-gray-100 p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400 font-medium">
          Note: YouGO AI requires approximately 5 to 15 seconds to orchestrate coordinates, maps, and weather details.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-[#006A4E] hover:bg-[#00523C] disabled:bg-emerald-800/50 text-white font-bold py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Enqueuing Job...</span>
            </>
          ) : (
            <>
              <Wand2 size={16} />
              <span>Generate AI Expedition</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
