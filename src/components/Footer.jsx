import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-br from-[#610b0c] to-gray-900 text-gray-300 py-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 space-y-6 sm:space-y-0">
        {/* Brand */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg font-semibold tracking-wide text-white"
        >
          HostelHubb
        </motion.div>

        {/* Social Icons with Hover Animations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex space-x-6"
        >
          {/* Social Links */}
          <motion.a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-gray-300"
            whileHover={{
              color: "#4267B2",
              scale: 1.2,
              boxShadow: "0px 4px 10px rgba(66, 103, 178, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaFacebookF size={20} />
          </motion.a>

          <motion.a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-gray-300"
            whileHover={{
              color: "#1DA1F2",
              scale: 1.2,
              boxShadow: "0px 4px 10px rgba(29, 161, 242, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaTwitter size={20} />
          </motion.a>

          <motion.a
            href="https://instagram.com"
            aria-label="Instagram"
            className="text-gray-300"
            whileHover={{
              color: "#E1306C",
              scale: 1.2,
              boxShadow: "0px 4px 10px rgba(225, 48, 108, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaInstagram size={20} />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="text-gray-300"
            whileHover={{
              color: "#0077B5",
              scale: 1.2,
              boxShadow: "0px 4px 10px rgba(0, 119, 181, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaLinkedinIn size={20} />
          </motion.a>
        </motion.div>

        {/* Terms and Conditions Link and Copyright */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xs text-gray-400 text-center sm:text-left space-y-2"
        >
          <p>© 2024 HostelHubb. All Rights Reserved.</p>
          <Link
            to="/terms"
            className="text-gray-300 font-bold text-sm sm:text-base hover:underline underline-offset-4 decoration-wine-500"
            style={{ display: "block", marginTop: "5px" }}
          >
            Terms and Conditions
          </Link>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
