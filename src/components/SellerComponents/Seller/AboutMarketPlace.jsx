import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  CheckCircle,
  LayoutDashboard,
  ShoppingCart,
} from "lucide-react";


export default function AboutMarketPlace() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Download the Hostelhubb app on App Store or Play Store and sign up to get started.",
    },
    {
      icon: LayoutDashboard,
      title: "Set Up Your Store",
      description:
        "Access our web platform and create your store with all necessary details.",
    },
    {
      icon: CheckCircle,
      title: "Get Approved",
      description:
        "Our team reviews your store information to ensure quality and authenticity.",
    },
    {
      icon: ShoppingCart,
      title: "Start Selling",
      description:
        "Add your products and start selling instantly to buyers on Hostelhubb.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            How Our{" "}
            <span className="bg-gradient-to-r from-[#610b0c] to-[#8b1214] bg-clip-text text-transparent">
              Marketplace
            </span>{" "}
            Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Join our growing network of hostel owners and reach thousands of
            students looking for their perfect accommodation.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-300/50 hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-[#610b0c] to-[#8b1214] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[#610b0c] to-[#8b1214] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/signup-page"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg font-semibold shadow-lg"
          >
            Start Selling Today
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
