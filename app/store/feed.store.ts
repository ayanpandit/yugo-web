import { create } from "zustand";
import { FeedTrip } from "../types/feed";
import { feedService } from "../services/feed.service";

interface FeedState {
  trips: FeedTrip[];
  loading: boolean;
  error: string | null;
  fetchFeed: () => Promise<void>;
  toggleLike: (tripId: string) => Promise<void>;
}

export const useFeedStore = create<FeedState>((set, get) => ({
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
  toggleLike: async (tripId: string) => {
    const { trips } = get();
    // 1. Optimistic update
    set({
      trips: trips.map((t) =>
        t.tripId === tripId
          ? {
              ...t,
              isLiked: !t.isLiked,
              likesCount: t.isLiked ? Math.max(0, t.likesCount - 1) : t.likesCount + 1,
            }
          : t
      ),
    });

    // 2. Network request
    try {
      const { likeService } = await import("../services/like.service");
      const res = await likeService.toggleLike(tripId);
      
      // 3. Sync exactly with server truth
      set({
        trips: get().trips.map((t) =>
          t.tripId === tripId
            ? { ...t, isLiked: res.data.isLiked, likesCount: res.data.likesCount }
            : t
        ),
      });
    } catch (error) {
      // 4. Revert on failure
      set({ trips });
      console.error("Failed to toggle like:", error);
    }
  },
}));
