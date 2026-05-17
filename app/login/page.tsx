"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Compass, EyeOff, ArrowLeft } from "lucide-react";
import { apiFetch } from "@/app/lib/api";
import { useAuth } from "@/app/components/providers/auth-provider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refreshSession } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }
      
      // Store token in localStorage as a fallback for cross-site cookie restrictions
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }
      
      await refreshSession();
      router.push("/dashboard");
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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_6s_ease-in-out_infinite_alternate]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920')`,
          }}
        />
        
        {/* Subtle dark-to-light gradient overlay for rich premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Floating elements to add premium depth */}
        <div className="absolute top-12 left-12 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/95 uppercase tracking-widest shadow-2xl">
          🌍 Discover the Globe
        </div>

        {/* Content overlaid on left side bottom */}
        <div className="absolute bottom-16 left-12 right-12 z-10 text-white flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Explore the world
          </h2>
          <p className="text-sm md:text-base text-gray-200/90 leading-relaxed font-medium max-w-md drop-shadow-sm">
            Discover breathtaking landscapes and create unforgettable memories with Travenly.
          </p>
        </div>
      </section>

      {/* Right side: Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-y-auto min-h-screen">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="absolute top-8 right-8 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="w-full max-w-md flex flex-col gap-8">
          
          {/* Brand Logo Header */}
          <header className="flex items-center gap-3 animate-[fadeIn_0.5s_ease-out]">
            <div className="h-10 w-10 bg-[#006644] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-950/10">
              <Compass className="h-5.5 w-5.5 text-white stroke-[2.25]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#006644]">
              Travenly
            </span>
          </header>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
              Welcome Back! <span className="animate-[wiggle_1.5s_ease-in-out_infinite]">👋</span>
            </h1>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Login to continue your journey.
            </p>
          </div>

          {/* Form Fields */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            
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

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="password" 
                className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wide"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400">
                  <Lock className="h-5 w-5 stroke-[1.8]" />
                </span>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  autoComplete="current-password"
                  required
                  className="w-full py-4 pl-12 pr-12 bg-gray-50/50 hover:bg-gray-50/80 focus:bg-white border border-gray-200 focus:border-[#006644] rounded-2xl text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button 
                  type="button"
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeOff className="h-5 w-5 stroke-[1.8]" />
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-xs sm:text-sm font-semibold text-[#006644] hover:text-[#005533] hover:underline transition-colors tracking-wide"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-[#006644] hover:bg-[#005533] active:scale-[0.98] text-white text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/20 outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-250 mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 text-xs font-semibold text-gray-400 bg-white tracking-wider uppercase">
              Or continue with
            </span>
          </div>

          {/* Social Sign-In buttons */}
          <div className="flex gap-4">
            {/* Google Button */}
            <button 
              type="button" 
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 active:scale-[0.98] rounded-2xl text-sm font-bold text-gray-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.74 14.93 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.69 2.87C5.97 7.23 8.76 5.04 12 5.04z"/>
                <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.62-.21-2.3H12v4.4h6.41c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-1.99 3.73-4.92 3.73-8.55z"/>
                <path fill="#FBBC05" d="M5.08 10.43c-.22-.66-.35-1.37-.35-2.11 0-.74.13-1.45.35-2.11L1.39 3.34C.5 5.11 0 7.06 0 9.11c0 2.05.5 4 1.39 5.77l3.69-2.87z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.87c-1.02.68-2.33 1.09-4.27 1.09-3.24 0-6.03-2.19-7.01-5.39l-3.69 2.87C3.37 20.33 7.35 23 12 23z"/>
              </svg>
              Google
            </button>

            {/* Apple Button */}
            <button 
              type="button" 
              className="flex-1 py-3 px-4 flex items-center justify-center gap-2.5 border border-gray-200 hover:bg-gray-50 active:scale-[0.98] rounded-2xl text-sm font-bold text-gray-700 transition-all duration-200 cursor-pointer"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.03 0-1.36-.62-2.54-.62-1.19 0-1.56.6-2.54.62-1.03.02-2.26-1.02-3.24-1.9-2.02-1.83-3.56-5.17-3.56-8.29 0-4.94 3.2-7.56 6.24-7.56 1.05 0 2.03.65 2.68.65.64 0 1.83-.78 3.1-.78 1.32 0 2.51.5 3.3 1.5-2.7 1.63-2.27 5.18.42 6.27-1.08 2.62-2.51 5.28-4.42 7.23zM12.03 3.25c.57-.69.95-1.65.84-2.61-.83.03-1.84.55-2.44 1.26-.52.6-.97 1.58-.85 2.52.92.07 1.88-.48 2.45-1.17z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Sign Up Redirect */}
          <footer className="text-center mt-4">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-wide">
              Don&apos;t have an account?{" "}
              <Link 
                href="/register" 
                className="text-[#006644] hover:text-[#005533] font-bold hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </footer>

        </div>
      </section>

      {/* Styled Animations via custom CSS injected */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
      `}</style>
    </main>
  );
}
