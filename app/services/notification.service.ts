import { apiFetch } from "../lib/api";
import { NotificationsResponse, UnreadCountResponse } from "../types/social";

export const notificationService = {
  async getNotifications(
    limit = 10,
    cursor?: string,
    filter: "ALL" | "READ" | "UNREAD" = "ALL"
  ): Promise<NotificationsResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      filter,
      ...(cursor ? { cursor } : {}),
    });

    const response = await apiFetch(`/api/v1/notifications?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }
    return response.json();
  },

  async getUnreadCount(): Promise<UnreadCountResponse> {
    const response = await apiFetch("/api/v1/notifications/unread-count");
    if (!response.ok) {
      throw new Error(`Failed to fetch unread notification count: ${response.statusText}`);
    }
    return response.json();
  },

  async markAsRead(id: string): Promise<{ status: string; message: string }> {
    const response = await apiFetch(`/api/v1/notifications/${id}/read`, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
    return response.json();
  },

  async markAllAsRead(): Promise<{ status: string; message: string }> {
    const response = await apiFetch("/api/v1/notifications/read-all", {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Failed to mark all notifications as read: ${response.statusText}`);
    }
    return response.json();
  },
};
