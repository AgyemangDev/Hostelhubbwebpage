// components/hostels/BookNowButton.jsx
"use client";

import { CalendarCheck } from "lucide-react";
import { useOpenApp } from "@/lib/useOpenApp";
import BookingAppModal from "@/components/hostels/BookingAppModal";

export default function BookNowButton({ accommodationName, className = "" }) {
  const { handleClick, isModalOpen, closeModal } = useOpenApp();

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-2xl bg-maroon px-6 py-3 font-semibold text-white hover:bg-maroon/90 transition-colors ${className}`}
      >
        <CalendarCheck size={18} />
        Book Now
      </button>

      <BookingAppModal open={isModalOpen} onClose={closeModal} accommodationName={accommodationName} />
    </>
  );
}