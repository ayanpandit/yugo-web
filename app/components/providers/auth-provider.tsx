"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MOCK_USER, SIDEBAR_CONFIG, Role } from "@/app/lib/navigation";

interface AuthContextType {
  userRole: Role;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const userRole = MOCK_USER.role;

  useEffect(() => {
    // Simulate auth check
    const checkAccess = () => {
      // Find current route in config
      const currentRoute = SIDEBAR_CONFIG.find(item => item.href === pathname);
      
      if (currentRoute) {
        if (!currentRoute.roles.includes(userRole)) {
          // If role not allowed, redirect to home or unauthorized page
          router.replace("/");
        }
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [pathname, userRole, router]);

  return (
    <AuthContext.Provider value={{ userRole, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
