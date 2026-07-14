import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StorageCTA() {
  return (
    <section className="py-24">

      <div className="max-w-6xl mx-auto px-6">

        <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-teal-600 text-white p-12 md:p-16">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-bold">
                Need storage this semester?
              </h2>

              <p className="mt-5 text-lg text-white/80 max-w-xl">
                Reserve secure storage for your belongings in minutes.
                Whether you're travelling home, changing hostels or taking a
                semester break, HostelHubb has you covered.
              </p>

            </div>

            <div className="flex justify-start lg:justify-end">

              <Link
                href="/storage/book"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-teal-700 hover:scale-105 transition"
              >

                Reserve Storage

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}