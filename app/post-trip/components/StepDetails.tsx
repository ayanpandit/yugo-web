import React from "react";
import { MapPin, Calendar, ChevronDown, Upload, ArrowRight, Sparkles, Zap, Lock } from "lucide-react";

interface StepDetailsProps {
  onNext: () => void;
}

export default function StepDetails({ onNext }: StepDetailsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 flex flex-col pb-12">

      {/* Mountain Banner Header (Floating Card) */}
      <div className="relative h-72 md:h-80 w-full rounded-[32px] overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
          alt="Mountain Landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

        {/* Top Floating Elements */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="bg-[#10B981] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            New Expedition
          </div>
        </div>

        {/* Bottom Banner Content */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Destination Intake</h1>
            <p className="text-gray-200 text-sm font-medium shadow-sm leading-relaxed">
              Personalize your journey's visual soul. Tell us where the mountains are calling you.
            </p>
          </div>

          {/* AI / Upload thumbnails */}
          <div className="flex gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
              <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="AI Option 1" />
            </div>
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="AI Option 2" />
            </div>
            <button className="w-16 h-16 rounded-xl border-2 border-dashed border-white/50 flex flex-col items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/40 backdrop-blur-sm">
              <Upload size={16} />
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">Upload</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Planner Callout (Floating Card) */}
      <div className="w-full bg-[#E6F4EA] border border-green-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#006A4E] font-extrabold text-lg">
            <Sparkles size={20} />
            <h2>Need inspiration for your next peak?</h2>
          </div>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">
            Our AI-powered expedition architect can draft a custom route based on your fitness level, desired difficulty, and the time of year.
          </p>
        </div>
        <button className="shrink-0 bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10">
          Activate AI Planner
          <Zap size={16} />
        </button>
      </div>

      {/* Destination & Trip Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#006A4E]" size={20} />
            <input
              type="text"
              defaultValue="Manali, Simulated Region"
              className="w-full bg-[#F4F5F6] border border-transparent rounded-xl pl-12 pr-4 py-4 text-sm font-semibold text-gray-800 outline-none focus:border-[#006A4E]/30 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Trip Details Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Trip Details</label>
          <div className="relative">
            <div className="w-full bg-[#F4F5F6] border border-transparent rounded-xl pl-5 pr-12 py-3 flex flex-col justify-center min-h-[56px] cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-sm font-semibold text-gray-800 leading-tight">4-Day Round Trip from Ghaziabad</span>
              <span className="text-[10px] text-gray-500 font-medium mt-0.5">Total Duration: 4 Days</span>
            </div>
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Travelers Section */}
      <div className="space-y-4 pt-4">

        {/* Inline Traveler Count */}
        <div className="flex items-center gap-3 px-2">
          <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest">Traveler Count:</span>
          <div className="relative">
            <select className="appearance-none bg-[#F4F5F6] border-none rounded-lg pl-3 pr-8 py-1.5 text-sm font-bold text-gray-800 outline-none cursor-pointer hover:bg-gray-200 transition-colors">
              <option selected>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          </div>
        </div>

        {/* Traveler Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Traveler */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#006A4E] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                1
              </div>
              <span className="font-bold text-gray-800 text-sm">Primary Traveler</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Age</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors">
                    <option selected>21</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Sex</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors">
                    <option selected>M</option>
                    <option>F</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Companion */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-48">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm border border-gray-200">
                2
              </div>
              <span className="font-bold text-gray-800 text-sm">Companion</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Age</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors">
                    <option selected>22</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1">Sex</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-4 pr-10 py-3 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-100 cursor-pointer transition-colors">
                    <option selected>M</option>
                    <option>F</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Currency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

        {/* Theme / Style Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="relative">
            <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-5 pr-12 py-3.5 text-sm font-semibold text-gray-800 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option selected>Adventure & Mountain Exploration</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-3 py-1 bg-[#F4F5F6] text-gray-600 rounded-full text-[10px] font-bold tracking-wide">Trekking</span>
            <span className="px-3 py-1 bg-[#F4F5F6] text-gray-600 rounded-full text-[10px] font-bold tracking-wide">Nature</span>
            <span className="px-3 py-1 bg-[#F4F5F6] text-gray-600 rounded-full text-[10px] font-bold tracking-wide">Photography</span>
          </div>
        </div>

        {/* Currency Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Base Currency</label>
          <div className="relative">
            <select className="w-full appearance-none bg-[#F4F5F6] border-none rounded-xl pl-5 pr-12 py-3.5 text-sm font-bold text-gray-800 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option selected>INR (₹)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
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
