import { useState, useEffect, useCallback } from "react";
import { searchService } from "../services/search.service";
import { SearchUser } from "../types/social";

export function useSearch(initialLimit = 10) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [items, setItems] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Initial fetch
  const fetchInitial = useCallback(async (searchQ: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchService.searchUsers(searchQ, initialLimit);
      if (response.status === "success" && response.data) {
        setItems(response.data.items || []);
        setNextCursor(response.data.nextCursor);
      } else {
        throw new Error("Failed to parse search response");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }, [initialLimit]);

  // Reset and fetch when debounced query changes
  useEffect(() => {
    fetchInitial(debouncedQuery);
  }, [debouncedQuery, fetchInitial]);

  // Fetch next page
  const fetchNextPage = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;

    setLoadingMore(true);
    setError(null);
    try {
      const response = await searchService.searchUsers(debouncedQuery, initialLimit, nextCursor);
      if (response.status === "success" && response.data) {
        setItems((prev) => [...prev, ...(response.data.items || [])]);
        setNextCursor(response.data.nextCursor);
      } else {
        throw new Error("Failed to parse search response");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching more results.");
    } finally {
      setLoadingMore(false);
    }
  }, [debouncedQuery, nextCursor, initialLimit, loadingMore, loading]);

  const retry = useCallback(() => {
    fetchInitial(debouncedQuery);
  }, [debouncedQuery, fetchInitial]);

  return {
    query,
    setQuery,
    items,
    loading,
    loadingMore,
    error,
    hasMore: !!nextCursor,
    fetchNextPage,
    retry,
  };
}
