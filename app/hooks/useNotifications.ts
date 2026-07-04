import { useState, useEffect, useCallback } from "react";
import { notificationService } from "../services/notification.service";
import { NotificationItem } from "../types/social";

const DELETED_NOTIFICATIONS_KEY = "yougo:deleted_notifications";

function getDeletedNotificationIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(DELETED_NOTIFICATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveDeletedNotificationId(id: string) {
  if (typeof window === "undefined") return;
  try {
    const current = getDeletedNotificationIds();
    if (!current.includes(id)) {
      localStorage.setItem(DELETED_NOTIFICATIONS_KEY, JSON.stringify([...current, id]));
    }
  } catch (err) {
    console.error("Failed to save deleted notification ID", err);
  }
}

export function useNotifications(initialLimit = 10, initialFilter: "ALL" | "READ" | "UNREAD" = "ALL") {
  const [filter, setFilter] = useState<"ALL" | "READ" | "UNREAD">(initialFilter);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  // Helper to filter out deleted notifications
  const filterDeleted = useCallback((rawItems: NotificationItem[]) => {
    const deletedIds = getDeletedNotificationIds();
    return rawItems.filter((item) => !deletedIds.includes(item.id));
  }, []);

  // Initial load
  const fetchInitial = useCallback(async (currentFilter: typeof filter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationService.getNotifications(initialLimit, undefined, currentFilter);
      if (response.status === "success" && response.data) {
        setItems(filterDeleted(response.data.items || []));
        setNextCursor(response.data.nextCursor);
      } else {
        throw new Error("Failed to parse notifications response");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [initialLimit, filterDeleted]);

  // Load when filter changes
  useEffect(() => {
    fetchInitial(filter);
  }, [filter, fetchInitial]);

  // Load next page
  const fetchNextPage = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;

    setLoadingMore(true);
    setError(null);
    try {
      const response = await notificationService.getNotifications(initialLimit, nextCursor, filter);
      if (response.status === "success" && response.data) {
        const filteredNew = filterDeleted(response.data.items || []);
        setItems((prev) => [...prev, ...filteredNew]);
        setNextCursor(response.data.nextCursor);
      } else {
        throw new Error("Failed to parse notifications response");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load more notifications.");
    } finally {
      setLoadingMore(false);
    }
  }, [filter, nextCursor, initialLimit, loadingMore, loading, filterDeleted]);

  // Mark single as read
  const markRead = useCallback(async (id: string) => {
    // Optimistic Update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
    try {
      await notificationService.markAsRead(id);
      window.dispatchEvent(new CustomEvent("refetch-unread-count"));
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read on server`, err);
      // Revert if failed
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRead: false } : item))
      );
    }
  }, []);

  // Mark all as read
  const markAllRead = useCallback(async () => {
    // Optimistic Update
    const previousItems = [...items];
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
    try {
      await notificationService.markAllAsRead();
      window.dispatchEvent(new CustomEvent("refetch-unread-count"));
    } catch (err) {
      console.error("Failed to mark all notifications as read on server", err);
      // Revert
      setItems(previousItems);
    }
  }, [items]);

  // Delete notification locally
  const deleteNotification = useCallback((id: string) => {
    saveDeletedNotificationId(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    window.dispatchEvent(new CustomEvent("refetch-unread-count"));
  }, []);

  const retry = useCallback(() => {
    fetchInitial(filter);
  }, [filter, fetchInitial]);

  return {
    filter,
    setFilter,
    items,
    loading,
    loadingMore,
    error,
    hasMore: !!nextCursor,
    fetchNextPage,
    markRead,
    markAllRead,
    deleteNotification,
    retry,
  };
}
