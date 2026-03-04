import { apiFetch, parseResponseJson } from '@/lib/api';
import type { WebsiteItem } from '@/context/WebsiteContext';

export async function getMyWebsites(): Promise<WebsiteItem[]> {
  const res = await apiFetch('/api/acp/my-websites', { method: 'GET' });
  const data = await parseResponseJson<{ message?: string; error?: string } & WebsiteItem[]>(res);
  if (!res.ok) throw new Error(data?.error ?? data?.message ?? 'Failed to load websites');
  return Array.isArray(data) ? data : [];
}
