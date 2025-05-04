"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";



const StatCard = ({
  title,
  value,
  change,
  icon,
  prefix = "",
  suffix = "",
}) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white shadow-lg border border-red-200 transition-all duration-300 hover:shadow-xl hover:border-red-400 rounded-xl"
    >
      <div className="absolute top-0 right-0 bg-gradient-to-br from-red-200 to-red-400 w-16 h-16 rounded-bl-3xl opacity-20"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-lg bg-red-50">
            {React.cloneElement(icon, { className: "text-[#610b0c]" })}
          </div>
          <div
            className={`flex items-center ${
              isPositive ? "text-green-600" : "text-red-600"
            } text-sm font-medium`}
          >
            {isPositive ? (
              <ArrowUpRight className="mr-1" size={16} />
            ) : (
              <ArrowDownRight className="mr-1" size={16} />
            )}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        </div>
        <h2 className="text-lg font-medium text-gray-700 mb-2">{title}</h2>
        <p className="text-3xl font-bold mb-1 text-[#610b0c]">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </p>
        <p className="text-sm text-gray-500">vs previous period</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
