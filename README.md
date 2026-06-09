# G-Scores

Fullstack JavaScript internship assignment at Golden Owl.

## Tech Stack

- React + Vite + TypeScript
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Recharts
- Docker Compose

## Project Structure

```text
g-score
├─ client      # Frontend app: React, Vite, TypeScript, Tailwind CSS, Recharts
├─ server      # Backend API: Node.js, Express, TypeScript, Prisma
├─ package.json
└─ README.md
```

## Local Development

Root commands:

```bash
npm run dev
npm run dev:client
npm run dev:server
npm run build
npm run lint
```

## Local Database

This project uses Docker Compose to run PostgreSQL locally. Copy `.env.example`
to `.env` if you want to override the default database values.

Validate the Compose file:

```bash
docker compose config
```

Start PostgreSQL:

```bash
docker compose up -d
```

Check the container and health status:

```bash
docker compose ps
```

Read database logs:

```bash
docker compose logs postgres
```

Connect to PostgreSQL inside the container:

```bash
docker compose exec postgres psql -U gscore -d gscore_db
```

Stop the database:

```bash
docker compose down
```

Stop the database and remove local persisted data:

```bash
docker compose down -v
```
