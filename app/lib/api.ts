export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Read token from localStorage as a fallback for cross-site cookie blocks
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers,
    },
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
