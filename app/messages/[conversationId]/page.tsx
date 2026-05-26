"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, CheckCheck, Square, Trash2 } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { apiFetch } from "@/app/lib/api";
import { useAuth } from "@/app/components/providers/auth-provider";
import { useSocket } from "@/app/components/providers/socket-provider";

interface Message {
  messageId: string;
  text?: string;
  type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";
  mediaUrl?: string;
  mediaPublicId?: string;
  seenAt?: string;
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
  const { socket, onlineUsers, typingUsers, initiateCall } = useSocket();
  const conversationId = params?.conversationId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Media uploads & Voice Note states
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  // Computed online presence and typing statuses
  const isPeerOnline = participant ? onlineUsers.includes(participant.id) : false;
  const conversationTypers = typingUsers[conversationId] || [];
  const otherTypers = conversationTypers.filter((id) => id !== currentUser?.id);
  const isTyping = otherTypers.length > 0;

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

  const fetchMessages = async () => {
    try {
      const res = await apiFetch(`/api/v1/conversations/${conversationId}/messages`);
      if (res.ok) {
        const result = await res.json();
        setMessages(result.data || []);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
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

  // Initial load configuration
  useEffect(() => {
    isInitialLoadRef.current = true;
    setLoading(true);
    fetchParticipantDetails();
    fetchMessages();

    // Sockets room connection
    if (socket && conversationId) {
      socket.emit("room:join", { conversationId });
      
      // Realtime incoming message receiver
      socket.on("message:receive", (newMessage: Message) => {
        setMessages((prev) => {
          // Guard against duplicate optimistic appends
          if (prev.some((m) => m.messageId === newMessage.messageId)) return prev;
          return [...prev, newMessage];
        });

        // Auto-emit seen acknowledgement receipt if sent by peer
        if (newMessage.sender.id !== currentUser?.id) {
          socket.emit("message:seen", { conversationId, messageId: newMessage.messageId });
        }
      });

      // Realtime seen receipts synchronizer
      socket.on("message:seen:sync", ({ messageId, seenAt }: { messageId: string; seenAt: string }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.messageId === messageId ? { ...msg, seenAt } : msg
          )
        );
      });
    }

    return () => {
      if (socket && conversationId) {
        socket.emit("room:leave", { conversationId });
        socket.off("message:receive");
        socket.off("message:seen:sync");
      }
    };
  }, [conversationId, socket]);

  // Read receipt checker loop
  useEffect(() => {
    if (messages.length > 0 && socket) {
      const unseenPeerMsg = [...messages]
        .reverse()
        .find((m) => m.sender.id !== currentUser?.id && !m.seenAt);
      if (unseenPeerMsg) {
        socket.emit("message:seen", { conversationId, messageId: unseenPeerMsg.messageId });
      }
    }
  }, [messages, socket, currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);

    // Dynamic Ephemeral Typing Relay
    if (socket && conversationId) {
      socket.emit("typing:start", { conversationId });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing:stop", { conversationId });
      }, 2000);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = messageInput.trim();
    if (!text || sending) return;

    setSending(true);
    // Stop typing immediately upon sending
    if (socket && conversationId) {
      socket.emit("typing:stop", { conversationId });
    }

    try {
      const res = await apiFetch(`/api/v1/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({ text, type: "TEXT" }),
      });

      if (res.ok) {
        const result = await res.json();
        const newMessage = result.data;
        
        // Optimistic and instant local append
        setMessages((prev) => {
          if (prev.some((m) => m.messageId === newMessage.messageId)) return prev;
          return [...prev, newMessage];
        });
        setMessageInput("");
      }
    } catch (err) {
      console.error("Failed to send text message:", err);
    } finally {
      setSending(false);
    }
  };

  // Media and generic file uploading pipeline
  const uploadMediaMessage = async (fileBlob: Blob | File, fileType: string) => {
    setUploading(true);
    setUploadProgress(10);
    try {
      const formData = new FormData();
      formData.append("file", fileBlob);

      setUploadProgress(30);
      const uploadRes = await apiFetch("/api/v1/conversations/media/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(70);
      if (!uploadRes.ok) {
        throw new Error("Cloudinary file upload failed");
      }

      const uploadResult = await uploadRes.json();
      const { url, publicId, type } = uploadResult.data;

      setUploadProgress(90);
      // Dispatch media message REST persist request
      const msgRes = await apiFetch(`/api/v1/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          type,
          mediaUrl: url,
          mediaPublicId: publicId
        }),
      });

      if (msgRes.ok) {
        const msgResult = await msgRes.json();
        const newMessage = msgResult.data;
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (err) {
      console.error("Media uploading failure:", err);
      alert("Failed to send attachment, please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMediaMessage(file, file.type);
  };

  // Voice Note capturing methods
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setIsRecording(false);
        await uploadMediaMessage(audioBlob, "audio/webm");
        
        // Disable tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic access rejected:", err);
      alert("Microphone permission is required to send voice notes");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        setIsRecording(false);
      };
      mediaRecorderRef.current.stop();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
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

  // Sub-renderer for rich media message layouts
  const renderMessageContent = (msg: Message) => {
    switch (msg.type) {
      case "IMAGE":
        return (
          <img 
            src={msg.mediaUrl} 
            className="max-w-[240px] sm:max-w-[280px] rounded-2xl shadow-sm border border-gray-100 hover:brightness-95 cursor-pointer transition-all" 
            alt="Image attachment" 
            onClick={() => window.open(msg.mediaUrl)} 
          />
        );
      case "VIDEO":
        return (
          <video 
            src={msg.mediaUrl} 
            controls 
            className="max-w-[240px] sm:max-w-[280px] rounded-2xl shadow-sm border border-gray-100" 
          />
        );
      case "AUDIO":
        return (
          <div className="flex items-center gap-2 py-1 px-1.5 min-w-[210px]">
            <Mic size={16} className="text-green-500 animate-pulse" />
            <audio src={msg.mediaUrl} controls className="w-full h-8 text-xs accent-green-600 outline-none rounded-lg" />
          </div>
        );
      case "FILE":
        return (
          <a 
            href={msg.mediaUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 p-3 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all font-semibold rounded-2xl border border-gray-150"
          >
            <Paperclip size={18} className="text-gray-400 shrink-0" />
            <div className="flex flex-col text-left min-w-0">
              <span className="text-xs truncate font-medium max-w-[120px] sm:max-w-[160px]">Document Attachment</span>
              <span className="text-[10px] text-gray-400 font-light">Click to View / Download</span>
            </div>
          </a>
        );
      default:
        return <span>{msg.text}</span>;
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
            {isPeerOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white ring-1 ring-green-100" />
            )}
          </div>
 
          <div>
            <h3 className="font-bold text-gray-800 text-sm md:text-base">
              {participant?.name || (participant ? `@${participant.username}` : "Chat")}
            </h3>
            <div className="flex items-center gap-1.5">
               <div className={cn("w-1.5 h-1.5 rounded-full", isPeerOnline ? "bg-green-500 animate-ping" : "bg-gray-300")} />
               <p className="text-[10px] md:text-xs text-gray-400 font-medium">
                 {isPeerOnline ? "Active now" : "Offline"}
               </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          {participant && (
            <>
              <button 
                onClick={() => initiateCall(conversationId, participant.id, "voice")}
                className="p-2.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all cursor-pointer"
                title="Voice Call"
              >
                <Phone size={20} />
              </button>
              <button 
                onClick={() => initiateCall(conversationId, participant.id, "video")}
                className="p-2.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all cursor-pointer"
                title="Video Call"
              >
                <Video size={20} />
              </button>
            </>
          )}
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
                  {renderMessageContent(msg)}
                </div>
                <div className="flex items-center gap-1.5 mt-2 px-1" title={isMe ? (msg.seenAt ? `Read at ${formatMessageTime(msg.seenAt)}` : "Delivered") : undefined}>
                  <span className="text-[10px] text-gray-400 font-medium">{formatMessageTime(msg.createdAt)}</span>
                  {isMe && (
                    <CheckCheck 
                      size={12} 
                      className={cn(msg.seenAt ? "text-blue-500" : "text-gray-300")} 
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="text-4xl mb-4">👋</div>
            <h4 className="text-sm font-bold text-gray-700 mb-1">Say hello to {participant?.name || `@${participant?.username}`}</h4>
            <p className="text-xs text-gray-400 max-w-xs font-light">Start your adventure plans! Ask them about their next travel destination.</p>
          </div>
        )}

        {/* Ephemeral Realtime Typing Indicator Overlay */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium ml-1.5 animate-pulse">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
            </div>
            <span>{participant?.name || `@${participant?.username}`} is typing...</span>
          </div>
        )}

        {/* Media Upload Progress Indicator */}
        {uploading && (
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium ml-1.5">
            <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
            <span>Sending attachment ({uploadProgress || 10}%) ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-100 shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          {isRecording ? (
            // Native Mic Recorder Viewport
            <div className="flex items-center justify-between bg-red-50 border border-red-200 px-6 py-3.5 rounded-[24px]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                <span className="text-sm font-bold text-red-600 font-mono">
                  Recording Voice Note: {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={cancelRecording}
                  className="p-2.5 bg-white text-gray-400 hover:text-red-500 border border-gray-200 rounded-full transition-all active:scale-95 shadow-sm cursor-pointer"
                  title="Cancel Recording"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={stopRecording}
                  className="p-3 bg-red-500 text-white rounded-full shadow-lg shadow-red-200 transition-all active:scale-90 flex items-center justify-center shrink-0 cursor-pointer"
                  title="Stop and Send"
                >
                  <Square size={16} />
                </button>
              </div>
            </div>
          ) : (
            // Normal Chat Input Form
            <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 px-4 py-2 md:py-3 rounded-[24px] border border-gray-200">
              <button type="button" className="hidden sm:block p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile size={22} />
              </button>
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                disabled={sending || uploading}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Paperclip size={20} />
              </button>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              />
              
              <input 
                type="text" 
                value={messageInput}
                onChange={handleInputChange}
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-300 font-medium py-1.5"
                disabled={sending || uploading}
              />
              
              {messageInput.trim() ? (
                <button 
                  type="submit"
                  disabled={sending || uploading}
                  className="p-3 bg-green-500 text-white rounded-full shadow-lg shadow-green-100 transition-transform active:scale-90 flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={startRecording}
                  disabled={sending || uploading}
                  className="p-3 bg-white text-gray-400 rounded-full shadow-sm hover:text-green-500 transition-all active:scale-90 flex items-center justify-center border border-gray-100 shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Mic size={20} />
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
