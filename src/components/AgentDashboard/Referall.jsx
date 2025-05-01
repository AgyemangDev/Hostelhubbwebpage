import React, { useState } from "react";
import { Share2, Users, Gift, CheckCircle } from "lucide-react";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "ABC123XYZ";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#610b0c] flex items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Refer & Earn</h1>
        <p className="text-[#610b0c]/80">
          Invite your friends and earn rewards when they join and book through your referral!
        </p>

        {/* Referral Code Box */}
        <div className="bg-[#f9f9f9] border border-[#610b0c]/20 rounded-2xl p-5 flex flex-col items-center space-y-3">
          <span className="text-sm text-[#610b0c]/60">Your Referral Code</span>
          <h2 className="text-xl font-mono font-bold bg-white px-4 py-2 border border-[#610b0c] rounded-lg">
            {referralCode}
          </h2>
          <button
            onClick={handleCopy}
            className="bg-[#610b0c] text-white px-6 py-2 rounded-full hover:opacity-90 transition flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Copied!
              </>
            ) : (
              "Copy Code"
            )}
          </button>
        </div>

        {/* Stats / Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <StatCard icon={<Users className="h-6 w-6" />} label="Referrals" value="12" />
          <StatCard icon={<Gift className="h-6 w-6" />} label="Rewards Earned" value="GHS 60" />
          <StatCard icon={<Share2 className="h-6 w-6" />} label="Shares" value="20" />
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border border-[#610b0c]/10 p-4 rounded-xl shadow-sm flex flex-col items-center space-y-1">
    <div className="text-[#610b0c]">{icon}</div>
    <p className="text-sm text-[#610b0c]/70">{label}</p>
    <h3 className="text-lg font-bold text-[#610b0c]">{value}</h3>
  </div>
);

export default Referral;
