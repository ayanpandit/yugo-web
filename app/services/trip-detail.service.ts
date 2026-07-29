import { apiFetch } from "../lib/api";
import { TripDetailAPIResponse, TripDetailRecord } from "../types/trip-detail";

export const tripDetailService = {
  async fetchTripDetail(generationId: string): Promise<TripDetailRecord> {
    const response = await apiFetch(`/api/v1/generate/${generationId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trip details: ${response.statusText}`);
    }
    const result: TripDetailAPIResponse = await response.json();
    if (result.status === "success" && result.data && result.data.length > 0) {
      return result.data[0];
    }
    throw new Error("No trip data found for the provided ID.");
  },

  async fetchSavedTrips(): Promise<TripDetailRecord[]> {
    const response = await apiFetch("/api/v1/generate/saved");
    if (!response.ok) {
      throw new Error(`Failed to fetch saved trips: ${response.statusText}`);
    }
    const result = await response.json();
    if (result.status === "success") {
      return result.data || [];
    }
    throw new Error(result.message || "Failed to retrieve saved trips.");
  }
};
