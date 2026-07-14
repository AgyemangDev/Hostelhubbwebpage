import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { CITIES } from "../lib/universities";

const WHATSAPP_NUMBER = "+233245746198"; // TODO: confirm correct international format
const WHATSAPP_MESSAGE = "Hi, I'd like to ask about HostelHubb.";
const INSTAGRAM_URL = "https://www.instagram.com/hostelhubb_gh?igsh=MXhqdTg5ZWZlYnlxdQ%3D%3D&utm_source=qr";
const TIKTOK_URL = "https://www.tiktok.com/@hostelhubb"; // TODO: confirm actual handle

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-1.05-.91-1.7-2.25-1.7-3.75h-3.05v13.9c0 1.62-1.32 2.94-2.95 2.94a2.95 2.95 0 0 1-2.94-2.94 2.95 2.95 0 0 1 2.94-2.94c.28 0 .55.04.8.11V9.99c-.26-.03-.53-.05-.8-.05C5.24 9.94 2.5 12.68 2.5 16.44S5.24 22.94 8.9 22.94s6.4-2.74 6.4-6.5V9.14c1.28.91 2.85 1.45 4.5 1.45V7.5c-1.24 0-2.4-.4-3.2-1.05v-.63Z" />
    </svg>
  );
}

const Footer = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="mt-24 border-t border-line bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <span className="text-lg font-display font-bold">HOSTELHUBB</span>
          <p className="mt-3 text-sm text-paper/60 max-w-xs">
            Ghana&apos;s marketplace for student hostels, transport, and storage — built with
            students at KNUST, Legon, UCC, and beyond.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HostelHubb on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 hover:text-white hover:border-white/30 transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HostelHubb on TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 hover:text-white hover:border-white/30 transition-colors"
            >
              <TikTokIcon width={16} height={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with HostelHubb on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-paper/70 hover:text-white hover:border-white/30 transition-colors"
            >
              <MessageCircle size={16} />
            </a>

          </div>
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
          <p className="text-xs font-mono uppercase tracking-widest text-paper/50 mb-3">Services</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/hostels" className="text-paper/80 hover:text-white">Find a Hostel</Link></li>
            <li><Link href="/storage" className="text-paper/80 hover:text-white">Storage</Link></li>
            <li><Link href="/transport" className="text-paper/80 hover:text-white">Campus Transport</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-paper/50 mb-3">Company</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-white">
                Contact us
              </a>
            </li>
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