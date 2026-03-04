# dsite (Next.js + NestJS)

Small monorepo with:
- `frontend`: Next.js app (React 19, Next 16, Tailwind CSS)
- `backend`: NestJS API using Prisma and PostgreSQL

## Requirements (high level)

- Node.js **>= 20**
- npm **>= 10** (or Yarn/PNPM)
- PostgreSQL **>= 14**

## Install dependencies

### Frontend

```bash
cd frontend
npm install
```

If npm reports vulnerabilities after install, run (optional):

```bash
npm audit fix
```

### Backend

```bash
cd backend
npm install class-validator class-transformer
npm install
```

## Run the frontend (Next.js)

```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## Run the backend (NestJS)

1. Make sure PostgreSQL is running and a database is created.
2. Set environment variables in `backend` (for example a `DATABASE_URL` in `.env`).
3. Generate Prisma client (first time only):

```bash
cd backend
npm run prisma:generate
```

4. Start the API in dev mode:

```bash
cd backend
npm run dev
# API will listen on the port configured in the NestJS app (commonly 3001 or similar)
```

## Database: backup, load (restore), and create from schema

### Take a backup (schema + data)

From project root or `backend` folder:

```bash
cd backend
npm run db:backup
```

Creates a `.sql` file in the **`database`** folder (e.g. `dsitenext-2026-03-03T13-24-27-664Z.sql`). Uses `pg_dump`; on Windows the script uses `C:\Program Files\PostgreSQL\18\bin\pg_dump.exe` by default (no PATH needed).

### Load (restore) an existing backup into a database

1. Create an empty database in PostgreSQL (e.g. via pgAdmin or `psql`), or use an existing one.
2. Set `DATABASE_URL` in `backend/.env` to point to that database.
3. Restore the dump (replace `YOUR_BACKUP.sql` with the file name in `database/`):

**PowerShell (Windows):**

```powershell
cd backend
$env:PGPASSWORD = "admin"   # same as DB password in .env
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -h localhost -p 5432 -U admin -d dsitenext -f "..\database\YOUR_BACKUP.sql"
```

**Bash / Git Bash:**

```bash
cd backend
PGPASSWORD=admin psql -h localhost -p 5432 -U admin -d dsitenext -f ../database/YOUR_BACKUP.sql
```

### Create a new database from schema only (no data)

Use the **schema-only** file `database/schema.sql` (structure only). Create an empty DB, then:

**PowerShell:**

```powershell
$env:PGPASSWORD = "admin"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -h localhost -p 5432 -U admin -d YOUR_NEW_DB_NAME -f "database\schema.sql"
```

**Bash:**

```bash
PGPASSWORD=admin psql -h localhost -p 5432 -U admin -d YOUR_NEW_DB_NAME -f database/schema.sql
```

Then set `DATABASE_URL` in `backend/.env` to the new database and run `npm run prisma:generate` in `backend`.

---

## Using Prisma (backend)

All commands are run from the **`backend`** folder.

| Command | What it does |
|--------|----------------|
| `npm run prisma:generate` | Generate Prisma Client from `prisma/schema.prisma`. Run after clone, after schema changes, or after restoring a DB. |
| `npx prisma db pull` | Introspect the current database and **overwrite** `prisma/schema.prisma` to match the DB (sync schema from DB). |
| `npx prisma studio` | Open Prisma Studio in the browser to view and edit data. |
| `npx prisma migrate dev` | Create and apply migrations when you change the schema (use if you manage DB via migrations). |
| `npx prisma migrate diff --from-empty --to-url "postgresql://user:pass@host:5432/dbname" --script > ../database/schema.sql` | Export current DB structure to `database/schema.sql` (schema-only SQL). |

**Typical workflow**

- **First time / after pulling code:**  
  `npm run prisma:generate` then `npm run dev`.
- **Schema changed in code:**  
  Edit `prisma/schema.prisma`, then `npm run prisma:generate` (and optionally create a migration with `npx prisma migrate dev`).
- **Schema changed in the database:**  
  Run `npx prisma db pull` to update `schema.prisma`, then `npm run prisma:generate`.

## Production build (optional)

```bash
# Frontend production build
cd frontend
npm run build
npm run start

# Backend production build
cd ../backend
npm run build
npm start
```
