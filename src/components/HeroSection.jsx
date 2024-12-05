import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import backgroundImage from "../assets/background.jpg";
import { FaArrowDown } from "react-icons/fa";

const HeroSection = ({ scrollToNextSection }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Dark Overlay with Animated Gradient Flicker Effect */}
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
          {/* Subtitle with Slight Pulse Effect */}
          <motion.div
            className="relative"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <h2 className="text-xl font-medium text-gray-200 relative z-10">
              Make your stay easier and Comfortable
            </h2>
          </motion.div>

          {/* Main Title with Typewriter Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto">
            <Typewriter
              words={[
                "Welcome to HostelHubb",
                "Discover seamless hostel booking",
                "Enjoy secure payments for peace of mind",
                "Explore hostels tailored to your needs",
                "Join a thriving community of explorers",
              ]}
              loop={1000}
              typeSpeed={80}
              deleteSpeed={30}
              delaySpeed={2000}
              cursor
              cursorStyle=""
            />
          </h1>

          {/* Description with Fade-In Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Discover the best hostels and experiences tailored just for you.
            Your adventure begins here.
          </motion.p>

          {/* CTA Button with Animated Gradient and Pulse */}
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

          {/* Animated Down Arrows */}
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
