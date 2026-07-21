// app/news/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/news";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

// coverImage is sometimes a relative path ("/images/news/...") and
// sometimes already a full external URL ("https://cdn.../..."). Naively
// prefixing SITE_URL onto an already-absolute URL produces a broken,
// unfetchable image URL — which is why OG previews were falling back to
// the site-wide default. This handles both cases correctly.
function resolveImageUrl(coverImage) {
  if (!coverImage) return null;
  return /^https?:\/\//i.test(coverImage) ? coverImage : `${SITE_URL}${coverImage}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Pre-render every known slug at build time.
export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Per-article <title>, description, canonical URL, Open Graph, Twitter card.
export async function generateMetadata({ params }) {
  const article = getNewsBySlug(params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/news/${article.slug}`;
  const imageUrl = resolveImageUrl(article.coverImage);

  return {
    title: `${article.title} | Hostelhubb News`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: "Hostelhubb",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: imageUrl ? [{ url: imageUrl, alt: article.imageAlt || article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const article = getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { title, category, author, date, coverImage, imageAlt, content, excerpt, slug } =
    article;

  const url = `${SITE_URL}/news/${slug}`;
  const imageUrl = resolveImageUrl(coverImage);

  // Structured data so Google can show this as an Article rich result.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: excerpt,
    image: [imageUrl],
    datePublished: date,
    dateModified: date,
    author: [{ "@type": "Organization", name: author }],
    publisher: {
      "@type": "Organization",
      name: "Hostelhubb",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        By {author} ·{" "}
        <time dateTime={date}>{formatDate(date)}</time>
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