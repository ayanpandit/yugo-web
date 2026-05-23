import React from "react";
import { ShieldCheck, Users, AlertTriangle, Briefcase, Wallet, Leaf } from "lucide-react";

interface StepReviewProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepReview({ onBack, onSubmit }: StepReviewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Review Expedition</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Guides & Insights */}
        <div className="flex-1 space-y-10">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Survival Guide & Logistics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Health & Safety */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-4">
                  <ShieldCheck size={18} />
                  <h4>Health & Safety</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-green-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                    Stay hydrated
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-green-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                    Be prepared for altitude sickness
                  </li>
                </ul>
              </div>

              {/* Cultural Norms */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-4">
                  <Users size={18} />
                  <h4>Cultural Norms</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-green-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                    Respect local customs and traditions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-green-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                    Dress modestly
                  </li>
                </ul>
              </div>

              {/* Scam Warnings */}
              <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-red-500 font-bold mb-4">
                  <AlertTriangle size={18} />
                  <h4>Scam Warnings</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-red-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    </div>
                    Be careful of scams and frauds
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-4 h-4 rounded-full border border-red-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    </div>
                    Do not carry large amounts of cash
                  </li>
                </ul>
              </div>

              {/* Packing Essentials */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#006A4E] font-bold mb-4">
                  <Briefcase size={18} />
                  <h4>Packing Essentials</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#F4F5F6] text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">Warm clothing</span>
                  <span className="bg-[#F4F5F6] text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">Comfortable shoes</span>
                  <span className="bg-[#F4F5F6] text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">Sunscreen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Insights */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Travel Insights</h3>
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
              
              {/* Image Banner */}
              <div className="relative h-48 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format&fit=crop" 
                  alt="Mountain Valley" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-widest mb-1 opacity-90">
                    <span className="text-yellow-400">★</span> BEST EXPERIENCES
                  </span>
                  <h4 className="text-2xl font-bold text-white">Paragliding in Solang Valley</h4>
                </div>
              </div>

              {/* Below Image Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-800 font-bold">
                    <Leaf size={16} className="text-[#006A4E]" />
                    <h5>Hidden Gems</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-500 font-medium list-disc pl-5">
                    <li>Hadimba Devi Temple</li>
                    <li>Mall Road</li>
                  </ul>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-2 text-gray-800 font-bold">
                    <Leaf size={16} className="text-[#006A4E]" />
                    <h5>Sustainability Tips</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-500 font-medium list-disc pl-5">
                    <li>Use public transport or walk</li>
                    <li>Reduce plastic usage</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Financial Overview (Sticky) */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Financial Overview</h3>
            
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="text-center space-y-2 mb-8">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Estimated Cost</p>
                <h2 className="text-5xl font-black text-[#006A4E]">₹40,000</h2>
                <p className="text-sm font-semibold text-gray-500">Safe Cost</p>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-gray-700 mb-6">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 mb-1">Min Cost</p>
                  <p>₹35,000</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 mb-1">Max Cost</p>
                  <p>₹45,000</p>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <span className="bg-[#E6F4EA] text-[#006A4E] text-xs font-bold px-4 py-1.5 rounded-full">
                  ₹20,000 / Person
                </span>
              </div>

              <hr className="border-gray-100 mb-6" />

              <div className="space-y-5">
                <div className="flex items-center gap-2 text-gray-800 font-bold mb-2">
                  <Wallet size={16} className="text-[#006A4E]" />
                  <h4>Cost Breakdown</h4>
                </div>

                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Transport (Inter-city)</span>
                    <span>₹14,000</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006A4E] rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Hidden Costs (Fuel, Tolls)</span>
                    <span>₹13,700</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Stay</span>
                    <span>₹9,600</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Food</span>
                    <span>₹8,700</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E5E7EB] rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>Activities</span>
                    <span>₹4,350</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-200 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#F9FAFB] border-t border-gray-200 p-4 px-6 md:px-12 flex items-center justify-between z-50 shadow-2xl">
        <button onClick={onBack} className="text-sm font-bold text-[#006A4E] border border-[#006A4E] hover:bg-green-50 px-6 py-3 rounded-xl transition-all">
          Back to Logistics
        </button>
        <button onClick={onSubmit} className="bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
          Confirm & Finalize
        </button>
      </div>

    </div>
  );
}
