// app/sitemap.js
import { getAllNewsSlugs } from "@/lib/news";

const SITE_URL = "https://hostelhubb.com";

export default function sitemap() {
  // Static top-level routes — adjust this list to match your actual pages.
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

  // One entry per news article — pulled straight from data/newsData.js,
  // so new articles are picked up automatically without editing this file.
  const newsEntries = getAllNewsSlugs().map((slug) => ({
    url: `${SITE_URL}/news/${slug}`,
    lastModified: new Date(),
  }));

  // If you have a hostel-fetching function (e.g. getAllHostelSlugs from
  // lib/hostels.js), add the same pattern here so individual hostel pages
  // are included too:
  //
  // const hostelEntries = getAllHostelSlugs().map((slug) => ({
  //   url: `${SITE_URL}/hostels/${slug}`,
  //   lastModified: new Date(),
  // }));

  return [...staticRoutes, ...newsEntries];
}