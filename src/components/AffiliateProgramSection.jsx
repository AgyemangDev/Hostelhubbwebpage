import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/student.jpg";

const AffiliateProgramSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleButtonClick = () => {
    navigate("/get-started");
  };

  return (
    <div
      className="w-full h-screen relative flex items-center justify-center"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background Image with conditional styling */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // Remove fixed attachment for mobile
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          // Improve image rendering
          imageRendering: "high-quality",
          // Add transform for hardware acceleration
          transform: "translate3d(0, 0, 0)",
          // Ensure the div covers the container
          width: "100%",
          height: "100%",
        }}
      />

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pt-40">
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

          {/* Main Title with responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-4xl mx-auto">
            Start Earning through Us.
          </h1>

          {/* Description with Fade-In Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            It's easy — sign up to become an affiliate and, once approved, start
            earning commissions by referring students to book their hostels
            through HostelHubb. For every successful booking made through your
            referral, you'll receive a commission. It's a rewarding way to share
            and earn!
          </motion.p>

          {/* CTA Button with Animated Gradient and Pulse */}
          <motion.button
            className="mt-8 px-6 py-3 md:px-8 md:py-4 bg-accent text-white text-lg font-medium rounded-full shadow-lg 
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
