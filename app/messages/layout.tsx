"use client";

import React, { useEffect, useState } from "react";
import { Search, ArrowLeft, MoreVertical } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";

interface Participant {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
}

interface LastMessage {
  id: string;
  text: string;
  createdAt: string;
  senderId: string;
}

interface ConversationPreview {
  conversationId: string;
  updatedAt: string;
  participant: Participant;
  lastMessage: LastMessage | null;
}

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const activeConversationId = params?.conversationId as string | undefined;

  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const res = await apiFetch("/api/v1/conversations");
      if (res.ok) {
        const result = await res.json();
        setConversations(result.data || []);
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredConversations = conversations.filter((c) => {
    const term = searchQuery.toLowerCase();
    const name = c.participant.name?.toLowerCase() || "";
    const username = c.participant.username.toLowerCase();
    return name.includes(term) || username.includes(term);
  });

  const isChatOpenOnMobile = activeConversationId !== undefined;

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return date.toLocaleDateString([], { weekday: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#f8fafb] flex flex-col">
      {/* Top Navigation Bar - Hidden on mobile when chat is open */}
      <div className={cn(
        "bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm",
        isChatOpenOnMobile ? "hidden md:flex" : "flex"
      )}>
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold hidden sm:inline">Back to Dashboard</span>
          </button>
        </Link>
        
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-black text-gray-800 leading-tight">Messages</h1>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">YouGO Community</p>
        </div>

        <div className="w-10 sm:w-40 flex justify-end">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <MoreVertical size={20} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Chat List */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-white transition-all",
          isChatOpenOnMobile ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 md:p-6 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-10 pr-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/10 text-gray-700 font-medium placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-xs">Loading conversations...</div>
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((chat) => {
                const isActive = activeConversationId === chat.conversationId;
                return (
                  <button
                    key={chat.conversationId}
                    onClick={() => router.push(`/messages/${chat.conversationId}`)}
                    className={cn(
                      "w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-5 transition-all text-left border-b border-gray-50",
                      isActive ? "bg-green-50/50" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="relative shrink-0">
                      {chat.participant.image ? (
                        <img 
                          src={chat.participant.image} 
                          alt={chat.participant.username}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold border-2 border-white shadow-sm">
                          {chat.participant.name ? chat.participant.name[0].toUpperCase() : chat.participant.username[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-800 text-sm truncate">
                          {chat.participant.name || `@${chat.participant.username}`}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">
                          {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : formatTime(chat.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={cn(
                          "text-xs truncate max-w-[85%]",
                          isActive ? "text-green-700" : "text-gray-400 font-medium"
                        )}>
                          {chat.lastMessage ? chat.lastMessage.text : "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-400 text-xs">No active chats found</div>
            )}
          </div>
        </div>

        {/* Right Content Area: Active conversation or welcome message */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#f8fafb] transition-all",
          isChatOpenOnMobile ? "flex" : "hidden md:flex"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}
