/**
 * Current website ID for ACP list APIs.
 * Use env NEXT_PUBLIC_WEBSITE_ID or default (e.g. 237 for dev).
 */
export function getWebsiteId(): number {
  const raw = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_WEBSITE_ID : undefined;
  if (raw) {
    const n = parseInt(raw, 10);
    if (Number.isInteger(n) && n > 0) return n;
  }
  return 237;
}
