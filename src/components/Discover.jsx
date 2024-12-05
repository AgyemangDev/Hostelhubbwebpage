import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GoogleImage from "../assets/playstore.png";
import AppleImage from "../assets/apple.png";

const StatCard = ({ value, label, gradient, shadow }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`p-4 sm:p-6 rounded-3xl shadow-lg ${shadow} transform transition-transform hover:scale-105 ${gradient} 
                  h-40 w-full sm:h-48 sm:w-auto`}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {value}
      </div>
      <p className="mt-2 text-sm sm:text-base text-gray-100">{label}</p>
    </motion.div>
  );
};

const AppStoreButton = ({ store, logo,link }) => (
  <a
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border-2 border-accent rounded-full hover:bg-accent transition-colors w-full sm:w-auto shadow-md shadow-accent"
>
  <img src={logo} alt={`${store} logo`} className="h-6 w-6" />
  <div className="text-left text-white">
    <div className="text-xs">
      {store === "Google Play" ? "GET IT ON" : "Download on the"}
    </div>
    <div className="text-sm font-semibold">{store}</div>
  </div>
</a>
);

const Discover = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#610b0c] to-[#9c3d5c] text-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 space-y-6 lg:w-1/2 transform transition-transform hover:scale-105"
          >
            <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Discover HostelHubb
            </h1>
            <p className="text-base sm:text-lg">
              Your all-in-one platform for seamless hostel booking, real-time
              notifications, comprehensive management tools, secure payments,
              and personalized recommendations for an unforgettable stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <AppStoreButton store="Google Play" logo={GoogleImage} link="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"/>
            <AppStoreButton store="App Store" logo={AppleImage}  link="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"/>{" "}
              {/* Pass Apple logo here */}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:w-1/2">
            <StatCard
              value="1100+"
              label="Active Users"
              gradient="bg-gradient-to-br from-[#ff7f50] to-[#f0e68c]"
              shadow="shadow-rose-300"
            />
            <StatCard
              value="4.9 Stars"
              label="User Satisfaction"
              gradient="bg-gradient-to-br from-[#6a0dad] to-[#dda0dd]"
              shadow="shadow-purple-300"
            />
            <StatCard
              value="400+"
              label="Hostels Available"
              gradient="bg-gradient-to-br from-[#20b2aa] to-[#3cb371]"
              shadow="shadow-teal-300"
            />
            <StatCard
              value="100%"
              label="Secure Payments"
              gradient="bg-gradient-to-br from-[#ffd700] to-[#ffa500]"
              shadow="shadow-yellow-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
