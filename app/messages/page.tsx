"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, CheckCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

const CHATS = [
  { id: 1, name: "Sarah Jenkins", avatar: "👩‍🦳", lastMessage: "See you in Bali!", time: "10:30 AM", unread: 2, online: true },
  { id: 2, name: "Marc Roiss", avatar: "👨‍", lastMessage: "The trail was amazing.", time: "9:15 AM", unread: 0, online: false },
  { id: 3, name: "Kenji Sato", avatar: "👨‍🍳", lastMessage: "Ramen tonight?", time: "Yesterday", unread: 0, online: true },
  { id: 4, name: "Travel Group", avatar: "🏖️", lastMessage: "Alex: I've booked the car.", time: "Yesterday", unread: 0, online: false },
  { id: 5, name: "Elena Gomez", avatar: "👩‍", lastMessage: "Where is the meeting point?", time: "2 days ago", unread: 0, online: false },
];

const MESSAGES = [
  { id: 1, text: "Hey! Are you excited for the Bali trip?", sender: "them", time: "10:15 AM" },
  { id: 2, text: "Absolutely! I've already started packing.", sender: "me", time: "10:18 AM" },
  { id: 3, text: "Did you check the itinerary I sent yesterday?", sender: "them", time: "10:20 AM" },
  { id: 4, text: "Yes, it looks perfect. I especially love the sunset dinner plan.", sender: "me", time: "10:25 AM" },
  { id: 5, text: "See you in Bali!", sender: "them", time: "10:30 AM" },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<typeof CHATS[0] | null>(CHATS[0]);
  const [messageInput, setMessageInput] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleChatSelect = (chat: typeof CHATS[0]) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#f8fafb] flex flex-col">
      
      {/* Top Navigation Bar - Hidden on mobile when chat is open */}
      <div className={cn(
        "bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm",
        isMobileChatOpen ? "hidden md:flex" : "flex"
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
          isMobileChatOpen ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 md:p-6 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-10 pr-4 text-xs md:text-sm outline-none focus:ring-2 focus:ring-green-500/10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={cn(
                  "w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-5 transition-all text-left border-b border-gray-50",
                  selectedChat?.id === chat.id ? "bg-green-50/50" : "hover:bg-gray-50"
                )}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl border-2 border-white shadow-sm">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-800 text-sm truncate">{chat.name}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 truncate opacity-80">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="bg-green-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Chat Window */}
        <div className={cn(
          "flex-1 flex flex-col bg-[#f8fafb] transition-all",
          isMobileChatOpen ? "flex" : "hidden md:flex"
        )}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="px-4 md:px-8 py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <button 
                    onClick={() => setIsMobileChatOpen(false)}
                    className="md:hidden p-2 -ml-2 text-gray-400 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl md:text-2xl shadow-inner">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base">{selectedChat.name}</h3>
                    <div className="flex items-center gap-1.5">
                       <div className={cn("w-1.5 h-1.5 rounded-full", selectedChat.online ? "bg-green-500" : "bg-gray-300")} />
                       <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                         {selectedChat.online ? "Online" : "Away"}
                       </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                  <button className="p-2.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all">
                    <Phone size={20} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all">
                    <Video size={20} />
                  </button>
                  <button className="p-2.5 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar">
                {MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%] md:max-w-[70%] transition-all",
                      msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl md:rounded-3xl text-[13px] md:text-sm shadow-sm",
                        msg.sender === "me" 
                          ? "bg-green-500 text-white rounded-tr-none shadow-green-50" 
                          : "bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-gray-50"
                      )}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 px-1">
                      <span className="text-[10px] text-gray-400 font-medium">{msg.time}</span>
                      {msg.sender === "me" && <CheckCheck size={12} className="text-blue-400" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-8 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 px-4 py-2 md:py-3 rounded-[24px] border border-gray-200">
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Smile size={22} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-300 font-medium"
                  />
                  {messageInput ? (
                    <button className="p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-100 transition-transform active:scale-90 flex items-center justify-center">
                      <Send size={18} />
                    </button>
                  ) : (
                    <button className="p-3 bg-white text-gray-400 rounded-full shadow-sm hover:text-green-500 transition-all active:scale-90 flex items-center justify-center border border-gray-100">
                      <Mic size={20} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/50 backdrop-blur-sm">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl mb-6 animate-bounce">💬</div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Select a conversation</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">Pick a traveler from your list to start planning your next journey together.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
