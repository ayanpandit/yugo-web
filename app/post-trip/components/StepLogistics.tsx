import React, { useState, useRef } from "react";
import { 
  ChevronUp, ChevronDown, Map, MapPin, Trash2, Plus, 
  Smile, Clock, Bed, Wallet, Navigation, Upload,
  FileText, Sun, Thermometer, Link
} from "lucide-react";
import { usePostTripStore, DayPlanState } from "./../../store/post-trip.store";

interface StepLogisticsProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepLogistics({ onNext, onBack }: StepLogisticsProps) {
  const { formData, updateDay, addDay, removeDay, uploadCover, loading } = usePostTripStore();
  const [expandedDay, setExpandedDay] = useState<number>(1);
  
  // Track which activity image is currently being uploaded
  const [uploadingActivityIndex, setUploadingActivityIndex] = useState<{ dayIdx: number; actIdx: number } | null>(null);
  const actFileInputRef = useRef<HTMLInputElement>(null);

  const handleDayValueChange = (index: number, key: keyof DayPlanState, val: any) => {
    updateDay(index, { [key]: val });
  };

  const handleWeatherChange = (index: number, key: string, val: any) => {
    const currentPrev = formData.days[index]?.predictedWeather || { conditions: "Sunny & Calm", temperatureLow: "12°C", temperatureHigh: "22°C" };
    updateDay(index, {
      predictedWeather: {
        ...currentPrev,
        [key]: val
      }
    });
  };

  const handleAccommodationChange = (index: number, key: string, val: any) => {
    const currentAcc = formData.days[index]?.accommodation || {};
    updateDay(index, {
      accommodation: {
        ...currentAcc,
        [key]: val
      }
    });
  };

  const handleTransportDetailsChange = (index: number, key: string, val: any) => {
    const currentTrans = formData.days[index]?.transportDetails || {};
    updateDay(index, {
      transportDetails: {
        ...currentTrans,
        [key]: val
      }
    });
  };

  const handleCostBreakdownChange = (index: number, key: string, val: any) => {
    const currentCost = formData.days[index]?.costBreakdown || {
      transportBaseINR: 0, fuelINR: 0, tollsINR: 0, accommodationINR: 0, activitiesINR: 0,
      foodINR: { breakfast: 500, lunch: 800, dinner: 1200 }
    };

    if (key.startsWith("food.")) {
      const foodKey = key.split(".")[1];
      updateDay(index, {
        costBreakdown: {
          ...currentCost,
          foodINR: {
            ...currentCost.foodINR,
            [foodKey]: Number(val)
          }
        }
      });
    } else {
      updateDay(index, {
        costBreakdown: {
          ...currentCost,
          [key]: Number(val)
        }
      });
    }
  };

  const handleAddActivity = (dayIndex: number) => {
    const currentDay = formData.days[dayIndex];
    const currentActs = currentDay?.dailyActivities || [];
    const newAct = {
      name: `Activity ${currentActs.length + 1}`,
      detail: "Details of this activity.",
      imageUrl: formData.imageUrl || "",
      estimatedINR: 0
    };
    updateDay(dayIndex, {
      dailyActivities: [...currentActs, newAct]
    });
  };

  const handleRemoveActivity = (dayIndex: number, actIndex: number) => {
    const currentDay = formData.days[dayIndex];
    const currentActs = currentDay?.dailyActivities || [];
    const updatedActs = currentActs.filter((_, idx) => idx !== actIndex);
    updateDay(dayIndex, {
      dailyActivities: updatedActs
    });
  };

  const handleActivityChange = (dayIndex: number, actIndex: number, key: string, val: any) => {
    const currentDay = formData.days[dayIndex];
    const currentActs = [...(currentDay?.dailyActivities || [])];
    if (currentActs[actIndex]) {
      currentActs[actIndex] = {
        ...currentActs[actIndex],
        [key]: key === "estimatedINR" ? Number(val) : val
      };
      updateDay(dayIndex, { dailyActivities: currentActs });
    }
  };

  const triggerActivityImageUpload = (dayIdx: number, actIdx: number) => {
    setUploadingActivityIndex({ dayIdx, actIdx });
    setTimeout(() => {
      actFileInputRef.current?.click();
    }, 50);
  };

