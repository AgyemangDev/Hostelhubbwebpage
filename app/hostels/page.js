import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HostelCard from "@/components/hostels/HostelCard";
import { searchAccommodations } from "../../lib/seoApi";

export const metadata = {
  title: "Hostels",
  description: "Browse verified student hostels across Ghana's universities on HostelHubb.",
  alternates: { canonical: "/hostels" },
};

export default async function HostelsPage({ searchParams }) {
  const { institution, q, minPrice, maxPrice, cursor } = searchParams || {};
  const { items, nextCursor } = await searchAccommodations({ institution, q, minPrice, maxPrice, cursor });

  const nextHref = nextCursor
    ? `/hostels?${new URLSearchParams({ ...(institution && { institution }), ...(q && { q }), ...(minPrice && { minPrice }), ...(maxPrice && { maxPrice }), cursor: nextCursor })}`
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-32 max-w-6xl mx-auto px-6 pb-20">
        <h1 className="text-2xl font-display font-semibold text-ink">
          {institution ? `Hostels near ${institution}` : "All hostels"}
        </h1>
        <p className="text-sm text-ink-soft mt-1">{items.length} listing{items.length === 1 ? "" : "s"} shown</p>

        {items.length === 0 ? (
          <p className="mt-10 text-ink-soft">No hostels match this search yet.</p>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <HostelCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {nextHref && (
          <div className="mt-10 text-center">
            <Link href={nextHref} className="text-maroon font-medium text-sm hover:underline">
              Load more →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
