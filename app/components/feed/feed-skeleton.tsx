"use client";

import React from "react";

export default function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse bg-white rounded-[32px] p-4 shadow-sm border border-gray-50 min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="bg-gray-100 rounded-2xl h-48 md:h-52 w-full mb-4" />
            <div className="px-1 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100" />
                  <div className="w-16 h-3 bg-gray-100 rounded" />
                </div>
                <div className="w-8 h-4 bg-gray-100 rounded" />
              </div>
              <div className="h-6 bg-gray-100 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          </div>
          <div className="px-1 pt-4 flex justify-between items-center border-t border-gray-50 mt-4">
            <div className="space-y-1">
              <div className="h-5 bg-gray-100 rounded w-20" />
              <div className="h-3 bg-gray-100 rounded w-14" />
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
