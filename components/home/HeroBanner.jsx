"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useReducedMotion,
} from "framer-motion";
import { Building2, Truck, PackageCheck, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Building2,
    label: "Verified Hostels",
    detail: "Compare rooms near campus and book with confidence",
    href: "/hostels",
  },
    {
    icon: PackageCheck,
    label: "Secure Storage",
    detail: "Keep your things safe between semesters and vacation breaks",
    href: "/storage",
  },
  {
    icon: Truck,
    label: "Student Transport",
    detail: "Reliable rides during reopening and vacation",
    href: "/transport",
  },
];

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, count]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function AppStoreBadge() {
  return (
    <a
      href="https://apps.apple.com/us/app/hostelhubb/id6738483533"
      aria-label="Download HostelHubb on the App Store"
      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-black px-3 transition-transform hover:-translate-y-0.5 sm:flex-none sm:px-4"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none fill-white">
        <path d="M17.05 12.536c-.02-2.09 1.71-3.09 1.79-3.14-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.52.76-3.17.76-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.07-1.46 2.53-.37 6.27 1.05 8.32.7 1 1.52 2.13 2.6 2.09 1.05-.04 1.44-.68 2.71-.68 1.27 0 1.62.68 2.72.66 1.13-.02 1.84-1.02 2.53-2.03.8-1.16 1.12-2.29 1.14-2.35-.03-.01-2.18-.84-2.2-3.31zM14.9 4.98c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.24-.54.61-1.01 1.6-.88 2.55.93.07 1.88-.47 2.46-1.14z" />
      </svg>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[8px] text-white/60">Download on the</span>
        <span className="block text-xs font-semibold text-white sm:text-sm">App Store</span>
      </span>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
      aria-label="Get HostelHubb on Google Play"
      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-black px-3 transition-transform hover:-translate-y-0.5 sm:flex-none sm:px-4"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none">
        <path fill="#00d9ac" d="M3.6 2.5c-.3.3-.5.8-.5 1.4v16.2c0 .6.2 1.1.5 1.4l.1.1L13 12.4v-.2L3.7 2.4l-.1.1z" />
        <path fill="#ffce00" d="M16.1 15.5l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1z" />
        <path fill="#ff3d5f" d="M16.2 15.4L13 12.2 3.6 21.6c.4.4.9.4 1.6.1l11-6.3" />
        <path fill="#00e5ff" d="M16.2 8.6l-11-6.3c-.7-.4-1.2-.3-1.6.1L13 11.8l3.2-3.2z" />
      </svg>
      <span className="leading-tight whitespace-nowrap">
        <span className="block text-[8px] text-white/60">GET IT ON</span>
        <span className="block text-xs font-semibold text-white sm:text-sm">Google Play</span>
      </span>
    </a>
  );
}

export default function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const headline = "Everything you need for campus life.".split(" ");
  const rise = reduceMotion ? { y: 0 } : { y: 20 };

  return (
    <section className="relative -mt-24 w-full overflow-hidden">
      {/* Background photo + brand overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/mainmage.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b0405]/60 via-[#5c0708]/20 to-[#9a0b0d]/20" />
        <div className="absolute inset-0 bg-[#1a0605]/15" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 md:pt-48 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[#E8A93C] sm:text-xs sm:tracking-[0.35em]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8A93C]/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8A93C]" />
            </span>
            Live across 8 campuses in Ghana
          </span>
          {/* Mobile stat — inline since the floating card is desktop-only */}
          <span className="font-mono text-[11px] text-white/60 sm:text-xs">
            · <Counter to={10000} suffix="+" /> students
          </span>
        </motion.div>

        <h1 className="mt-5 max-w-3xl font-display text-[2.5rem] font-semibold leading-[1.08] text-white sm:text-6xl md:text-7xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, ...rise }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Find a verified hostel near your university, book transport for
          move-in and reopening, and store your belongings safely over
          break — three services, one platform.
        </motion.p>

<motion.div
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/hostels"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#9a0b0d] transition-transform hover:-translate-y-0.5 sm:w-fit"
          >
            Find accommodation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex flex-nowrap gap-3">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </motion.div>
      </div>

      {/* Product strip — solid, high-contrast, the actual point of the page */}
      <motion.div
        initial={{ opacity: 0, ...rise }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-7xl px-6 pb-14 sm:pb-20"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {SERVICES.map(({ icon: Icon, label, detail, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, ...rise }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 + i * 0.1 }}
            >
              <Link
                href={href}
                className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-xl transition-transform hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#E8A93C] text-[#1a1006]">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-base font-semibold text-ink">
                    {label}
                    <ArrowRight
                      size={14}
                      className="text-ink-soft transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink-soft">
                    {detail}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating stat card — desktop only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, ...rise }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-16 top-32 hidden w-56 rounded-2xl bg-white/95 p-5 shadow-2xl backdrop-blur lg:block"
      >
        <p className="font-display text-3xl font-semibold text-[#9a0b0d]">
          <Counter to={10000} suffix="+" />
        </p>
        <p className="mt-1 text-sm text-ink-soft">Students using HostelHubb</p>
      </motion.div>
    </section>
  );
}