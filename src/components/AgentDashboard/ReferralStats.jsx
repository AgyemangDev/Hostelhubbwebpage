"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Wallet,
  ArrowDownCircle,
  CreditCard,
  ChevronRight,
  X,
  Star,
  MessageSquare,
  Clock,
  Filter,
  Loader2,
} from "lucide-react";

const Dashboard = () => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");

  // Mock data
  const stats = {
    totalReferrals: 48,
    previousReferrals: 36,
    conversions: 12,
    previousConversions: 8,
    earnings: 180.0,
    previousEarnings: 120.0,
    currency: "GHC",
  };

  // Calculate percentage changes
  const referralChange =
    ((stats.totalReferrals - stats.previousReferrals) /
      stats.previousReferrals) *
    100;
  const conversionChange =
    ((stats.conversions - stats.previousConversions) /
      stats.previousConversions) *
    100;
  const earningsChange =
    ((stats.earnings - stats.previousEarnings) / stats.previousEarnings) * 100;

  const [transactions] = useState([
    { id: 1, date: "Apr 30, 2025", amount: 120, status: "completed" },
    { id: 2, date: "Apr 25, 2025", amount: 90, status: "completed" },
    { id: 3, date: "Apr 20, 2025", amount: 75, status: "completed" },
    { id: 4, date: "Apr 15, 2025", amount: 60, status: "completed" },
    { id: 5, date: "Apr 10, 2025", amount: 45, status: "completed" },
  ]);

  const [reviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      date: "May 2, 2025",
      rating: 5,
      comment:
        "The agent was incredibly helpful and found me the perfect hostel near campus. Highly recommend!",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "Apr 28, 2025",
      rating: 4,
      comment:
        "Great service and quick responses. The hostel was exactly as described.",
    },
    {
      id: 3,
      name: "Priya Patel",
      date: "Apr 22, 2025",
      rating: 5,
      comment:
        "Made my transition to university so much easier. Thank you for finding me affordable accommodation!",
    },
    {
      id: 4,
      name: "James Wilson",
      date: "Apr 15, 2025",
      rating: 4,
      comment: "Very professional service. Would use again next semester.",
    },
  ]);

  const total = transactions.reduce((sum, entry) => sum + entry.amount, 0);

  const handleWithdraw = () => {
    const amt = Number.parseFloat(withdrawAmount);
    if (!amt || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amt > total) {
      alert("Withdrawal amount cannot exceed your available balance");
      return;
    }

    setIsWithdrawing(true);

    // Simulate API call
    setTimeout(() => {
      setIsWithdrawing(false);
      alert(`Withdrawal initiated for GHC ${amt.toFixed(2)}`);
      setWithdrawAmount("");
      setWithdrawModalOpen(false);
    }, 1500);
  };

  // Simplified StatCard component
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

  // Render star ratings
  const renderStars = (rating) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Agent <span className="text-[#610b0c]">Dashboard</span>
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Successful Bookings"
            value={stats.totalReferrals}
            change={referralChange}
            icon={<Users size={24} />}
          />
          <StatCard
            title="Successful Withdrawals"
            value={stats.conversions}
            change={conversionChange}
            icon={<ShoppingCart size={24} />}
          />
          <StatCard
            title="Total Earnings"
            value={stats.earnings}
            change={earningsChange}
            prefix={stats.currency + " "}
            icon={<DollarSign size={24} />}
          />
        </div>

        {/* Earnings and Transactions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Earnings Card */}
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
                onClick={() => setWithdrawModalOpen(true)}
                className="w-full py-3 bg-white text-[#610b0c] font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Withdraw Now
              </motion.button>
            </div>
          </motion.div>

          {/* Transactions and Reviews Tabs */}
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
                              GHC {transaction.amount.toFixed(2)}
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

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                        <MessageSquare className="h-5 w-5 text-[#610b0c]" />
                        Client Reviews
                      </h2>
                      <div className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        4.8 Average
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
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
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
        </div>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {withdrawModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => !isWithdrawing && setWithdrawModalOpen(false)}
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
                  onClick={() => !isWithdrawing && setWithdrawModalOpen(false)}
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
                    GHC
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
                    GHC {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      !isWithdrawing && setWithdrawModalOpen(false)
                    }
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
    </div>
  );
};

export default Dashboard;
