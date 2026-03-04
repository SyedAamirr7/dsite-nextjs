import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Controller('api/acp/health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * GET /api/acp/health
   * Public endpoint to verify database connection and that required tables exist.
   */
  @Get()
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1 as ok`;
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      const message =
        err?.code === 'P1001'
          ? 'Database server unreachable. Is PostgreSQL running on localhost:5432?'
          : err?.code === 'P1000' || err?.message?.includes('Authentication failed')
            ? 'Database login failed. Check DATABASE_URL in backend .env (user/password).'
            : err?.code === 'P2021' || err?.message?.includes('does not exist')
              ? 'Database or table missing. Run migrations or create DB "dsitenext".'
              : err?.message ?? 'Database error.';
      return {
        ok: false,
        db: 'error',
        error: message,
      };
    }

    const tables: { name: string; error?: string }[] = [];
    for (const table of ['users', 'websites', 'subscription', 'about']) {
      try {
        await this.prisma.$queryRawUnsafe(`SELECT 1 FROM "${table}" LIMIT 1`);
      } catch (e: unknown) {
        const err = e as { message?: string };
        tables.push({ name: table, error: err?.message ?? 'missing or inaccessible' });
      }
    }

    if (tables.some((t) => t.error)) {
      return {
        ok: false,
        db: 'connected',
        tables: tables.filter((t) => t.error),
        message: 'Some required tables are missing. Create the database schema or run migrations.',
      };
    }

    return { ok: true, db: 'connected' };
  }
}
