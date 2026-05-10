# YouGO — Deployment Guide

This document covers everything required to build, run, and maintain the YouGO frontend in production using Docker.

---

## Prerequisites

| Tool | Version | Purpose |
|---|---|---|
| Docker | 24+ | Container runtime |
| Docker Compose | 2.x (V2) | Orchestration |
| Node.js | 22 LTS | Local development only |

---

## Project Overview

The frontend is a **Next.js 16** application using the **App Router** and configured with `output: "standalone"` in `next.config.ts`. This means Next.js produces a fully self-contained server bundle in `.next/standalone` — no separate `npm start` or `node_modules` needed at runtime.

---

## Environment Variables

Create a `.env.local` file in the project root for local development. For production, pass variables via `docker-compose.yml` environment section or your cloud provider's secret manager.

```env
# Example .env.local
NEXT_PUBLIC_API_URL=https://api.yougo.world
NEXT_TELEMETRY_DISABLED=1
```

> **Security Rule:** Never commit `.env.local` or any `*.env` file containing secrets to version control. These are excluded via `.gitignore` and `.dockerignore`.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server with Turbopack (hot reload)
npm run dev
```

App will be available at `http://localhost:3000`.

---

## Docker — Production Build

### Build and Start with Docker Compose

```bash
# Build the production image and start the container
docker compose up --build

# Run in detached (background) mode
docker compose up --build -d

# Stop the container
docker compose down
```

### Build Image Standalone (without Compose)

```bash
docker build -t yougo-web:latest .
docker run -p 3000:3000 yougo-web:latest
```

---

## Multi-Stage Dockerfile — How It Works

The Dockerfile uses **3 stages** to produce a minimal, secure production image:

### Stage 1: `deps`
- Base: `node:22-alpine`
- Installs all npm dependencies using `npm ci` for deterministic, reproducible installs
- Caches this layer separately so re-builds only re-run if `package.json` or `package-lock.json` changes

### Stage 2: `builder`
- Copies source code + `node_modules` from `deps`
- Runs `npm run build` to produce the Next.js standalone output in `.next/standalone`
- Telemetry is disabled at build time

### Stage 3: `runner`
- Base: `node:22-alpine` (lean, ~40MB)
- Runs as a **non-root user** (`nextjs:nodejs`) for security
- Copies only:
  - `public/` — static assets, images, logo, favicon
  - `.next/standalone/` — the complete self-contained server
  - `.next/static/` — compiled CSS/JS bundles
- Starts with `node server.js` — the standalone Next.js server entry point

**Result:** A container image of ~250MB that starts in under 2 seconds with no npm, no build tools, and no unnecessary files.

---

## Image Assets & Static Files

All images placed in the `/public` directory are automatically included in the Docker image via:

```dockerfile
COPY --from=builder /app/public ./public
```

This includes:
- `logo.png` — site logo and favicon
- `icon.png` — browser tab icon
- `final_home/` — all homepage section images (about, testimonials, navbar, etc.)

> **Important:** If you add new images to `public/`, they will be included in the next `docker build` automatically. No extra configuration needed.

---

## Health Check

The `docker-compose.yml` includes a built-in health check:

```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 20s
```

Docker will automatically restart the container if the health check fails 3 times in a row (governed by `restart: unless-stopped`).

---

## Deployment to Cloud

### Vercel (Recommended for Next.js)
```bash
npx vercel --prod
```
Vercel automatically detects Next.js and handles builds, CDN, and edge caching.

### AWS / GCP / Azure / DigitalOcean

1. Push the Docker image to a container registry:
```bash
docker tag yougo-web:latest your-registry.io/yougo-web:latest
docker push your-registry.io/yougo-web:latest
```

2. Deploy via your platform's container service (ECS, Cloud Run, App Service, App Platform).

3. Set port to `3000` and pass required environment variables.

### VPS (Bare Metal)
```bash
# SSH into server, clone repo, then:
docker compose up --build -d
```

---

## Common Commands

```bash
# Rebuild image from scratch (no cache)
docker compose build --no-cache

# View container logs
docker compose logs -f web

# Inspect running container
docker compose ps

# Shell into running container
docker compose exec web sh

# Remove container + image
docker compose down --rmi all
```

---

## Turbopack Warning (Development Only)

You may see this warning when running `npm run dev`:

```
Next.js inferred your workspace root, but it may not be correct.
```

This is caused by multiple `package-lock.json` files in parent directories. It does **not** affect production builds. To silence it, add to `next.config.ts`:

```ts
turbopack: {
  root: __dirname,
}
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `Module not found: lenis/react` | The app uses the core `lenis` package with a manual `useEffect` loop — no subpath import needed |
| `Unclosed block` in globals.css | Check `:root { }` has its closing brace |
| `"use client" directive error` | Must be the absolute first line in any client component file |
| Build fails on `output: standalone` | Ensure `next.config.ts` has `output: "standalone"` |
| Images not appearing in Docker | Ensure all assets are in `public/` and not referenced with absolute filesystem paths |
