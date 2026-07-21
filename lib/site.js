// lib/site.js
//
// The ONE place the public-facing frontend domain is defined.
//
// Deliberately NOT process.env.NEXT_PUBLIC_SITE_URL — in this project that
// env var is used as the Express API's base URL (see lib/seoApi.js /
// getAccommodationBySlug), which is a completely different thing. Reusing
// it here for canonical/OG/sitemap URLs would silently point search
// engines and social previews at your API server instead of your site.
//
// If you want this to be env-configurable later, introduce a new,
// unambiguously-named var (e.g. NEXT_PUBLIC_APP_URL) rather than reusing
// NEXT_PUBLIC_SITE_URL.
export const SITE_URL = "https://hostelhubb.com";