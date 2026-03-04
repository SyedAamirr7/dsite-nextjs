import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma.module';
import { MyWebsitesController } from './my-websites.controller';
import { MyWebsitesService } from './my-websites.service';

@Module({
  imports: [PrismaModule],
  controllers: [MyWebsitesController],
  providers: [MyWebsitesService],
})
export class MyWebsitesModule {}
