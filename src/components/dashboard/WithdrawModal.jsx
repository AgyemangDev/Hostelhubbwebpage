"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, DollarSign, Loader2 } from "lucide-react";



const WithdrawModal = ({
  isOpen,
  onClose,
  availableBalance,
  currency = "GHC",
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = () => {
    const amt = Number.parseFloat(withdrawAmount);
    if (!amt || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amt > availableBalance) {
      alert("Withdrawal amount cannot exceed your available balance");
      return;
    }

    setIsWithdrawing(true);

    // Simulate API call
    setTimeout(() => {
      setIsWithdrawing(false);
      alert(`Withdrawal initiated for ${currency} ${amt.toFixed(2)}`);
      setWithdrawAmount("");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => !isWithdrawing && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#610b0c]" />
                Withdraw Earnings
              </h3>
              <button
                onClick={() => !isWithdrawing && onClose()}
                disabled={isWithdrawing}
                className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-4">
                Enter the amount you want to withdraw to your bank account.
              </p>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {currency}
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={isWithdrawing}
                  className="w-full border border-gray-300 rounded-lg px-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-all disabled:bg-gray-100 disabled:opacity-75"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="flex justify-between text-sm mt-3">
                <span className="text-gray-500">Available</span>
                <span className="font-medium text-gray-700">
                  {currency} {availableBalance.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isWithdrawing && onClose()}
                  disabled={isWithdrawing}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="flex-1 py-3 px-4 bg-[#610b0c] hover:bg-[#4d0909] text-white rounded-lg font-medium transition-colors shadow-md disabled:bg-[#610b0c]/70"
                >
                  {isWithdrawing ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Processing...
                    </div>
                  ) : (
                    "Withdraw"
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawModal;
