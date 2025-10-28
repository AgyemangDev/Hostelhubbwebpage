import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-md shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-300/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-[#610b0c] to-[#8b1214] rounded-lg flex items-center justify-center mb-4 shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
        {stat.value}
      </div>
      <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
    </motion.div>
  );
};

export default StatCard;
