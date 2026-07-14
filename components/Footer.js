import Link from "next/link";
import { CITIES } from "../lib/universities";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <span className="text-lg font-display font-bold">HOSTELHUBB</span>
          <p className="mt-3 text-sm text-paper/60 max-w-xs">
            Ghana&apos;s marketplace for student hostels, transport, and storage — built with
            students at KNUST, Legon, UCC, and beyond.
          </p>
        </div>

        {/* <div>
          <p className="text-xs font-mono uppercase tracking-widest text-paper/50 mb-3">Cities</p>
          <ul className="space-y-2 text-sm">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/cities/${c.slug}`} className="text-paper/80 hover:text-white">
                  Hostels in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-paper/50 mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="text-paper/80 hover:text-white">Terms</Link></li>
            <li><Link href="/privacy-policy" className="text-paper/80 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} HostelHubb. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
