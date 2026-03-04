import { apiFetch, parseResponseJson } from '@/lib/api';

export interface SiteInformationData {
  website_title_ar?: string | null;
  website_description_ar?: string | null;
  website_title_en?: string | null;
  website_description_en?: string | null;
  website_language?: string | null;
  website_default_language?: string | null;
  website_status?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  website_tag_ar?: string | null;
  website_tag_en?: string | null;
  website_country_en?: string | null;
  website_country_ar?: string | null;
  snapchat?: string | null;
  tiktok?: string | null;
  websiteStatus?: number;
  countries?: { country_code: string; country_enName: string; country_arName: string }[];
}

export interface SiteInformationSaveResponse {
  success: boolean;
  error?: string;
}

export async function getSiteInformation(websiteId: number): Promise<SiteInformationData | null> {
  const res = await apiFetch(
    `/api/acp/settings/site-information?websiteId=${encodeURIComponent(websiteId)}`,
    { method: 'GET' }
  );
  const contentType = res.headers.get('content-type') ?? '';
  const text = await res.text();

  if (res.status === 404) return null;

  if (!contentType.includes('application/json')) {
    if (res.status === 401) throw new Error('Session expired. Please log in again.');
    throw new Error('Invalid response from server. Please try again.');
  }

  let data: SiteInformationData & { message?: string; error?: string };
  try {
    data = JSON.parse(text) as SiteInformationData & { message?: string; error?: string };
  } catch {
    throw new Error('Invalid response from server. Please try again.');
  }

  if (!res.ok) throw new Error(data?.error ?? data?.message ?? 'Failed to load site information');
  return data as SiteInformationData;
}

export async function saveSiteInformation(
  payload: Record<string, string | number>,
  websiteId: number
): Promise<SiteInformationSaveResponse> {
  const res = await apiFetch(
    `/api/acp/settings/site-information?websiteId=${encodeURIComponent(websiteId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  const data = await parseResponseJson<SiteInformationSaveResponse>(res);
  if (!res.ok) return { success: false, error: data.error ?? 'Failed to save' };
  return data;
}
