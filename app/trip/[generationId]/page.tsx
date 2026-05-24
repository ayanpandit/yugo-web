"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "../../components/dashboard/dashboard-layout";
import { 
  MapPin, Calendar, Compass, ShieldCheck, Users, AlertTriangle, 
  Briefcase, Wallet, Leaf, CheckCircle, Clock, Copy, ArrowRight, 
  Star, Sparkles, Zap, Bus, Car, Bike, Train, Plane, Info, 
  Check, HelpCircle, ChevronLeft, RefreshCw
} from "lucide-react";
import { tripDetailService } from "../../services/trip-detail.service";
import { TripDetailRecord, DailyItinerary } from "../../types/trip-detail";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const generationId = params?.generationId as string;

  const [trip, setTrip] = useState<TripDetailRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!generationId) return;

    const loadTripData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tripDetailService.fetchTripDetail(generationId);
        setTrip(data);
      } catch (err: any) {
        console.error("Error fetching trip details:", err);
        setError(err.message || "Unable to retrieve trip information. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    loadTripData();
  }, [generationId]);

  const handleCopyId = () => {
    if (trip?.generationId) {
      navigator.clipboard.writeText(trip.generationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "TBD";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return "TBD";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch {
      return dateStr;
    }
  };

  // 1. Loading Skeleton state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse py-8 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-[28px]"></div>
              ))}
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="h-80 bg-gray-200 rounded-[32px]"></div>
              <div className="h-28 bg-gray-200 rounded-2xl"></div>
              <div className="h-[600px] bg-gray-200 rounded-[32px]"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // 2. Error state with retry action
  if (error || !trip) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <AlertTriangle size={36} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800">Trip Could Not Be Retrieved</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {error || "We encountered an unexpected issue while downloading the itinerary details from YouGO servers."}
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={() => router.push("/explore")}
              className="px-5 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Explore Feed
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#006A4E] hover:bg-[#00523C] text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // extract variables safely with UI fallbacks
  const payload = trip.payload || {};
  const preferences = payload.preferences || {};
  const tripDetails = payload.trip_details || {};
  const travelMedium = payload.travel_medium || {};
  const partyComposition = payload.party_composition || {};

  const response = trip.response || {};
  const summary = response.summary || {};
  const days = response.days || [];
  const logistics = response.logistics || {};
  const survivalGuide = response.survivalGuide || {};
  const travelInsights = response.travelInsights || {};
  const totalCostSummary = response.totalCostSummary || {};
  const costBreakdownFull = response.costBreakdownFull || {};

  const destinationName = trip.destination || summary.destination || tripDetails.destination || "Scenic Destination";
  const coverImage = trip.coverImage || summary.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200";
  const tripType = trip.tripType || summary.tripType || tripDetails.isRoundTrip ? "Round Trip" : "One Way";
  const durationDays = trip.totalDays || summary.totalDays || tripDetails.days || 1;
  const budgetVal = tripDetails.budgetINR || 0;
  const originVal = tripDetails.origin || "Ghaziabad";
  const startDateVal = tripDetails.startDate || "15 June 2026";
  const totalPersonsCount = trip.totalPersons || summary.totalPersons || partyComposition.totalPersons || 1;
  const experienceType = trip.experienceType || summary.experienceType || "Adventure & Mountain Exploration";
  const perPersonCostVal = trip.perPersonCost || totalCostSummary.perPersonINR || 0;

  return (
    <DashboardLayout>
      <div className="w-full bg-[#FAFAFA] min-h-screen py-6 md:py-10 px-4 md:px-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Navigation & Title Header */}
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push("/explore")}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#006A4E] transition-all bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm shrink-0"
          >
            <ChevronLeft size={16} />
            Back to Explore Feed
          </button>
        </div>

        {/* Outer Columns Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Metadata column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Trip Overview Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <h3 className="font-extrabold text-gray-800 text-sm">Trip Overview</h3>
                <span className="bg-[#E6F4EA] text-[#006A4E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> Completed
                </span>
              </div>
              
              <div className="space-y-3.5 text-xs text-gray-500 font-medium">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Generation ID</p>
                  <div className="flex items-center justify-between bg-[#F4F5F6] px-3 py-2 rounded-xl border border-gray-100">
                    <span className="font-mono text-gray-700 truncate mr-2 select-all">{trip.generationId}</span>
                    <button 
                      onClick={handleCopyId}
                      className="text-gray-400 hover:text-[#006A4E] shrink-0 transition-colors"
                      title="Copy ID"
                    >
                      <Copy size={13} className={copied ? "text-emerald-500" : ""} />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Created At</p>
                  <p className="text-gray-700 font-bold">{formatTimestamp(trip.createdAt)}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Updated At</p>
                  <p className="text-gray-700 font-bold">{formatTimestamp(trip.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Journey Summary Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-5">
              <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-3">Journey Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Destination</p>
                    <p className="text-xs text-gray-800 font-extrabold truncate">{destinationName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Duration</p>
                    <p className="text-xs text-gray-800 font-extrabold">{durationDays} Days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Start Date</p>
                    <p className="text-xs text-gray-800 font-extrabold">{formatDate(startDateVal)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={16} className="rotate-180 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Origin</p>
                    <p className="text-xs text-gray-800 font-extrabold truncate">{originVal}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Budget</p>
                    <p className="text-xs text-gray-800 font-extrabold">₹{budgetVal.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 text-[#006A4E] rounded-xl flex items-center justify-center shrink-0">
                    <Compass size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Trip Type</p>
                    <p className="text-xs text-gray-800 font-extrabold">{tripType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-3">Preferences</h3>
              
              <div className="space-y-3.5 text-xs text-gray-500 font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Luxury Level</span>
                  <span className="text-gray-800 capitalize font-extrabold bg-[#F4F5F6] px-3 py-1 rounded-lg">
                    {preferences.luxury_level || "Moderate"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Travel Style</span>
                  <span className="text-gray-800 capitalize font-extrabold bg-[#F4F5F6] px-3 py-1 rounded-lg">
                    {preferences.travel_style || "Adventure"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Food Preference</span>
                  <span className="text-gray-800 capitalize font-extrabold bg-[#F4F5F6] px-3 py-1 rounded-lg">
                    {preferences.food_preference || "Veg"}
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Mediums Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-3">Travel Medium</h3>
              
              <div className="space-y-3">
                {[
                  { name: "Car", icon: Car, config: travelMedium.car },
                  { name: "Bus", icon: Bus, config: travelMedium.bus },
                  { name: "Bike", icon: Bike, config: travelMedium.bike },
                  { name: "Train", icon: Train, config: travelMedium.train },
                  { name: "Flights", icon: Plane, config: travelMedium.flights }
                ].map((item, i) => {
                  const isSelected = item.config?.selected || false;
                  
                  // Label details if present
                  let detail = "";
                  if (isSelected && item.name === "Car" && item.config) {
                    const ownership = item.config.ownership === "rented" ? "Rented" : "Self-Drive";
                    const carType = item.config.type ? `${item.config.type.toUpperCase()}` : "SUV";
                    detail = ` (${ownership} ${carType})`;
                  }

                  return (
                    <div 
                      key={i} 
                      className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                        isSelected ? "bg-emerald-50/80 border border-green-200" : "bg-transparent opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <item.icon size={15} className={isSelected ? "text-[#006A4E]" : "text-gray-400"} />
                        <span>{item.name}{detail}</span>
                      </div>
                      {isSelected ? (
                        <div className="w-4 h-4 bg-[#006A4E] rounded-full flex items-center justify-center text-white shrink-0">
                          <Check size={10} />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border border-gray-200 rounded-full shrink-0"></div>
                      )}
                    </div>
                  );
                })}

                <hr className="border-gray-50 my-2" />

                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 pt-1">
                  <span>Mixed (Best Suitable)</span>
                  <span className="text-gray-800 font-extrabold">{travelMedium.mixed_best_suitable ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            {/* Party Composition Card */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-3 flex items-center gap-2">
                <Users size={16} className="text-[#006A4E]" /> Party Composition
              </h3>
              
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-600">{totalPersonsCount} Travelers</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {(partyComposition.travelers || summary.travelers || []).map((tr: any, idx: number) => (
                    <div key={idx} className="bg-[#F4F5F6] border border-gray-50 rounded-2xl p-3 text-center space-y-1.5 shadow-sm">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center mx-auto text-gray-400 font-bold border border-gray-100 text-xs">
                        👤
                      </div>
                      <div>
                        <p className="text-[11px] font-extrabold text-gray-800">{tr.age} yrs</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{tr.sex === "M" ? "Male" : "Female"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Main detailed column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Visual Cover Banner Card */}
            <div className="relative h-72 md:h-80 w-full rounded-[36px] overflow-hidden shadow-sm border border-gray-100">
              <img 
                src={coverImage} 
                alt={destinationName} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 space-y-4 text-white">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
                  {destinationName} Adventure Escape
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm font-semibold opacity-95">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-emerald-400 shrink-0" />
                    <span>{originVal}</span>
                    <ArrowRight size={14} className="mx-1" />
                    <span className="font-extrabold text-yellow-350">{destinationName}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Calendar size={16} className="text-emerald-400 shrink-0" />
                    <span>{formatDate(startDateVal)} ({durationDays} Days)</span>
                  </div>

                  {tripDetails.isRoundTrip && (
                    <div className="flex items-center gap-1.5 shrink-0 bg-emerald-500/80 backdrop-blur-sm border border-emerald-400/20 px-3 py-1 rounded-full text-xs font-bold">
                      <Compass size={12} /> Round Trip
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center">
                  <span className="bg-black/45 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-yellow-300">
                    Daily Pacing: Moderate
                  </span>
                </div>
              </div>
            </div>

            {/* Trip Generation Steps Bar */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trip Generation Steps</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Enrichment", label: "enrichment", time: "01:16:55 PM" },
                  { name: "LLM Generation", label: "llm-generation", time: "01:17:03 PM" },
                  { name: "Validation", label: "validation", time: "01:17:04 PM" }
                ].map((step, sIdx) => {
                  return (
                    <div key={sIdx} className="bg-[#F9FAFB] border border-gray-50 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                      <div className="w-7 h-7 bg-emerald-50 text-[#006A4E] rounded-full flex items-center justify-center shrink-0 border border-green-100">
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 mb-0.5">{step.name}</h5>
                        <span className="bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Completed</span>
                        <p className="text-[10px] text-gray-400 font-semibold mt-2">{formatTimestamp(trip.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Granular Days Itinerary */}
            <div className="space-y-10">
              {days.map((d: DailyItinerary) => {
                const accommodationVal = d.accommodation || {};
                const weatherVal = d.predictedWeather || {};
                const costBreakdownVal = d.costBreakdown || {};
                const transportDetailsVal = d.transportDetails || {};
                const dailyActivitiesVal = d.dailyActivities || [];

                // sum total food costs per person
                const bFood = Number(costBreakdownVal.foodINR?.breakfast) || 0;
                const lFood = Number(costBreakdownVal.foodINR?.lunch) || 0;
                const dFood = Number(costBreakdownVal.foodINR?.dinner) || 0;
                const snacksVal = Math.round((bFood + lFood + dFood) * 0.15);
                const accommodationCost = Number(costBreakdownVal.accommodationINR) || Number(accommodationVal.pricePerPersonINR) || 0;

                const dayTotalCost = 
                  Number(costBreakdownVal.transportBaseINR || 0) + 
                  Number(costBreakdownVal.fuelINR || 0) + 
                  Number(costBreakdownVal.tollsINR || 0) + 
                  accommodationCost + 
                  Number(costBreakdownVal.activitiesINR || 0) + 
                  bFood + lFood + dFood + snacksVal;

                return (
                  <div key={d.day} className="bg-white border border-gray-100 rounded-[36px] p-6 md:p-8 shadow-sm space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-350">
                    
                    {/* Day Itinerary Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 pb-5">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#3B82F6] text-white text-xs font-black px-4 py-2 rounded-xl shadow-md shadow-blue-500/10 shrink-0">
                          Day {d.day}
                        </span>
                        <div>
                          <h3 className="font-extrabold text-gray-800 text-lg md:text-xl leading-tight">
                            {d.title || "The Ascent & Exploring Trails"}
                          </h3>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{d.route}</p>
                        </div>
                      </div>
                      
                      <div className="bg-[#F4F5F6] border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-500 shrink-0 flex items-center gap-2 self-start sm:self-center">
                        <Calendar size={14} className="text-[#006A4E]" />
                        <span>{d.date}</span>
                      </div>
                    </div>

                    {/* Quick day metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F9FAFB] border border-gray-50 p-4 rounded-3xl">
                      <div className="text-center sm:border-r border-gray-100/70 p-2">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Distance</p>
                        <p className="text-xs font-black text-gray-800">{d.distance || "N/A"}</p>
                      </div>
                      <div className="text-center sm:border-r border-gray-100/70 p-2">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Travel Time</p>
                        <p className="text-xs font-black text-gray-800">{d.travelTime || "N/A"}</p>
                      </div>
                      <div className="text-center sm:border-r border-gray-100/70 p-2">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Altitude</p>
                        <p className="text-xs font-black text-gray-800">{d.altitudeSeaLevel || "2050m"}</p>
                      </div>
                      <div className="text-center p-2">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Pacing</p>
                        <p className="text-xs font-black text-gray-800">{d.dailyPacing || "Moderate"}</p>
                      </div>
                    </div>

                    {/* Visual & Description Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                      <div className="h-56 md:h-64 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
                        <img 
                          src={d.destinationImageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600"} 
                          alt="Scenic Route Landscape" 
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-6">
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                          {d.experienceDescription || "Scenic route with beautiful hill viewpoints and mountain curves."}
                        </p>

                        {/* Weather forecast forecast */}
                        <div className="bg-[#FFFDF9] border border-amber-100 rounded-3xl p-5 shadow-xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">☀️</span>
                            <div>
                              <p className="text-[9px] text-amber-500 font-black uppercase tracking-wider">Predicted Weather</p>
                              <p className="text-xs font-extrabold text-gray-800">{weatherVal.conditions || "Clear Skies / Cool Breeze"}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 text-center shrink-0">
                            <div>
                              <p className="text-[9px] text-gray-400 font-semibold mb-0.5">Low</p>
                              <p className="text-xs font-black text-gray-800">{weatherVal.temperatureLow || "12°C"}</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-gray-400 font-semibold mb-0.5">High</p>
                              <p className="text-xs font-black text-gray-800">{weatherVal.temperatureHigh || "22°C"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accommodation & Cost Breakdown row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      
                      {/* Accommodation Details */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-50 pb-2">
                            <span>🏨 Accommodation</span>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-extrabold text-gray-800 text-base">{accommodationVal.hotelName || "Hotel Manali Heights"}</h4>
                            
                            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                              <Star size={12} className="fill-yellow-400" />
                              <Star size={12} className="fill-yellow-400" />
                              <Star size={12} className="fill-yellow-400" />
                              <Star size={12} className="fill-yellow-400" />
                              <Star size={12} className="text-gray-200 fill-gray-200" />
                            </div>

                            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                              {accommodationVal.whyRecommended || accommodationVal.WhyRecommended || "Highly recommended for scenic balconies views and cleanliness."}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 space-y-4">
                          <div className="flex justify-between items-center bg-[#F4F5F6] p-3 rounded-2xl border border-gray-100">
                            <span className="text-xs font-bold text-[#006A4E]">{accommodationVal.bookingPlatform || accommodationVal.BookingPlatform || "Booking.com"}</span>
                            <span className="text-xs font-black text-gray-800">
                              ₹{(accommodationVal.pricePerPersonINR || accommodationVal.PricePerPersonINR || 1600).toLocaleString()} <span className="text-[10px] font-bold text-gray-400">/ Person</span>
                            </span>
                          </div>

                          {(accommodationVal.bookingLink || accommodationVal.BookingLink) && (
                            <a 
                              href={accommodationVal.bookingLink || accommodationVal.BookingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-[#F4F5F6] border border-gray-150 hover:bg-gray-100 text-gray-700 text-xs font-bold py-3 rounded-xl block text-center transition-all shadow-xs active:scale-[0.98]"
                            >
                              View on {accommodationVal.bookingPlatform || accommodationVal.BookingPlatform || "Booking.com"} 🔗
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Daily Cost Breakdown details */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 mb-2">
                          <span>💰 Cost Breakdown (Per Person)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs font-semibold text-gray-500">
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Breakfast</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.foodINR?.breakfast || 300).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Fuel</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.fuelINR || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Lunch</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.foodINR?.lunch || 700).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Tolls</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.tollsINR || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Dinner</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.foodINR?.dinner || 1200).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Transport (Base)</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.transportBaseINR || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Activities</span>
                            <span className="text-gray-800 font-extrabold">₹{(costBreakdownVal.activitiesINR || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50/50 pb-1">
                            <span>Accommodation</span>
                            <span className="text-gray-800 font-extrabold">
                              ₹{(accommodationCost || 1600).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-emerald-50/80 border border-green-100 p-3.5 rounded-2xl mt-4 font-black text-sm">
                          <span className="text-gray-700">Total (Per Person)</span>
                          <span className="text-[#006A4E] text-base">₹{dayTotalCost.toLocaleString()}</span>
                        </div>
                      </div>

                    </div>

                    {/* Daily Activities & Transit Vehicles Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      
                      {/* Activities lists */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 mb-2">
                          <span>🎪 Activities</span>
                        </div>

                        {dailyActivitiesVal.length === 0 ? (
                          <p className="text-xs text-gray-400 font-medium text-center py-6">No scheduled activities for this day.</p>
                        ) : (
                          <div className="space-y-4">
                            {dailyActivitiesVal.map((act, actIdx) => (
                              <div key={actIdx} className="flex gap-4 items-start bg-[#F9FAFB] p-3 rounded-2xl border border-gray-50">
                                {act.imageUrl && (
                                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-xs">
                                    <img src={act.imageUrl} alt={act.name} className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-xs font-extrabold text-gray-800 truncate">{act.name}</h5>
                                  <p className="text-[10px] text-gray-500 font-semibold line-clamp-2 mt-1 leading-relaxed">{act.detail}</p>
                                  {act.estimatedINR && (
                                    <span className="inline-block bg-blue-50 text-[#3B82F6] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-2">
                                      Estimated: ₹{act.estimatedINR}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Transit Details */}
                      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 mb-2">
                          <span>🚘 Transport Details</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="space-y-3.5 text-xs font-semibold text-gray-500 flex-1">
                            <div className="flex justify-between border-b border-gray-50/50 pb-1">
                              <span>Type</span>
                              <span className="text-gray-800 font-extrabold">{transportDetailsVal.type || "Car (Rented)"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50/50 pb-1">
                              <span>Sub Type</span>
                              <span className="text-gray-800 font-extrabold">{transportDetailsVal.subType || "Mahindra Thar"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50/50 pb-1">
                              <span>Departure Time</span>
                              <span className="text-gray-800 font-extrabold">{transportDetailsVal.departureTime || "04:30 AM"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50/50 pb-1">
                              <span>Arrival Time</span>
                              <span className="text-gray-800 font-extrabold">{transportDetailsVal.arrivalTime || "05:00 PM"}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50/50 pb-1">
                              <span>Flight/Train No.</span>
                              <span className="text-gray-800 font-extrabold">{transportDetailsVal.flightOrTrainNumber || "Not Applicable"}</span>
                            </div>
                          </div>

                          {/* Car image preview */}
                          <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden border border-gray-150 shadow-xs relative shrink-0">
                            <img 
                              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400" 
                              alt="Expedition Vehicle" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Note */}
                    <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-[10px] text-blue-700 font-semibold flex items-start gap-2 leading-relaxed">
                      <Info size={14} className="shrink-0 text-blue-500 mt-0.5" />
                      <span>Note: All prices listed are per person and in INR (₹). Prices are indicative estimates and subject to regional variations.</span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Travel Insights & Survival Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Logistics & Survival Guide */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#006A4E]" /> Survival Guide & Logistics
                </h3>
                
                <div className="space-y-4">
                  {survivalGuide.scamWarnings && survivalGuide.scamWarnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Scam Warnings
                      </h4>
                      <ul className="text-xs text-gray-500 font-semibold list-disc pl-5 space-y-1.5 leading-relaxed">
                        {survivalGuide.scamWarnings.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {survivalGuide.culturalNorms && survivalGuide.culturalNorms.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Users size={14} /> Cultural Norms
                      </h4>
                      <ul className="text-xs text-gray-500 font-semibold list-disc pl-5 space-y-1.5 leading-relaxed">
                        {survivalGuide.culturalNorms.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {logistics.packingList && logistics.packingList.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase size={14} /> Packing Essentials
                      </h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {logistics.packingList.map((item: string, i: number) => (
                          <span key={i} className="bg-gray-100 border border-gray-150/40 text-gray-600 text-[10px] font-extrabold px-3 py-1.5 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Insights */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="font-extrabold text-gray-800 text-base border-b border-gray-50 pb-3 flex items-center gap-2">
                  <Leaf size={18} className="text-[#006A4E]" /> Travel Insights & Gems
                </h3>

                <div className="space-y-4">
                  {travelInsights.hiddenGems && travelInsights.hiddenGems.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-[#006A4E] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14} /> Hidden Gems
                      </h4>
                      <ul className="text-xs text-gray-500 font-semibold list-disc pl-5 space-y-1.5 leading-relaxed">
                        {travelInsights.hiddenGems.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {travelInsights.sustainabilityTips && travelInsights.sustainabilityTips.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Leaf size={14} /> Sustainability Tips
                      </h4>
                      <ul className="text-xs text-gray-500 font-semibold list-disc pl-5 space-y-1.5 leading-relaxed">
                        {travelInsights.sustainabilityTips.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {travelInsights.bestTimeToVisit && (
                    <div className="bg-emerald-50/50 border border-green-100 rounded-2xl p-4 text-xs font-semibold text-gray-600">
                      📅 <span className="font-black text-gray-800">Best Time to Visit:</span> {travelInsights.bestTimeToVisit}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Banner: Trip at a Glance */}
        <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full lg:w-auto">
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Destination</p>
              <p className="text-sm font-extrabold text-gray-800">{destinationName}</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-extrabold text-gray-800">{durationDays} Days</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Start Date</p>
              <p className="text-sm font-extrabold text-gray-800">{formatDate(startDateVal)}</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Travelers</p>
              <p className="text-sm font-extrabold text-gray-800">{totalPersonsCount} Persons</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Budget</p>
              <p className="text-sm font-extrabold text-gray-800">₹{budgetVal.toLocaleString()}</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Trip Type</p>
              <p className="text-sm font-extrabold text-gray-800">{tripType}</p>
            </div>
          </div>

          <div className="bg-[#E6F4EA] border border-green-100 rounded-2xl p-5 text-center lg:text-right shrink-0 min-w-[200px] w-full lg:w-auto shadow-sm">
            <p className="text-[10px] text-[#006A4E] font-black uppercase tracking-wider mb-1">Total Estimated Cost (Per Person)</p>
            <h3 className="text-3xl font-black text-[#006A4E]">
              ₹{perPersonCostVal.toLocaleString() || "N/A"}
            </h3>
            <p className="text-[10px] font-bold text-green-700 mt-1">Approx.</p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
