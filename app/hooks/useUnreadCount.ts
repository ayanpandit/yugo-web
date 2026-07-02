import { useState, useEffect, useCallback } from "react";
import { notificationService } from "../services/notification.service";

export function useUnreadCount() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notificationService.getUnreadCount();
      if (response.status === "success" && response.data) {
        setUnreadCount(response.data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to fetch unread notification count", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Polling is NOT required yet, but we will fetch on mount
  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  // Listener to custom events to allow manual triggers across the app if needed
  useEffect(() => {
    const handleRefetch = () => {
      fetchCount();
    };
    window.addEventListener("refetch-unread-count", handleRefetch);
    return () => {
      window.removeEventListener("refetch-unread-count", handleRefetch);
    };
  }, [fetchCount]);

  return {
    unreadCount,
    setUnreadCount,
    loading,
    refetch: fetchCount,
  };
}
