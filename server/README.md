# Server

Backend application workspace for the G-Scores project.

## Stack

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

## Environment

Create a local `.env` file based on `.env.example` when custom configuration is needed.

```env
PORT=4000
DATABASE_URL=postgresql://gscore:gscore_password@localhost:5433/gscore_db
```

## Database Setup

Run the local database setup in this order:

```bash
docker compose up -d
npm run prisma:migrate
npm run db:seed
```

The seed command imports `server/data/diem_thi_thpt_2024.csv` into the `exam_scores` table. It clears existing exam score rows first, so it can be run repeatedly during local development.

## Health Check

After starting the server, verify the API with:

```text
GET http://localhost:4000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "g-score-api"
}
```
