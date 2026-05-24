"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import StepProgress from "./components/StepProgress";
import StepDetails from "./components/StepDetails";
import StepLogistics from "./components/StepLogistics";
import StepReview from "./components/StepReview";
import { usePostTripStore } from "./../store/post-trip.store";
import { Sparkles, History, RefreshCw, FolderOpen, Save, CheckCircle } from "lucide-react";

export default function PostTripPage() {
  const {
    activeStep,
    setStep,
    drafts,
    fetchDrafts,
    loadDraft,
    resetForm,
    saveDraft,
    loading,
    error,
    formData
  } = usePostTripStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNext = () => {
    setStep(Math.min(activeStep + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(Math.max(activeStep - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = async () => {
    const genId = await saveDraft();
    if (genId) {
      showToast("Draft successfully saved!");
    } else {
      showToast("Failed to save draft.");
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full bg-[#FAFAFA] min-h-screen py-8 md:py-12 px-4 md:px-8">
        
        {/* Floating Custom Toast Banner */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-[100] bg-[#006A4E] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 font-semibold text-sm border border-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle size={18} className="text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Outer Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Manual Creation Panel */}
          <div className="lg:col-span-3 space-y-8">
            {/* Step Navigation Progress */}
            <StepProgress currentStep={activeStep} />

            {/* Save Draft Action Header */}
            <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <Sparkles size={14} className="text-[#006A4E]" />
                <span>Expedition Studio</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetForm}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 bg-gray-50 hover:bg-red-50 px-3.5 py-2 rounded-xl"
                >
                  <RefreshCw size={12} />
                  Reset Form
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={loading}
                  className="text-xs font-extrabold text-white bg-[#006A4E] hover:bg-[#00523C] disabled:opacity-50 transition-all flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-md shadow-emerald-950/15"
                >
                  <Save size={13} />
                  {loading ? "Saving..." : "Save Draft"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl max-w-4xl mx-auto">
                ⚠️ {error}
              </div>
            )}

            {/* Dynamic Step Viewport */}
            <div className="transition-all duration-300 ease-in-out">
              {activeStep === 1 && <StepDetails onNext={handleNext} />}
              {activeStep === 2 && <StepLogistics onNext={handleNext} onBack={handleBack} />}
              {activeStep === 3 && <StepReview onBack={handleBack} />}
            </div>
          </div>

          {/* Premium Resume Drafts Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 space-y-5">
              
              <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
                <History className="text-[#006A4E]" size={20} />
                <h3 className="font-extrabold text-gray-800 text-base">Resume Drafts</h3>
              </div>

              {drafts.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-400 text-lg">
                    📁
                  </div>
                  <p className="text-xs text-gray-400 font-medium max-w-[180px] mx-auto leading-relaxed">
                    No active drafts. Build a new adventure and save anytime!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {drafts.map((draft) => {
                    const destinationName = draft.destination || "Unnamed Destination";
                    const daysCount = draft.totalDays || 1;
                    const lastUpdated = new Date(draft.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    });

                    return (
                      <button
                        key={draft.generationId}
                        onClick={() => {
                          loadDraft(draft);
                          showToast(`Draft for ${destinationName} loaded!`);
                        }}
                        className="w-full text-left bg-[#F9FAFB] hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent rounded-2xl p-4 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-2.5">
                          <FolderOpen size={16} className="text-[#006A4E] mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-800 truncate mb-0.5 group-hover:text-[#006A4E] transition-colors">
                              {destinationName}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                              <span>{daysCount} Days</span>
                              <span>•</span>
                              <span>{lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="bg-[#E6F4EA] border border-green-100 rounded-2xl p-4 text-[10px] text-gray-600 font-medium leading-relaxed">
                ℹ️ Save your progress on any step of the form to preserve it securely in Neon PostgreSQL.
              </div>

            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
