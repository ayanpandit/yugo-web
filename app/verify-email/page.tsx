"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, Compass } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await apiFetch(`/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Email verified successfully! You can now log in.");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to verify email. The link may have expired.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-full max-w-md bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl flex flex-col items-center text-center gap-6">
      
      {/* Brand Header */}
      <header className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-[#006644] rounded-xl flex items-center justify-center shadow-md">
          <Compass className="h-5.5 w-5.5 text-white stroke-[2.25]" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[#006644]">
          Travenly
        </span>
      </header>

      {status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <Loader2 className="h-16 w-16 text-[#006644] animate-spin stroke-[1.5]" />
          <h2 className="text-2xl font-black text-gray-800">Verifying your email...</h2>
          <p className="text-sm text-gray-500 font-medium">Please wait while we validate your credentials.</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 py-4 animate-[fadeIn_0.5s_ease-out]">
          <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100 mb-2">
            <CheckCircle className="h-10 w-10 text-emerald-500 stroke-[2]" />
          </div>
          <h2 className="text-2xl font-black text-gray-800">Email Verified!</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{message}</p>
          
          <Link 
            href="/login" 
            className="w-full py-4 px-8 bg-[#006644] hover:bg-[#005533] active:scale-[0.98] text-white text-base font-bold rounded-2xl shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/20 outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-250 mt-6 cursor-pointer"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 py-4 animate-[fadeIn_0.5s_ease-out]">
          <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100 mb-2">
            <XCircle className="h-10 w-10 text-red-500 stroke-[2]" />
          </div>
          <h2 className="text-2xl font-black text-gray-800">Verification Failed</h2>
          <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{message}</p>
          
          <Link 
            href="/register" 
            className="w-full py-4 px-8 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] text-white text-base font-bold rounded-2xl shadow-lg outline-none transition-all duration-250 mt-6 cursor-pointer"
          >
            Try Registering Again
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-tr from-gray-50 via-white to-emerald-50/20">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-12 w-12 text-[#006644] animate-spin stroke-[1.5]" />
          <h2 className="text-xl font-bold text-gray-800">Loading...</h2>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
}
