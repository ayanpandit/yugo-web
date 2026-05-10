# ─── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:22-alpine AS deps

# Install libc compat for native addons on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package manifests first (layer cache: only re-runs npm ci if these change)
COPY package.json package-lock.json ./

# --production=false ensures devDependencies are available for the build
RUN npm ci

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Accept build-time env vars (e.g. NEXT_PUBLIC_API_URL)
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Pull installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy full source
COPY . .

# Build the Next.js app — output: "standalone" is set in next.config.ts
RUN npm run build

# ─── Stage 3: Production Runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nextjs

# Copy public assets (images, logo, favicons, etc.)
COPY --from=builder /app/public ./public

# Copy the standalone Next.js server bundle
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static assets generated during build
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# next.js standalone outputs a minimal server.js — no npm start needed
CMD ["node", "server.js"]