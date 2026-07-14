// Base URL of your existing Express API (e.g. https://api.hostelhubb.com)
// Set this in .env.local as NEXT_PUBLIC_API_BASE_URL
import { auth as firebaseAuth } from "./firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

/**
 * Low-level fetch wrapper. Two ways to attach a Firebase ID token:
 *  - pass `token` directly (caller already has it, e.g. from a Server
 *    Component or token held in state)
 *  - pass `auth: true` (grabs a fresh token from the currently signed-in
 *    Firebase user automatically, so callers don't have to fetch/pass it)
 * If both are omitted, the request goes out unauthenticated.
 */
async function request(path, { method = "GET", body, token, auth: withAuth = false, cache, next } = {}) {
  const headers = { "Content-Type": "application/json" };

  let authToken = token;
  if (!authToken && withAuth) {
    const user = firebaseAuth.currentUser;
    if (!user) throw new Error(`Cannot call ${path}: no signed-in user`);
    authToken = await user.getIdToken();
  }
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    // cache/next are used by Server Components for ISR (see Phase 2/3)
    cache,
    next,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API ${method} ${path} failed (${res.status}): ${message}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

// ─── Student auth & profile (maps to modules/auth/router) ────────────────────
export const studentApi = {
  authEmail: (payload) => request("/api/students/auth/email", { method: "POST", body: payload }),
  resendVerification: (payload) =>
    request("/api/students/auth/resend-verification", { method: "POST", body: payload }),
  authGoogle: (payload) => request("/api/students/auth/google", { method: "POST", body: payload }),
  authApple: (payload) => request("/api/students/auth/apple", { method: "POST", body: payload }),
  getMe: (token) => request("/api/students/me", { token, cache: "no-store" }),
  updateMe: (payload, token) => request("/api/students/me", { method: "PATCH", body: payload, token }),
};

export { API_BASE, request };