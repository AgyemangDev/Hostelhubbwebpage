import React from 'react';
import { Lock, User, Loader2, EyeOff, Eye, ChevronRight, Shield, File, Mail } from "lucide-react"
import { motion } from "framer-motion"

const LeftInfoSection = () => {
  return (
    <>
    {/* Left side - Brand/Logo area */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#610b0c] to-[#8a1010] text-white p-8 justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
            className="mb-6 mx-auto"
          >
            <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>
          <p className="text-white/80">
            Log in to your Hostelhubb account and provide the other neccessary information required.
          </p>
        </motion.div>
      </div>
      </>
  );
};

export default LeftInfoSection;