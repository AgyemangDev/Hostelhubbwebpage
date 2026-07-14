import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Breadcrumbs from "@/components/hostels/Breadcrumbs";
import JsonLd from "@/components/hostels/JsonLd";
import RoomTypeList from "@/components/hostels/RoomTypeList";
import { getAccommodationBySlug, listAccommodationSlugs } from "../../../lib/seoApi";
import { slugify } from "../../../lib/slug";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hostelhubb.com";

// ISR: cache the rendered page and refresh from Express at most once an hour.
export const revalidate = 3600;
// Slugs outside generateStaticParams still render — on first visit, on demand —
// and get cached from then on. This is what makes tens of thousands of listings
// workable without a multi-hour build.
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { items } = await listAccommodationSlugs({ limit: 500 });
    return items.map((item) => ({ slug: item.slug }));
  } catch {
    // Build shouldn't fail because the API was briefly unreachable — an
    // empty seed set just means every page is generated on-demand instead.
    return [];
  }
}

function buildDescription(accommodation) {
  const clean = accommodation.description.replace(/\s+/g, " ").trim();
  return clean.length > 155 ? `${clean.slice(0, 152)}...` : clean;
}

export async function generateMetadata({ params }) {
  const data = await getAccommodationBySlug(params.slug);
  if (!data) return {};

  const { accommodation } = data;
  const title = `${accommodation.accommodation_name} — Student Hostel near ${accommodation.institution}`;
  const description = buildDescription(accommodation);
  const url = `${SITE_URL}/hostels/${accommodation.slug}`;
  const image = accommodation.front_image;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 800, alt: accommodation.accommodation_name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function HostelDetailPage({ params }) {
  const data = await getAccommodationBySlug(params.slug);
  if (!data) notFound();

  const { accommodation, roomTypes } = data;
  const url = `${SITE_URL}/hostels/${accommodation.slug}`;
  const prices = roomTypes.map((r) => Number(r.price)).filter((n) => !Number.isNaN(n));
  const minPrice = prices.length ? Math.min(...prices) : null;

  // Institution/city pages don't exist yet (Phase 4) — the breadcrumb step
  // is shown as plain text for now, not a dead link. It becomes a real
  // link the moment /universities/[slug] ships.
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Hostels", href: "/hostels" },
    { name: accommodation.institution },
    { name: accommodation.accommodation_name },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: accommodation.accommodation_name,
    description: buildDescription(accommodation),
    image: accommodation.images?.length
      ? accommodation.images
      : accommodation.front_image
      ? [accommodation.front_image]
      : [],
    url,
    address: {
      "@type": "PostalAddress",
      streetAddress: accommodation.address || accommodation.location,
      addressLocality: accommodation.location,
      addressCountry: "GH",
    },
    ...(accommodation.latitude && accommodation.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: accommodation.latitude,
            longitude: accommodation.longitude,
          },
        }
      : {}),
    amenityFeature: (accommodation.amenities || []).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    ...(minPrice != null
      ? {
          priceRange: `GHS ${minPrice}+`,
          makesOffer: roomTypes.map((r) => ({
            "@type": "Offer",
            name: r.room_type,
            price: r.price,
            priceCurrency: "GHS",
            availability: r.room_availability
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : url,
    })),
  };

  return (
    <>
      <Navbar />
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="pt-32 max-w-5xl mx-auto px-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-line bg-paper-raised">
            {accommodation.front_image && (
              <Image
                src={accommodation.front_image}
                alt={`${accommodation.accommodation_name} — front view`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(accommodation.images || []).slice(0, 4).map((img, i) => (
              <div key={img} className="relative aspect-square rounded-2xl overflow-hidden border border-line bg-paper-raised">
                <Image
                  src={img}
                  alt={`${accommodation.accommodation_name} — photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-ink-soft">
              <MapPin size={16} className="text-maroon shrink-0" />
              {accommodation.location} · {accommodation.institution}
            </div>
            <h1 className="mt-2 text-3xl font-display font-semibold text-ink">
              {accommodation.accommodation_name}
            </h1>
          </div>
          {minPrice != null && (
            <div className="shrink-0 px-5 py-3 rounded-2xl bg-maroon-50 border border-maroon/20">
              <p className="text-xs text-ink-soft">From</p>
              <p className="font-mono text-xl font-semibold text-maroon">
                GHS {minPrice.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 text-ink-soft leading-relaxed max-w-3xl">{accommodation.description}</p>

        {accommodation.amenities?.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-display font-semibold text-ink mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {accommodation.amenities.map((a) => (
                <Link
                  key={a}
                  href={`/amenities/${slugify(a)}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-line hover:border-maroon hover:text-maroon transition-colors"
                >
                  {a}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-lg font-display font-semibold text-ink mb-3">Room types</h2>
          <RoomTypeList roomTypes={roomTypes} />
        </section>


        <section className="mb-16">
          <h2 className="text-lg font-display font-semibold text-ink mb-3">
            More near {accommodation.institution}
          </h2>
          <Link
            href={`/hostels?institution=${encodeURIComponent(accommodation.institution)}`}
            className="text-maroon font-medium text-sm hover:underline"
          >
            Browse all hostels near {accommodation.institution} →
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
