import { Injectable } from '@nestjs/common';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { PrismaService } from '../../prisma.service';

export const SITE_DESIGN_IMAGE_KEYS = ['website_logo_dark', 'website_logo_light', 'site_icon'] as const;
export const SITE_DESIGN_COLOR_KEYS = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8'] as const;
export const SITE_DESIGN_KEYS = [...SITE_DESIGN_IMAGE_KEYS, ...SITE_DESIGN_COLOR_KEYS] as const;

export type SiteDesignImageKey = (typeof SITE_DESIGN_IMAGE_KEYS)[number];
export type SiteDesignColorKey = (typeof SITE_DESIGN_COLOR_KEYS)[number];

const VALUE_MAX_LENGTH = 255;
const UPLOADS_SITES_BASE = 'uploads' as const;

@Injectable()
export class SiteDesignRepository {
  constructor(private readonly prisma: PrismaService) {}

  getSitesUploadsDir(websiteId: number): string {
    return join(process.cwd(), UPLOADS_SITES_BASE, String(websiteId));
  }

  async getDesignSettings(websiteId: number): Promise<Record<string, string>> {
    const rows = await this.prisma.settings.findMany({
      where: {
        Website_ID: websiteId,
        Setting_Key: { in: [...SITE_DESIGN_KEYS] },
      },
      select: { Setting_Key: true, Value: true },
    });
    const map: Record<string, string> = {};
    for (const key of SITE_DESIGN_KEYS) {
      map[key] = '';
    }
    for (const row of rows) {
      const k = row.Setting_Key;
      if (k && SITE_DESIGN_KEYS.includes(k as (typeof SITE_DESIGN_KEYS)[number])) {
        map[k] = row.Value ?? '';
      }
    }
    return map;
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

  async getSettingValue(websiteId: number, key: string): Promise<string | null> {
    const row = await this.prisma.settings.findFirst({
      where: { Website_ID: websiteId, Setting_Key: key },
      select: { Value: true },
    });
    return row?.Value ?? null;
  }

  async saveFile(websiteId: number, key: string, buffer: Buffer, originalName: string): Promise<string> {
    const dir = this.getSitesUploadsDir(websiteId);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    const ext = (originalName.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
    const safeExt = ext || 'png';
    const filename = `${key}_${Date.now()}.${safeExt}`;
    const filePath = join(dir, filename);
    await writeFile(filePath, buffer);
    return filename;
  }

  async deleteFileIfExists(websiteId: number, filename: string): Promise<void> {
    if (!filename || !filename.trim()) return;
    const dir = this.getSitesUploadsDir(websiteId);
    const filePath = join(dir, filename);
    if (existsSync(filePath)) {
      try {
        await unlink(filePath);
      } catch {
        // ignore
      }
    }
  }
}
