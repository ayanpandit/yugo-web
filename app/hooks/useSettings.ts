import { useState, useEffect, useCallback } from "react";
import { settingsService } from "../services/settings.service";
import { UserSettings } from "../types/social";

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await settingsService.getSettings();
      if (response.status === "success" && response.data) {
        setSettings(response.data);
      } else {
        throw new Error("Failed to load settings data");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load account settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = useCallback(async <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K]
  ) => {
    if (!settings) return;

    const previousSettings = { ...settings };
    
    // Optimistic Update
    setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
    setUpdating(true);

    try {
      const response = await settingsService.updateSettings({ [key]: value });
      if (response.status === "success" && response.data) {
        setSettings(response.data);
      } else {
        throw new Error("Update response was not successful");
      }
    } catch (err) {
      console.error(`Failed to update setting: ${key}`, err);
      // Rollback on failure
      setSettings(previousSettings);
    } finally {
      setUpdating(false);
    }
  }, [settings]);

  const retry = useCallback(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    loading,
    error,
    updating,
    updateSetting,
    retry,
  };
}
