import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma.module';
import { AcpListController } from './acp-list.controller';
import { AcpListService } from './acp-list.service';

@Module({
  imports: [PrismaModule],
  controllers: [AcpListController],
  providers: [AcpListService],
})
export class AcpListModule {}
