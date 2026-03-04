import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { SiteSettingsService } from './site-settings.service';

function parseWebsiteId(websiteId: string | undefined, body?: Record<string, unknown>): number {
  let raw: string | number | undefined = websiteId;
  if (raw === undefined && body?.websiteId != null) raw = String(body.websiteId);
  const n = raw !== undefined ? parseInt(String(raw), 10) : NaN;
  if (!Number.isInteger(n) || n < 1) {
    throw new BadRequestException('Valid websiteId (positive integer) is required');
  }
  return n;
}

@Controller('api/acp/settings/site-information')
@UseGuards(JwtCookieGuard)
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get()
  getSiteInformation(@Query('websiteId') websiteId: string | undefined) {
    const wid = parseWebsiteId(websiteId);
    return this.siteSettingsService.getSiteInformation(wid);
  }

  @Post()
  saveSiteInformation(
    @Body() body: Record<string, unknown>,
    @Query('websiteId') websiteId: string | undefined,
  ) {
    const wid = parseWebsiteId(websiteId, body);
    return this.siteSettingsService.saveSiteInformation(body, wid);
  }
}
