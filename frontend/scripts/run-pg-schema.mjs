/**
 * Creates database dsitenext (if missing) and runs database/dsite_schema_acp_pg.sql
 * Usage (from monorepo root): npm run db:setup
 *        or from frontend/web:    node scripts/run-pg-schema.mjs
 * Requires: DATABASE_URL in backend/.env or frontend/web/.env.local (postgresql://user:pass@host:port/dbname)
 */
import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, '..');
const monorepoRoot = join(__dirname, '..', '..');

dotenv.config({ path: join(webRoot, '.env.local') });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: join(monorepoRoot, 'backend', '.env') });
}

const url = process.env.DATABASE_URL;
if (!url || !url.startsWith('postgresql://')) {
  console.error('Missing or invalid DATABASE_URL (postgresql://...) in backend/.env or frontend/web/.env.local');
  process.exit(1);
}

// Parse URL to get connection params for "postgres" DB (to create dsitenext)
const u = new URL(url);
const dbName = u.pathname.slice(1) || 'dsitenext';
const baseUrl = url.replace(/\/[^/]+$/, '/postgres');

async function main() {
  const client = new pg.Client({ connectionString: baseUrl });
  try {
    await client.connect();
    const r = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    if (r.rows.length === 0) {
      await client.query('CREATE DATABASE ' + dbName.replace(/[^a-zA-Z0-9_]/g, ''));
      console.log('Created database:', dbName);
    }
  } catch (e) {
    console.error('Create DB error:', e.message);
    process.exit(1);
  } finally {
    await client.end();
  }

  const sqlPath = join(monorepoRoot, 'database', 'dsite_schema_acp_pg.sql');
  const sql = readFileSync(sqlPath, 'utf8');
  const conn = new pg.Client({ connectionString: url });
  try {
    await conn.connect();
    await conn.query(sql);
    console.log('Schema applied successfully.');
  } catch (e) {
    console.error('Schema run error:', e.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

main();
