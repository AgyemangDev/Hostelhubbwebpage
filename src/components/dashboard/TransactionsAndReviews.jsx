"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Filter,
  DollarSign,
  ChevronRight,
  MessageSquare,
  Star,
  Clock,
} from "lucide-react";
import StarRating from "./StarRating";

const TransactionsAndReviews = ({
  currency = "GHC",
  user,
}) => {
  const [activeTab, setActiveTab] = useState("transactions");
  const transactions = []
const reviews = Array.isArray(user.reviews) ? user.reviews : [];
  const isHostelAgent = user?.department === "Hostel Agent";

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors ${
              activeTab === "transactions"
                ? "text-[#610b0c] border-b-2 border-[#610b0c]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Transactions
          </button>

          {isHostelAgent && (
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors ${
                activeTab === "reviews"
                  ? "text-[#610b0c] border-b-2 border-[#610b0c]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "transactions" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <Calendar className="h-5 w-5 text-[#610b0c]" />
                  Recent Transactions
                </h2>
                <button className="text-sm text-[#610b0c] flex items-center gap-1 hover:underline">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>

              <div className="space-y-1">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{
                      backgroundColor: "rgba(97, 11, 12, 0.05)",
                    }}
                    className="flex justify-between items-center p-3 rounded-lg border-b border-gray-100 hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#610b0c]/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-[#610b0c]" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          Booking Commission
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800">
                        {currency} {transaction.amount.toFixed(2)}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 text-[#610b0c] font-medium border border-[#610b0c]/20 rounded-lg hover:bg-[#610b0c]/5 transition-colors"
              >
                View All Transactions
              </motion.button>
            </div>
          )}

          {activeTab === "reviews" && isHostelAgent && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                  <MessageSquare className="h-5 w-5 text-[#610b0c]" />
                  Client Reviews
                </h2>
                <div className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {averageRating.toFixed(1)} Average
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="p-4 border border-gray-100 rounded-lg hover:border-red-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">
                        {review.name}
                      </h3>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {review.comment}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {review.date}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-3 text-[#610b0c] font-medium border border-[#610b0c]/20 rounded-lg hover:bg-[#610b0c]/5 transition-colors"
              >
                View All Reviews
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionsAndReviews;
