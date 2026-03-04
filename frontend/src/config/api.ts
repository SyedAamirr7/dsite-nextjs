const FALLBACK_BACKEND = "http://localhost:4000";

function isLocalhostOrigin(origin: string): boolean {
  if (!origin) return false;
  try {
    const u = new URL(origin);
    return /^(localhost|127\.0\.0\.1)$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function isTunnelOrigin(origin: string): boolean {
  if (!origin) return false;
  return /\.ngrok|ngrok-free\.app|trycloudflare\.com|\.loca\.lt|cloudflare\.com/i.test(origin);
}

function getEnvApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (typeof url === "string" && url) {
    const single = url.split(",")[0].trim().replace(/\/$/, "");
    if (single) return single;
  }
  return "";
}

/**
 * Backend API base URL (3-tier). No trailing slash.
 * Empty = same-origin: browser calls /api/acp/* on frontend, Next.js proxies to backend.
 *
 * Always same-origin when origin is provided so the login cookie is set by Next.js for the
 * frontend host (required when frontend is Cloudflare and backend is ngrok: cookie must be
 * for Cloudflare domain, so we never call backend ngrok directly from browser).
 * - localhost → Next.js proxies to localhost:4000.
 * - tunnel (Cloudflare) → Next.js proxies to NEXT_PUBLIC_API_URL (ngrok backend); localhost is not used.
 */
export function getApiBaseUrl(origin?: string): string {
  if (origin !== undefined) {
    if (isLocalhostOrigin(origin)) return "";
    if (isTunnelOrigin(origin)) return ""; // same-origin so cookie is for frontend host
    return "";
  }
  const useSameOrigin = process.env.NEXT_PUBLIC_USE_SAME_ORIGIN_API !== "false";
  if (useSameOrigin) return "";
  const url = getEnvApiUrl();
  if (url) return url;
  return FALLBACK_BACKEND;
}

/**
 * Backend URL for server-side proxy (Next.js route handlers). Never empty.
 * - localhost origin → localhost:4000 (FALLBACK_BACKEND).
 * - Any other origin (Cloudflare/tunnel/custom domain e.g. acp.digiarmtech.com) → NEXT_PUBLIC_API_URL (ngrok backend) if set; else localhost.
 *   So when user opens tunnel URL, we never use localhost backend (ngrok band = login fail).
 * - When origin is not provided (e.g. middleware), returns localhost for dev when ngrok is off.
 */
export function getBackendApiUrl(origin?: string): string {
  if (origin !== undefined) {
    if (isLocalhostOrigin(origin)) return FALLBACK_BACKEND;
    // Any non-localhost (tunnel, Cloudflare, custom domain) → use ngrok backend when set
    const url = getEnvApiUrl();
    if (url) return url;
    return FALLBACK_BACKEND;
  }
  return FALLBACK_BACKEND;
}
