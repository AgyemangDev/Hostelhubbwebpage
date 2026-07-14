import Link from "next/link";
import Image from "next/image";
import { UNIVERSITIES } from "../../lib/universities";

const UniversityRail = () => {
  return (
    <section className="py-10 border-y border-line bg-paper-raised">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-ink-soft mb-4">
          Trusted by students at these campuses
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
          {UNIVERSITIES.map((u) => (
            <Link
              key={u.slug}
              href={`/universities/${u.slug}`}
              className="group shrink-0 relative flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl border border-line bg-paper hover:border-maroon transition-colors"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line">
                <Image
                  src={u.logo}
                  alt={`${u.fullName} hostels on HostelHubb`}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain p-1"
                />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink transition-colors group-hover:text-maroon">
                  {u.name}
                </span>
                <span className="block text-xs text-ink-soft">{u.city}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityRail;