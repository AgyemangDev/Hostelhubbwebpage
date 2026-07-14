"use client";

import { useOpenApp } from "@/lib/useOpenApp";
import BookingAppModal from "@/components/hostels/BookingAppModal";

export default function RoomTypeList({ roomTypes, accommodationName }) {
  const { handleClick, isModalOpen, closeModal } = useOpenApp();

  if (!roomTypes?.length) {
    return <p className="text-sm text-ink-soft">No room types listed yet.</p>;
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        {roomTypes.map((r) => (
          <button
            key={r.id}
            onClick={handleClick}
            className="p-4 rounded-2xl border border-line bg-paper-raised flex items-start justify-between gap-3 text-left hover:border-maroon transition-colors"
          >
            <div>
              <p className="font-semibold text-ink">{formatRoomType(r.room_type)}</p>
              {r.description && <p className="text-xs text-ink-soft mt-1">{r.description}</p>}
              <p className={`text-xs mt-2 font-medium ${r.room_availability ? "text-forest" : "text-ink-soft"}`}>
                {r.room_availability
                  ? `Rooms available`
                  : "Fully booked"}
              </p>
            </div>
            <p className="font-mono text-lg font-semibold text-ink shrink-0">
              GHS {Number(r.price).toLocaleString()}
            </p>
          </button>
        ))}
      </div>

      <BookingAppModal open={isModalOpen} onClose={closeModal} accommodationName={accommodationName} />
    </>
  );
}

// "TwoInARoom" -> "Two In A Room"
function formatRoomType(raw) {
  return raw.replace(/([a-z])([A-Z])/g, "$1 $2");
}