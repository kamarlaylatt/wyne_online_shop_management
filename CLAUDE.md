# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (with hot reload)
bun run dev

# Create admin user
bun run create-admin

# Create regular user
bun run create-user

# Database migrations
bunx prisma migrate dev
bunx prisma migrate deploy

# Generate Prisma client
bunx prisma generate

# Docker (development)
docker compose --profile dev up

# Docker (production)
docker compose --profile prod up

# Compile binary
./build.sh
```

## Environment Setup

Copy `.env.example` to `.env`. The app requires PostgreSQL — use Docker Compose or provide your own instance. Note: `DATABASE_URL` uses port `5432` internally while the Docker host maps to `5433`.

## Architecture

This is a **Bun + Elysia** REST API backend with a **dual authentication system** separating Admin and User roles entirely.

### Dual Auth Pattern

The core architectural choice is two fully isolated auth stacks:

- **Admin**: `lib/auth/admin.ts` → `src/routes/admin.ts` → `/api/admin/auth/*`
- **User**: `lib/auth/user.ts` → `src/routes/user.ts` → `/api/user/auth/*`

Each has its own Prisma models (`admins`/`users`, `admin_sessions`/`user_sessions`, etc.), its own better-auth instance, and its own cookie prefix. This means session validation for admin routes will never accidentally accept user sessions.

### Auth Middleware via Elysia Macros

Both route files define a custom `auth` macro. When a route sets `{ auth: true }`, the macro:
1. Reads the session from request headers via `betterAuth.api.getSession()`
2. Returns HTTP 401 if no valid session
3. Injects `user` and `session` into the route handler context

### Adding New Routes

Follow the existing pattern in `src/routes/admin.ts` or `src/routes/user.ts`:
- Use `{ auth: true }` macro for protected endpoints
- Mount new route modules in `src/index.ts`

### Database

Prisma schema is in `prisma/schema.prisma`. The generated client outputs to `generated/prisma/`. Always run `bunx prisma generate` after schema changes.

### API Reference

A Postman collection is available at `wyne-shop-api.postman_collection.json`.
