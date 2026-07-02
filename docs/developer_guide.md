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
  - layout.tsx: Root layout, metadata, fonts, and HTML/body scaffold. Wraps app with AuthProvider.
  - page.tsx: Home route entry point.
  - globals.css: Global styles and Tailwind import.
  - login/
    - page.tsx: Credentials authentication gateway.
  - register/
    - page.tsx: User registration form.
  - verify-email/
    - page.tsx: Interactive email verification hub.
  - profile/
    - page.tsx: Private dashboard profile entry point.
    - [username]/page.tsx: Public dynamic route for social profile discovery.
  - dashboard/
    - page.tsx: Main dashboard view with discover world and events.
  - discover/
    - page.tsx: Discover world view.
  - components/
    - home/: Home page sections.
    - dashboard/: Dashboard-specific components (Sidebar, Header, Layout).
    - providers/: App-wide providers (AuthProvider, SmoothScroll).
  - lib/
    - site.ts: Site metadata.
    - navigation.ts: Config-driven RBAC navigation settings.
    - utils.ts: Tailwind merging utilities.
  - robots.ts, sitemap.ts, manifest.ts: Metadata routes.
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

## Dashboard & RBAC Architecture

### Config-Driven Navigation
The sidebar and protected routes are driven by `app/lib/navigation.ts`. Each `NavItem` defines:
- `title`, `href`, `icon`
- `roles`: List of allowed roles (`ADMIN`, `USER`, `GUEST`)
- `badge`: Optional notification count

### Role-Based Access Control (RBAC)
- **AuthProvider**: A client-side provider in `app/components/providers/auth-provider.tsx` that checks the current user's role against the route configuration.
- **Sidebar**: Automatically filters navigation items based on the user's role.
- **Redirection**: Unauthorized users are automatically redirected to the home page.

### Dashboard Composition
Following the project's modular pattern, the dashboard uses a layout-first approach:
1. `app/components/dashboard/dashboard-layout.tsx` composes the `Sidebar`, `Header`, and the main content area.
2. Pages (e.g., `app/dashboard/page.tsx`) are wrapped in this layout to maintain consistency.

### Authentication & Profile Hub
- **Authentication Gateway (`/login` & `/register`)**:
  - Center-based, responsive split-screen pages managing user credentials, secure cookie sessions, and password hashing matches.
  - Enhanced with intelligent "Back to Home" navigation routing.
- **Verification Page (`/verify-email`)**:
  - Interactive page that automatically captures verification tokens from url parameters, validates status with `/auth/verify-email` endpoint, and provides visual confirmation (success tick or failed tokens).
- **Social Profile System (`/profile` & `/profile/[username]`)**:
  - **Dual-Route Architecture**: Uses `/profile` as the private entry point for the authenticated user and `/profile/[username]` as a public dynamic route for social graph discovery.
  - **Modular UI**: Powered by `app/components/profile/profile-template.tsx` which orchestrates specialized, single-responsibility components (`profile-header`, `profile-actions`, `profile-stats`, `profile-trips-grid`, and `profile-edit-form`).
  - **Instagram-Style Sliding Connections**: Includes `<ProfileConnectionsDrawer>` component which dynamically fetches and lists followers or following lists via `GET /api/v1/users/:userId/followers` or `/following` respectively. When clicking stats in `<ProfileStats>`, the connections panel slides open using custom CSS/Tailwind transitions directly beneath the dividing header border line.
  - **Ownership Authorization**: UI conditionally renders self-management controls (Edit Profile, Change Photo) versus public social interactions (Follow/Unfollow) strictly based on `isOwner` logic, with backend verification layers maintaining security.
  - **Social Navigation**: The entire app natively supports social graph routing. Clicking on creators inside Feed cards or Liker lists automatically redirects to their respective public `[username]` profile.
  - **Settings Dashboard (`/settings`)**:
    - **Responsive 3-Column Architecture**: Wraps `app/components/settings/settings-template.tsx` inside the central `DashboardLayout`. On desktop, it forms a seamless 3-column view (Primary App Sidebar, Settings Navigation Sidebar, and Dynamic Content). On mobile, the Settings Sidebar gracefully transforms into a horizontally scrollable tab list at the top, ensuring maximum screen real estate for the active form.
    - **Smooth Transitions**: Utilizes `framer-motion` to handle performant client-side tab switching and animated content panels.
- **Zustand Feed Store & Discovery Flow (`/explore`)**:
  - **Centralized Feed State**: Managed inside `app/store/feed.store.ts` using Zustand to coordinate discovery feed items (`trips`), loading, and error states globally.
  - **Decoupled API Fetching**: Handled inside `app/services/feed.service.ts` using the secure `apiFetch` utility, completely separating HTTP fetching logic from UI layers.
  - **Lightweight Feed Cards**: The `/explore` route maps modular, performance-optimized cards (`app/components/feed/feed-card.tsx`) using native Next.js lazy-loading. Incorporates robust UI fallbacks for null/missing database values (cover banners, destinations, experience types, and initial-based avatars).
  - **Skeleton Loaders**: Custom skeleton cards (`app/components/feed/feed-skeleton.tsx`) render pulsing gradient placeholder segments to maintain premium layout stability during connection delays.
- **Search Flow (`/search`)**:
  - **Modular UI**: Uses `DashboardLayout` for structural consistency and is integrated into the main `SIDEBAR_CONFIG` navigation menu. Displays a user search input and maps result cards or skeletons iteratively based on UI mockup layouts. Designed to eventually hook up to a robust backend index for users and trips.

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

- This project includes a marketing landing page and a professional dashboard.
- Most components use client-side logic for animations (Framer Motion) and interactions.
- RBAC is implemented via a central config and a high-level AuthProvider.
- Dashboard UI follows a premium "glassmorphism" aesthetic with custom gradients and shadows.
