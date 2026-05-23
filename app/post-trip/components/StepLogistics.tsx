import React from "react";
import { 
  ChevronUp, ChevronDown, Map, MapPin, Trash2, Plus, 
  Smile, Clock, Bed, Wallet, Navigation, Image as ImageIcon,
  FileText
} from "lucide-react";

interface StepLogisticsProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepLogistics({ onNext, onBack }: StepLogisticsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Daily Logistics</h2>
        <p className="text-gray-400 text-sm">Detail out the pacing, accommodation, and activities for each day of the expedition.</p>
      </div>

      {/* Expanded Accordion: Day 1 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Accordion Header */}
        <div className="bg-[#F9FAFB] p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-extrabold text-gray-800">Day 1</h3>
            <span className="bg-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Arrival & Acclimatization
            </span>
          </div>
          <ChevronUp className="text-gray-400" size={20} />
        </div>

        {/* Accordion Body */}
        <div className="p-6 md:p-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
            {/* Route Planning */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                <Map size={18} className="text-gray-400" />
                <h4>Route Planning</h4>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Final Destination Altitude</label>
                <input type="text" placeholder="e.g., 2,860m" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E]" />
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
                <div className="relative">
                  <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-gray-300 bg-white z-10"></div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Origin</label>
                  <input type="text" placeholder="e.g., Kathmandu" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" />
                </div>
                
                <div className="relative flex items-end gap-2">
                  <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#006A4E] bg-white z-10"></div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">1st Stop</label>
                    <input type="text" placeholder="e.g., Lukla" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" />
                  </div>
                  <button className="p-3 border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors bg-white">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <button className="text-[#006A4E] text-xs font-bold flex items-center gap-1 hover:underline ml-6">
                <Plus size={14} /> Add Stop
              </button>

              <div className="flex gap-2">
                <div className="flex-1 bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center justify-between">Distance <Navigation size={10} className="text-[#006A4E]"/></span>
                  <span className="text-sm font-semibold text-gray-800">138 km</span>
                </div>
                <div className="flex-1 bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center justify-between">Travel Time <Clock size={10} className="text-[#006A4E]"/></span>
                  <span className="text-sm font-semibold text-gray-800">45 min</span>
                </div>
                <div className="flex-1 bg-[#F4F5F6] p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center justify-between">Temperature <span className="text-[#006A4E] text-[10px]">°C</span></span>
                  <span className="text-sm font-semibold text-gray-800">12°C / 2°C</span>
                </div>
              </div>
            </div>

            {/* Journey Vibe */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                <Smile size={18} className="text-gray-400" />
                <h4>Journey Vibe</h4>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Pacing</label>
                <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                  <button className="flex-1 bg-[#22C55E] text-white text-xs font-bold py-2 rounded-md shadow-sm">Relaxed</button>
                  <button className="flex-1 text-gray-500 text-xs font-bold py-2 hover:bg-gray-50 rounded-md transition-colors">Moderate</button>
                  <button className="flex-1 text-gray-500 text-xs font-bold py-2 hover:bg-gray-50 rounded-md transition-colors">Hectic</button>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Navigation size={14} className="text-[#006A4E]" />
                  <span>Transport Logistics</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Type</label>
                    <div className="relative">
                      <select className="w-full appearance-none border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white">
                        <option>Flight</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Ref Number</label>
                    <input type="text" placeholder="e.g., YT-102" className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Departure</label>
                    <div className="relative">
                      <input type="time" className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Arrival</label>
                    <div className="relative">
                      <input type="time" className="w-full border border-gray-200 rounded-md p-2.5 text-xs outline-none bg-white text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Accommodation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
              <Bed size={18} className="text-gray-400" />
              <h4>Accommodation</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Hotel Name</label>
                <input type="text" placeholder="e.g., Yeti Mountain Home" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Why Recommended</label>
                <input type="text" placeholder="e.g., Best views, oxygen available" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Price per Person (INR)</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] bg-[#F9FAFB]" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Daily Budget Estimates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
              <Wallet size={18} className="text-gray-400" />
              <h4>Daily Budget Estimates (INR)</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Breakfast</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Lunch</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Dinner</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Fuel / Transport</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tolls & Permits</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Activities</label>
                <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#006A4E]" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Adventure & Activities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <MapPin size={18} className="text-gray-400" />
                <h4>Adventure & Activities</h4>
              </div>
              <button className="text-[#006A4E] text-xs font-bold flex items-center gap-1 hover:underline">
                <Plus size={14} /> Add Activity
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Activity 1</span>
                <div className="flex items-center gap-3">
                  <button className="text-[#006A4E] text-xs font-bold border border-[#006A4E]/30 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-green-50 transition-colors">
                    <ImageIcon size={14} /> Fetch Image (Auto)
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div className="md:col-span-3 space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Activity Name</label>
                  <input type="text" placeholder="Short trek to viewpoint" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E]" />
                </div>
                <div className="md:col-span-1 space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Est. Cost (INR)</label>
                  <input type="number" placeholder="0" className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E]" />
                </div>
              </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Details</label>
                  <textarea placeholder="Describe the activity..." rows={2} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006A4E] resize-none"></textarea>
                </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Experience Narrative */}
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <FileText size={18} className="text-gray-400" />
                <h4>Experience Narrative</h4>
              </div>
              <button className="text-[#006A4E] text-xs font-bold border border-[#006A4E]/30 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-green-50 transition-colors">
                 <ImageIcon size={14} /> Fetch Cover Image
              </button>
            </div>
            <textarea placeholder="Describe the day's journey, sights, and feelings..." rows={4} className="w-full bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#006A4E] resize-none"></textarea>
          </div>

        </div>
      </div>

      {/* Collapsed Accordion: Day 2 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between cursor-pointer hover:border-gray-200 transition-colors">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-800">Day 2</h3>
          <span className="bg-gray-100 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Trek to Namche Bazaar
          </span>
        </div>
        <ChevronDown className="text-gray-400" size={20} />
      </div>

      {/* Add Day Button */}
      <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-gray-500 font-bold hover:bg-gray-50 hover:text-[#006A4E] hover:border-green-200 transition-all text-sm">
        <Plus size={16} /> Add Day
      </button>

      {/* Bottom Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 px-6 md:px-12 flex items-center justify-between z-50">
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
