"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, User, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

type NotificationType = "FOLLOW" | "LIKE" | "COMMENT" | "SYSTEM";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "FOLLOW",
    title: "New Follower",
    message: "Sarah Jenkins started following you.",
    time: "2m ago",
    isRead: false,
    avatar: "/avatars/user.png", // using the mock avatar
  },
  {
    id: "2",
    type: "LIKE",
    title: "New Like",
    message: "Alex liked your trip to Bali.",
    time: "1h ago",
    isRead: false,
    avatar: "/avatars/user.png",
  },
  {
    id: "3",
    type: "COMMENT",
    title: "New Comment",
    message: "Maria commented on your recent post.",
    time: "2h ago",
    isRead: true,
    avatar: "/avatars/user.png",
  },
  {
    id: "4",
    type: "SYSTEM",
    title: "System Update",
    message: "Welcome to YouGO! Complete your profile.",
    time: "1d ago",
    isRead: true,
  },
];

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Unread count
  const unreadCount = DUMMY_NOTIFICATIONS.filter(n => !n.isRead).length;

  // Handle click outside to close
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

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "FOLLOW": return <User size={14} className="text-blue-500" />;
      case "LIKE": return <Heart size={14} className="text-red-500" />;
      case "COMMENT": return <MessageCircle size={14} className="text-green-500" />;
      case "SYSTEM": return <Bell size={14} className="text-orange-500" />;
    }
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
            {unreadCount}
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
            className="absolute right-0 mt-3 w-80 md:w-96 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-white/50">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors">
                <Check size={14} />
                Mark all read
              </button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {DUMMY_NOTIFICATIONS.length > 0 ? (
                <div className="flex flex-col">
                  {DUMMY_NOTIFICATIONS.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "flex items-start gap-3 p-4 border-b border-gray-50 transition-colors hover:bg-gray-50/50 cursor-pointer",
                        !notification.isRead ? "bg-green-50/30" : "bg-transparent"
                      )}
                    >
                      {/* Avatar / Icon */}
                      <div className="relative shrink-0">
                        {notification.avatar ? (
                          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative">
                            <Image src={notification.avatar} alt="Avatar" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            {getIconForType(notification.type)}
                          </div>
                        )}
                        {/* Type Indicator */}
                        {notification.avatar && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-gray-100 flex items-center justify-center shadow-sm">
                            {getIconForType(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-sm font-semibold text-gray-900 truncate pr-2">
                            {notification.title}
                          </p>
                          <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap pt-1">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-8 text-center flex flex-col items-center justify-center text-gray-400">
                  <Bell size={24} className="mb-2 text-gray-300" />
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
