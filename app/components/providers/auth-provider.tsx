"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SIDEBAR_CONFIG, Role } from "@/app/lib/navigation";
import { apiFetch } from "@/app/lib/api";

interface User {
  id: string;
  name?: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  travelStyle?: string;
  interests?: string[];
  languages?: string[];
}

interface AuthContextType {
  user: User | null;
  userRole: Role;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Role>("GUEST");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Session Persistence: Verify user via HttpOnly cookie to the backend
  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch("/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.data.user);
        setUserRole("USER"); // Elevate role upon active session
      } else {
        setUser(null);
        setUserRole("GUEST");
      }
    } catch (error) {
      console.error("Session check failed", error);
      setUser(null);
      setUserRole("GUEST");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch session on initial load
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Route Guard Logic: Triggered on route change or auth state change
  useEffect(() => {
    if (isLoading) return; // Delay guard execution until session is verified

    const currentRoute = SIDEBAR_CONFIG.find(item => pathname.startsWith(item.href) && item.href !== "/");
    
    // Determine if the exact or parent route exists in SIDEBAR_CONFIG
    const matchedRoute = SIDEBAR_CONFIG.find(item => item.href === pathname);

    if (matchedRoute) {
      if (!matchedRoute.roles.includes(userRole)) {
        // Unauthenticated users navigating to protected routes get sent to login
        router.replace("/login");
      }
    }
  }, [pathname, userRole, isLoading, router]);

  return (
    <AuthContext.Provider value={{ user, userRole, isLoading, refreshSession: fetchSession }}>
      {/* Optional: Add a full screen spinner here if isLoading is true and you want to block render */}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
