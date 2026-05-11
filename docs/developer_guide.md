# YouGO Web - Developer Guide

## Purpose

This document explains the project structure, tech stack, and where key code lives. It is meant for developers onboarding to the YouGO web frontend.

## Tech Stack

- Next.js (App Router) for routing and server/client rendering.
- React 19 for UI.
- TypeScript for type safety.
- Tailwind CSS v4 for utility-first styling.
- next/image for responsive image optimization.
- next/font (Geist) plus Google fonts in CSS for typography.
- Lenis for smooth scrolling.

## Project Structure

- app/
  - layout.tsx: Root layout, metadata, fonts, and HTML/body scaffold.
  - page.tsx: Home route entry point.
  - globals.css: Global styles and Tailwind import.
  - components/
    - home/: Home page sections (hero, about, explore, destination, tours, booking, testimonials, blogs, vibe, faq, footer).
    - providers/: App-wide or page-wide providers.
  - lib/
    - site.ts: Site name, description, and site URL utility.
  - robots.ts: Robots metadata route.
  - sitemap.ts: Sitemap metadata route.
  - manifest.ts: Web app manifest.
- public/
  - logo.png: Brand logo.
  - icon-16.png, icon-32.png, icon-192.png, icon-512.png: App icons for manifest and tab icons.
  - favicon.ico: Legacy favicon for broad browser support.
  - final_home/: Local media assets used by home sections.
- docs/
  - business_perspective.md: Product and business context.
- next.config.ts: Next.js config, image optimization, compiler.
- package.json: Scripts and dependencies.

## Routing and Entry Points

- app/page.tsx renders the home page via FinalHome.
- app/components/home/final_home.tsx composes all home sections and wraps them with the smooth scroll provider.

## Home Page Composition

FinalHome renders the sections in order:

- app/components/home/hero.tsx
- app/components/home/about.tsx
- app/components/home/explore.tsx
- app/components/home/destination.tsx
- app/components/home/tours.tsx
- app/components/home/booking.tsx
- app/components/home/testimonials.tsx
- app/components/home/blogs.tsx
- app/components/home/vibe.tsx
- app/components/home/faq.tsx
- app/components/home/footer.tsx

Each section is a client component when it uses animations, state, or effects.

## Providers

- app/components/providers/smooth-scroll.tsx
  - Wraps the home page with Lenis to provide smooth scrolling.
  - Uses requestAnimationFrame for continuous scroll updates.

## Styling

- Tailwind CSS classes are used throughout components for layout and styling.
- app/globals.css imports Tailwind and additional fonts (Syne and DM Sans).
- Geist fonts are configured in app/layout.tsx using next/font.

## Images and Media

- Local images and videos live under public/final_home/ and are referenced as /final_home/....
- Remote images from Pexels are used in some sections.
- next/image is used across home components for optimization.
- next.config.ts allows the Pexels domain for remote image optimization.

## SEO and Metadata

- app/layout.tsx sets metadata, Open Graph, Twitter, icons, and theme color.
- app/lib/site.ts centralizes site name and description and reads environment variables.
- app/robots.ts and app/sitemap.ts generate robots and sitemap routes.
- app/manifest.ts defines a PWA manifest with icons.

## Configuration

- next.config.ts
  - reactCompiler enabled.
  - poweredByHeader disabled.
  - compress enabled.
  - next/image formats set to AVIF and WebP.
  - Pexels domain allowed for remote images.
- tsconfig.json defines TypeScript config.
- eslint.config.mjs configures linting.

## Environment Variables

These values live in the .env file and can be changed without touching code:

- NEXT_PUBLIC_SITE_URL: Base URL used for metadata, sitemap, and robots.
- NEXT_PUBLIC_SITE_NAME: Brand name used in page titles.
- NEXT_PUBLIC_SITE_DESCRIPTION: Meta description used across the site.

## Scripts

From package.json:

- npm run dev: Start local dev server.
- npm run build: Production build.
- npm run start: Run production server.
- npm run lint: Lint the project.

## Deployment (Vercel)

- Build output is in .next.
- Set NEXT_PUBLIC_SITE_URL in Vercel for correct metadata URLs.
- Use the default Next.js build and output settings.

## Notes

- This project is primarily a marketing/landing page using the App Router.
- Most home sections are client components due to animations and interactions.
- Smooth scrolling is applied only to the home composition through FinalHome.
