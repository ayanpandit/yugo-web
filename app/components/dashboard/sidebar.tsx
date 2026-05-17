"use strict";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_CONFIG } from "@/app/lib/navigation";
import { cn } from "@/app/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/components/providers/auth-provider";
import { apiFetch } from "@/app/lib/api";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userRole, refreshSession } = useAuth();

  const filteredNav = SIDEBAR_CONFIG.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      await refreshSession();
      router.push("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <Image
          src="/logo.png"
          alt="YouGO Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="text-2xl font-extrabold tracking-tight">
          <span className="text-gray-800">You</span>
          <span className="text-[#006644]">GO</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} className={cn(isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
                <span className="font-medium text-[15px]">{item.title}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                  isActive ? "bg-white text-green-500" : "bg-orange-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Logo/Brand Section */}
      <div className="mt-auto mb-6 px-4 py-6 bg-gray-50 rounded-[24px] border border-gray-100 flex flex-col items-center justify-center text-center">
        <Image
          src="/logo.png"
          alt="YouGO"
          width={40}
          height={40}
          className="w-10 h-10 object-contain mb-3"
        />
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
           Trusted Travel Partner
        </div>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors cursor-pointer w-full text-left"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
