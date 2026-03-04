import { Controller, Get, Post, Body, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { AboutService } from './about.service';

@Controller('api/acp/about')
@UseGuards(JwtCookieGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAbout(@Query('websiteId') websiteId: string | undefined) {
    const wid = websiteId ? parseInt(websiteId, 10) : NaN;
    if (!Number.isInteger(wid) || wid < 1) {
      throw new BadRequestException('Valid websiteId (positive integer) is required');
    }
    return this.aboutService.getAbout(wid);
  }

  @Post()
  saveAbout(
    @Body() body: Record<string, unknown>,
    @Query('websiteId') websiteId: string | undefined,
  ) {
    const wid = websiteId ? parseInt(websiteId, 10) : (body?.websiteId != null ? Number(body.websiteId) : NaN);
    if (!Number.isInteger(wid) || wid < 1) {
      throw new BadRequestException('Valid websiteId (positive integer) is required');
    }
    return this.aboutService.saveAbout(body, wid);
  }
}
