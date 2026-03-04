import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

/**
 * Proxies GET /api/acp/asset/* to backend /uploads/* so logo/icon images
 * can be loaded same-origin (e.g. /api/acp/asset/sites/237/filename.png).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await context.params;
  if (!pathSegments?.length) {
    return NextResponse.json({ error: 'Path required' }, { status: 400 });
  }
  const path = pathSegments.join('/');
  const requestOrigin = getRequestOrigin(request);
  const backendBase = getBackendApiUrl(requestOrigin);
  const url = `${backendBase}/uploads/${path}`;
  const cookie = request.cookies.get('acp_session')?.value;
  const headers: HeadersInit = {};
  if (cookie) headers['Cookie'] = `acp_session=${cookie}`;
  if (/ngrok|trycloudflare\.com/i.test(backendBase)) {
    headers['ngrok-skip-browser-warning'] = 'true';
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: Object.keys(headers).length ? headers : undefined,
    cache: 'no-store',
  });
  if (!res.ok) {
    return new NextResponse(res.body, { status: res.status, headers: res.headers });
  }
  const contentType = res.headers.get('content-type') || 'application/octet-stream';
  return new NextResponse(res.body, {
    status: 200,
    headers: { 'Content-Type': contentType, 'Cache-Control': 'private, max-age=3600' },
  });
}
