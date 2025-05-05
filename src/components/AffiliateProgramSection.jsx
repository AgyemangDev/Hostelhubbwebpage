import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import backgroundImage from "../assets/student.jpg"; // Replace with your image
import { useNavigate } from "react-router-dom";

const AffiliateProgramSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the affiliate program page
    navigate("/get-started");
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        imageRendering: "auto", // Helps with quality
        backgroundColor: "#000",
      }}
    >
      {/* Dark Overlay with Gradient for Better Contrast */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Affiliate Program Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center justify-center text-center space-y-8"
        >
          {/* Subtitle with Slight Pulse Effect */}
          <motion.div
            className="relative"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h2 className="text-xl font-medium text-gray-200 relative z-10">
              Join Our Exclusive Affiliate Program
            </h2>
          </motion.div>

          {/* Main Title with Typewriter Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto">
            Start Earning through Us.
          </h1>

          {/* Description with Fade-In Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            It's easy — sign up to become an affiliate and, once approved, start
            earning commissions by referring students to book their hostels
            through HostelHubb. For every successful booking made through your
            referral, you’ll receive a commission. It's a rewarding way to share
            and earn!
          </motion.p>

          {/* CTA Button with Animated Gradient and Pulse */}
          <motion.button
            className="mt-8 px-8 py-4 bg-accent text-white text-lg font-medium rounded-full shadow-lg 
            transition-all duration-300 
            hover:bg-gradient-to-r hover:from-[#610b0c] hover:to-[#7e1f24] hover:text-white 
            transform hover:scale-105"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            onClick={handleButtonClick}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliateProgramSection;
