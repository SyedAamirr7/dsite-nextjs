import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export const SITE_SETTING_KEYS = [
  'website_title_ar',
  'website_description_ar',
  'website_title_en',
  'website_description_en',
  'website_language',
  'website_default_language',
  'website_status',
  'facebook',
  'twitter',
  'linkedin',
  'youtube',
  'instagram',
  'whatsapp',
  'website_tag_ar',
  'website_tag_en',
  'website_country_en',
  'website_country_ar',
  'snapchat',
  'tiktok',
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

const VALUE_MAX_LENGTH = 255;

@Injectable()
export class SiteSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSettingsMap(websiteId: number): Promise<Record<string, string>> {
    const rows = await this.prisma.settings.findMany({
      where: { Website_ID: websiteId },
      select: { Setting_Key: true, Value: true },
    });
    const map: Record<string, string> = {};
    for (const key of SITE_SETTING_KEYS) {
      map[key] = '';
    }
    for (const row of rows) {
      const k = row.Setting_Key;
      if (k && SITE_SETTING_KEYS.includes(k as SiteSettingKey)) {
        map[k] = row.Value ?? '';
      }
    }
    return map;
  }

  async getWebsiteStatus(websiteId: number): Promise<number> {
    const w = await this.prisma.websites.findUnique({
      where: { ID: websiteId },
      select: { Status: true },
    });
    return w?.Status ?? 0;
  }

  async upsertSetting(websiteId: number, key: string, value: string): Promise<void> {
    const trimmed = value.slice(0, VALUE_MAX_LENGTH);
    const existing = await this.prisma.settings.findFirst({
      where: { Website_ID: websiteId, Setting_Key: key },
      select: { ID: true },
    });
    if (existing) {
      await this.prisma.settings.update({
        where: { ID: existing.ID },
        data: { Value: trimmed },
      });
    } else {
      await this.prisma.settings.create({
        data: {
          Website_ID: websiteId,
          Setting_Key: key,
          Value: trimmed,
        },
      });
    }
  }

  async updateWebsiteStatus(websiteId: number, status: number): Promise<void> {
    await this.prisma.websites.update({
      where: { ID: websiteId },
      data: { Status: status },
    });
  }

  async getCountries(): Promise<{ country_code: string; country_enName: string; country_arName: string }[]> {
    const rows = await this.prisma.countries.findMany({
      where: { country_code: { not: 'IL' } },
      select: { country_code: true, country_enName: true, country_arName: true },
      orderBy: { country_enName: 'asc' },
    });
    return rows;
  }
}
