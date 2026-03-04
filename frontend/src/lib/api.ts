/**
 * API client for the backend (3-tier). All requests include credentials (cookies).
 * Uses request origin so same app works on localhost (same-origin proxy) and ngrok (backend URL).
 */
import { getApiBaseUrl } from '@/config/api';

export function getApiBase(): string {
  if (typeof window !== 'undefined') return getApiBaseUrl(window.location.origin);
  return getApiBaseUrl();
}

/**
 * Fetch with API base URL and credentials (cookies) for session.
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = getApiBase();
  const pathStr = path.startsWith("/") ? path : `/${path}`;
  const url = path.startsWith("http") ? path : base ? `${base}${pathStr}` : pathStr;
  return fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init?.headers ?? {}),
    },
  });
}

/**
 * Parse response as JSON. If the body is not JSON (e.g. HTML error page), throws a friendly error
 * instead of "Unexpected token '<'" so the UI shows a clear message.
 */
export async function parseResponseJson<T = unknown>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text.trim()) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error('Server error. Please try again.');
  }
}
