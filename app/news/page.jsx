// app/news/page.jsx
import { getNewsSummaries } from "@/lib/news";
import NewsCard from "@/components/news/NewsCard";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "News | Hostelhubb",
  description: "Updates, guides, and announcements from Hostelhubb.",
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
  openGraph: {
    title: "News | Hostelhubb",
    description: "Updates, guides, and announcements from Hostelhubb.",
    url: `${SITE_URL}/news`,
    siteName: "Hostelhubb",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News | Hostelhubb",
    description: "Updates, guides, and announcements from Hostelhubb.",
  },
};

// ISR: rebuild this page in the background at most once an hour.
// (Equivalent of the old getStaticProps `revalidate` option.)
export const revalidate = 3600;

export default async function NewsIndexPage() {
  // Runs on the server at build/revalidate time, not per client request.
  const news = getNewsSummaries(); // excerpts + metadata only, no article body

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Hostelhubb News
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-slate-900">
          What&apos;s happening
        </h1>
        <p className="mt-4 text-stone-600">
          Property updates, policy changes, and guides — straight from the
          team running Hostelhubb.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.slug} news={item} />
        ))}
      </div>
    </main>
  );
}