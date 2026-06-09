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
```

## Environment

Create a local `.env` file based on `.env.example` when custom configuration is needed.

```env
PORT=4000
DATABASE_URL=postgresql://gscore:gscore_password@localhost:5433/gscore_db
```

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
