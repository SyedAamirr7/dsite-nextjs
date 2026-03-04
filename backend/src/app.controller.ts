import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      ok: true,
      message: 'API server. Use the frontend URL to access the app; API routes are under /api/acp/',
    };
  }
}
