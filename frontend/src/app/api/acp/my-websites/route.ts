import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

const ACP_SESSION_COOKIE = 'acp_session';

/**
 * Proxies GET /api/acp/my-websites to the backend with the session cookie
 * so the backend receives the cookie (rewrites do not forward cookies).
 */
export async function GET(request: NextRequest) {
  const backendBase = getBackendApiUrl(getRequestOrigin(request));
  const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
  const url = `${backendBase}/api/acp/my-websites`;

  const headers: HeadersInit = {};
  if (cookie) headers['Cookie'] = `${ACP_SESSION_COOKIE}=${cookie}`;
  if (/ngrok|trycloudflare\.com/i.test(backendBase)) {
    headers['ngrok-skip-browser-warning'] = 'true';
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: Object.keys(headers).length ? headers : undefined,
    cache: 'no-store',
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
