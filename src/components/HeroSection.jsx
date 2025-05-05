import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import backgroundImage from "../assets/mainmage.jpg"; // Replace with your image
import { FaArrowDown } from "react-icons/fa";

const HeroSection = ({ scrollToNextSection }) => {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#000",
        imageRendering: "auto", // Ensures high quality
      }}
    >
      {/* Dark Overlay with Animated Flicker */}
      <motion.div
        className="absolute inset-0 bg-black opacity-60"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center justify-center text-center space-y-8"
        >
          {/* Optional Badge */}
          <div className="inline-flex items-center px-4 py-1 rounded-full border-2 border-gray-200 bg-white shadow-sm">
            <span className="flex items-center">
              <span className="text-gray-800 font-semibold text-sm">
                Make your stay easier & comfortable
              </span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Find Accommodation & Storage — Fast, Easy & Secure!
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Need a hostel or accomodation nearby? Need Storage? Whether it’s
            affordable accommodation or secure storage close to you, we’ve got
            options that fit your budget and your lifestyle.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToNextSection}
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
          >
            Get Started
          </motion.button>

          {/* Down Arrow */}
          <div className="flex space-x-2 mt-4">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            >
              <FaArrowDown className="text-white text-2xl" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
