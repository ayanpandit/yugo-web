"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, CheckCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { apiFetch } from "@/app/lib/api";
import { useAuth } from "@/app/components/providers/auth-provider";

interface Message {
  messageId: string;
  text: string;
  createdAt: string;
  sender: {
    id: string;
    username: string;
    name: string | null;
    image: string | null;
  };
}

interface Participant {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
}

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const conversationId = params?.conversationId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  const fetchParticipantDetails = async () => {
    try {
      const res = await apiFetch("/api/v1/conversations");
      if (res.ok) {
        const result = await res.json();
        const activeChat = result.data?.find((c: any) => c.conversationId === conversationId);
        if (activeChat) {
          setParticipant(activeChat.participant);
        }
      }
    } catch (err) {
      console.error("Failed to load participant details:", err);
    }
  };

  const fetchMessages = async (isBackground = false) => {
    try {
      const res = await apiFetch(`/api/v1/conversations/${conversationId}/messages`);
      if (res.ok) {
        const result = await res.json();
        const fetchedMessages = result.data || [];
        
        setMessages((prev) => {
          // Only update state if message count has changed, or timestamps differ
          if (prev.length === fetchedMessages.length && 
              prev[prev.length - 1]?.messageId === fetchedMessages[fetchedMessages.length - 1]?.messageId) {
            return prev;
          }
          return fetchedMessages;
        });
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // Scroll to bottom on initial load or new messages
  useEffect(() => {
    if (messages.length > 0) {
      if (isInitialLoadRef.current) {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        isInitialLoadRef.current = false;
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // Initial load
  useEffect(() => {
    isInitialLoadRef.current = true;
    setLoading(true);
    fetchParticipantDetails();
    fetchMessages();
  }, [conversationId]);

  // Polling for incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(true);
    }, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = messageInput.trim();
    if (!text || sending) return;

    setSending(true);
    try {
      const res = await apiFetch(`/api/v1/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        const result = await res.json();
        const newMessage = result.data;
        
        // Optimistic / Immediate state update
        setMessages((prev) => [...prev, newMessage]);
        setMessageInput("");
        
        // Scroll smoothly to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const formatMessageTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-8 bg-white/50 h-full">
        <div className="text-gray-400 text-xs font-semibold animate-pulse">Loading conversation...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafb] h-full overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 md:px-8 py-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => router.push("/messages")}
            className="md:hidden p-2 -ml-2 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="relative">
            {participant?.image ? (
              <img 
                src={participant.image} 
                alt={participant.username} 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-inner"
              />
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold shadow-inner">
                {participant?.name ? participant.name[0].toUpperCase() : participant?.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-gray-800 text-sm md:text-base">
              {participant?.name || (participant ? `@${participant.username}` : "Chat")}
            </h3>
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
               <p className="text-[10px] md:text-xs text-gray-400 font-medium">Active now</p>
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
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar min-h-0 bg-[#f8fafb]">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isMe = msg.sender.id === currentUser?.id;
            return (
              <div
                key={msg.messageId}
                className={cn(
                  "flex flex-col max-w-[85%] md:max-w-[70%] transition-all",
                  isMe ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl md:rounded-3xl text-[13px] md:text-sm shadow-sm break-words max-w-full",
                    isMe 
                      ? "bg-green-500 text-white rounded-tr-none shadow-green-50" 
                      : "bg-white text-gray-700 rounded-tl-none border border-gray-100 shadow-gray-50"
                  )}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1.5 mt-2 px-1">
                  <span className="text-[10px] text-gray-400 font-medium">{formatMessageTime(msg.createdAt)}</span>
                  {isMe && <CheckCheck size={12} className="text-blue-400" />}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="text-4xl mb-4">👋</div>
            <h4 className="text-sm font-bold text-gray-700 mb-1">Say hello to {participant?.name || `@${participant?.username}`}</h4>
            <p className="text-xs text-gray-400 max-w-xs">Start your adventure plans! Ask them about their next travel destination.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3 bg-gray-50 px-4 py-2 md:py-3 rounded-[24px] border border-gray-200">
          <button type="button" className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Smile size={22} />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip size={20} />
          </button>
          
          <input 
            type="text" 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-300 font-medium py-1.5"
            disabled={sending}
          />
          
          {messageInput.trim() ? (
            <button 
              type="submit"
              disabled={sending}
              className="p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-100 transition-transform active:scale-90 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          ) : (
            <button 
              type="button" 
              className="p-3 bg-white text-gray-400 rounded-full shadow-sm hover:text-green-500 transition-all active:scale-90 flex items-center justify-center border border-gray-100 shrink-0"
            >
              <Mic size={20} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
