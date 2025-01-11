import React from "react";
import { motion } from "framer-motion";
import WhatsAppLogo from "../assets/whatsapp-logo.png"; // Path to your WhatsApp logo

const WhatsAppPage = () => {
  // Animation Variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* WhatsApp Section */}
      <motion.div
        className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 space-y-8 shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Animation triggers when in viewport
        transition={{ duration: 0.6 }}
        variants={fadeInVariants}
      >
        {/* WhatsApp Logo */}
        <motion.img
          src={WhatsAppLogo}
          alt="WhatsApp Logo"
          className="w-24 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-secondary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join Our WhatsApp Channel
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-700 text-center max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Stay updated with the latest announcements, exclusive deals, and more.
          Click the button below to join our WhatsApp channel.
        </motion.p>

        {/* Join Button */}
        <motion.a
          href="https://whatsapp.com/channel/0029Vavl8Yv5fM5e7ydw7i1W" // Replace with your WhatsApp invite link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Join Now
        </motion.a>
      </motion.div>
    </div>
  );
};

export default WhatsAppPage;
