export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
console.log("[api.ts] API_URL is:", API_URL);


export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;

  // Read token from localStorage as a fallback for cross-site cookie blocks
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };

  // Only append JSON content type if it is not FormData or custom overridden
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Allow custom options headers to override
  const mergedHeaders = {
    ...headers,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: mergedHeaders,
    // This is crucial: ensures HttpOnly cookies are automatically sent with requests
    credentials: "include",
  });

  // Self-clearing mechanism: delete token on logout or if the server returns 401 (Unauthorized)
  if (response.status === 401 || endpoint === "/auth/logout") {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  return response;
};
