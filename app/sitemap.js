// app/sitemap.js
import { getAllNewsSlugs } from "@/lib/news";
import { listAccommodationSlugs } from "@/lib/seoApi";
import { SITE_URL } from "@/lib/site";

// Safety cap so an unexpectedly huge or infinitely-paginating API can't
// blow up build time. 10,000 URLs is generous; raise it if you genuinely
// have more listings than that (and consider splitting into multiple
// sitemaps via Next's generateSitemaps() once you're past ~40-50k).
const MAX_HOSTEL_ENTRIES = 10000;
const PAGE_SIZE = 500;
const MAX_PAGES = MAX_HOSTEL_ENTRIES / PAGE_SIZE;

// Normalizes whatever shape listAccommodationSlugs() returns into a flat
// array of slug strings. Handles: array of strings, array of {slug},
// { items: [...] }, { slugs: [...] }, { data: [...] }.
function extractSlugs(payload) {
  const list = Array.isArray(payload)
    ? payload
    : payload?.items ?? payload?.slugs ?? payload?.data ?? [];

  return list
    .map((entry) => (typeof entry === "string" ? entry : entry?.slug))
    .filter(Boolean);
}

function extractCursor(payload) {
  return Array.isArray(payload) ? undefined : payload?.nextCursor;
}

async function getAllHostelSlugs() {
  const allSlugs = [];
  let cursor;

  for (let page = 0; page < MAX_PAGES; page++) {
    let result;
    try {
      result = await listAccommodationSlugs({ limit: PAGE_SIZE, cursor });
    } catch (err) {
      console.error("sitemap: failed to fetch hostel slugs", err);
      break; // fail soft — still return news + static routes
    }

    const slugs = extractSlugs(result);
    if (slugs.length === 0) break;

    allSlugs.push(...slugs);

    cursor = extractCursor(result);
    if (!cursor) break; // no pagination info → assume that was everything
  }

  if (allSlugs.length >= MAX_HOSTEL_ENTRIES) {
    console.warn(
      `sitemap: hit MAX_HOSTEL_ENTRIES (${MAX_HOSTEL_ENTRIES}) — there may be more hostels than are listed in the sitemap. Raise the cap or split into multiple sitemaps.`
    );
  }

  return allSlugs;
}

export default async function sitemap() {
  const staticRoutes = [
    "",
    "/hostels",
    "/news",
    "/storage",
    "/transport",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const newsEntries = getAllNewsSlugs().map((slug) => ({
    url: `${SITE_URL}/news/${slug}`,
    lastModified: new Date(),
  }));

  const hostelSlugs = await getAllHostelSlugs();
  const hostelEntries = hostelSlugs.map((slug) => ({
    url: `${SITE_URL}/hostels/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...newsEntries, ...hostelEntries];
}