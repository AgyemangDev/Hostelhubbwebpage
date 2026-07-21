// lib/news.js
//
// Central access point for news data. Only getStaticProps/getStaticPaths
// (in pages/news/*) should call these — never a client component, and
// never getServerSideProps, or you lose the build-time/ISR performance win.

import newsData from "../data/newsData";

// Newest first
export function getAllNews() {
  return [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Lightweight version for listing pages — leaves out the full body
// so the news index page's HTML/JSON payload stays small.
export function getNewsSummaries() {
  return getAllNews().map(
    ({ content, ...summary }) => summary // eslint-disable-line no-unused-vars
  );
}

export function getAllNewsSlugs() {
  return newsData.map((item) => item.slug);
}

export function getNewsBySlug(slug) {
  return newsData.find((item) => item.slug === slug) || null;
}