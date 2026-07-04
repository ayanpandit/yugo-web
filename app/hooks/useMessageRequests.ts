import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "../components/providers/auth-provider";

const ACCEPTED_CONVS_KEY = "yougo:accepted_conversations";
const REJECTED_CONVS_KEY = "yougo:rejected_conversations";

export function useMessageRequests() {
  const { user } = useAuth();
  const [messagingPermission, setMessagingPermission] = useState<string>("ANYONE");
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load localStorage lists
  useEffect(() => {
    try {
      const accepted = localStorage.getItem(ACCEPTED_CONVS_KEY);
      if (accepted) setAcceptedIds(new Set(JSON.parse(accepted)));

      const rejected = localStorage.getItem(REJECTED_CONVS_KEY);
      if (rejected) setRejectedIds(new Set(JSON.parse(rejected)));
    } catch (e) {
      console.error("Failed to load message request IDs from localStorage", e);
    }
  }, []);

  const fetchPermissionsAndFollowings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Fetch current user's settings
      const settingsRes = await apiFetch("/api/v1/social/settings");
      if (settingsRes.ok) {
        const result = await settingsRes.json();
        setMessagingPermission(result.data?.messagingPermission || "ANYONE");
      }

      // 2. Fetch current user's followings
      const followingRes = await apiFetch("/api/v1/social/following");
      if (followingRes.ok) {
        const result = await followingRes.json();
        const items = result.data?.items || result.data || [];
        setFollowingIds(new Set(items.map((u: any) => u.id)));
      }
    } catch (err) {
      console.error("Failed to fetch permissions or followings:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPermissionsAndFollowings();
  }, [fetchPermissionsAndFollowings]);

  const acceptConversation = useCallback((conversationId: string) => {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      next.add(conversationId);
      localStorage.setItem(ACCEPTED_CONVS_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
    window.dispatchEvent(new CustomEvent("refetch-unread-messages"));
  }, []);

  const rejectConversation = useCallback((conversationId: string) => {
    setRejectedIds((prev) => {
      const next = new Set(prev);
      next.add(conversationId);
      localStorage.setItem(REJECTED_CONVS_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
    window.dispatchEvent(new CustomEvent("refetch-unread-messages"));
  }, []);

  const checkIsRequest = useCallback((chat: any) => {
    if (!user || !chat) return false;
    
    // If conversation is already rejected, it will be hidden entirely
    if (rejectedIds.has(chat.conversationId)) return false;

    const lastMessage = chat.lastMessage;
    if (!lastMessage) return false; // Empty chat is normal

    // If we sent the last message, it's NOT a request (we initiated/responded)
    if (lastMessage.senderId === user.id) return false;

    // If we've explicitly accepted it, it's NOT a request
    if (acceptedIds.has(chat.conversationId)) return false;

    // Check settings filter
    const otherParticipantId = chat.participant?.id;
    if (messagingPermission === "FOLLOWINGS") {
      // If we allow only followings, and we don't follow them, it's a request
      return !followingIds.has(otherParticipantId);
    }

    if (messagingPermission === "NO_ONE") {
      // If we allow no one, all incoming chats are requests
      return true;
    }

    // Default "ANYONE" allows all messages directly
    return false;
  }, [user, messagingPermission, followingIds, acceptedIds, rejectedIds]);

  return {
    loading,
    messagingPermission,
    followingIds,
    acceptedIds,
    rejectedIds,
    checkIsRequest,
    acceptConversation,
    rejectConversation,
    refetch: fetchPermissionsAndFollowings,
  };
}
