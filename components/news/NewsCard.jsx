// components/NewsCard.js
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsCard({ news }) {
  const { slug, title, excerpt, category, date, coverImage, imageAlt } = news;

  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Image
          src={coverImage}
          alt={imageAlt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
          {category}
        </span>

        <h3 className="font-serif text-xl font-semibold leading-snug text-slate-900 group-hover:text-teal-700">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm text-stone-600">{excerpt}</p>

        <span className="mt-auto pt-2 text-xs font-medium text-stone-400">
          {formatDate(date)}
        </span>
      </div>
    </Link>
  );
}