import { apiFetch } from "../lib/api";
import { SettingsResponse, UserSettings } from "../types/social";

export const settingsService = {
  async getSettings(): Promise<SettingsResponse> {
    const response = await apiFetch("/api/v1/social/settings");
    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }
    return response.json();
  },

  async updateSettings(data: Partial<UserSettings>): Promise<SettingsResponse> {
    const response = await apiFetch("/api/v1/social/settings", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update settings: ${response.statusText}`);
    }
    return response.json();
  },
};
