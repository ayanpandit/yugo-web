import { useState, useCallback } from "react";
import { relationshipService } from "../services/relationship.service";

export function useRelationship() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const follow = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await relationshipService.followUser(userId);
      return response.data.status; // Returns "PENDING" or "ACCEPTED"
    } catch (err: any) {
      setError(err.message || "Failed to follow user");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await relationshipService.cancelFollowRequest(userId);
      return "NONE";
    } catch (err: any) {
      setError(err.message || "Failed to cancel follow request");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unfollow = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await relationshipService.unfollowUser(userId);
      return "NONE";
    } catch (err: any) {
      setError(err.message || "Failed to unfollow user");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const accept = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await relationshipService.acceptFollowRequest(userId);
    } catch (err: any) {
      setError(err.message || "Failed to accept follow request");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reject = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await relationshipService.rejectFollowRequest(userId);
    } catch (err: any) {
      setError(err.message || "Failed to reject follow request");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    follow,
    cancel,
    unfollow,
    accept,
    reject,
  };
}
