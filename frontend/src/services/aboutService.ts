import { apiFetch, parseResponseJson } from '@/lib/api';
import type { AboutSaveResponse } from '@/types/api';

export type AboutData = Record<string, string | null> | null;

export async function getAbout(websiteId: number): Promise<AboutData> {
  const res = await apiFetch(`/api/acp/about?websiteId=${encodeURIComponent(websiteId)}`, { method: 'GET' });
  const contentType = res.headers.get('content-type') ?? '';
  const text = await res.text();

  if (res.status === 404) return null;

  if (!contentType.includes('application/json')) {
    if (res.status === 401) {
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error('Invalid response from server. Please log in again or try again.');
  }

  let data: AboutData & { message?: string; error?: string };
  try {
    data = JSON.parse(text) as AboutData & { message?: string; error?: string };
  } catch {
    throw new Error('Invalid response from server. Please try again.');
  }

  if (!res.ok) throw new Error(data?.error ?? data?.message ?? 'Failed to load about');
  return data as AboutData;
}

export async function saveAbout(payload: Record<string, string>, websiteId: number): Promise<AboutSaveResponse> {
  const res = await apiFetch(`/api/acp/about?websiteId=${encodeURIComponent(websiteId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseResponseJson<AboutSaveResponse>(res);
  if (!res.ok) throw new Error(data.error ?? 'Failed to save');
  return data;
}
