# Sports Analytics Platform - Enterprise Production Setup

A production-ready, full-stack Sports Analytics Platform built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Recharts**, **NestJS**, **Prisma ORM**, **PostgreSQL**, and **Redis**.

The platform provides live scoreboards, match analytical dashboards, player performance trends, injury reports, a modular sports data provider layer across 7 sports (**NBA, NFL, MLB, MLS, NHL, Boxing, MMA**), a statistical prediction engine with confidence intervals, and a secure **System Admin Portal**.

---

## 🌟 Key Features

- **Multi-Sport Real-Time Intelligence**: Live scores, upcoming matches, results, box scores, play-by-play, and standings for NBA, NFL, MLB, MLS, NHL, Boxing, and MMA.
- **Modular Data Provider Architecture (`ISportsProvider`)**: Seamless abstraction connecting live sports feeds (ESPN, TheSportsDB, OddsAPI) with fallbacks.
- **Statistical Prediction Engine**: Computes expected score margins, win probabilities, and confidence intervals (`± 4.2 pts`) with mandatory statistical estimate disclaimers.
- **Secure System Admin Portal (`/admin`)**:
  - User role management (`USER` vs `ADMIN`).
  - Provider latency & API key configuration.
  - Real-time data sync trigger.
  - Analysis engine weight tuning.
  - Error logs & system monitoring.
  - Database & Redis cache controls.
  - API usage & latency statistics.
- **Authentication & Security**:
  - JWT Bearer authentication.
  - Password hashing with `bcryptjs`.
  - Role-based authorization (`@Roles('ADMIN')`, `RolesGuard`).
  - Rate limiting & Redis-ready caching.
  - Global `AllExceptionsFilter` for unified REST error handling.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** v20+ and **npm** v10+
- **PostgreSQL** v16+ (or Docker)
- **Redis** v7+ (optional, fallback in-memory)

### 2. Backend Setup (`server/`)
```bash
cd server
npm install

# Configure environment variables
cp .env.example .env

# Generate Prisma Client & Run Migrations
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start NestJS Backend API
npm run dev
# API running at http://localhost:4000/api
```

### 3. Frontend Setup (Root)
```bash
# In the project root directory
npm install

# Start Next.js Development Server
npm run dev
# App running at http://localhost:3000
```

---

## 🔑 Default Accounts (Seeded Data)

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@statsedge.pro` | `AdminPass123!` | Full Admin Portal (`/admin`), CRUD APIs, Sync & Cache controls |
| **Standard User** | `user@statsedge.pro` | `UserPass123!` | Dashboard, Match Analytics, Favorites, Profile management |

---

## 🐳 Production Deployment with Docker Compose

To deploy the full platform (PostgreSQL, Redis, NestJS API, Next.js Web) in production containers:

```bash
# Build and launch all services in detached mode
docker-compose up --build -d

# Seed the database container
docker exec -it sports_backend npm run prisma:seed

# Access Applications
# Frontend Web App: http://localhost:3000
# Backend REST API: http://localhost:4000/api
```

---

## 🧪 Testing

```bash
# Run backend unit tests
cd server
npm test
```

---

## ⚙️ Environment Variables Reference

### Backend (`server/.env`)
```env
PORT=4000
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/sports_analytics?schema=public"
JWT_SECRET="sports_analytics_super_secret_jwt_key_2026"
JWT_EXPIRES_IN="7d"
REDIS_URL="redis://localhost:6379"
NODE_ENV="development"
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

---

## 📄 License
Released under the MIT License.
