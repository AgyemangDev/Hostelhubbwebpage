import React from "react";
import { Link } from "react-router-dom";

const AgentApplicationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600">You're Approved!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Welcome to the HostelHubb affiliate program. Start managing your referrals and earnings now.
      </p>
      <Link to="/agent-dashboard" className="bg-[#610b0c] text-white py-2 px-4 rounded hover:bg-[#49090a]">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default AgentApplicationSuccess;
