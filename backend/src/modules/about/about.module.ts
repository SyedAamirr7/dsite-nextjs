import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { AboutRepository } from './about.repository';

@Module({
  controllers: [AboutController],
  providers: [AboutService, AboutRepository],
})
export class AboutModule {}
