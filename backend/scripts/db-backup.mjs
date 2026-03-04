import { execSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import 'dotenv/config';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER,
  DB_PASS,
  DB_NAME,
  PG_DUMP_PATH, // optional: e.g. "C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe"
} = process.env;

if (!DB_USER || !DB_NAME) {
  console.error('Missing DB_USER or DB_NAME in environment. Aborting backup.');
  process.exit(1);
}

// Use PG_DUMP_PATH if set; otherwise on Windows try default PostgreSQL 18 path so PATH is not required
const isWin = process.platform === 'win32';
const defaultWinPath = 'C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe';
const pgDump = PG_DUMP_PATH
  ? PG_DUMP_PATH
  : isWin && existsSync(defaultWinPath)
    ? defaultWinPath
    : 'pg_dump';

const rootDir = join(process.cwd(), '..');
const backupDir = join(rootDir, 'database');
mkdirSync(backupDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const fileName = `${DB_NAME}-${timestamp}.sql`;
const filePath = join(backupDir, fileName);

const env = {
  ...process.env,
  PGPASSWORD: DB_PASS ?? '',
};

const cmd = [
  `"${pgDump}"`,
  `-h ${DB_HOST}`,
  `-p ${DB_PORT}`,
  `-U ${DB_USER}`,
  DB_NAME,
  `-f "${filePath}"`,
].join(' ');

console.log(`Running: ${cmd}`);

try {
  execSync(cmd, { stdio: 'inherit', env, shell: isWin });
  console.log(`Backup created at: ${filePath}`);
} catch (err) {
  console.error('Database backup failed:', err.message ?? err);
  process.exit(1);
}

