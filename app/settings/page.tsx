"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/providers/auth-provider";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { SettingsTemplate } from "@/app/components/settings/settings-template";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <DashboardLayout>
        <div className="flex-1 overflow-y-auto bg-[#fcfdfe] p-10 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SettingsTemplate user={user} />
    </DashboardLayout>
  );
}

