import Link from "next/link";
import Image from "next/image";

export default function HostelCard({ item }) {
  return (
    <Link
      href={`/hostels/${item.slug}`}
      className="block rounded-card border border-line bg-paper-raised overflow-hidden hover:border-maroon transition-colors"
    >
      <div className="relative aspect-[4/3] bg-paper">
        {item.front_image && (
          <Image src={item.front_image} alt={item.accommodation_name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-ink-soft">{item.location} · {item.institution}</p>
        <p className="mt-1 font-display font-semibold text-ink truncate">{item.accommodation_name}</p>
        {item.min_price != null && (
          <p className="mt-2 font-mono text-sm text-maroon">GHS {Number(item.min_price).toLocaleString()}</p>
        )}
      </div>
    </Link>
  );
}
