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
import { SectionsService } from './sections.service';

function parseWebsiteId(websiteId: string | undefined, body?: Record<string, unknown>): number {
  let raw: string | number | undefined = websiteId;
  if (raw === undefined && body?.websiteId != null) raw = String(body.websiteId);
  const n = raw !== undefined ? parseInt(String(raw), 10) : NaN;
  if (!Number.isInteger(n) || n < 1) {
    throw new BadRequestException('Valid websiteId (positive integer) is required');
  }
  return n;
}

@Controller('api/acp/settings')
@UseGuards(JwtCookieGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get('sections')
  getSections(@Query('websiteId') websiteId: string | undefined) {
    const wid = parseWebsiteId(websiteId);
    return this.sectionsService.getSections(wid);
  }

  @Post('section_status')
  sectionStatus(
    @Body() body: Record<string, unknown>,
    @Query('websiteId') websiteId: string | undefined,
  ) {
    const wid = parseWebsiteId(websiteId, body);
    const id = body?.id;
    const sectionId = typeof id === 'number' ? id : parseInt(String(id ?? ''), 10);
    if (!Number.isInteger(sectionId) || sectionId < 1) {
      throw new BadRequestException('Valid id (section ID) is required');
    }
    const statusRaw = body?.status;
    const status = typeof statusRaw === 'number' ? statusRaw : parseInt(String(statusRaw ?? ''), 10);
    return this.sectionsService.updateSectionStatus(wid, sectionId, status);
  }
}
