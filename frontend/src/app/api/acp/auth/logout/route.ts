import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

const ACP_SESSION_COOKIE = 'acp_session';
const COOKIE_EXPIRES_PAST = 'Thu, 01 Jan 1970 00:00:00 GMT';

/**
 * Proxies logout to the backend, clears the session cookie (exact match to login),
 * and redirects to login. Always returns 302 so browser applies Set-Cookie then navigates.
 */
export async function POST(request: NextRequest) {
  const backendBase = getBackendApiUrl(getRequestOrigin(request));
  const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (cookie) headers['Cookie'] = `${ACP_SESSION_COOKIE}=${cookie}`;

  try {
    await fetch(`${backendBase}/api/acp/auth/logout`, {
      method: 'POST',
      headers,
      cache: 'no-store',
    });
  } catch {
    // Still clear cookie and redirect even if backend fails
  }

  const host = request.nextUrl.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  const loginUrl = new URL('/acp/login', request.url);

  const nextRes = NextResponse.redirect(loginUrl, 302);
  nextRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

  // Clear cookie: exact same name, path, domain, SameSite, Secure as at login + Expires in past
  const sameSite = isLocalhost ? 'Lax' : 'None';
  const securePart = isLocalhost ? '' : '; Secure';
  const domainPart = isLocalhost ? '; Domain=localhost' : '';
  const clearCookieValue = `${ACP_SESSION_COOKIE}=; Path=/; Expires=${COOKIE_EXPIRES_PAST}; Max-Age=0; HttpOnly; SameSite=${sameSite}${securePart}${domainPart}`;
  nextRes.headers.append('Set-Cookie', clearCookieValue);

  // Also clear for path /acp in case cookie was ever set with that path
  nextRes.headers.append(
    'Set-Cookie',
    `${ACP_SESSION_COOKIE}=; Path=/acp; Expires=${COOKIE_EXPIRES_PAST}; Max-Age=0; HttpOnly; SameSite=${sameSite}${securePart}${domainPart}`
  );

  return nextRes;
}
