import { apiFetch, getApiBase, parseResponseJson } from '@/lib/api';

export interface SiteStylesData {
  website_logo_dark: string | null;
  website_logo_light: string | null;
  site_icon: string | null;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
}

export interface SiteStylesSaveResponse {
  success: boolean;
  error?: string;
  website_logo_dark?: string;
  website_logo_light?: string;
  site_icon?: string;
}

const PLACEHOLDER_LOGO = '/assets/img/no-image.png';

/**
 * Build full URL for a design asset path returned by API (e.g. "sites/237/filename.png").
 * Uses /api/acp/asset/ so images load same-origin through the proxy.
 */
export function getDesignAssetUrl(path: string | null | undefined): string {
  if (!path || !path.trim()) return PLACEHOLDER_LOGO;
  const base = getApiBase();
  const prefix = base ? `${base}/api/acp/asset` : '/api/acp/asset';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${prefix}/${normalized}`;
}

export async function getSiteStyles(websiteId: number): Promise<SiteStylesData> {
  const res = await apiFetch(
    `/api/acp/settings/site_styles?websiteId=${encodeURIComponent(websiteId)}`,
    { method: 'GET' }
  );
  const data = await parseResponseJson<SiteStylesData & { error?: string }>(res);
  if (!res.ok) throw new Error(data?.error ?? 'Failed to load site styles');
  return data as SiteStylesData;
}

export async function saveSiteStyles(
  websiteId: number,
  formData: FormData
): Promise<SiteStylesSaveResponse> {
  const res = await apiFetch(
    `/api/acp/settings/site_styles_update?websiteId=${encodeURIComponent(websiteId)}`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const data = await parseResponseJson<SiteStylesSaveResponse>(res);
  if (!res.ok) return { success: false, error: data?.error ?? 'Failed to save' };
  return data;
}

export async function deleteDesignImage(
  websiteId: number,
  attr: 'website_logo_dark' | 'website_logo_light' | 'site_icon'
): Promise<void> {
  const res = await apiFetch(
    `/api/acp/settings/delete_image?websiteId=${encodeURIComponent(websiteId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attr }),
    }
  );
  if (!res.ok) {
    const err = await parseResponseJson<{ error?: string }>(res).catch(
      (): { error?: string } => ({})
    );
    throw new Error(err.error ?? 'Failed to remove image');
  }
}
