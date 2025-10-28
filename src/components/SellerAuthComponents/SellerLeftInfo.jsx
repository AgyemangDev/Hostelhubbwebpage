import React from "react";
import { Store, TrendingUp, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SellerLeftInfo = () => {
  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands",
      description: "Connect with students actively looking for accommodation",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Increase bookings with our powerful marketing tools",
    },
    {
      icon: CheckCircle,
      title: "Verified Listings",
      description: "Build trust with verified badges and reviews",
    },
  ];

  return (
    <>
      {/* Left side - Brand/Info area */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#610b0c] to-[#8a1010] text-white p-12 justify-center items-center relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
            className="mb-8"
          >
            <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
              <Store className="h-10 w-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4"
          >
            Start Selling on HostelHubb
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 mb-8 leading-relaxed"
          >
            Join our growing marketplace and showcase your hostels to thousands
            of students. Get verified, manage bookings, and grow your business
            effortlessly.
          </motion.p>

          {/* Benefits List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-white/70">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 pt-8 border-t border-white/20 grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <p className="text-2xl font-bold">200+</p>
              <p className="text-xs text-white/70">Hostels</p>
            </div>
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-xs text-white/70">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold">5.0</p>
              <p className="text-xs text-white/70">Rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SellerLeftInfo;
