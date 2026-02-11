import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Sparkles } from "lucide-react";
import AppStoreButton from "./AppStoreButton";
import GoogleImage from "../../assets/playstore.png";
import AppleImage from "../../assets/apple.png";

const DiscoverInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 max-w-md overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#610b0c]/10 to-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#610b0c] to-[#8b1214] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Get the App
              <Sparkles className="w-4 h-4 text-[#610b0c]" />
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Download HostelHubb today and manage your bookings, payments, and
              notifications all in one place.
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3 flex-wrap">
          <AppStoreButton
            store="Google Play"
            logo={GoogleImage}
            link="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
          />
          <AppStoreButton
            store="App Store"
            logo={AppleImage}
            link="https://apps.apple.com/us/app/hostelhubb/id6738483533"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DiscoverInfoCard;
