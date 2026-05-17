export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // This is crucial: ensures HttpOnly cookies are automatically sent with requests
    credentials: "include", 
  });

  return response;
};
