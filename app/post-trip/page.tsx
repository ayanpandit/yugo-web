"use client";

import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import StepProgress from "./components/StepProgress";
import StepDetails from "./components/StepDetails";
import StepLogistics from "./components/StepLogistics";
import StepReview from "./components/StepReview";
import { usePostTripStore } from "./../store/post-trip.store";
import { useAuth } from "@/app/components/providers/auth-provider";
import { apiFetch } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import AIForm from "./components/ai-form";
import AIReview from "./components/ai-review";
import { 
  Sparkles, History, RefreshCw, FolderOpen, Save, 
  CheckCircle, PenTool, Bot, Compass, ChevronLeft, AlertTriangle 
} from "lucide-react";

export default function PostTripPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Choose between: null (selector), "manual" (manual wizard), "ai" (AI wizard)
  const [creationMode, setCreationMode] = useState<null | "manual" | "ai">(null);
  
  // AI States: "form" | "generating" | "review"
  const [aiState, setAiState] = useState<"form" | "generating" | "review">("form");
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [stepsCompleted, setStepsCompleted] = useState<any[]>([]);
  const [aiItinerary, setAiItinerary] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  // Manual store methods
  const {
    activeStep,
    setStep,
    drafts,
    fetchDrafts,
    loadDraft,
    resetForm,
    saveDraft,
    loading: manualLoading,
    error: manualError,
  } = usePostTripStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchDrafts();
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
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
      showToast("Manual draft successfully saved!");
    } else {
      showToast("Failed to save draft.");
    }
  };

  // AI submit handler
  const handleAISubmit = async (payload: any) => {
    setAiError(null);
    setAiLoading(true);
    setStepsCompleted([]);
    
    try {
      const res = await apiFetch("/api/v1/generate", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to enqueue AI trip generation");
      }
      
      const result = await res.json();
      const genId = result.data?.generationId;
      
      if (!genId) {
        throw new Error("No generation ID returned from YouGO AI server");
      }
      
      setGenerationId(genId);
      setAiState("generating");
      startPolling(genId);
    } catch (err: any) {
      setAiError(err.message || "An unexpected error occurred dispatching job.");
      setAiLoading(false);
    }
  };

  // Poll status loop
  const startPolling = (id: string) => {
    const poll = async () => {
      try {
        const res = await apiFetch(`/api/v1/generate/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch generation progress status");
        }
        
        const result = await res.json();
        const tripData = result.data?.[0];
        
        if (!tripData) {
          throw new Error("No status payload returned for generation " + id);
        }
        
        if (tripData.stepsCompleted) {
          setStepsCompleted(tripData.stepsCompleted);
        }
        
        if (tripData.status === "COMPLETED") {
          setAiItinerary(tripData.response);
          setAiState("review");
          setAiLoading(false);
        } else if (tripData.status === "FAILED") {
          throw new Error(tripData.error || "Generation worker thread failed");
        } else {
          // Continue polling
          pollTimerRef.current = setTimeout(poll, 2500);
        }
      } catch (err: any) {
        setAiError(err.message || "An issue occurred while tracking AI generation.");
        setAiState("form");
        setAiLoading(false);
      }
    };
    
    pollTimerRef.current = setTimeout(poll, 2000);
  };

  // AI Save action (Private Completed)
  const handleAISave = () => {
    showToast("Expedition saved successfully to your dashboard!");
    setTimeout(() => {
      if (user?.username) {
        router.push(`/profile/${user.username}`);
      } else {
        router.push("/dashboard");
      }
    }, 1500);
  };

  // AI Post action (Publish to feed)
  const handleAIPost = async () => {
    if (!generationId) return;
    setPublishLoading(true);
    
    try {
      const res = await apiFetch(`/api/v1/generate/${generationId}/publish`, {
        method: "POST"
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Publishing failed");
      }
      
      showToast("Expedition posted to explore feed!");
      setTimeout(() => {
        router.push("/explore");
      }, 1500);
    } catch (err: any) {
      setAiError(err.message || "Failed to publish expedition.");
    } finally {
      setPublishLoading(false);
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

        {/* 1. Selector Mode Screen */}
        {creationMode === null && (
          <div className="max-w-4xl mx-auto space-y-8 py-10 animate-in fade-in duration-300 text-center">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">
                Create Your Next Expedition
              </h1>
              <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                Choose how you want to build your journey. Select manual drafting for absolute granular details, or let YouGO AI formulate it in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Manual Card */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center group text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#006A4E] flex items-center justify-center transition-transform group-hover:scale-110">
                  <PenTool size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-800 font-extrabold text-lg md:text-xl">Manual Studio</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[280px]">
                    Draft your logistics, accommodation, pacing, and weather step-by-step with absolute custom detail.
                  </p>
                </div>
                <button
                  onClick={() => setCreationMode("manual")}
                  className="w-full bg-[#006A4E] hover:bg-[#00523C] text-white py-3 rounded-2xl font-bold text-xs md:text-sm transition-colors shadow-md shadow-emerald-950/10 cursor-pointer"
                >
                  Launch Studio
                </button>
              </div>

              {/* AI Card */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center group text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-55 bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center transition-transform group-hover:scale-110">
                  <Sparkles size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-800 font-extrabold text-lg md:text-xl">AI Expedition Engine</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-[280px]">
                    Formulate a personalized day-by-day itinerary with exact geo-coordinates, real-time weather, and photos.
                  </p>
                </div>
                <button
                  onClick={() => setCreationMode("ai")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-3 rounded-2xl font-bold text-xs md:text-sm transition-all shadow-md shadow-emerald-950/10 cursor-pointer"
                >
                  Launch AI Engine
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Manual Expedition Form */}
        {creationMode === "manual" && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              {/* Back selector link */}
              <button
                onClick={() => setCreationMode(null)}
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#006A4E] transition-colors"
              >
                <ChevronLeft size={16} /> Choose Creation Mode
              </button>

              <StepProgress currentStep={activeStep} />

              <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <Sparkles size={14} className="text-[#006A4E]" />
                  <span>Manual Studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetForm}
                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 bg-gray-50 hover:bg-red-50 px-3.5 py-2 rounded-xl"
                  >
                    <RefreshCw size={12} />
                    Reset
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    disabled={manualLoading}
                    className="text-xs font-extrabold text-white bg-[#006A4E] hover:bg-[#00523C] disabled:opacity-50 transition-all flex items-center gap-1.5 px-4 py-2 rounded-xl shadow-md shadow-emerald-950/15"
                  >
                    <Save size={13} />
                    {manualLoading ? "Saving..." : "Save Draft"}
                  </button>
                </div>
              </div>

              {manualError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl max-w-4xl mx-auto">
                  ⚠️ {manualError}
                </div>
              )}

              <div className="transition-all duration-300 ease-in-out">
                {activeStep === 1 && <StepDetails onNext={handleNext} />}
                {activeStep === 2 && <StepLogistics onNext={handleNext} onBack={handleBack} />}
                {activeStep === 3 && <StepReview onBack={handleBack} />}
              </div>
            </div>

            {/* Resume Drafts sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 space-y-5">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-4">
                  <History className="text-[#006A4E]" size={20} />
                  <h3 className="font-extrabold text-gray-800 text-base">Resume Drafts</h3>
                </div>

                {drafts.length === 0 ? (
                  <div className="py-10 text-center space-y-3">
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                      No active drafts. Build a new adventure and save anytime!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                    {drafts.map((draft) => {
                      const destName = draft.destination || "Unnamed Destination";
                      return (
                        <button
                          key={draft.generationId}
                          onClick={() => {
                            loadDraft(draft);
                            showToast(`Draft for ${destName} loaded!`);
                          }}
                          className="w-full text-left bg-[#F9FAFB] hover:bg-emerald-50/50 hover:border-emerald-200 border border-transparent rounded-2xl p-4 transition-all duration-300 group"
                        >
                          <FolderOpen size={16} className="text-[#006A4E] inline-block mr-2" />
                          <span className="text-xs font-bold text-gray-850 truncate inline-block max-w-[150px]">{destName}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. AI Expedition Form, Progress, and Review States */}
        {creationMode === "ai" && (
          <div className={aiState === "review" ? "max-w-6xl mx-auto space-y-8" : "max-w-4xl mx-auto space-y-8"}>
            {/* Back selector link */}
            {aiState === "form" && (
              <button
                onClick={() => setCreationMode(null)}
                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#006A4E] transition-colors"
              >
                <ChevronLeft size={16} /> Choose Creation Mode
              </button>
            )}

            {aiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 max-w-4xl mx-auto">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {aiState === "form" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-700 text-white flex items-center justify-center shadow-md">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">AI Expedition Planner</h2>
                    <p className="text-xs text-gray-400 font-semibold">Orchestrate customized journeys with YouGO AI</p>
                  </div>
                </div>

                <AIForm onSubmit={handleAISubmit} loading={aiLoading} />
              </div>
            )}

            {aiState === "generating" && (
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl text-center space-y-8 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                    🤖
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-800">YouGO AI is Formulating Your Expedition</h3>
                  <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                    Calculating coordinates, comparing weather models, mapping route details, and scraping landscape imagery...
                  </p>
                </div>

                {/* Animated loading bar */}
                <div className="w-full max-w-md mx-auto h-2 bg-gray-100 rounded-full overflow-hidden relative border border-gray-50">
                  <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-[loadingProgress_3s_infinite]" style={{ width: "65%" }}></div>
                </div>

                {/* Steps Checklist */}
                <div className="max-w-md mx-auto border border-gray-50 bg-[#F9FAFB] rounded-2xl p-6 text-left space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-2">Process Logs</h4>
                  
                  {[
                    { key: "enrichment", label: "Resolving Locations & Coordinates" },
                    { key: "llm-generation", label: "Drafting Day Itineraries & Accommodation" },
                    { key: "validation", label: "Performing Self-Healing Data Checks" }
                  ].map(step => {
                    const completed = stepsCompleted.some(s => s.stepName === step.key && s.validationPassed);
                    return (
                      <div key={step.key} className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                        {completed ? (
                          <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shrink-0 border border-emerald-200">
                            ✓
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-gray-100 border border-gray-200 text-gray-400 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                            •
                          </div>
                        )}
                        <span className={completed ? "text-gray-850" : "text-gray-400"}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {aiState === "review" && aiItinerary && (
              <div className="space-y-6">
                <button
                  onClick={() => setAiState("form")}
                  className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#006A4E] transition-colors"
                >
                  <ChevronLeft size={16} /> Re-configure AI Parameters
                </button>

                <AIReview 
                  itinerary={aiItinerary} 
                  onSave={handleAISave} 
                  onPost={handleAIPost} 
                  actionLoading={publishLoading} 
                />
              </div>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
