"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, ArrowLeft, MoreVertical, MessageSquare } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { useMessageRequests } from "../hooks/useMessageRequests";

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
  const [view, setView] = useState<"chats" | "requests">("chats");

  // Load message requests state
  const { checkIsRequest, rejectedIds, acceptedIds } = useMessageRequests();

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

  // Sync unread messages badge globally whenever conversations or seen states change
  useEffect(() => {
    if (conversations.length > 0) {
      window.dispatchEvent(new CustomEvent("refetch-unread-messages"));
    }
  }, [conversations, acceptedIds]);

  // Listen to local seen modifications to force immediate sidebar sync
  useEffect(() => {
    const handleRefetch = () => {
      fetchConversations();
    };
    window.addEventListener("refetch-unread-messages", handleRefetch);
    return () => {
      window.removeEventListener("refetch-unread-messages", handleRefetch);
    };
  }, []);

  // Compute requests count
  const requestConversations = useMemo(() => {
    return conversations.filter(
      (c) => !rejectedIds.has(c.conversationId) && checkIsRequest(c)
    );
  }, [conversations, checkIsRequest, rejectedIds]);

  // Compute normal conversations
  const normalConversations = useMemo(() => {
    return conversations.filter(
      (c) => !rejectedIds.has(c.conversationId) && !checkIsRequest(c)
    );
  }, [conversations, checkIsRequest, rejectedIds]);

  const filteredConversations = useMemo(() => {
    const activeList = view === "chats" ? normalConversations : requestConversations;
    const term = searchQuery.toLowerCase();
    
    return activeList.filter((c) => {
      const name = c.participant.name?.toLowerCase() || "";
      const username = c.participant.username.toLowerCase();
      return name.includes(term) || username.includes(term);
    });
  }, [view, normalConversations, requestConversations, searchQuery]);

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

  // Helper to determine unread badge on item list
  const isChatUnread = (chat: ConversationPreview) => {
    const lastMsg = chat.lastMessage;
    if (!lastMsg) return false;
    
    // If current user is the sender, it's read
    if (lastMsg.senderId !== chat.participant.id) return false;

    // Check localStorage seen tracker
    try {
      const stored = localStorage.getItem("yougo:seen_messages");
      if (stored) {
        const seenMap = JSON.parse(stored);
        return seenMap[chat.conversationId] !== lastMsg.id;
      }
    } catch {}
    
    return true;
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
          {/* Search Bar Container */}
          <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col gap-3">
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

          {/* Toggle requests bar */}
          {view === "chats" ? (
            requestConversations.length > 0 && (
              <button
                onClick={() => setView("requests")}
                className="mx-4 my-2 px-4 py-3 bg-orange-50 border border-orange-100 text-orange-800 rounded-xl hover:bg-orange-100/50 flex items-center justify-between transition-all cursor-pointer font-bold text-xs"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-orange-500" />
                  <span>Message Requests</span>
                </div>
                <span className="bg-orange-500 text-white rounded-full px-2 py-0.5 text-[10px]">
                  {requestConversations.length}
                </span>
              </button>
            )
          ) : (
            <button
              onClick={() => setView("chats")}
              className="mx-4 my-2 px-4 py-2.5 bg-gray-50 border border-gray-150 text-gray-700 rounded-xl hover:bg-gray-100 flex items-center gap-2 transition-all cursor-pointer font-bold text-xs"
            >
              <ArrowLeft size={14} />
              <span>Back to Chats</span>
            </button>
          )}

          {/* List Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-xs">Loading conversations...</div>
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((chat) => {
                const isActive = activeConversationId === chat.conversationId;
                const isUnread = isChatUnread(chat);
                
                return (
                  <button
                    key={chat.conversationId}
                    onClick={() => router.push(`/messages/${chat.conversationId}`)}
                    className={cn(
                      "w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-5 transition-all text-left border-b border-gray-50 relative",
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
                      {isUnread && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          "text-sm truncate",
                          isUnread ? "font-black text-gray-900" : "font-bold text-gray-700"
                        )}>
                          {chat.participant.name || `@${chat.participant.username}`}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">
                          {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : formatTime(chat.updatedAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={cn(
                          "text-xs truncate max-w-[85%]",
                          isUnread ? "text-gray-900 font-bold" : "text-gray-400 font-medium",
                          isActive && "text-green-700 font-semibold"
                        )}>
                          {chat.lastMessage ? chat.lastMessage.text : "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-400 text-xs">
                {view === "chats" ? "No active chats found" : "No message requests"}
              </div>
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
