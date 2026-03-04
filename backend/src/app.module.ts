import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AboutModule } from './modules/about/about.module';
import { SiteSettingsModule } from './modules/site-settings/site-settings.module';
import { SiteDesignModule } from './modules/site-design/site-design.module';
import { SectionsModule } from './modules/sections/sections.module';
import { AcpListModule } from './modules/acp-list/acp-list.module';
import { MyWebsitesModule } from './modules/my-websites/my-websites.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    AboutModule,
    SiteSettingsModule,
    SiteDesignModule,
    SectionsModule,
    AcpListModule,
    MyWebsitesModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
