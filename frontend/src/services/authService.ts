import { apiFetch } from '@/lib/api';
import type { LoginResponse, SessionResponse } from '@/types/api';

/** Parse response as JSON; if body is not JSON (e.g. "Internal Server Error" text), return null and use status. */
async function parseJsonOrNull(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string, options?: { cookieOrigin?: string }): Promise<LoginResponse> {
  const body: { email: string; password: string; _cookieOrigin?: string } = { email, password };
  if (options?.cookieOrigin) body._cookieOrigin = options.cookieOrigin;
  const res = await apiFetch('/api/acp/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await parseJsonOrNull(res)) as (LoginResponse & { message?: string | { error?: string } }) | null;
  if (data === null) {
    throw new Error(res.ok ? 'Invalid response from server' : 'Server error. Please try again.');
  }
  if (!res.ok) {
    const err = data.error ?? (typeof data.message === 'object' && data.message && 'error' in data.message ? (data.message as { error: string }).error : null) ?? (typeof data.message === 'string' ? data.message : null);
    throw new Error(err ?? 'Login failed');
  }
  return data as LoginResponse;
}

export async function logout(): Promise<void> {
  await apiFetch('/api/acp/auth/logout', { method: 'POST' });
}

export async function getSession(): Promise<SessionResponse> {
  const res = await apiFetch('/api/acp/auth/session');
  const data = (await parseJsonOrNull(res)) as SessionResponse | null;
  if (data === null) return { authenticated: false };
  if (!res.ok) return { authenticated: false };
  return data;
}
