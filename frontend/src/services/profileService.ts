import { apiFetch, getApiBase, parseResponseJson } from '@/lib/api';
import type { ProfileData, ProfileUpdateResponse } from '@/types/api';

export async function getProfile(): Promise<ProfileData> {
  const res = await apiFetch('/api/acp/profile');
  if (!res.ok) {
    const err = await parseResponseJson<{ error?: string }>(res).catch((): { error?: string } => ({}));
    throw new Error(err.error ?? 'Failed to load profile');
  }
  return parseResponseJson<ProfileData>(res);
}

/**
 * Returns absolute URL for profile photo (backend serves at /uploads/customers/).
 */
export function getProfilePhotoUrl(photoPath: string | null | undefined): string | null {
  if (!photoPath) return null;
  const base = getApiBase();
  const path = photoPath.startsWith('/') ? photoPath : `/${photoPath}`;
  return photoPath.startsWith('http') ? photoPath : `${base}${path}`;
}

export async function updateProfile(formData: FormData): Promise<ProfileUpdateResponse> {
  const res = await apiFetch('/api/acp/profile', {
    method: 'POST',
    body: formData,
  });
  const data = await parseResponseJson<ProfileUpdateResponse>(res);
  if (!res.ok) throw new Error(data.error ?? 'Failed to update profile');
  return data;
}

export async function deletePhoto(): Promise<void> {
  const res = await apiFetch('/api/acp/profile/photo', { method: 'DELETE' });
  if (!res.ok) {
    const err = await parseResponseJson<{ error?: string }>(res).catch((): { error?: string } => ({}));
    throw new Error(err.error ?? 'Failed to delete photo');
  }
}
