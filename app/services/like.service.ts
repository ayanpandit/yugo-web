import { apiFetch } from "../lib/api";

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
};
