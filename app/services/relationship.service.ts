import { apiFetch } from "../lib/api";

export const relationshipService = {
  async followUser(userId: string): Promise<{ status: string; data: { status: string } }> {
    const response = await apiFetch(`/api/v1/social/follow/${userId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to follow user: ${response.statusText}`);
    }
    return response.json();
  },

  async cancelFollowRequest(userId: string): Promise<{ status: string; message: string }> {
    const response = await apiFetch(`/api/v1/social/cancel/${userId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to cancel follow request: ${response.statusText}`);
    }
    return response.json();
  },

  async unfollowUser(userId: string): Promise<{ status: string; message: string }> {
    const response = await apiFetch(`/api/v1/social/unfollow/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to unfollow user: ${response.statusText}`);
    }
    return response.json();
  },

  async acceptFollowRequest(userId: string): Promise<{ status: string; data: unknown }> {
    const response = await apiFetch(`/api/v1/social/accept/${userId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to accept follow request: ${response.statusText}`);
    }
    return response.json();
  },

  async rejectFollowRequest(userId: string): Promise<{ status: string; data: unknown }> {
    const response = await apiFetch(`/api/v1/social/reject/${userId}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`Failed to reject follow request: ${response.statusText}`);
    }
    return response.json();
  },
};