  const handleActivityImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadingActivityIndex) {
      const { dayIdx, actIdx } = uploadingActivityIndex;
      const uploadedUrl = await uploadCover(file);
      if (uploadedUrl) {
        handleActivityChange(dayIdx, actIdx, "imageUrl", uploadedUrl);
      }
      setUploadingActivityIndex(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Daily Itinerary Telemetry</h2>
        <p className="text-gray-400 text-sm">Fine-tune the exact weather, route telemetry, transport timings, and direct accommodation bookings.</p>
      </div>

      <input 
        type="file" 
        ref={actFileInputRef} 
        onChange={handleActivityImageFileChange}
        accept="image/*"
        className="hidden" 
      />

      {formData.days.map((dayPlan, index) => {
        const isExpanded = expandedDay === dayPlan.day;

        return (
          <div key={dayPlan.day} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
            
            {/* Accordion Header */}
            <div 
              onClick={() => setExpandedDay(isExpanded ? 0 : dayPlan.day)}
              className="bg-[#F9FAFB] p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors select-none"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <h3 className="text-lg font-extrabold text-[#006A4E] shrink-0">Day {dayPlan.day}</h3>
                <input
                  type="text"
                  value={dayPlan.title}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleDayValueChange(index, "title", e.target.value)}
                  placeholder="e.g. Arrival & Acclimatization"
                  className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#006A4E] text-sm font-bold text-gray-700 outline-none px-1.5 py-0.5 w-full max-w-md truncate"
                />
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <input
                  type="text"
                  value={dayPlan.date || ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleDayValueChange(index, "date", e.target.value)}
                  placeholder="e.g. 15/06/2026"
                  className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#006A4E] text-xs font-semibold text-gray-400 outline-none px-1.5 py-0.5 text-right w-24"
                />
                {formData.days.length > 1 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDay(index);
                      setExpandedDay(1);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                {isExpanded ? <ChevronUp className="text-gray-400" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
              </div>
            </div>

            {/* Accordion Body */}
            {isExpanded && (
              <div className="p-6 md:p-8 space-y-10 animate-in fade-in slide-in-from-top-2 duration-200">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                  
                  {/* Route & Altitude Planning */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                      <Map size={18} className="text-[#006A4E]" />
                      <h4>Route Telemetry</h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Route description (Stop Points)</label>
                      <input 
                        type="text" 
                        value={dayPlan.route || ""}
                        onChange={(e) => handleDayValueChange(index, "route", e.target.value)}
                        placeholder="e.g. Ghaziabad, Chandigarh, Manali" 
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB] font-semibold text-gray-700" 
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center justify-between">Distance <Navigation size={9} className="text-[#006A4E]"/></span>
                        <input 
                          type="text" 
                          value={dayPlan.distance || ""}
                          onChange={(e) => handleDayValueChange(index, "distance", e.target.value)}
                          placeholder="540 km"
                          className="bg-transparent border-none outline-none text-xs font-bold text-gray-800 w-full mt-0.5"
                        />
                      </div>
                      <div className="bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center justify-between">Duration <Clock size={9} className="text-[#006A4E]"/></span>
                        <input 
                          type="text" 
                          value={dayPlan.travelTime || ""}
                          onChange={(e) => handleDayValueChange(index, "travelTime", e.target.value)}
                          placeholder="12.5 hrs"
                          className="bg-transparent border-none outline-none text-xs font-bold text-gray-800 w-full mt-0.5"
                        />
                      </div>
                      <div className="bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center justify-between">Altitude <MapPin size={9} className="text-[#006A4E]"/></span>
                        <input 
                          type="text" 
                          value={dayPlan.altitudeSeaLevel || ""}
                          onChange={(e) => handleDayValueChange(index, "altitudeSeaLevel", e.target.value)}
                          placeholder="2050m"
                          className="bg-transparent border-none outline-none text-xs font-bold text-gray-800 w-full mt-0.5"
                        />
                      </div>
                    </div>

                    {/* Predicted Weather Telemetry */}
                    <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <Sun size={14} className="text-yellow-500" />
                        <span>Predicted Weather Forecast</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1 col-span-2">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Weather Conditions</label>
                          <input 
                            type="text"
                            value={dayPlan.predictedWeather?.conditions || ""}
                            onChange={(e) => handleWeatherChange(index, "conditions", e.target.value)}
                            placeholder="Clear Skies / Cool Breeze"
                            className="w-full border border-gray-200 rounded-md p-2 text-xs outline-none bg-white font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 col-span-1">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Low</label>
                            <input 
                              type="text"
                              value={dayPlan.predictedWeather?.temperatureLow || ""}
                              onChange={(e) => handleWeatherChange(index, "temperatureLow", e.target.value)}
                              placeholder="12°C"
                              className="w-full border border-gray-200 rounded-md p-2 text-xs text-center outline-none bg-white font-semibold text-sky-600"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">High</label>
                            <input 
                              type="text"
                              value={dayPlan.predictedWeather?.temperatureHigh || ""}
                              onChange={(e) => handleWeatherChange(index, "temperatureHigh", e.target.value)}
                              placeholder="22°C"
                              className="w-full border border-gray-200 rounded-md p-2 text-xs text-center outline-none bg-white font-semibold text-orange-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Daily Transit & Pacing details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                      <Clock size={18} className="text-[#006A4E]" />
                      <h4>Transit Pacing</h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Pacing Style</label>
                      <div className="flex bg-[#F4F5F6] p-1 rounded-xl">
                        {["Relaxed", "Moderate", "Hectic"].map((pace) => {
                          const isSelected = dayPlan.dailyPacing === pace;
                          return (
                            <button
                              key={pace}
                              onClick={() => handleDayValueChange(index, "dailyPacing", pace)}
                              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${isSelected ? "bg-[#006A4E] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                            >
                              {pace}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Transport Details Nested */}
                    <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <Navigation size={14} className="text-[#006A4E]" />
                        <span>Transit Specifications</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Medium</label>
                          <input 
                            type="text" 
                            value={dayPlan.transportDetails?.type || ""}
                            onChange={(e) => handleTransportDetailsChange(index, "type", e.target.value)}
                            placeholder="e.g. car (Rented)" 
                            className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white font-medium" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Sub Type / Model</label>
                          <input 
                            type="text" 
                            value={dayPlan.transportDetails?.subType || ""}
                            onChange={(e) => handleTransportDetailsChange(index, "subType", e.target.value)}
                            placeholder="e.g. Mahindra Thar" 
                            className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white font-medium" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Departure Time</label>
                          <input 
                            type="text" 
                            value={dayPlan.transportDetails?.departureTime || ""}
                            onChange={(e) => handleTransportDetailsChange(index, "departureTime", e.target.value)}
                            placeholder="e.g. 04:30 AM" 
                            className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white font-medium" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Arrival Time</label>
                          <input 
                            type="text" 
                            value={dayPlan.transportDetails?.arrivalTime || ""}
                            onChange={(e) => handleTransportDetailsChange(index, "arrivalTime", e.target.value)}
                            placeholder="e.g. 05:00 PM" 
                            className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white font-medium" 
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <hr className="border-gray-100 animate-in" />

                {/* Accommodation telemetry */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                    <Bed size={18} className="text-[#006A4E]" />
                    <h4>Accommodation Specifications</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Hotel / Stay Name</label>
                      <input 
                        type="text" 
                        value={dayPlan.accommodation?.hotelName || ""}
                        onChange={(e) => handleAccommodationChange(index, "hotelName", e.target.value)}
                        placeholder="e.g. Hotel Manali Heights" 
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB] font-semibold text-gray-700" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Booking Platform</label>
                      <input 
                        type="text" 
                        value={dayPlan.accommodation?.bookingPlatform || ""}
                        onChange={(e) => handleAccommodationChange(index, "bookingPlatform", e.target.value)}
                        placeholder="e.g. Booking.com" 
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB] font-semibold text-gray-700" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-1">Booking link <Link size={12} className="text-blue-500" /></label>
                      <input 
                        type="text" 
                        value={dayPlan.accommodation?.bookingLink || ""}
                        onChange={(e) => handleAccommodationChange(index, "bookingLink", e.target.value)}
                        placeholder="e.g. https://www.booking.com/hotel/in/..." 
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" 
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Price per Person (INR)</label>
                      <input 
                        type="number" 
                        value={dayPlan.accommodation?.pricePerPersonINR || ""}
                        onChange={(e) => handleAccommodationChange(index, "pricePerPersonINR", e.target.value)}
                        placeholder="0" 
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB] font-semibold text-gray-700" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Why Recommended</label>
                    <input 
                      type="text" 
                      value={dayPlan.accommodation?.whyRecommended || ""}
                      onChange={(e) => handleAccommodationChange(index, "whyRecommended", e.target.value)}
                      placeholder="Reasonable price and beautiful scenic valley views" 
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" 
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Dynamic daily activities checklist */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-800 font-bold">
                      <MapPin size={18} className="text-[#006A4E]" />
                      <h4>Daily Adventures & Sights</h4>
                    </div>
                    <button 
                      onClick={() => handleAddActivity(index)}
                      className="text-[#006A4E] text-xs font-bold flex items-center gap-1 hover:underline bg-[#E6F4EA] px-3.5 py-2 rounded-xl transition-all active:scale-[0.97]"
                    >
                      <Plus size={14} /> Add Activity
                    </button>
                  </div>
                  
                  {(!dayPlan.dailyActivities || dayPlan.dailyActivities.length === 0) ? (
                    <p className="text-xs text-gray-400 font-medium italic pl-1">No activities added for this day yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {dayPlan.dailyActivities.map((act, actIdx) => (
                        <div key={actIdx} className="border border-gray-150 rounded-2xl p-5 space-y-4 bg-gray-50/50 relative">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <span className="text-xs font-bold text-[#006A4E] uppercase tracking-wider">Activity {actIdx + 1}</span>
                            <button 
                              onClick={() => handleRemoveActivity(index, actIdx)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-5 items-start">
                            
                            {/* Activity Image Box (Upload enabled) */}
                            <div className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-white shrink-0 group shadow-sm flex items-center justify-center">
                              <img 
                                src={act.imageUrl || formData.imageUrl || "https://images.unsplash.com/photo-1571677465484-2dd540924245?q=80&w=200"} 
                                alt={act.name} 
                                className="w-full h-full object-cover" 
                              />
                              <button
                                type="button"
                                onClick={() => triggerActivityImageUpload(index, actIdx)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9px] font-bold uppercase transition-all"
                              >
                                <Upload size={14} className="mb-0.5" />
                                Upload image
                              </button>
                            </div>

                            <div className="flex-1 w-full space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-3 space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Activity Name</label>
                                  <input 
                                    type="text" 
                                    value={act.name}
                                    onChange={(e) => handleActivityChange(index, actIdx, "name", e.target.value)}
                                    placeholder="e.g. Old Manali Cafe Crawl" 
                                    className="w-full border border-gray-200 bg-white rounded-lg p-2 text-xs outline-none focus:border-[#006A4E]" 
                                  />
                                </div>
                                <div className="md:col-span-1 space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Est. Cost (INR)</label>
                                  <input 
                                    type="number" 
                                    value={act.estimatedINR || ""}
                                    onChange={(e) => handleActivityChange(index, actIdx, "estimatedINR", e.target.value)}
                                    placeholder="0" 
                                    className="w-full border border-gray-200 bg-white rounded-lg p-2 text-xs outline-none focus:border-[#006A4E]" 
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Details</label>
                                <textarea 
                                  value={act.detail || ""}
                                  onChange={(e) => handleActivityChange(index, actIdx, "detail", e.target.value)}
                                  placeholder="Describe the activities details..." 
                                  rows={2} 
                                  className="w-full border border-gray-200 bg-white rounded-lg p-2.5 text-xs outline-none focus:border-[#006A4E] resize-none"
                                ></textarea>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* Daily Estimates cost Breakdown */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                    <Wallet size={18} className="text-[#006A4E]" />
                    <h4>Daily Cost Breakdowns (INR)</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                     <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Breakfast</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.foodINR?.breakfast || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "food.breakfast", e.target.value)}
                        placeholder="300" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Lunch</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.foodINR?.lunch || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "food.lunch", e.target.value)}
                        placeholder="700" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Dinner</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.foodINR?.dinner || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "food.dinner", e.target.value)}
                        placeholder="1200" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Inter Transport</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.transportBaseINR || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "transportBaseINR", e.target.value)}
                        placeholder="3500" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Fuel Estimate</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.fuelINR || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "fuelINR", e.target.value)}
                        placeholder="4500" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tolls & Taxes</label>
                      <input 
                        type="number" 
                        value={dayPlan.costBreakdown?.tollsINR || ""}
                        onChange={(e) => handleCostBreakdownChange(index, "tollsINR", e.target.value)}
                        placeholder="650" 
                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#006A4E]" 
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Experience Narrative Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                    <FileText size={18} className="text-[#006A4E]" />
                    <h4>Experience Narrative</h4>
                  </div>
                  <textarea 
                    value={dayPlan.experienceDescription || ""}
                    onChange={(e) => handleDayValueChange(index, "experienceDescription", e.target.value)}
                    placeholder="Describe the day's journey, scenic sights, altitude adapts, and memorable details..." 
                    rows={4} 
                    className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#006A4E] resize-none font-medium text-gray-600"
                  ></textarea>
                </div>

              </div>
            )}
          </div>
        );
      })}

      {/* Add Day Button */}
      <button 
        onClick={addDay}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-50 hover:text-[#006A4E] hover:border-green-200 transition-all text-sm shadow-sm"
      >
        <Plus size={16} /> Add Day
      </button>

      {/* Bottom Navigation controls */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 px-6 md:px-12 flex items-center justify-between z-50 shadow-lg animate-in">
        <button onClick={onBack} className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
          Back to Details
        </button>
        <button onClick={onNext} className="bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
          Save & Continue
        </button>
      </div>

    </div>
  );
}
