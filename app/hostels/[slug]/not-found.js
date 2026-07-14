import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function HostelNotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center">
        <h1 className="text-2xl font-display font-semibold text-ink">Hostel not found</h1>
        <p className="mt-3 text-ink-soft">
          This listing may have been removed, or the link you followed is out of date.
        </p>
        <Link href="/" className="inline-block mt-6 text-maroon font-medium hover:underline">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
