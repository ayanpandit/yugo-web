"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname === "/dashboard";
  const showSidebar = ["/dashboard", "/explore", "/search", "/messages", "/post-trip", "/settings", "/notifications"].includes(pathname);
  const hideHeader = !isDashboard;

  return (
    <div className="flex min-h-screen bg-[#f8fafb]">
      {/* Desktop Sidebar */}
      {showSidebar && (
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl"
            >
              <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Navigation Action Trigger (Hamburger Menu on Dashboard, Back Arrow on subpages) */}
        <div className="absolute top-5 left-4 z-[60]">
          {showSidebar ? (
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all lg:hidden cursor-pointer"
              title="Open Menu"
            >
              <Menu size={20} />
            </button>
          ) : (
            <button 
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>

        {!hideHeader && <Header />}
        
        <div className={cn(
          "px-4 md:px-8 pb-8 flex-1 overflow-y-auto no-scrollbar",
          hideHeader && "pt-20 lg:pt-8" // Add padding top when header is hidden to avoid toggle overlap
        )}>
          {children}
        </div>
      </main>
    </div>
  );
}
