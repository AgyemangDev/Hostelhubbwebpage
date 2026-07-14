"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Wallet,
  Headset,
  ShieldCheck,
  Clock,
  CalendarClock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    text:
      "We collect your belongings from your hostel and deliver them back — no cost, no hassle.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    text:
      "Student-friendly rates with no hidden fees, no matter how long you store with us.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    text:
      "Our team is always available to help with bookings, questions, or last-minute changes.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Facilities",
    text:
      "Your belongings are kept in verified, monitored storage facilities built for safety.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery & Pickup",
    text:
      "We show up when we say we will — every pickup and delivery, right on schedule.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Storage Duration",
    text:
      "Store for a few days over a short trip or a full year — you choose the timeline.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function StorageBenefits() {
  return (
    <section className="relative bg-gray-50 py-24 overflow-hidden">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal-700/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal-700/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold tracking-widest text-teal-700 uppercase">
            Why Choose HostelHubb Storage
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-gray-900">
            Storage that works around
            <br className="hidden md:block" /> your schedule, not ours.
          </h2>

          <p className="mt-4 text-gray-600">
            From free pickup to secure facilities, we&apos;ve built every part
            of the storage process to be simple, safe, and stress-free for
            students.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-teal-700/30 transition-shadow duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700/10 group-hover:bg-teal-700/15 transition-colors duration-300">
                <Icon size={24} className="text-teal-700" strokeWidth={2} />
              </div>

              <h3 className="mt-5 font-semibold text-gray-900">{title}</h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}