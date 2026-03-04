import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

const ACP_SESSION_COOKIE = 'acp_session';
const ACP_LOGIN_PATH = '/acp/login';

/** Cache session check for a short time to avoid hitting the backend on every request (speeds up page loads). */
const SESSION_CACHE_TTL_MS = 2000;
const sessionCache = new Map<string, { ok: boolean; until: number }>();

function getCachedSession(cookieValue: string): boolean | null {
  const entry = sessionCache.get(cookieValue);
  if (!entry) return null;
  if (Date.now() > entry.until) {
    sessionCache.delete(cookieValue);
    return null;
  }
  return entry.ok;
}

function setCachedSession(cookieValue: string, ok: boolean): void {
  sessionCache.set(cookieValue, { ok, until: Date.now() + SESSION_CACHE_TTL_MS });
  if (sessionCache.size > 500) {
    const now = Date.now();
    for (const [k, v] of sessionCache.entries()) if (v.until < now) sessionCache.delete(k);
  }
}

/**
 * Protects / and /acp routes (except /acp/login).
 * Session check uses request origin so localhost → backend at localhost:4000, tunnel → backend ngrok URL.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthApi = pathname.startsWith('/api/acp/auth/');
  const origin = getRequestOrigin(request);
  const backendBase = getBackendApiUrl(origin);

  if (pathname === ACP_LOGIN_PATH || isAuthApi) {
    if (pathname === ACP_LOGIN_PATH) {
      const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
      if (cookie) {
        const cached = getCachedSession(cookie);
        const ok = cached !== null ? cached : await checkSessionAndCache(backendBase, cookie);
        if (ok) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
    // Invalidate session cache on logout so next request doesn't use stale cache
    if (pathname === '/api/acp/auth/logout' && request.method === 'POST') {
      const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
      if (cookie) sessionCache.delete(cookie);
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
    const cached = cookie ? getCachedSession(cookie) : null;
    const ok = cached !== null ? cached : (cookie ? await checkSessionAndCache(backendBase, cookie) : false);
    if (!ok) {
      const res = NextResponse.redirect(new URL(ACP_LOGIN_PATH, request.url));
      const host = request.nextUrl.hostname;
      const isLocalhost = host === 'localhost' || host === '127.0.0.1';
      // Clear cookie with same SameSite/Secure as when set, so browser actually removes it (fixes tunnel cookie issues)
      res.cookies.set(ACP_SESSION_COOKIE, '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: !isLocalhost,
        sameSite: isLocalhost ? 'lax' : 'none',
      });
      return res;
    }
    return NextResponse.next();
  }

  const isAcpPage = pathname.startsWith('/acp/');
  const isAcpApi = pathname.startsWith('/api/acp/');
  if (isAcpPage || isAcpApi) {
    const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
    const cached = cookie ? getCachedSession(cookie) : null;
    const ok = cached !== null ? cached : (cookie ? await checkSessionAndCache(backendBase, cookie) : false);
    if (!ok) {
      if (isAcpApi) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL(ACP_LOGIN_PATH, request.url);
      loginUrl.searchParams.set('from', pathname);
      const res = NextResponse.redirect(loginUrl);
      const host = request.nextUrl.hostname;
      const isLocalhost = host === 'localhost' || host === '127.0.0.1';
      res.cookies.set(ACP_SESSION_COOKIE, '', {
        path: '/',
        maxAge: 0,
        httpOnly: true,
        secure: !isLocalhost,
        sameSite: isLocalhost ? 'lax' : 'none',
      });
      return res;
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

async function checkSession(backendUrl: string, cookieValue: string): Promise<boolean> {
  try {
    const base = backendUrl.replace(/\/$/, "");
    const url = `${base}/api/acp/auth/session`;
    const headers: HeadersInit = { Cookie: `${ACP_SESSION_COOKIE}=${cookieValue}` };
    if (/ngrok|trycloudflare\.com/i.test(backendUrl)) headers['ngrok-skip-browser-warning'] = 'true';
    const res = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { authenticated?: boolean };
    return data.authenticated === true;
  } catch {
    return false;
  }
}

async function checkSessionAndCache(backendUrl: string, cookieValue: string): Promise<boolean> {
  const ok = await checkSession(backendUrl, cookieValue);
  setCachedSession(cookieValue, ok);
  return ok;
}

export const config = {
  matcher: ['/', '/acp/:path*', '/api/acp/:path*'],
};

/** Next.js 16 uses this file as middleware when no middleware.ts is present. */
export default proxy;
