"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Bell, Check, User, Heart, MessageCircle, AlertCircle, RefreshCw, X, Trash2 } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import { useRelationship } from "../hooks/useRelationship";
import { useAuth } from "@/app/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { NotificationType } from "../types/social";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

export default function NotificationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const {
    filter,
    setFilter,
    items,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchNextPage,
    markRead,
    markAllRead,
    deleteNotification,
    retry,
  } = useNotifications(15, "ALL");

  const { accept, reject } = useRelationship();

  // Track loading state for individual action buttons
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Track locally resolved follow requests: ID -> "ACCEPTED" | "REJECTED"
  const [resolvedRequests, setResolvedRequests] = useState<Record<string, "ACCEPTED" | "REJECTED">>({});

  const observer = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "FOLLOW_REQUEST":
        return <User size={16} className="text-blue-500" />;
      case "FOLLOW_ACCEPT":
        return <User size={16} className="text-emerald-500" />;
      case "LIKE":
        return <Heart size={16} className="text-red-500" fill="currentColor" />;
      case "COMMENT":
        return <MessageCircle size={16} className="text-green-500" />;
      case "SYSTEM":
        return <Bell size={16} className="text-orange-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  const getNotificationText = (type: NotificationType) => {
    switch (type) {
      case "FOLLOW_REQUEST":
        return `sent you a follow request.`;
      case "FOLLOW_ACCEPT":
        return `accepted your follow request.`;
      case "LIKE":
        return `liked your travel itinerary.`;
      case "COMMENT":
        return `commented on your itinerary.`;
      case "SYSTEM":
        return `sent a system notification.`;
      default:
        return `sent you an update.`;
    }
  };

  const handleAccept = async (notificationId: string, actorId: string) => {
    setActionLoading(notificationId);
    try {
      await accept(actorId);
      setResolvedRequests((prev) => ({ ...prev, [notificationId]: "ACCEPTED" }));
      // Mark as read automatically when resolving request
      await markRead(notificationId);
    } catch (err) {
      console.error("Failed to accept follow request:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (notificationId: string, actorId: string) => {
    setActionLoading(notificationId);
    try {
      await reject(actorId);
      setResolvedRequests((prev) => ({ ...prev, [notificationId]: "REJECTED" }));
      await markRead(notificationId);
    } catch (err) {
      console.error("Failed to reject follow request:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (authLoading || !user) {
    return (
      <DashboardLayout>
        <div className="flex-1 overflow-y-auto bg-[#f8fafb] p-10 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const unreadCount = items.filter((n) => !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-3xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Notifications
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Stay updated on your connections, likes, comments, and activities.
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-green-200 hover:bg-green-50/10 text-gray-700 hover:text-green-700 text-xs font-bold rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Check size={16} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-gray-100 pb-px gap-6">
          {(["ALL", "UNREAD", "READ"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap",
                  isActive
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                )}
              >
                {tab === "ALL" ? "All" : tab === "UNREAD" ? "Unread" : "Read"}
              </button>
            );
          })}
        </div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center p-10 bg-red-50/50 rounded-2xl border border-red-100 text-center">
            <AlertCircle className="text-red-500 mb-3" size={36} />
            <h3 className="font-bold text-red-950 text-sm mb-1">Failed to load notifications</h3>
            <p className="text-xs text-red-700 max-w-sm mb-4 leading-relaxed">{error}</p>
            <button
              onClick={retry}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              Retry Loading
            </button>
          </div>
        )}

        {/* Initial Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="w-11 h-11 bg-gray-100 rounded-full animate-pulse shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="w-1/3 h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="w-1/2 h-3 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notifications Timeline List */}
        {!loading && !error && (
          <>
            {items.length > 0 ? (
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm divide-y divide-gray-50">
                {items.map((notification, idx) => {
                  const actorName =
                    notification.actor?.name || notification.actor?.username || "Someone";
                  const isLast = idx === items.length - 1;
                  const isUnread = !notification.isRead;
                  const resolvedStatus = resolvedRequests[notification.id];

                  return (
                    <div
                      key={notification.id}
                      ref={isLast ? lastElementRef : null}
                      onClick={async () => {
                        if (isUnread) {
                          await markRead(notification.id);
                        }
                        if (notification.actor?.username) {
                          router.push(`/profile/${notification.actor.username}`);
                        }
                      }}
                      className={cn(
                        "flex items-start justify-between gap-4 p-5 hover:bg-gray-50/30 transition-all cursor-pointer",
                        isUnread ? "bg-green-50/10" : "bg-transparent"
                      )}
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Actor Avatar */}
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-full overflow-hidden bg-emerald-50 border border-gray-200 relative">
                            <Image
                              src={notification.actor?.image || "/logo.png"}
                              alt={actorName}
                              fill
                              className={cn("object-cover", !notification.actor?.image && "p-2")}
                            />
                          </div>
                          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                            {getIconForType(notification.type)}
                          </div>
                        </div>

                        {/* Notification content text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 leading-relaxed font-medium">
                            <span className="font-bold text-gray-900">{actorName}</span>{" "}
                            {getNotificationText(notification.type)}
                          </p>
                          <span className="text-[10px] font-semibold text-gray-400 mt-1 block">
                            {new Date(notification.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Action triggers (Accept/Reject or Mark read) */}
                      <div className="shrink-0 flex items-center gap-4 self-center">
                        {notification.type === "FOLLOW_REQUEST" && (
                          <div className="flex items-center gap-2">
                            {resolvedStatus === "ACCEPTED" ? (
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                                Accepted
                              </span>
                            ) : resolvedStatus === "REJECTED" ? (
                              <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                                Rejected
                              </span>
                            ) : (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAccept(notification.id, notification.actorId);
                                  }}
                                  disabled={actionLoading === notification.id}
                                  className="text-xs font-bold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(notification.id, notification.actorId);
                                  }}
                                  disabled={actionLoading === notification.id}
                                  className="text-xs font-bold text-gray-750 bg-gray-100 hover:bg-gray-250 disabled:bg-gray-300 px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        {/* Direct Mark Read triggers for general notifications */}
                        {notification.type !== "FOLLOW_REQUEST" && isUnread && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              await markRead(notification.id);
                            }}
                            className="text-xs font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100/50 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                          >
                            Mark read
                          </button>
                        )}

                        {/* Unread dot indicator */}
                        {isUnread && (
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        )}

                        {/* Delete notification trigger */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-100/50 transition-all shrink-0 cursor-pointer"
                          title="Delete Notification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 text-gray-300">
                  <Bell size={28} />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">No notifications</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  We will notify you when someone starts following you, likes or comments on your trips.
                </p>
              </div>
            )}
          </>
        )}

        {/* Loading More Skeletons */}
        {loadingMore && (
          <div className="space-y-4 pt-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm opacity-50"
              >
                <div className="w-11 h-11 bg-gray-50 rounded-full animate-pulse shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="w-1/3 h-4 bg-gray-50 rounded animate-pulse"></div>
                  <div className="w-1/2 h-3 bg-gray-50 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
