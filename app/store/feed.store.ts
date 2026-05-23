import { create } from "zustand";
import { FeedTrip } from "../types/feed";
import { feedService } from "../services/feed.service";

interface FeedState {
  trips: FeedTrip[];
  loading: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
}

export const useFeedStore = create<FeedState>((set) => ({
  trips: [],
  loading: false,
  error: null,
  fetchFeed: async () => {
    set({ loading: true, error: null });
    try {
      const response = await feedService.fetchFeed();
      set({ trips: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load discovery feed", loading: false });
    }
  },
}));
