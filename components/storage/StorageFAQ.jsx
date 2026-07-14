"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is Hostelhubb Storage?",
    a: "A secure storage service for students in Ghana. We pick up, store, and deliver your belongings whenever you need them.",
  },
  {
    q: "How much does storage cost?",
    a: "Pricing depends on the number of items, storage duration, and pickup location. Request a free quote to get started.",
  },
  {
    q: "What items can I store?",
    a: "Clothes, books, electronics, kitchen items, luggage, and small furniture — most personal belongings are welcome.",
  },
  {
    q: "Is my property safe with Hostelhubb?",
    a: "Yes. Every item is recorded and tracked from pickup to return, so your belongings stay safe and accounted for.",
  },
  {
    q: "Can Hostelhubb pick up my items?",
    a: "Yes. We collect your belongings directly from your hostel — no need to arrange transport yourself.",
  },
  {
    q: "How long can I store my belongings?",
    a: "As short or as long as you need — from a semester break to a full year of storage.",
  },
  {
    q: "Can I get my items back urgently?",
    a: "Yes. Just contact us and we'll arrange a return delivery based on availability.",
  },
  {
    q: "How do I book storage?",
    a: "Select a storage plan, enter your pickup details, and schedule a time. It only takes a few minutes.",
  },
];

export default function StorageFAQ() {

  const [open, setOpen] = useState(0);

  return (

    <section className="py-24">

      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Everything students ask about storing belongings during vacation,
          hostel moves, or semester breaks in Ghana.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">

          {FAQS.map((item, i) => (

            <div
              key={item.q}
              className="border rounded-2xl overflow-hidden h-fit"
            >

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left"
              >

                <span className="font-semibold">
                  {item.q}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 ml-4 transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === i && (

                <div className="px-6 pb-6 text-gray-600 leading-relaxed">

                  {item.a}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}