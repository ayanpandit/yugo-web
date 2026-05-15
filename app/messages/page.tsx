"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, CheckCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/app/lib/utils";

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
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative">
        
        {/* Left: Chat List */}
        <div className={cn(
          "w-full md:w-80 border-r border-gray-100 flex flex-col transition-all",
          isMobileChatOpen ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Chats</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm outline-none focus:ring-1 focus:ring-green-500/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={cn(
                  "w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 transition-colors text-left border-b border-gray-50",
                  selectedChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"
                )}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl md:text-2xl">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-800 text-xs md:text-sm truncate">{chat.name}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-400">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] md:text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="bg-green-500 text-white text-[9px] md:text-[10px] font-bold w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center">
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
              <div className="px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <button 
                    onClick={() => setIsMobileChatOpen(false)}
                    className="md:hidden p-1.5 -ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg md:text-xl">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs md:text-sm">{selectedChat.name}</h3>
                    <p className="text-[9px] md:text-[10px] text-green-500 font-medium">
                      {selectedChat.online ? "Online" : "Last seen 2h ago"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 no-scrollbar">
                {MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%] md:max-w-[70%]",
                      msg.sender === "me" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-3 md:px-4 py-2 md:py-3 rounded-2xl text-[13px] md:text-sm shadow-sm",
                        msg.sender === "me" 
                          ? "bg-green-500 text-white rounded-tr-none" 
                          : "bg-white text-gray-700 rounded-tl-none border border-gray-100"
                      )}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-[9px] md:text-[10px] text-gray-400">{msg.time}</span>
                      {msg.sender === "me" && <CheckCheck size={10} className="text-blue-400" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 md:gap-4 bg-gray-50 px-3 md:px-4 py-2 rounded-2xl">
                  <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Smile size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm text-gray-700 placeholder:text-gray-300"
                  />
                  {messageInput ? (
                    <button className="p-2 md:p-2.5 bg-green-500 text-white rounded-xl shadow-lg shadow-green-100 transition-transform active:scale-95">
                      <Send size={16} />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Mic size={18} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">💬</div>
              <h3 className="text-gray-800 font-bold mb-2">Select a chat</h3>
              <p className="text-gray-400 text-sm max-w-[200px]">Choose a conversation from the left to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
