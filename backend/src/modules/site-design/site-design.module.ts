import { Module } from '@nestjs/common';
import { SiteDesignController } from './site-design.controller';
import { SiteDesignService } from './site-design.service';
import { SiteDesignRepository } from './site-design.repository';

@Module({
  controllers: [SiteDesignController],
  providers: [SiteDesignService, SiteDesignRepository],
})
export class SiteDesignModule {}
