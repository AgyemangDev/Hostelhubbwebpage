import React from "react";
import { Link } from "react-router-dom";

const AffiliateSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Application Submitted!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Thank you for applying! Our team will review your application and contact you shortly.
      </p>
      <Link to="/agent-dashboard" className="text-[#610b0c] underline">Return to Home</Link>
    </div>
  );
};

export default AffiliateSuccess;
