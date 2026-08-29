const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. empty response) - ignore
  }

  if (!res.ok) {
    const message = data?.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  submitInquiry: (payload) => request("/leads/public", { method: "POST", body: payload,}),
  setupStatus: () => request("/auth/setup-status"),
  me: (token) => request("/auth/me", { token }),

  getLeads: (token, params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
    return request(`/leads${query ? `?${query}` : ""}`, { token });
  },
  createLead: (token, payload) => request("/leads", { method: "POST", body: payload, token }),
  updateLead: (token, id, payload) =>
    request(`/leads/${id}`, { method: "PATCH", body: payload, token }),
  updateStatus: (token, id, status) =>
    request(`/leads/${id}/status`, { method: "PATCH", body: { status }, token }),
  addNote: (token, id, text) =>
    request(`/leads/${id}/notes`, { method: "POST", body: { text }, token }),
  deleteNote: (token, id, noteId) =>
    request(`/leads/${id}/notes/${noteId}`, { method: "DELETE", token }),
  deleteLead: (token, id) => request(`/leads/${id}`, { method: "DELETE", token }),

  getAnalytics: (token) => request("/analytics/summary", { token }),
};
