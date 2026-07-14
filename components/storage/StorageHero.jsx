import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function StorageHero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">

      {/* Navbar overlay */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://img.magnific.com/free-photo/warehouse-with-boxes-delivery-truck_23-2151998655.jpg?semt=ais_hybrid&w=740&q=80')" }}
      />
      <div className="absolute inset-0 bg-teal-800/70" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16">

        <div className="max-w-2xl">

          <p className="uppercase tracking-[0.25em] text-sm text-teal-100">
            HostelHubb Storage
          </p>

          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-white">
            Store your belongings safely while you're away.
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Whether you're travelling home, changing hostels or taking a
            semester break, HostelHubb helps you store your belongings safely
            until you need them again.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">

            <Link
              href="/storage/book"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-teal-700"
            >
              Book Storage
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/40 px-7 py-3 text-white"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}