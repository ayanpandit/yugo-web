"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./auth-provider";
import { API_URL } from "@/app/lib/api";

import { CallOverlay } from "../calls/CallOverlay";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  typingUsers: Record<string, string[]>; // maps conversationId to array of userIds currently typing
  incomingCall: any;
  setIncomingCall: (call: any) => void;
  activeCall: any;
  setActiveCall: (call: any) => void;
  initiateCall: (conversationId: string, targetUserId: string, type: "voice" | "video", peer?: any) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});
  
  // Call States
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [activeCall, setActiveCall] = useState<any>(null);
  
  // Store dynamic callbacks/states to prevent staled socket closures
  const activeCallRef = useRef<any>(null);
  activeCallRef.current = activeCall;

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    // Connect to Socket server
    // Since Next.js API is at same domain but on separate port in dev, we fetch base URL
    const socketUrl = API_URL.replace("/api/v1", "").replace("/api", "");
    const socketClient = io(socketUrl, {
      auth: { token },
      transports: ["websocket"]
    });

    socketClient.on("connect", () => {
      console.log("[SocketProvider] Connected successfully to gateway:", socketClient.id);
      setSocket(socketClient);
    });

    socketClient.on("connect_error", (err) => {
      console.error("[SocketProvider] Connection handshake failed:", err.message);
    });

    // 1. Presence tracking listener
    socketClient.on("presence:update", ({ userId, status }: { userId: string; status: "online" | "offline" }) => {
      setOnlineUsers((prev) => {
        if (status === "online") {
          return prev.includes(userId) ? prev : [...prev, userId];
        } else {
          return prev.filter((id) => id !== userId);
        }
      });
    });

    // 2. Typing status tracker listeners
    socketClient.on("typing:start", ({ conversationId, userId }: { conversationId: string; userId: string }) => {
      setTypingUsers((prev) => {
        const currentList = prev[conversationId] || [];
        if (currentList.includes(userId)) return prev;
        return {
          ...prev,
          [conversationId]: [...currentList, userId]
        };
      });
    });

    socketClient.on("typing:stop", ({ conversationId, userId }: { conversationId: string; userId: string }) => {
      setTypingUsers((prev) => {
        const currentList = prev[conversationId] || [];
        return {
          ...prev,
          [conversationId]: currentList.filter((id) => id !== userId)
        };
      });
    });

    // 3. WebRTC Calling Handshake Relays
    socketClient.on("call:invite", ({ conversationId, caller, type }: { conversationId: string; caller: any; type: "voice" | "video" }) => {
      console.log("[SocketProvider] Received call invite from user:", caller.username);
      setIncomingCall({ conversationId, caller, type });
    });

    socketClient.on("call:accepted", ({ conversationId, accepterId }: { conversationId: string; accepterId: string }) => {
      console.log("[SocketProvider] Call accepted by user:", accepterId);
      if (activeCallRef.current) {
        setActiveCall((prev: any) => prev ? { ...prev, status: "connected", peerId: accepterId } : null);
      }
    });

    socketClient.on("call:rejected", ({ conversationId, rejecterId }: { conversationId: string; rejecterId: string }) => {
      console.log("[SocketProvider] Call rejected by user:", rejecterId);
      setActiveCall(null);
      setIncomingCall(null);
    });

    socketClient.on("call:ended", ({ conversationId, endedBy }: { conversationId: string; endedBy: string }) => {
      console.log("[SocketProvider] Call ended by peer:", endedBy);
      setActiveCall(null);
      setIncomingCall(null);
    });

    return () => {
      socketClient.disconnect();
      setSocket(null);
    };
  }, [user]);

  // Call Initiation handlers
  const initiateCall = (conversationId: string, targetUserId: string, type: "voice" | "video", peer?: any) => {
    if (!socket || !user) return;
    
    console.log(`[SocketProvider] Initiating call to target=${targetUserId}, conversation=${conversationId}, type=${type}`);
    
    // Set caller calling view
    setActiveCall({
      conversationId,
      peerId: targetUserId,
      type,
      role: "caller",
      status: "ringing",
      peer
    });

    socket.emit("call:initiate", { conversationId, targetUserId, type });
  };

  const acceptCall = () => {
    if (!socket || !incomingCall) return;

    console.log("[SocketProvider] Accepting incoming call invitation");
    
    // Set receiver connected view
    setActiveCall({
      conversationId: incomingCall.conversationId,
      peerId: incomingCall.caller.id,
      type: incomingCall.type,
      role: "receiver",
      status: "connected"
    });

    socket.emit("call:accept", {
      conversationId: incomingCall.conversationId,
      callerId: incomingCall.caller.id
    });

    setIncomingCall(null);
  };

  const rejectCall = () => {
    if (!socket || !incomingCall) return;

    console.log("[SocketProvider] Rejecting incoming call invitation");
    
    socket.emit("call:reject", {
      conversationId: incomingCall.conversationId,
      callerId: incomingCall.caller.id
    });

    setIncomingCall(null);
  };

  const endCall = () => {
    if (!socket) return;

    const callToStop = activeCall || incomingCall;
    if (!callToStop) return;

    console.log("[SocketProvider] Terminating call");
    
    socket.emit("call:end", {
      conversationId: callToStop.conversationId,
      targetUserId: callToStop.peerId || callToStop.caller?.id
    });

    setActiveCall(null);
    setIncomingCall(null);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUsers,
        incomingCall,
        setIncomingCall,
        activeCall,
        setActiveCall,
        initiateCall,
        acceptCall,
        rejectCall,
        endCall
      }}
    >
      {children}
      <CallOverlay
        activeCall={activeCall}
        incomingCall={incomingCall}
        acceptCall={acceptCall}
        rejectCall={rejectCall}
        endCall={endCall}
        socket={socket}
      />
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
