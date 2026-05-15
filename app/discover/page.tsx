"use client";

import React from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";

export default function DiscoverPage() {
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6">
           🌍
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Discover the World</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Explore new destinations, hidden gems, and popular tourist spots around the globe.
        </p>
      </div>
    </DashboardLayout>
  );
}
