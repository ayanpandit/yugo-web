# YouGO Web

YouGO is a social + AI powered travel platform focused on trusted travel partner discovery, trip planning, and community-driven exploration.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
npm run build
npm run start
```

## Vercel Deployment

1) Import this repository into Vercel.
2) Set the framework preset to Next.js (auto-detected).
3) (Recommended) Add `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings when you have a domain.
4) Deploy.

`NEXT_PUBLIC_SITE_URL` is optional but recommended for correct sitemap and metadata URLs.

## Features & UI

### Trip Likes
- **Optimistic State Updates:** Highly responsive "Instagram-style" Like button toggling.
- **Glassmorphic Likers View:** Click the like count to trigger a buttery-smooth slide-up overlay revealing who liked the trip, complete with relative timestamp formatting without any heavy external dependencies.
