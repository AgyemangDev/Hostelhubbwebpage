import React from "react";
import { Link } from "react-router-dom";

const AgentApplicationFailure = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Application Unsuccessful</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Unfortunately, your application was not successful this time. You can try again in the future.
      </p>
      <Link to="/" className="text-[#610b0c] underline">Return to Home</Link>
    </div>
  );
};

export default AgentApplicationFailure;
