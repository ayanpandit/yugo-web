"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, User, Heart, MessageCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useNotifications } from "../../hooks/useNotifications";
import { useUnreadCount } from "../../hooks/useUnreadCount";
import { useRouter } from "next/navigation";
import { NotificationType } from "../../types/social";

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load hooks
  const { items, loading, error, markRead, markAllRead } = useNotifications(10, "ALL");
  const { unreadCount, refetch: refetchUnreadCount } = useUnreadCount();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Sync count on change or dropdown open
  useEffect(() => {
    if (isOpen) {
      refetchUnreadCount();
    }
  }, [isOpen, refetchUnreadCount, items]);

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "FOLLOW_REQUEST":
        return <User size={12} className="text-blue-500" />;
      case "FOLLOW_ACCEPT":
        return <User size={12} className="text-emerald-500" />;
      case "LIKE":
        return <Heart size={12} className="text-red-500" fill="currentColor" />;
      case "COMMENT":
        return <MessageCircle size={12} className="text-green-500" />;
      case "SYSTEM":
        return <Bell size={12} className="text-orange-500" />;
      default:
        return <Bell size={12} className="text-gray-500" />;
    }
  };

  const getNotificationText = (type: NotificationType, actorName: string) => {
    switch (type) {
      case "FOLLOW_REQUEST":
        return `sent you a follow request.`;
      case "FOLLOW_ACCEPT":
        return `accepted your follow request.`;
      case "LIKE":
        return `liked your itinerary.`;
      case "COMMENT":
        return `commented on your itinerary.`;
      case "SYSTEM":
        return `dispatched a system alert.`;
      default:
        return `sent an update.`;
    }
  };

  const handleNotificationClick = async (id: string, isRead: boolean, actorUsername: string) => {
    if (!isRead) {
      await markRead(id);
      refetchUnreadCount();
    }
    setIsOpen(false);
    // Navigate to user's profile
    router.push(`/profile/${actorUsername}`);
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
    refetchUnreadCount();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center relative shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors"
      >
        <Bell size={18} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 md:top-3 right-2.5 md:right-3 w-3.5 h-3.5 md:w-4 md:h-4 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center text-[7px] md:text-[8px] text-white font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 md:w-96 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-white/50">
              <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check size={14} />
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[360px] overflow-y-auto no-scrollbar">
              {loading ? (
                <div className="flex flex-col p-4 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 items-center animate-pulse">
                      <div className="w-10 h-10 bg-gray-100 rounded-full shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="w-full h-3 bg-gray-100 rounded"></div>
                        <div className="w-1/2 h-2.5 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <AlertCircle size={20} className="text-red-500 mb-2" />
                  <p className="text-xs text-red-700 font-medium">Failed to load notifications</p>
                </div>
              ) : items.length > 0 ? (
                <div className="flex flex-col">
                  {items.slice(0, 10).map((notification) => {
                    const actorName = notification.actor?.name || notification.actor?.username || "Someone";
                    const isUnread = !notification.isRead;
                    return (
                      <div
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(
                            notification.id,
                            notification.isRead,
                            notification.actor?.username
                          )
                        }
                        className={cn(
                          "flex items-start gap-3 p-4 border-b border-gray-50 transition-colors hover:bg-gray-50/50 cursor-pointer text-left",
                          isUnread ? "bg-green-50/20" : "bg-transparent"
                        )}
                      >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          {notification.actor?.image ? (
                            <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                              <Image
                                src={notification.actor.image}
                                alt={actorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-green-50 text-green-700 flex items-center justify-center font-bold text-xs uppercase">
                              {actorName.slice(0, 2)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                            {getIconForType(notification.type)}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 leading-relaxed font-medium">
                            <span className="font-bold text-gray-900">{actorName}</span>{" "}
                            {getNotificationText(notification.type, actorName)}
                          </p>
                          <span className="text-[9px] font-semibold text-gray-400 mt-1 block">
                            {new Date(notification.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Unread dot */}
                        {isUnread && (
                          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-10 text-center flex flex-col items-center justify-center text-gray-400">
                  <Bell size={24} className="mb-2 text-gray-300 animate-bounce" />
                  <p className="text-xs font-semibold">All caught up!</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">No new notifications here.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/notifications");
                }}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
