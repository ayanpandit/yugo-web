"use client";

import React, { useState } from "react";
import { 
  MapPin, Calendar, Wallet, Clock, Compass, Users, 
  Car, Bus, Bike, Train, Plane, Star, Info, ChevronRight,
  ShieldCheck, AlertTriangle, ArrowRight, CheckCircle, Briefcase, Leaf
} from "lucide-react";

interface AIReviewProps {
  itinerary: any;
  onSave: () => void;
  onPost: () => void;
  actionLoading: boolean;
}

export default function AIReview({ itinerary, onSave, onPost, actionLoading }: AIReviewProps) {
  const [activeDay, setActiveDay] = useState<number>(1);

  const summary = itinerary.summary || {};
  const days = itinerary.days || [];
  const logistics = itinerary.logistics || {};
  const survivalGuide = itinerary.survivalGuide || {};
  const travelInsights = itinerary.travelInsights || {};
  const totalCostSummary = itinerary.totalCostSummary || {};
  const costBreakdownFull = itinerary.costBreakdownFull || {};

  const destination = summary.destination || "Scenic Destination";
  const coverImage = summary.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200";
  const durationDays = summary.totalDays || days.length || 1;
  const tripType = summary.tripType || "Round Trip";
  const totalPersons = summary.totalPersons || 1;
  const experienceType = summary.experienceType || "Adventure";
  const perPersonCost = totalCostSummary.perPersonINR || 0;

  // Financial Breakdown calculations
  const stayCost = Number(costBreakdownFull.stayINR) || 0;
  const interCityCost = Number(costBreakdownFull.interCityTransportINR) || 0;
  const intraCityCost = Number(costBreakdownFull.intraCityTransportINR) || 0;
  const transportCost = interCityCost + intraCityCost;
  const activitiesCost = Number(costBreakdownFull.activitiesINR) || 0;
  
  const foodBreakdown = costBreakdownFull.foodBreakdownINR || {};
  const foodCost = (Number(foodBreakdown.breakfast) || 0) + 
                   (Number(foodBreakdown.lunch) || 0) + 
                   (Number(foodBreakdown.dinner) || 0) + 
                   (Number(foodBreakdown.snacksAndDrinks) || 0);
  
  const hiddenBreakdown = costBreakdownFull.hiddenCostsINR || {};
  const hiddenCost = (Number(hiddenBreakdown.fuelEstimatedTotal) || 0) + 
                     (Number(hiddenBreakdown.tollsAndTaxes) || 0) + 
                     (Number(hiddenBreakdown.tips) || 0) + 
                     (Number(hiddenBreakdown.permits) || 0);

  const safeCost = totalCostSummary.safeCostINR || (perPersonCost * totalPersons) || 0;
  const minCost = totalCostSummary.minimumCostINR || Math.round(safeCost * 0.9);
  const maxCost = totalCostSummary.maxCostINR || Math.round(safeCost * 1.1);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out] pb-24">
      {/* Visual Cover Banner Card */}
      <div className="relative h-64 md:h-72 w-full rounded-[32px] overflow-hidden shadow-md border border-gray-100">
        <img 
          src={coverImage} 
          alt={destination} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <span className="bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
            ✨ AI Generated Masterpiece
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {destination}
          </h1>
          <p className="text-xs md:text-sm font-semibold opacity-90 flex items-center gap-2">
            <span>{experienceType}</span>
            <span>•</span>
            <span>{durationDays} Days</span>
            <span>•</span>
            <span>{tripType}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Itinerary Details, Survival Guide, & Insights */}
        <div className="flex-1 space-y-10 w-full">
          
          {/* Day Selector & Itinerary Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Itinerary Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Day Selector Navigation */}
              <div className="md:col-span-3 flex md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                {days.map((d: any) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setActiveDay(d.day)}
                    className={`py-3 px-4 rounded-xl text-left font-bold text-xs md:text-sm transition-all border shrink-0 cursor-pointer flex items-center justify-between ${
                      activeDay === d.day
                        ? "bg-[#006A4E] border-[#006A4E] text-white shadow-md"
                        : "bg-white border-gray-100 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span>Day {d.day}</span>
                    <ChevronRight size={14} className={`hidden md:block transition-transform ${activeDay === d.day ? "translate-x-1" : "opacity-30"}`} />
                  </button>
                ))}
              </div>

              {/* Selected Day View */}
              <div className="md:col-span-9 bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm space-y-6">
                {days.filter((d: any) => d.day === activeDay).map((d: any) => {
                  const accommodation = d.accommodation || {};
                  const weather = d.predictedWeather || {};
                  const cost = d.costBreakdown || {};
                  const transport = d.transportDetails || {};
                  const activities = d.dailyActivities || [];

                  // Sum this day's cost
                  const foodCost = (Number(cost.foodINR?.breakfast) || 0) + (Number(cost.foodINR?.lunch) || 0) + (Number(cost.foodINR?.dinner) || 0);
                  const totalDayCost = (Number(cost.transportBaseINR) || 0) + (Number(cost.fuelINR) || 0) + (Number(cost.tollsINR) || 0) + (Number(accommodation.pricePerPersonINR) || 0) + (Number(cost.activitiesINR) || 0) + foodCost;

                  return (
                    <div key={d.day} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                      {/* Title */}
                      <div className="border-b border-gray-50 pb-4">
                        <h3 className="text-lg md:text-xl font-extrabold text-gray-800">{d.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{d.route} ({d.distance})</p>
                      </div>

                      {/* Day Meta Info */}
                      <div className="grid grid-cols-3 gap-3 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-center text-xs font-bold text-gray-700">
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase">Altitude</p>
                          <p className="text-gray-800 mt-0.5">{d.altitudeSeaLevel || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase">Pacing</p>
                          <p className="text-gray-800 mt-0.5">{d.dailyPacing || "Moderate"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-400 uppercase">Weather</p>
                          <p className="text-[#006A4E] mt-0.5 truncate">{weather.conditions || "Cool Breeze"}</p>
                        </div>
                      </div>

                      {/* Photo & Description */}
                      <div className="space-y-4">
                        {d.destinationImageUrl && (
                          <div className="h-44 rounded-2xl overflow-hidden border border-gray-100">
                            <img src={d.destinationImageUrl} alt="Itinerary destination" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <p className="text-xs md:text-sm text-gray-550 font-medium leading-relaxed">
                          {d.experienceDescription}
                        </p>
                      </div>

                      {/* Accommodation & Transportation Split */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">🏨 Stay Recommendation</p>
                          <h5 className="text-xs font-extrabold text-gray-800">{accommodation.hotelName || "Hotel/Resort"}</h5>
                          <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">{accommodation.whyRecommended}</p>
                          <div className="pt-2 text-xs font-black text-gray-800 flex justify-between items-center">
                            <span className="text-[#006A4E] text-[11px]">{accommodation.bookingPlatform}</span>
                            <span>₹{(accommodation.pricePerPersonINR || 0).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">🚘 Day Transit</p>
                          <div className="space-y-1 text-[11px] font-semibold text-gray-500">
                            <div className="flex justify-between border-b border-gray-100/50 pb-0.5">
                              <span>Mode</span>
                              <span className="text-gray-800 font-bold">{transport.type}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100/50 pb-0.5">
                              <span>Type</span>
                              <span className="text-gray-800 font-bold">{transport.subType || "Local"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Departure</span>
                              <span className="text-gray-800 font-bold">{transport.departureTime || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Activities */}
                      {activities.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 pb-1">🎪 Day Activities</p>
                          <div className="space-y-2">
                            {activities.map((act: any, actIdx: number) => (
                              <div key={actIdx} className="flex gap-3 bg-gray-50/50 border border-gray-100 p-2.5 rounded-xl">
                                {act.imageUrl && (
                                  <img src={act.imageUrl} alt={act.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                                )}
                                <div>
                                  <h6 className="text-xs font-extrabold text-gray-800">{act.name}</h6>
                                  <p className="text-[10px] text-gray-500 font-medium mt-0.5 line-clamp-1">{act.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Day Cost Summary */}
                      <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-2xl flex justify-between items-center text-xs font-bold text-gray-700">
                        <span>Day Cost Estimate (Per Person)</span>
                        <span className="text-[#006A4E] text-sm font-black">₹{totalDayCost.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Survival Guide & Logistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Survival Guide & Logistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Health & Safety */}
              {Array.isArray(logistics.healthAndSafety) && logistics.healthAndSafety.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-3">
                    <ShieldCheck size={18} />
                    <h4>Health & Safety</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-650 font-semibold list-disc pl-4">
                    {logistics.healthAndSafety.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cultural Norms */}
              {Array.isArray(survivalGuide.culturalNorms) && survivalGuide.culturalNorms.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-3">
                    <Users size={18} />
                    <h4>Cultural Norms</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-650 font-semibold list-disc pl-4">
                    {survivalGuide.culturalNorms.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scam Warnings */}
              {Array.isArray(survivalGuide.scamWarnings) && survivalGuide.scamWarnings.length > 0 && (
                <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-red-500 font-bold mb-3">
                    <AlertTriangle size={18} />
                    <h4>Scam Warnings</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-650 font-semibold list-disc pl-4">
                    {survivalGuide.scamWarnings.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Packing Essentials */}
              {Array.isArray(logistics.packingList) && logistics.packingList.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-3">
                    <Briefcase size={18} />
                    <h4>Packing Essentials</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {logistics.packingList.map((item: string, idx: number) => (
                      <span key={idx} className="bg-[#F4F5F6] text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Apps & Emergency Contacts */}
              {((Array.isArray(survivalGuide.localAppsToDownload) && survivalGuide.localAppsToDownload.length > 0) || 
                (Array.isArray(survivalGuide.emergencyContacts) && survivalGuide.emergencyContacts.length > 0)) && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sm:col-span-2">
                  <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-3">
                    <Info size={18} />
                    <h4>Local Services & Contacts</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(survivalGuide.localAppsToDownload) && survivalGuide.localAppsToDownload.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Recommended Local Apps</p>
                        <ul className="space-y-1 text-xs text-gray-650 font-semibold list-disc pl-4">
                          {survivalGuide.localAppsToDownload.map((app: string, idx: number) => (
                            <li key={idx}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {Array.isArray(survivalGuide.emergencyContacts) && survivalGuide.emergencyContacts.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Emergency Contacts</p>
                        <ul className="space-y-1 text-xs text-gray-650 font-semibold list-disc pl-4">
                          {survivalGuide.emergencyContacts.map((contact: string, idx: number) => (
                            <li key={idx}>{contact}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Travel Insights */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Travel Insights</h3>
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="relative h-44 w-full">
                <img 
                  src={coverImage} 
                  alt="Mountain Valley" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="flex items-center gap-1 text-[9px] font-bold text-yellow-300 uppercase tracking-widest mb-1">
                    ★ BEST EXPERIENCES
                  </span>
                  <h4 className="text-xl font-bold text-white">AI Recommended Insights for {destination}</h4>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Best Experiences */}
                {Array.isArray(travelInsights.bestExperiences) && travelInsights.bestExperiences.length > 0 && (
                  <div className="space-y-1.5 border-b border-gray-50 pb-3">
                    <p className="text-[10px] text-gray-450 font-bold uppercase tracking-wider flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> Must-Do Experiences</p>
                    <ul className="space-y-1 text-xs text-gray-650 font-semibold list-disc pl-4">
                      {travelInsights.bestExperiences.map((exp: string, idx: number) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Hidden Gems */}
                  {Array.isArray(travelInsights.hiddenGems) && travelInsights.hiddenGems.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-800 font-bold">
                        <Leaf size={16} className="text-[#006A4E]" />
                        <h5>Hidden Gems</h5>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-550 font-medium list-disc pl-4">
                        {travelInsights.hiddenGems.map((gem: string, idx: number) => (
                          <li key={idx}>{gem}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Sustainability Tips */}
                  {Array.isArray(travelInsights.sustainabilityTips) && travelInsights.sustainabilityTips.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-800 font-bold">
                        <Leaf size={16} className="text-[#006A4E]" />
                        <h5>Eco-Tourism & Safety</h5>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-550 font-medium list-disc pl-4">
                        {travelInsights.sustainabilityTips.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Best Time to Visit & Caution Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-50 mt-4">
                  {travelInsights.bestTimeToVisit && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Best Season</p>
                      <p className="text-xs text-gray-800 font-extrabold">{travelInsights.bestTimeToVisit}</p>
                    </div>
                  )}
                  {Array.isArray(travelInsights.cautionPoints) && travelInsights.cautionPoints.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-red-500 font-bold uppercase flex items-center gap-1"><AlertTriangle size={12} /> Caution Warnings</p>
                      <ul className="space-y-1 text-xs text-red-650 font-semibold list-disc pl-4">
                        {travelInsights.cautionPoints.map((warn: string, idx: number) => (
                          <li key={idx}>{warn}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Financial Overview (Sticky Sidebar) */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="sticky top-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Financial Summary</h3>
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="text-center space-y-1">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Estimated Budget</p>
                <h2 className="text-4xl font-black text-[#006A4E]">₹{safeCost.toLocaleString()}</h2>
                <p className="text-xs font-semibold text-gray-500">Calculated Safe Budget</p>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-gray-700 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                <div className="text-center">
                  <p className="text-[9px] text-gray-400 mb-0.5">Min Cost</p>
                  <p>₹{minCost.toLocaleString()}</p>
                </div>
                <div className="text-center border-l border-gray-100 pl-4 pr-4">
                  <p className="text-[9px] text-gray-400 mb-0.5">Per Person</p>
                  <p className="text-[#006A4E]">₹{perPersonCost.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-gray-400 mb-0.5">Max Cost</p>
                  <p>₹{maxCost.toLocaleString()}</p>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-800 font-bold">
                  <Wallet size={16} className="text-[#006A4E]" />
                  <h4 className="text-xs uppercase tracking-wider">Budget Breakdown</h4>
                </div>

                {/* Progress Bars */}
                {[
                  { name: "Stay", cost: stayCost, colorClass: "bg-emerald-550" },
                  { name: "Transport (Inter & Intra)", cost: transportCost, colorClass: "bg-blue-500" },
                  { name: "Food & Refreshments", cost: foodCost, colorClass: "bg-amber-500" },
                  { name: "Activities", cost: activitiesCost, colorClass: "bg-[#006A4E]" },
                  { name: "Hidden Costs (Fuel, Permit, Tips)", cost: hiddenCost, colorClass: "bg-red-455" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>{item.name}</span>
                      <span>₹{item.cost.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.colorClass} rounded-full transition-all duration-500`}
                        style={{ width: `${safeCost > 0 ? Math.min((item.cost / safeCost) * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Action Footer Buttons */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-xs font-bold text-gray-800">What would you like to do with this trip?</h4>
          <p className="text-[11px] text-gray-400 font-medium">Save privately for yourself or publish to the community feed.</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            disabled={actionLoading}
            onClick={onSave}
            className="flex-1 sm:flex-none border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
          >
            Save Expedition
          </button>
          
          <button
            type="button"
            disabled={actionLoading}
            onClick={onPost}
            className="flex-1 sm:flex-none bg-[#006A4E] hover:bg-[#00523C] disabled:bg-emerald-800/50 text-white font-bold py-3.5 px-8 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Compass size={14} />
            {actionLoading ? "Publishing..." : "Post to Explore Feed"}
          </button>
        </div>
      </div>
    </div>
  );
}
