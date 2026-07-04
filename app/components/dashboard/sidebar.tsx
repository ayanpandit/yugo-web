"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAR_CONFIG } from "@/app/lib/navigation";
import { cn } from "@/app/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/components/providers/auth-provider";
import { apiFetch } from "@/app/lib/api";
import { useUnreadCount } from "../../hooks/useUnreadCount";
import { useMessageRequests } from "../../hooks/useMessageRequests";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userRole, refreshSession } = useAuth();

  const { unreadCount: unreadNotifications, refetch: refetchNotifications } = useUnreadCount();
  const { checkIsRequest, rejectedIds, acceptedIds, refetch: refetchRequests } = useMessageRequests();

  const [unreadMessages, setUnreadMessages] = useState(0);

  const fetchUnreadMessages = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiFetch("/api/v1/conversations");
      if (res.ok) {
        const result = await res.json();
        const list = result.data || [];

        // Load seen messages map
        let seenMap: Record<string, string> = {};
        try {
          const stored = localStorage.getItem("yougo:seen_messages");
          seenMap = stored ? JSON.parse(stored) : {};
        } catch {}

        const count = list.filter((chat: any) => {
          const lastMsg = chat.lastMessage;
          if (!lastMsg) return false;
          if (lastMsg.senderId === user.id) return false; // We sent it
          
          if (rejectedIds.has(chat.conversationId)) return false; // Rejected/Deleted
          
          // Check if it is a request
          const isRequest = checkIsRequest(chat);
          if (isRequest) return false; // Requests don't count towards normal inbox count

          const lastSeenId = seenMap[chat.conversationId];
          return lastSeenId !== lastMsg.id;
        }).length;

        setUnreadMessages(count);
      }
    } catch (err) {
      console.error("Failed to load sidebar unread messages count:", err);
    }
  }, [user, checkIsRequest, rejectedIds]);

  // Sync count triggers
  useEffect(() => {
    if (user) {
      fetchUnreadMessages();
      refetchNotifications();
    }
  }, [user, fetchUnreadMessages, refetchNotifications, pathname]);

  useEffect(() => {
    const handleRefetchMessages = () => {
      refetchRequests();
      fetchUnreadMessages();
    };

    const handleRefetchNotifications = () => {
      refetchNotifications();
    };

    window.addEventListener("refetch-unread-messages", handleRefetchMessages);
    window.addEventListener("refetch-unread-count", handleRefetchNotifications);

    return () => {
      window.removeEventListener("refetch-unread-messages", handleRefetchMessages);
      window.removeEventListener("refetch-unread-count", handleRefetchNotifications);
    };
  }, [fetchUnreadMessages, refetchNotifications, refetchRequests]);

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

  const getDynamicBadge = (title: string) => {
    if (title === "Messages") {
      return unreadMessages > 0 ? unreadMessages : null;
    }
    if (title === "Notifications") {
      return unreadNotifications > 0 ? unreadNotifications : null;
    }
    return null;
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
          const badgeCount = getDynamicBadge(item.title);

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
              {badgeCount !== null && (
                <span className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                  isActive ? "bg-white text-green-500" : "bg-orange-500 text-white"
                )}>
                  {badgeCount}
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
