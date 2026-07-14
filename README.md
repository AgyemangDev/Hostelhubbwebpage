# HostelHubb Web (Next.js SEO frontend) — Phase 1

This is a fresh Next.js 14 (App Router) project. It consumes your existing Express API
as-is — nothing in your backend needs to change for this phase.

## What's in Phase 1

- `app/layout.js` — root layout, fonts (Fraunces / Inter / IBM Plex Mono), base metadata
- `app/page.js` — home page: search hero, university rail, product lines, trust section
- `app/robots.js` — placeholder robots.txt (sitemap wired up in Phase 5)
- `components/Navbar.js`, `components/Footer.js` — ported from your CRA app to `next/link` / `next/navigation`
- `components/SearchBar.js`, `components/UniversityRail.js` — new, drive the home page
- `context/AuthContext.js` — Firebase + your `/api/students/*` endpoints
- `lib/api.js` — typed fetch wrapper around your Express routes
- `lib/universities.js` — canonical Ghana university/city list, reused by Phase 4 programmatic pages

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in your API URL + Firebase config
npm run dev
```

## Assumptions to verify against your real code

- `AuthContext` assumes `/api/students/auth/email` etc. accept `{ idToken }` and that
  `/api/students/me` returns either `{ student }` or the student object directly.
  Adjust `loadStudentProfile` / the auth methods in `context/AuthContext.js` to match your
  actual `modules/auth/router` payloads if they differ.
- Firebase Storage image URLs (`firebasestorage.googleapis.com`) are whitelisted in
  `next.config.mjs` for `next/image`.

## Next phases (not in this delivery yet)

- **Phase 2**: Add a `slug` column to `accommodation` + new Express `modules/seo/` routes
  (`/api/seo/accommodations`, sitemap feed, slug lookups).
- **Phase 3**: `/hostels/[slug]` dynamic pages with `generateMetadata`, JSON-LD, breadcrumbs.
- **Phase 4**: `/universities/[slug]`, `/cities/[slug]`, price-band pages, amenity pages.
- **Phase 5**: Chunked `sitemap.xml`, real `robots.js` sitemap wiring, Search Console setup.
- **Phase 6**: ISR revalidation strategy, image/CWV tuning.
