import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as path from 'path';
import { existsSync } from 'fs';

const cwd = process.cwd();
const distPrisma = path.join(cwd, 'dist', 'generated', 'prisma');
const srcPrisma = path.join(cwd, 'src', 'generated', 'prisma');
// Prefer dist (production after build); fallback to src (dev with nest start --watch)
const prismaPath = existsSync(path.join(distPrisma, 'index.js'))
  ? distPrisma
  : srcPrisma;
const { PrismaClient } = require(prismaPath);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      if (err?.code === 'P1000' || err?.message?.includes('Authentication failed')) {
        throw new Error(
          'Database auth failed. In pgAdmin connect as "postgres", then run SQL from backend/database/fix-admin-for-prisma.sql (Block 1 on DB postgres, Block 2 on DB dsitenext). Or set DATABASE_URL in .env to use your postgres user/password.',
        );
      }
      throw e;
    }
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
