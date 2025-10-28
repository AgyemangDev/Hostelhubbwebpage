import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, CreditCard, Box } from "lucide-react";
import screenshot from "../../assets/screenshot.jpg";
import { useNavigate } from "react-router-dom";

export default function SellerSection() {
  const navigate = useNavigate();

  const handleSignUpButtonClick = () => {
    navigate("/become-a-seller");
  };
  return (
    <section className="flex flex-col md:flex-row justify-between items-center bg-white p-10 rounded-3xl shadow-lg border border-gray-200 max-w-7xl mx-auto my-10">
      {/* Left Side */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 leading-snug">
          Become A Seller <br /> On{" "}
          <span className="text-[#610b0c]">HostelHubb</span> Today!!
        </h2>
        <p className="text-gray-600 text-lg max-w-md">
          Register today to be part of the best and fastest-selling platform for
          student products.
        </p>

        <div className="flex space-x-4">
          <button
            className="bg-[#610b0c] text-white px-6 py-3 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-md"
            onClick={handleSignUpButtonClick}
          >
            Signup Today
          </button>
          <button className="border border-[#610b0c] text-[#610b0c] px-6 py-3 rounded-xl text-lg font-medium hover:bg-[#610b0c] hover:text-white transition-all duration-300">
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Animated Phone Section */}
      <div className="relative md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        {/* Floating Shopping Icons */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
          className="absolute top-10 left-10 text-[#610b0c]"
        >
          <ShoppingBag size={40} />
        </motion.div>

        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 20 }}
          transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
          className="absolute top-32 right-16 text-[#610b0c]"
        >
          <Tag size={36} />
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: -20 }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            repeatType: "reverse",
          }}
          className="absolute bottom-20 left-20 text-[#610b0c]"
        >
          <CreditCard size={38} />
        </motion.div>

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute bottom-10 right-20 text-[#610b0c]"
        >
          <Box size={34} />
        </motion.div>

        {/* iPhone Frame with Slant to the RIGHT + Animation */}
        <motion.div
          initial={{ rotate: 10, y: 0 }}
          animate={{ rotate: 5, y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          whileHover={{
            rotate: 2,
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          className="relative w-[240px] h-[500px] bg-black rounded-[3rem] border-[6px] border-gray-800 overflow-hidden shadow-2xl"
        >
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-3xl z-20"></div>
          {/* Inner Screen Placeholder */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <img
              src={screenshot}
              alt="Seller Dashboard Screenshot"
              className="max-w-full max-h-full rounded-[2.5rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
