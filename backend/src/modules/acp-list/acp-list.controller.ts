import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { AcpListService, AcpListEntity } from './acp-list.service';

@Controller('api/acp/list')
@UseGuards(JwtCookieGuard)
export class AcpListController {
  constructor(private readonly listService: AcpListService) {}

  @Get(':entity')
  getList(
    @Param('entity') entity: AcpListEntity,
    @Query('websiteId') websiteId: string | undefined,
  ) {
    return this.listService.getList(entity, websiteId);
  }
}
