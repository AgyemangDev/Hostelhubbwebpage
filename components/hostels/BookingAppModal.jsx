// components/hostels/BookingAppModal.jsx
"use client";

import { X, CalendarCheck } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/hostelhubb/id6738483533";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb";

export default function BookingAppModal({ open, onClose, accommodationName }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-app-modal-title"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon-50 text-maroon">
          <CalendarCheck size={26} />
        </div>

        <h3 id="booking-app-modal-title" className="text-lg font-semibold text-gray-900">
          Book on the HostelHubb app
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {accommodationName
            ? `To book a room at ${accommodationName}, download the HostelHubb app on your phone.`
            : "Booking a room is only available on the HostelHubb mobile app. Download it on your phone to continue."}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-maroon px-6 py-3 text-sm font-semibold text-white"
          >
            Download on the App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700"
          >
            Get it on Google Play
          </a>
        </div>
      </div>
    </div>
  );
}