import type { NextRequest } from 'next/server';

/**
 * Returns the origin to use for backend selection (tunnel vs localhost).
 * When behind Cloudflare/tunnel, the request may have Host: localhost so we must use
 * X-Forwarded-Host / X-Forwarded-Proto to get the real origin (e.g. https://xyz.trycloudflare.com).
 * Otherwise we'd use localhost backend even when user opened the tunnel URL and ngrok is off.
 */
export function getRequestOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto');
  if (forwardedHost) {
    const host = forwardedHost.split(',')[0].trim();
    const proto = (forwardedProto || 'https').split(',')[0].trim().toLowerCase();
    return `${proto === 'https' ? 'https' : 'http'}://${host}`;
  }
  return request.nextUrl.origin;
}
