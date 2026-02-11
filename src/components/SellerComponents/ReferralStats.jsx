"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import StatCard from "../dashboard/StatCard";
import EarningsCard from "../dashboard/EarningsCard";
import TransactionsAndReviews from "../dashboard/TransactionsAndReviews";
import WithdrawModal from "../dashboard/WithdrawModal";

// Import modular components


const ReferralStats = ({ user = {} }) => {
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

    // Safe defaults
    const stats = {
        totalReferrals: user?.totalReferal || 0,  // match your backend spelling
        conversions: 0,
        earnings: user?.balance || 0,
        currency: "GHC",
        previousReferrals: user?.previousReferrals || 0,
        previousConversions: user?.previousConversions || 0,
        previousEarnings: user?.previousEarnings || 0,
    };

    // Avoid division by 0
    const referralChange =
        stats.previousReferrals > 0
            ? ((stats.totalReferrals - stats.previousReferrals) /
                stats.previousReferrals) *
            100
            : 0;

    const conversionChange =
        stats.previousConversions > 0
            ? ((stats.conversions - stats.previousConversions) /
                stats.previousConversions) *
            100
            : 0;

    const earningsChange =
        stats.previousEarnings > 0
            ? ((stats.earnings - stats.previousEarnings) /
                stats.previousEarnings) *
            100
            : 0;


  const transactions = [
    { id: 1, date: "Apr 30, 2025", amount: 120, status: "completed" },
    { id: 2, date: "Apr 25, 2025", amount: 90, status: "completed" },
    { id: 3, date: "Apr 20, 2025", amount: 75, status: "completed" },
    { id: 4, date: "Apr 15, 2025", amount: 60, status: "completed" },
    { id: 5, date: "Apr 10, 2025", amount: 45, status: "completed" },
  ];

  const reviews = [
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
  ];

  const total = transactions.reduce((sum, entry) => sum + entry.amount, 0);

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
            title="Total Referrals"
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
          <EarningsCard onWithdrawClick={() => setWithdrawModalOpen(true)} />

          {/* Transactions and Reviews Tabs */}
          <TransactionsAndReviews
            transactions={transactions}
            reviews={reviews}
            currency={stats.currency}
            user={user}
          />
        </div>
      </div>

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        availableBalance={total}
        currency={stats.currency}
      />
    </div>
  );
};

export default ReferralStats;
