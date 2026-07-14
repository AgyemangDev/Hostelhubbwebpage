"use client";

import { Star, Building2, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { icon: Users, value: "10K+", label: "Active Students" },
  { icon: Star, value: "4.8", label: "App Store Rating" },
  { icon: Building2, value: "200+", label: "Verified Hostels" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

function AppStoreBadge() {
  return (
    <a
      href="https://apps.apple.com/us/app/hostelhubb/id6738483533"
      aria-label="Download HostelHubb on the App Store"
      className="flex h-12 md:h-14 flex-1 md:flex-none items-center justify-center gap-2 md:gap-3 rounded-xl bg-black px-3 md:px-5 transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7 flex-none fill-white">
        <path d="M17.05 12.536c-.02-2.09 1.71-3.09 1.79-3.14-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.52.76-3.17.76-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.07-1.46 2.53-.37 6.27 1.05 8.32.7 1 1.52 2.13 2.6 2.09 1.05-.04 1.44-.68 2.71-.68 1.27 0 1.62.68 2.72.66 1.13-.02 1.84-1.02 2.53-2.03.8-1.16 1.12-2.29 1.14-2.35-.03-.01-2.18-.84-2.2-3.31zM14.9 4.98c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.24-.54.61-1.01 1.6-.88 2.55.93.07 1.88-.47 2.46-1.14z" />
      </svg>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[9px] md:text-[10px] text-white/70">Download on the</span>
        <span className="block text-sm md:text-base font-semibold text-white">App Store</span>
      </span>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
      aria-label="Get HostelHubb on Google Play"
      className="flex h-12 md:h-14 flex-1 md:flex-none items-center justify-center gap-2 md:gap-3 rounded-xl bg-black px-3 md:px-5 transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7 flex-none">
        <path fill="#00d9ac" d="M3.6 2.5c-.3.3-.5.8-.5 1.4v16.2c0 .6.2 1.1.5 1.4l.1.1L13 12.4v-.2L3.7 2.4l-.1.1z" />
        <path fill="#ffce00" d="M16.1 15.5l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1z" />
        <path fill="#ff3d5f" d="M16.2 15.4L13 12.2 3.6 21.6c.4.4.9.4 1.6.1l11-6.3" />
        <path fill="#00e5ff" d="M16.2 8.6l-11-6.3c-.7-.4-1.2-.3-1.6.1L13 11.8l3.2-3.2z" />
      </svg>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[9px] md:text-[10px] text-white/70">GET IT ON</span>
        <span className="block text-sm md:text-base font-semibold text-white">Google Play</span>
      </span>
    </a>
  );
}

export default function DownloadApp() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#134E4A] via-[#0F766E] to-[#0d5c56] p-10 text-white md:p-14"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#5eead4]">
              HostelHubb on the go
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Get the HostelHubb App
            </h2>

            <p className="mt-4 text-white/80">
              Download HostelHubb today and manage your hostel bookings,
              transport, storage, and payments all in one place — anytime,
              anywhere in Ghana.
            </p>

            <div className="mt-8 flex flex-nowrap gap-3 md:gap-4">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <Icon size={22} className="text-[#5eead4]" />
                <p className="mt-3 text-2xl font-bold">{value}</p>
                <p className="text-sm text-white/70">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}