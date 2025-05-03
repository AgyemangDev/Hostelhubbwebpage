import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Smartphone } from "lucide-react";
import AppStoreButton from "./AppStoreButton";
import GoogleImage from "../../assets/playstore.png";
import AppleImage from "../../assets/apple.png";

const DiscoverInfoCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-rose-900 to-pink-700 text-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 space-y-6 lg:w-1/2 transform transition-transform hover:scale-105"
    >
      <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-4">
        <Building2 className="w-10 h-10" />
        Discover HostelHubb
      </h1>
      <p className="text-base sm:text-lg">
        Your all-in-one platform for seamless hostel booking,
        real-time notifications, comprehensive management
        tools, secure payments, and an exceptional experience
        tailored just for you.
      </p>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold pt-4 flex items-center gap-2">
          <Smartphone className="w-6 h-6" />
          DOWNLOAD HOSTELHUBB BELOW
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
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