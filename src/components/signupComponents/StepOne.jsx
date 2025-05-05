import React from "react";

const StepOne = ({ formData, handleInputChange, isLoading }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
      <p className="text-gray-600">
        Please enter your login credentials to continue with your employee application. Ensure you already
        have an account with hostelhubb mobile application. If not, download and sign up before application
      </p>
      
      <div>
        <label className="block text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
          disabled={isLoading}
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
          disabled={isLoading}
          required
        />
      </div>
      
      {isLoading && (
        <div className="text-center text-sm text-gray-500">
          Verifying your credentials...
        </div>
      )}
    </div>
  );
};

export default StepOne;