import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import DashboardHome from "./DashboardHome";

const AgentDashboard = () => {
  // Mock referral code since we can't use router
  const [referralCode] = useState("REF123");

  return (
    <div className="bg-gradient-to-br from-white to-red-50 text-gray-800 min-h-screen p-6">
      <div className="mb-6 text-sm text-[#610b0c] font-medium">
        Dashboard / Home
      </div>

      <div className="mb-8 bg-gradient-to-r from-white to-red-50 rounded-xl p-6 shadow-lg border border-red-200">
        <h2 className="text-2xl text-[#610b0c] font-bold mb-2">
          Welcome to your Agent Dashboard
        </h2>
        <p className="text-[#610b0c] mb-4">
          Your referral code:{" "}
          <span className="bg-[#610b0c] text-white px-2 py-1 rounded font-mono">
            {referralCode}
          </span>
        </p>

        <div className="flex items-center space-x-2">
          <button className="bg-white text-[#610b0c] border border-[#610b0c] hover:text-white hover:bg-[#610b0c] py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center">
            <ExternalLink size={14} className="mr-1" />
            Share your link
          </button>
          <button className="bg-[#610b0c] text-white hover:bg-red-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            View performance
          </button>
        </div>
      </div>

      <DashboardHome userId="001" referralCode={referralCode} />
    </div>
  );
};

export default AgentDashboard;
