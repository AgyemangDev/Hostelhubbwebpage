import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StatCard = ({ value, label, gradient, shadow, icon: Icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`p-4 sm:p-6 rounded-3xl shadow-lg ${shadow} transform transition-transform hover:scale-105 ${gradient} 
                  h-[120px] sm:h-[200px] w-full sm:w-auto flex flex-col justify-between`}
    >
      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-80" />
      <div>
        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
          {value}
        </div>
        <p className="mt-1 text-sm sm:text-lg font-semibold text-gray-100">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;