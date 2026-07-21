// app/news/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/news";

export const revalidate = 3600;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Pre-render every known slug at build time.
// (Equivalent of the old getStaticPaths.)
export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Per-page <title>/<meta description>, generated per article.
export async function generateMetadata({ params }) {
  const article = getNewsBySlug(params.slug);
  if (!article) return {};

  return {
    title: `${article.title} | Hostelhubb News`,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }) {
  const article = getNewsBySlug(params.slug);

  if (!article) {
    notFound(); // renders app/news/[slug]/not-found or app/not-found
  }

  const { title, category, author, date, coverImage, imageAlt, content } =
    article;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/news"
        className="mb-8 inline-block text-sm font-medium text-teal-700 hover:underline"
      >
        ← Back to News
      </Link>

      <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
        {category}
      </span>

      <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-slate-900">
        {title}
      </h1>

      <div className="mt-3 text-sm text-stone-500">
        By {author} · {formatDate(date)}
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-100">
        <Image
          src={coverImage}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
        />
      </div>

      <article className="prose prose-stone mt-10 max-w-none prose-p:text-stone-700 prose-p:leading-relaxed">
        {content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}