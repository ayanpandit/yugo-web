import { apiFetch } from "../lib/api";
import { SearchResponse } from "../types/social";

export const searchService = {
  async searchUsers(query: string, limit = 10, cursor?: string): Promise<SearchResponse> {
    const params = new URLSearchParams({
      q: query,
      limit: String(limit),
      ...(cursor ? { cursor } : {}),
    });
    
    const response = await apiFetch(`/api/v1/social/search?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to search users: ${response.statusText}`);
    }
    return response.json();
  },
};
