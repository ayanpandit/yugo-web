"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import StepProgress from "./components/StepProgress";
import StepDetails from "./components/StepDetails";
import StepLogistics from "./components/StepLogistics";
import StepReview from "./components/StepReview";

export default function PostTripPage() {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    alert("Trip Successfully Posted!");
  };

  return (
    <DashboardLayout>
      <div className="w-full bg-[#FAFAFA] min-h-screen py-8 md:py-12 px-4 md:px-8">
        
        {/* Navigation Progress Bar */}
        <StepProgress currentStep={activeStep} />

        {/* Step Rendering Engine */}
        <div className="mt-12 transition-all duration-500 ease-in-out">
          {activeStep === 1 && <StepDetails onNext={handleNext} />}
          {activeStep === 2 && <StepLogistics onNext={handleNext} onBack={handleBack} />}
          {activeStep === 3 && <StepReview onBack={handleBack} onSubmit={handleSubmit} />}
        </div>
        
      </div>
    </DashboardLayout>
  );
}
