"use client";

import Navbar from "@/components/Navbar";
import { useOpenApp } from "@/lib/useOpenApp";
import GetAppModal from "./GetAppModal";

const WHATSAPP_NUMBER = "+233245746198"; // TODO: confirm correct international format, no + or spaces per wa.me spec
const WHATSAPP_MESSAGE = "Hi, I'd like to ask about HostelHubb storage concerning [Add Your Concerns]";

export default function StorageHero() {
  const { handleClick: handleBookStorage, isModalOpen, closeModal } = useOpenApp();

  const handleContactUs = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://img.magnific.com/free-photo/warehouse-with-boxes-delivery-truck_23-2151998655.jpg?semt=ais_hybrid&w=740&q=80')" }}
      />
      <div className="absolute inset-0 bg-teal-800/55" />

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
            <button
              onClick={handleBookStorage}
              className="rounded-xl bg-white px-7 py-3 font-semibold text-teal-700"
            >
              Book Storage
            </button>

            <button
              onClick={handleContactUs}
              className="rounded-xl border border-white/40 px-7 py-3 text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <GetAppModal open={isModalOpen} onClose={closeModal} />
    </section>
  );
}