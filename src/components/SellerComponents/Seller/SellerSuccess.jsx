import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Home, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Application Submitted Successfully!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          Thank you for applying to become a seller on HostelHubb. Your
          application is now under review by our verification team.
        </motion.p>

        {/* Info Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              What's Next?
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                • Our team will review your application within 2-3 business days
              </li>
              <li>
                • You'll receive an email notification once your account is
                approved
              </li>
              <li>
                • After approval, you can access your seller dashboard and start
                listing
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-amber-900 mb-2">Important:</h3>
            <p className="text-sm text-amber-800">
              Please keep your email and phone accessible. We may contact you if
              we need additional information or clarification on your documents.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>

          <button
            onClick={() =>
              (window.location.href = "mailto:support@hostelhubb.com")
            }
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-[#610b0c] hover:text-[#610b0c] transition-all font-semibold"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SellerSuccess;
