import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StepProgressProps {
  currentStep: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Logistics" },
    { id: 3, label: "Review" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting Lines Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 z-0"></div>
        
        {/* Active Line Progress */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#006A4E] z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  isActive || isCompleted
                    ? "bg-[#006A4E] text-white border-2 border-[#006A4E]"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                )}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : step.id}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm font-semibold absolute -bottom-6 w-max text-center transition-colors duration-300",
                  isActive || isCompleted ? "text-[#006A4E]" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
