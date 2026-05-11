# YouGO — Developer Architecture Guide

A complete technical reference for every engineer working on the YouGO frontend.

---

## Stack at a Glance

| Layer | Technology | Version | Why This Choice |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.5 | Industry-leading React SSR/SSG framework; App Router enables per-route streaming, RSC, and layout composition |
| **Language** | TypeScript | ^5 | Full type safety across components, APIs, and data models; eliminates entire classes of runtime bugs |
| **Runtime** | React | 19.2.4 | Latest stable; concurrent features, transitions, and improved server component model |
| **Styling** | Tailwind CSS | ^4 | Utility-first CSS — zero unused styles in production, co-located with markup, no CSS file sprawl |
| **Smooth Scroll** | Lenis | ^1.3.23 | Industry-standard inertial scroll library; used by Awwwards-winning sites; lightweight, framework-agnostic |
| **Bundler** | Turbopack | (Next.js built-in) | Rust-based incremental bundler, 10x faster HMR than Webpack |
| **Font Loading** | `next/font/google` | (Next.js built-in) | Self-hosted Google Fonts with zero layout shift (CLS = 0) |
| **Image Handling** | Native `<img>` + `/public` | — | Static assets served directly; Next.js `<Image>` can be adopted later for automatic WebP and lazy loading |
| **Containerization** | Docker + Docker Compose | 24+ / V2 | Multi-stage build for minimal production images; reproducible across all environments |

---

## Repository Structure

```
yugo-web/
├── docs/
│   ├── business_perspective.md    # Product vision and business model
│   ├── deployment.md              # Docker and cloud deployment guide
│   └── developer.md               # This file — architecture reference
│
├── public/                        # Static assets (served at root URL, included in Docker)
│   ├── logo.png                   # YouGO brand logo (6250×6250 PNG, used in Navbar)
│   ├── icon.png                   # 64×64 resized favicon (auto-detected by Next.js)
│   └── final_home/                # Homepage section image assets
│       ├── about/*.jpg            # Carousel images for About section
│       ├── blogs/1-9.jpg          # Blog card thumbnails
│       ├── destination/           # Destination card images
│       ├── explore/1.png, 2.png, 3.png  # Explore section — 3 images (clean filenames, no spaces)
│       ├── navbar/                # Navbar open-menu visual
│       └── ...                    # Other section assets
│
├── src/
│   ├── app/                       # Next.js App Router — thin re-exports ONLY
│   │   ├── layout.tsx             # ROOT LAYOUT — fonts, SmoothScroll, Footer, BackButton
│   │   ├── page.tsx               # Home route → renders <Final_home />
│   │   ├── globals.css            # Global styles: Tailwind v4 import + :root CSS tokens
│   │   ├── icon.png               # Auto-detected favicon by Next.js
│   │   ├── not-found.tsx          # 404 (re-exports from components/footer/not-found-page.tsx)
│   │   ├── about/page.tsx         # re-exports from components/footer/about-page.tsx
│   │   ├── tours/page.tsx         # re-exports from components/footer/tours-page.tsx
│   │   ├── blogs/page.tsx         # re-exports from components/footer/blogs-page.tsx
│   │   ├── book-a-trip/page.tsx   # re-exports from components/footer/book-a-trip-page.tsx
│   │   ├── privacy-policy/page.tsx# re-exports from components/footer/privacy-policy-page.tsx
│   │   └── terms-conditions/page.tsx # re-exports from components/footer/terms-conditions-page.tsx
│   │
│   ├── components/
│   │   ├── footer/                # Standalone Page Components
│   │   │   ├── about-page.tsx          
│   │   │   ├── blogs-page.tsx          
│   │   │   ├── book-a-trip-page.tsx    
│   │   │   ├── privacy-policy-page.tsx 
│   │   │   ├── terms-conditions-page.tsx
│   │   │   ├── tours-page.tsx          
│   │   │   └── not-found-page.tsx      
│   │   │
│   │   ├── home/                  # Modular UI components (No routing logic)
│   │   │   │
│   │   │   ├── ── Homepage Sections (rendered by final_home.tsx) ──
│   │   │   ├── final_home.tsx          # Orchestrates all sections: Hero (w/ Navbar) → ... → FAQs
│   │   │   ├── hero.tsx                # Landing hero section + Full-width top Navbar (scrolls with page)
│   │   │   ├── about.tsx               # About Us + auto-advancing image carousel
│   │   │   ├── explore.tsx             # "Explore by Situation" — 4 cards with local images
│   │   │   ├── destination.tsx         # Destination showcase cards
│   │   │   ├── tours.tsx               # Tour packages grid (id="tours")
│   │   │   ├── booking.tsx             # "Why YouGO" features section (id="why-yougo")
│   │   │   ├── testimonials.tsx        # Community stories
│   │   │   ├── blogs.tsx               # Travel journal cards (id="blogs")
│   │   │   ├── vibe.tsx                # Vibe gallery
│   │   │   ├── faq.tsx                 # FAQ accordion
│   │   │   ├── footer.tsx              # Global footer (injected via layout.tsx)
│   │   │
│   │   ├── ui/
│   │   │   └── back-button.tsx    # Floating "← Back to Home" (hides on /, shows on all subpages)
│   │   │
│   │   └── providers/
│   │       └── smooth-scroll.tsx  # Lenis smooth scroll (useEffect RAF loop, no lenis/react subpath)
│   │
│   └── lib/
│       └── utils.ts               # cn() utility: merges clsx + tailwind-merge class names
│
├── Dockerfile                     # 3-stage production build (deps → builder → runner)
├── docker-compose.yml             # Production compose with health checks + restart policy
├── .dockerignore                  # Excludes node_modules, .next, .git, .env, docs from build context
├── next.config.ts                 # output: "standalone", reactCompiler: true
├── tsconfig.json                  # TypeScript strict config
└── package.json                   # Dependencies and npm scripts
```

---

## Architecture Decisions

### 1. App Router (Single-File Router)

The `src/app/` directory is kept exceptionally clean, containing only `layout.tsx`, `page.tsx`, `globals.css`, and the `icon.png`. We use a **Single-File Router** pattern where `page.tsx` acts as a central hub, dynamically rendering components from `src/components/footer/` based on URL rewrites.

---

### 2. Production Optimizations

We have implemented several industry-grade optimizations to ensure maximum performance and SEO readiness:

- **Dynamic Imports (`next/dynamic`)**: The root `page.tsx` uses dynamic imports to lazy-load route-specific components. This significantly reduces the initial bundle size for the homepage.
- **URL Rewrites**: Clean URLs are maintained via `next.config.ts` rewrites, providing a professional navigation experience without folder clutter.
- **SEO Assets**: `robots.txt` and `sitemap.xml` are located in the `public/` folder to ensure full search engine indexability.
- **Standalone Output**: The Docker build uses `output: "standalone"` for a minimal production image (~100MB).
- **Inertial Scroll**: Lenis is configured with high-performance RAF loops in `src/components/providers/smooth-scroll.tsx`.

**Why?** This structure separates the routing layer from the actual component logic while meeting strict "clean folder" requirements for the `app` directory.


---

### 2. Global Layout Pattern

```
layout.tsx (Server Component)
├── <Navbar /> (in final_home.tsx) ← Horizontal top navbar, homepage only, scrolls with page
└── <SmoothScrollProvider>      ← Client component: Lenis inertial scroll
    ├── <BackButton />          ← Client component: shows on subpages, hidden on "/"
    ├── <main>{children}</main> ← Page content (per-route)
    └── <Footer />              ← Server component: global footer with Next.js Link navigation
```

