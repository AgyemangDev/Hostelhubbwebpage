"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, CreditCard, ArrowDownCircle } from "lucide-react";



const EarningsCard = ({ onWithdrawClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="lg:col-span-1"
    >
      <div className="bg-gradient-to-br from-[#610b0c] to-[#8a1010] text-white p-6 rounded-2xl relative overflow-hidden shadow-lg h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex justify-between items-start mb-6">
          <p className="flex items-center gap-2 text-white/80 font-medium">
            <Wallet className="h-5 w-5" />
            Withdraw Funds
          </p>
          <motion.div
            whileHover={{ rotate: 15 }}
            className="bg-white/10 p-3 rounded-full"
          >
            <CreditCard className="h-6 w-6 text-white" />
          </motion.div>
        </div>

        <div className="text-sm text-white/70 flex items-center gap-1 mb-6">
          <ArrowDownCircle className="h-4 w-4" />
          <span>Last withdrawal: Apr 15, 2025</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onWithdrawClick}
          className="w-full py-3 bg-white text-[#610b0c] font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          Withdraw Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EarningsCard;
