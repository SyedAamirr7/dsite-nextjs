import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

const ACP_SESSION_COOKIE = 'acp_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Proxies login to the backend and sets the session cookie on this response
 * so the cookie is bound to the frontend host (works with tunnel).
 */
export async function POST(request: NextRequest) {
  const backendBase = getBackendApiUrl(getRequestOrigin(request));
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 });
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (/ngrok|trycloudflare\.com/i.test(backendBase)) {
    headers['ngrok-skip-browser-warning'] = 'true';
  }

  const res = await fetch(`${backendBase}/api/acp/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  const setCookie = res.headers.get('Set-Cookie');
  const nextRes = NextResponse.json(data, { status: res.status });

  if (res.ok && setCookie) {
    const match = setCookie.match(new RegExp(`${ACP_SESSION_COOKIE}=([^;]+)`));
    const token = match?.[1];
    if (token) {
      const host = request.nextUrl.hostname;
      const isLocalhost = host === 'localhost' || host === '127.0.0.1';
      // Tunnel/production: SameSite=None; Secure so cookie works. No Domain so it binds to current host.
      nextRes.cookies.set(ACP_SESSION_COOKIE, token, {
        path: '/',
        maxAge: SESSION_MAX_AGE,
        httpOnly: true,
        secure: !isLocalhost,
        sameSite: isLocalhost ? 'lax' : 'none',
      });
    }
  }

  return nextRes;
}
