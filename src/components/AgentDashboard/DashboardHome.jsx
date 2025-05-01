import React from "react";
import ReferralStats from "./ReferralStats";

const DashboardHome = ({ userId, token, referralCode }) => {
  return (
    <section id="home" className="bg-white rounded-xl p-6 shadow mb-6">
      <h1 className="text-3xl font-bold mb-4 text-[#610b0c]">Welcome, Agent {userId}</h1>
      <p className="mb-6 text-gray-700">
        Your Referral Code: <span className="font-mono font-semibold text-[#610b0c] bg-red-50 px-2 py-1 rounded">{referralCode}</span>
      </p>

      {/* Stats */}
      <ReferralStats />
    </section>
  );
};

export default DashboardHome;