"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans selection:bg-emerald-500/30">
      {/* Left side: Beautiful mountain background image */}
      <section className="relative hidden md:flex md:w-1/2 min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_6s_ease-in-out_infinite_alternate]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920')`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        <div className="absolute top-12 left-12 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/95 uppercase tracking-widest shadow-2xl">
          🌍 Discover the Globe
        </div>

        <div className="absolute bottom-16 left-12 right-12 z-10 text-white flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Explore the world
          </h2>
          <p className="text-sm md:text-base text-gray-200/90 leading-relaxed font-medium max-w-md drop-shadow-sm">
            Discover breathtaking landscapes and create unforgettable memories with Travenly.
          </p>
        </div>
      </section>

      {/* Right side: Forgot Password Form or Success Screen */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-y-auto min-h-screen">
        {/* Back to Login */}
        <Link 
          href="/login" 
          className="absolute top-8 right-8 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>

        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Brand Logo Header */}
          <header className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-out]">
            <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-md border border-gray-100 shrink-0">
              <img 
                src="/icon-192.png" 
                alt="YouGO Icon" 
                className="w-full h-full object-cover p-1.5"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 select-none">
              You<span className="text-[#006644]">GO</span>
            </span>
          </header>

          {!isSubmitted ? (
            <>
              {/* Form Info */}
              <div className="flex flex-col gap-2 animate-[fadeIn_0.4s_ease-out]">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Forgot Password? 🔑
                </h1>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Enter your email address below, and we will send you a secure link to reset your password.
                </p>
              </div>

              {/* Form Fields */}
              <form className="flex flex-col gap-5 animate-[fadeIn_0.5s_ease-out]" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm font-semibold text-red-600">
                    {error}
                  </div>
                )}

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="email" 
                    className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wide"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-gray-400">
                      <Mail className="h-5 w-5 stroke-[1.8]" />
                    </span>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      autoComplete="email"
                      required
                      className="w-full py-4 pl-12 pr-4 bg-gray-50/50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-[#006644] rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 bg-[#006644] hover:bg-[#005533] active:scale-[0.98] text-white text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/20 outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-250 mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending Link..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            /* Success Screen */
            <div className="flex flex-col gap-6 text-center items-center py-4 animate-[fadeIn_0.5s_ease-out]">
              <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm animate-[bounce_1s_ease-out_1]">
                <CheckCircle2 className="h-10 w-10 stroke-[2]" />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Email Sent! ✉️
                </h1>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                  We have sent a secure password reset link to <strong className="text-gray-800">{email}</strong>. 
                  Please check your inbox (and spam folder) and follow the instructions.
                </p>
              </div>

              <Link 
                href="/login"
                className="w-full max-w-xs py-4 border border-gray-200 hover:bg-gray-50 active:scale-[0.98] rounded-2xl text-sm font-bold text-gray-700 transition-all duration-200 text-center cursor-pointer shadow-sm mt-4"
              >
                Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Styled Animations via custom CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
