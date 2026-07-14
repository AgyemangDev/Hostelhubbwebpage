import {
  MapPin,
  PackageSearch,
  Receipt,
  Truck,
} from "lucide-react";

const STEPS = [
  {
    icon: MapPin,
    title: "Choose Location",
    text: "Tell us your hostel or preferred storage location.",
  },
  {
    icon: PackageSearch,
    title: "Select Items",
    text: "Choose what you'd like to store and how many items.",
  },
  {
    icon: Receipt,
    title: "Pay & Get Receipt",
    text: "Complete payment and receive your booking receipt instantly.",
  },
  {
    icon: Truck,
    title: "We Pickup & Deliver",
    text: "We collect your belongings and deliver them back when you need them.",
  },
];

export default function StorageProcess() {
  return (
    <section className="bg-gray-50 py-24">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-14">

          {STEPS.map(({ icon: Icon, title, text }, index) => (

            <div key={title} className="text-center">

              <div className="mx-auto w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center">
                <Icon />
              </div>

              <div className="mt-5 text-teal-600 font-bold">
                Step {index + 1}
              </div>

              <h3 className="mt-2 font-semibold">
                {title}
              </h3>

              <p className="mt-2 text-gray-600">
                {text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}