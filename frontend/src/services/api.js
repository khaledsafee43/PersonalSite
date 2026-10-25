const API_URL = (
  import.meta.env.VITE_API_URL || "https://personalsite-ixtl.onrender.com/api"
).replace(/\/+$/, "");

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiRequest(path, options = {}) {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("Backend connection error:", error);

    throw new Error(
      "Could not connect to the backend. Make sure the backend server is running.",
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    throw new Error(
      data.message || data.error || `Request failed (${response.status}).`,
    );
  }

  return data;
}

export const api = {
  get: (path) => apiRequest(path),

  post: (path, body) =>
    apiRequest(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: (path, body) =>
    apiRequest(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (path) =>
    apiRequest(path, {
      method: "DELETE",
    }),
};
