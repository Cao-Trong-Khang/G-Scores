# G-Scores

This project was built for the **Golden Owl Web Developer Intern assignment**.

## Demo

**Live demo:** https://g-scores-xi.vercel.app

**API:** https://g-scores-api-inhx.onrender.com

## Features

- Import raw CSV exam score data into PostgreSQL using Prisma migration and seed script
- Search candidate scores by registration number
- View score level statistics by subject with chart
- View top 10 Group A candidates based on Math, Physics, and Chemistry total score

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=FFFFFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat&logo=tailwindcss&logoColor=38BDF8)
![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=flat)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=FFFFFF)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=FFFFFF)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=FFFFFF)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=FFFFFF)
![Docker](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat&logo=docker&logoColor=FFFFFF)

## Run Locally

### 1. Clone repository

```bash
git clone https://github.com/Cao-Trong-Khang/G-Scores.git
cd G-Scores
```

### 2. Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 3. Create environment files

Create `.env` in the project root:

```env
POSTGRES_USER=gscore
POSTGRES_PASSWORD=gscore_password
POSTGRES_DB=gscore_db
POSTGRES_PORT=5433
```

Create `server/.env`:

```env
PORT=4000
DATABASE_URL=postgresql://gscore:gscore_password@localhost:5433/gscore_db
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 4. Start database

```bash
docker compose up -d
```

### 5. Run migration

```bash
npm run prisma:migrate --prefix server
```

### 6. Import CSV data

```bash
npm run db:seed --prefix server
```

### 7. Start development server

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```
