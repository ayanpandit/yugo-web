"use client";

import React, { useRef, useCallback, useEffect } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { X, Search as SearchIcon, AlertCircle, RefreshCw } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const {
    query,
    setQuery,
    items,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchNextPage,
    retry,
  } = useSearch(12);

  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);

  // Infinite Scroll Trigger
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchNextPage]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const getInitials = (name: string | null, username: string) => {
    const displayName = name || username;
    const parts = displayName.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return displayName.slice(0, 2).toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-4xl mx-auto">
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Search Users</h1>
          <p className="text-gray-500 text-sm mt-1">Discover other travelers and creators in the social network.</p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white p-3.5 md:p-4 rounded-2xl shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all duration-200">
          <SearchIcon className="text-gray-400 shrink-0" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type name or username to search..."
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 text-gray-800 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-all shrink-0"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Error Handling */}
        {error && (
          <div className="flex flex-col items-center justify-center p-8 bg-red-50/50 rounded-2xl border border-red-100 text-center">
            <AlertCircle className="text-red-500 mb-3" size={32} />
            <h3 className="font-bold text-red-950 text-sm mb-1">Failed to fetch search results</h3>
            <p className="text-xs text-red-700 max-w-sm mb-4 leading-relaxed">{error}</p>
            <button
              onClick={retry}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw size={14} />
              Retry Search
            </button>
          </div>
        )}

        {/* Initial Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 animate-pulse shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && (
          <>
            {items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((user, idx) => {
                  const isLast = idx === items.length - 1;
                  return (
                    <div
                      key={user.id}
                      ref={isLast ? lastElementRef : null}
                      onClick={() => router.push(`/profile/${user.username}`)}
                      className="flex items-center gap-4 bg-white border border-gray-100 hover:border-green-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="relative shrink-0">
                        {user.image ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                            <img
                              src={user.image}
                              alt={user.name || user.username}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold text-sm">
                            {getInitials(user.name, user.username)}
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-green-600 transition-colors">
                          {user.name || user.username}
                        </h3>
                        <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                        
                        {user.relationship?.isFollowing && (
                          <span className="inline-block mt-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Following
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              query && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SearchIcon className="text-gray-300" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">No users found</h3>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    We couldn&apos;t find any match for &quot;{query}&quot;. Double check your spelling or try another name.
                  </p>
                </div>
              )
            )}
          </>
        )}

        {/* Loading More Skeletons */}
        {loadingMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-50">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm opacity-60"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 animate-pulse shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="w-20 h-4 bg-gray-50 rounded animate-pulse"></div>
                  <div className="w-12 h-3 bg-gray-50 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
