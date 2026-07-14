const API_BASE = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Returns { accommodation, roomTypes } or null on 404.
 * `next.revalidate` makes this an ISR fetch: Next caches the rendered page
 * and re-fetches from Express at most once per hour, not on every request.
 */
export async function getAccommodationBySlug(slug) {
  const res = await fetch(`${API_BASE}/api/seo/accommodations/${encodeURIComponent(slug)}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load accommodation "${slug}": ${res.status}`);
  return res.json();
}

/**
 * Seeds generateStaticParams with a bounded slice of listings rather than
 * every accommodation, so `next build` stays fast even at tens of thousands
 * of rows. Everything outside this seed set is still reachable — see
 * `dynamicParams` in app/hostels/[slug]/page.js.
 */
export async function listAccommodationSlugs({ limit = 500 } = {}) {
  const res = await fetch(`${API_BASE}/api/seo/accommodations?limit=${limit}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to list accommodations: ${res.status}`);
  return res.json();
}

/** Backs /hostels — params: institution, location, amenity, minPrice, maxPrice, q, cursor */
export async function searchAccommodations(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  ).toString();
  const res = await fetch(`${API_BASE}/api/seo/search?${qs}`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json(); // { items, nextCursor }
}
