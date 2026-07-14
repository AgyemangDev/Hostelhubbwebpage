import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * items: [{ name, href? }] — the last item is treated as the current page
 * (rendered as plain text, not a link) regardless of whether it has an href.
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-ink-soft">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.name} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-maroon transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className={isLast ? "text-ink font-medium" : ""}>{item.name}</span>
            )}
            {!isLast && <ChevronRight size={14} className="text-line shrink-0" />}
          </span>
        );
      })}
    </nav>
  );
}
