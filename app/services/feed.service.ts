import { apiFetch } from "../lib/api";
import { FeedResponse } from "../types/feed";

export const feedService = {
  async fetchFeed(): Promise<FeedResponse> {
    const response = await apiFetch("/feed");
    if (!response.ok) {
      throw new Error(`Failed to fetch discovery feed: ${response.statusText}`);
    }
    const data: FeedResponse = await response.json();
    return data;
  }
};
