"use client";

import { motion } from "framer-motion";
import {
  Smile,
  Eye,
  Smartphone,
  HeartHandshake,
} from "lucide-react";

const FEATURES = [
  {
    icon: Smile,
    title: "Customer Satisfaction",
    text:
      "Thousands of students across 8 campuses trust HostelHubb for accommodation, transport, and storage — every time, every semester.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    text:
      "Clear pricing, verified listings, and honest information across every service — no hidden fees, no surprises.",
  },
  {
    icon: Smartphone,
    title: "Fully Digital",
    text:
      "Book a hostel, arrange move-in transport, and store your belongings — all from one platform, entirely online.",
  },
  {
    icon: HeartHandshake,
    title: "Zero Stress",
    text:
      "From finding a room to moving in and storing your things over break, we handle the logistics of campus life for you.",
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

export default function WhyChooseUs() {
  return (
    <section className="relative bg-gray-50 py-24 overflow-hidden">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-maroon/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-maroon/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-xs font-semibold tracking-widest text-maroon uppercase">
            Why HostelHubb
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-ink">
            Everything about campus life,
            <br className="hidden md:block" /> handled with care.
          </h2>

          <p className="mt-4 text-ink-soft">
            HostelHubb isn&apos;t just about finding a room. From accommodation
            to move-in transport and secure storage over break, we bring every
            part of campus life onto one trusted platform.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid md:grid-cols-4 gap-6"
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
              className="group relative rounded-2xl bg-white border border-line p-6 shadow-sm hover:shadow-lg hover:border-maroon/30 transition-shadow duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 group-hover:bg-maroon/15 transition-colors duration-300">
                <Icon size={24} className="text-maroon" strokeWidth={2} />
              </div>

              <h3 className="mt-5 font-semibold text-ink">{title}</h3>

              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}