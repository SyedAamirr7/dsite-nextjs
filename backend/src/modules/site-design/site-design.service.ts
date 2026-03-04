import { Injectable, BadRequestException } from '@nestjs/common';
import {
  SiteDesignRepository,
  SITE_DESIGN_IMAGE_KEYS,
  SITE_DESIGN_COLOR_KEYS,
  type SiteDesignImageKey,
} from './site-design.repository';

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB

function isHexColor(s: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(s);
}

@Injectable()
export class SiteDesignService {
  constructor(private readonly repo: SiteDesignRepository) {}

  async getSiteStyles(websiteId: number) {
    const map = await this.repo.getDesignSettings(websiteId);
    const result: Record<string, string | null> = { ...map };
    for (const key of SITE_DESIGN_IMAGE_KEYS) {
      const val = map[key];
      if (val && val.trim()) {
        result[key] = `${websiteId}/${val}`;
      } else {
        result[key] = null;
      }
    }
    return result;
  }

  async saveSiteStyles(
    websiteId: number,
    files: { fieldname: string; buffer: Buffer; originalname: string; mimetype: string; size: number }[],
    body: Record<string, unknown>,
  ): Promise<{ success: boolean; website_logo_dark?: string; website_logo_light?: string; site_icon?: string }> {
    const fieldToKey: Record<string, SiteDesignImageKey> = {
      'img[website_logo_dark]': 'website_logo_dark',
      'img[website_logo_light]': 'website_logo_light',
      'img[site_icon]': 'site_icon',
    };

    for (const file of files) {
      if (!file || !file.buffer || file.size === 0) continue;
      const key = fieldToKey[file.fieldname];
      if (!key) continue;
      if (!ALLOWED_MIMES.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid image type for ${key}. Allowed: JPEG, PNG, WebP, GIF, SVG.`);
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new BadRequestException(`Image ${key} must be at most 4MB.`);
      }
      const oldFilename = await this.repo.getSettingValue(websiteId, key);
      if (oldFilename && oldFilename.trim()) {
        await this.repo.deleteFileIfExists(websiteId, oldFilename);
      }
      const filename = await this.repo.saveFile(websiteId, key, file.buffer, file.originalname);
      await this.repo.upsertSetting(websiteId, key, filename);
    }

    for (const key of SITE_DESIGN_COLOR_KEYS) {
      const bodyKey = `key[${key}]`;
      const nested = (body as any)?.key as Record<string, unknown> | undefined;
      const hasDirect = Object.prototype.hasOwnProperty.call(body, bodyKey);
      const hasNested = nested && Object.prototype.hasOwnProperty.call(nested, key);
      const raw = hasDirect ? body[bodyKey] : hasNested ? nested?.[key] : undefined;
      if (raw === undefined || raw === null) {
        // No value submitted for this key; keep existing DB value
        continue;
      }
      const value = String(raw).trim();
      if (value && !isHexColor(value)) {
        throw new BadRequestException(`Invalid hex color for ${key}.`);
      }
      await this.repo.upsertSetting(websiteId, key, value);
    }

    const styles = await this.getSiteStyles(websiteId);
    return {
      success: true,
      website_logo_dark: styles.website_logo_dark ?? undefined,
      website_logo_light: styles.website_logo_light ?? undefined,
      site_icon: styles.site_icon ?? undefined,
    };
  }

  async deleteImage(websiteId: number, attr: string): Promise<{ success: boolean }> {
    if (!SITE_DESIGN_IMAGE_KEYS.includes(attr as SiteDesignImageKey)) {
      throw new BadRequestException('Invalid attr. Must be one of: website_logo_dark, website_logo_light, site_icon.');
    }
    const filename = await this.repo.getSettingValue(websiteId, attr);
    if (filename && filename.trim()) {
      await this.repo.deleteFileIfExists(websiteId, filename);
    }
    await this.repo.upsertSetting(websiteId, attr, '');
    return { success: true };
  }
}
