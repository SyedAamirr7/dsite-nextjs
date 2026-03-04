import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { MyWebsitesService } from './my-websites.service';

@Controller('api/acp/my-websites')
@UseGuards(JwtCookieGuard)
export class MyWebsitesController {
  constructor(private readonly myWebsitesService: MyWebsitesService) {}

  @Get()
  getMyWebsites(@Req() req: Request & { user: { userId: number } }) {
    return this.myWebsitesService.getWebsitesForUser(req.user.userId);
  }
}
