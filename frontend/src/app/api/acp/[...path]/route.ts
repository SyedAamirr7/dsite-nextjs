import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/config/api';
import { getRequestOrigin } from '@/lib/requestOrigin';

const ACP_SESSION_COOKIE = 'acp_session';

/**
 * Proxies all /api/acp/* (except /api/acp/auth/login which has its own route)
 * to the backend with the session cookie so the backend receives the cookie.
 */
export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

async function proxyRequest(request: NextRequest) {
  const requestOrigin = getRequestOrigin(request);
  const backendBase = getBackendApiUrl(requestOrigin);
  const cookie = request.cookies.get(ACP_SESSION_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;
  const path = pathname.replace(/^\/api\/acp/, '') || '/';
  const search = request.nextUrl.search;
  const url = `${backendBase}/api/acp${path}${search}`;
  const isLogout = pathname === '/api/acp/auth/logout' && request.method === 'POST';

  const headers: HeadersInit = {};
  if (cookie) headers['Cookie'] = `${ACP_SESSION_COOKIE}=${cookie}`;
  const contentType = request.headers.get('content-type');
  if (contentType) headers['Content-Type'] = contentType;
  // Ngrok shows an HTML interstitial unless this header is sent; proxy runs server-side so we must add it
  if (/ngrok|trycloudflare\.com/i.test(backendBase)) {
    headers['ngrok-skip-browser-warning'] = 'true';
  }

  const isMultipart = contentType?.toLowerCase().includes('multipart/form-data');
  let body: BodyInit | string | undefined;
  try {
    if (isMultipart) {
      body = await request.arrayBuffer();
    } else {
      const text = await request.text();
      body = text.length > 0 ? text : undefined;
    }
  } catch {
    body = undefined;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: request.method,
      headers: Object.keys(headers).length ? headers : undefined,
      body: body !== undefined && (typeof body === 'string' ? body.length > 0 : body.byteLength > 0) ? body : undefined,
      cache: 'no-store',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Cannot reach server. Please check the backend is running.' },
      { status: 502 }
    );
  }

  if (isLogout) {
    const loginUrl = new URL('/acp/login', request.url);
    const nextRes = NextResponse.redirect(loginUrl, 302);
    nextRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    clearSessionCookieOnResponse(request, nextRes);
    return nextRes;
  }

  const resContentType = res.headers.get('content-type');
  const isJson = resContentType?.includes('application/json');

  if (!isJson) {
    const text = await res.text();
    const isHtml = text.trimStart().toLowerCase().startsWith('<!doctype') || text.trimStart().toLowerCase().startsWith('<html');
    if (isHtml || res.status >= 400) {
      return NextResponse.json(
        {
          success: false,
          error: res.status >= 400
            ? `Server returned an error (${res.status}). Please try again.`
            : 'Server returned an invalid response. Please try again.',
        },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }
    const nextRes = new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': resContentType || 'text/plain' },
    });
    return nextRes;
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    data = { success: false, error: 'Invalid response from server.' };
  }
  return NextResponse.json(data, { status: res.status });
}

function clearSessionCookieOnResponse(request: NextRequest, res: NextResponse) {
  const host = request.nextUrl.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  const opts = {
    path: '/' as const,
    maxAge: 0,
    expires: new Date(0),
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: (isLocalhost ? 'lax' : 'none') as 'lax' | 'none',
  };
  res.cookies.set(ACP_SESSION_COOKIE, '', opts);
  res.cookies.set(ACP_SESSION_COOKIE, '', { ...opts, path: '/acp' });
  if (isLocalhost) res.cookies.set(ACP_SESSION_COOKIE, '', { ...opts, domain: 'localhost' });
}
