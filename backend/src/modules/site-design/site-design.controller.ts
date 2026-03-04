import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { SiteDesignService } from './site-design.service';

function parseWebsiteId(websiteId: string | undefined, body?: Record<string, unknown>): number {
  let raw: string | number | undefined = websiteId;
  if (raw === undefined && body?.websiteId != null) raw = String(body.websiteId);
  const n = raw !== undefined ? parseInt(String(raw), 10) : NaN;
  if (!Number.isInteger(n) || n < 1) {
    throw new BadRequestException('Valid websiteId (positive integer) is required');
  }
  return n;
}

const FILE_FIELDS: { name: string; maxCount: number }[] = [
  { name: 'img[website_logo_dark]', maxCount: 1 },
  { name: 'img[website_logo_light]', maxCount: 1 },
  { name: 'img[site_icon]', maxCount: 1 },
];

@Controller('api/acp/settings')
@UseGuards(JwtCookieGuard)
export class SiteDesignController {
  constructor(private readonly siteDesignService: SiteDesignService) {}

  @Get('site_styles')
  getSiteStyles(@Query('websiteId') websiteId: string | undefined) {
    const wid = parseWebsiteId(websiteId);
    return this.siteDesignService.getSiteStyles(wid);
  }

  @Post('site_styles_update')
  @UseInterceptors(
    FileFieldsInterceptor(FILE_FIELDS, {
      storage: memoryStorage(),
      limits: { fileSize: 4 * 1024 * 1024 },
    }),
  )
  async saveSiteStyles(
    @Query('websiteId') websiteId: string | undefined,
    @Body() body: Record<string, unknown>,
    @UploadedFiles()
    files: {
      'img[website_logo_dark]'?: Express.Multer.File[];
      'img[website_logo_light]'?: Express.Multer.File[];
      'img[site_icon]'?: Express.Multer.File[];
    },
  ) {
    const wid = parseWebsiteId(websiteId, body);
    const filesList: { fieldname: string; buffer: Buffer; originalname: string; mimetype: string; size: number }[] = [];
    for (const field of FILE_FIELDS) {
      const arr = files?.[field.name as keyof typeof files];
      const file = Array.isArray(arr) ? arr[0] : undefined;
      if (file && file.buffer) {
        filesList.push({
          fieldname: file.fieldname,
          buffer: file.buffer,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    }
    return this.siteDesignService.saveSiteStyles(wid, filesList, body ?? {});
  }

  @Post('delete_image')
  deleteImage(
    @Query('websiteId') websiteId: string | undefined,
    @Body() body: { attr?: string },
  ) {
    const wid = parseWebsiteId(websiteId, body as Record<string, unknown>);
    const attr = body?.attr;
    if (typeof attr !== 'string' || !attr.trim()) {
      throw new BadRequestException('attr is required and must be one of: website_logo_dark, website_logo_light, site_icon');
    }
    return this.siteDesignService.deleteImage(wid, attr.trim());
  }
}
