"use client";

import { Building2, Truck, PackageCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: Building2,
    title: "Student Hostel Accommodation",
    description:
      "Find verified, affordable student hostels near KNUST, University of Ghana, UCC and campuses across Ghana. Compare rooms, prices and amenities, then book your bedspace with confidence.",
    href: "/hostels",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1600&auto=format&fit=crop",
    alt: "Student hostel room accommodation near university campus in Ghana",
  },
    {
    icon: PackageCheck,
    title: "Student Storage Solutions",
    description:
      "Don't drag your luggage home. Store your belongings safely between semesters with pickup and delivery included — the easiest storage option for students in Ghana.",
    href: "/storage",
    image:
      "https://img.magnific.com/free-photo/warehouse-with-boxes-delivery-truck_23-2151998655.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Secure student luggage and belongings storage service between university semesters",
  },
  {
    icon: Truck,
    title: "Student Transport in Ghana",
    description:
      "Book reliable, affordable transport for move-in day, vacation, and reopening. Skip the long queues at the bus station and travel between home and campus with HostelHubb.",
    href: "/transport",
    image:
      "https://cdn.modernghana.com/content__/640/457/1011202245450-g30n1r5ddx-mahama-and-brt-buses-2-620x330.jpg",
    alt: "Student transport and vacation travel booking for Ghanaian university campuses",
  },

];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServicesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-maroon">
          What we do
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-ink">
          Hostel accommodation, transport, and storage — one platform for
          student life in Ghana.
        </h2>

        <p className="mt-4 text-ink-soft">
          Whether you're searching for a verified hostel near your
          university, reliable transport for reopening, or somewhere safe
          to store your things over break, HostelHubb covers every part of
          campus life across Ghana.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {SERVICES.map(({ icon: Icon, title, description, href, image, alt }) => (
          <motion.div key={title} variants={item}>
            <Link
              href={href}
              className="group relative block h-[380px] overflow-hidden rounded-3xl"
            >
              <img
                src={image}
                alt={alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0605]/95 via-[#1a0605]/55 to-[#1a0605]/10 transition-colors duration-300 group-hover:from-[#5c0708]/95" />

              <div className="relative flex h-full flex-col justify-end p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8A93C] text-[#1a1006]">
                  <Icon size={20} />
                </span>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}