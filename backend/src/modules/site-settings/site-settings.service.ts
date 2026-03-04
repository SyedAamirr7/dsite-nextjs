import { Injectable, BadRequestException } from '@nestjs/common';
import {
  SiteSettingsRepository,
  SITE_SETTING_KEYS,
} from './site-settings.repository';

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, '').trim();
}

function sanitizeValue(val: unknown): string {
  if (val === undefined || val === null) return '';
  const s = String(val).trim();
  return stripTags(s);
}

function normalizeWhatsapp(val: string): string {
  const digits = val.replace(/\D/g, '');
  return digits.slice(0, 20);
}

const VALUE_MAX_LENGTH = 255;

@Injectable()
export class SiteSettingsService {
  constructor(private readonly repo: SiteSettingsRepository) {}

  async getSiteInformation(websiteId: number) {
    const [settingsMap, websiteStatus, countries] = await Promise.all([
      this.repo.getSettingsMap(websiteId),
      this.repo.getWebsiteStatus(websiteId),
      this.repo.getCountries(),
    ]);
    return { ...settingsMap, websiteStatus, countries };
  }

  async saveSiteInformation(
    body: Record<string, unknown>,
    websiteId: number,
  ): Promise<{ success: boolean; error?: string }> {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Invalid request body');
    }

    let websiteStatusValue: number | undefined;
    for (const key of SITE_SETTING_KEYS) {
      const raw = body[key];
      if (raw === undefined) continue;

      let value: string;
      if (key === 'whatsapp') {
        value = normalizeWhatsapp(sanitizeValue(raw));
      } else if (key === 'website_status') {
        const n = typeof raw === 'number' ? raw : parseInt(String(raw), 10);
        websiteStatusValue = Number.isInteger(n) && (n === 0 || n === 1) ? n : 1;
        value = String(websiteStatusValue);
      } else {
        value = sanitizeValue(raw).slice(0, VALUE_MAX_LENGTH);
      }

      await this.repo.upsertSetting(websiteId, key, value);
    }

    if (websiteStatusValue !== undefined) {
      await this.repo.updateWebsiteStatus(websiteId, websiteStatusValue);
    }

    return { success: true };
  }
}
