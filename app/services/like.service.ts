import { apiFetch } from "../lib/api";
import { TripLiker } from "../types/feed";

export interface ToggleLikeResponse {
  status: string;
  data: {
    isLiked: boolean;
    likesCount: number;
  };
}

export const likeService = {
  toggleLike: async (generationId: string): Promise<ToggleLikeResponse> => {
    const response = await apiFetch(`/api/v1/trips/${generationId}/like`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle like`);
    }

    return response.json();
  },

  getTripLikes: async (generationId: string): Promise<{ status: string; data: TripLiker[] }> => {
    const response = await apiFetch(`/api/v1/trips/${generationId}/likes`);

    if (!response.ok) {
      throw new Error(`Failed to fetch likes`);
    }

    return response.json();
  },
};
