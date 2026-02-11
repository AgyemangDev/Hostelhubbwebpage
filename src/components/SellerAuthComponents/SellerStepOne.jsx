import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, Building2, MapPin, Briefcase } from "lucide-react";

const SellerStepOne = ({ formData, handleInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal & Business Information</h2>
        <p className="text-gray-600">Tell us about yourself and your business</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
                placeholder="+233 XX XXX XXXX"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Business Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInputChange({ target: { name: "businessType", value: "personal" } })}
              className={`p-4 border-2 rounded-lg transition-all ${
                formData.businessType === "personal"
                  ? "border-[#610b0c] bg-[#610b0c]/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Briefcase className={`w-6 h-6 mx-auto mb-2 ${
                formData.businessType === "personal" ? "text-[#610b0c]" : "text-gray-400"
              }`} />
              <p className="font-medium text-sm">Personal Business</p>
              <p className="text-xs text-gray-500 mt-1">Individual owner</p>
            </button>

            <button
              type="button"
              onClick={() => handleInputChange({ target: { name: "businessType", value: "registered" } })}
              className={`p-4 border-2 rounded-lg transition-all ${
                formData.businessType === "registered"
                  ? "border-[#610b0c] bg-[#610b0c]/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Building2 className={`w-6 h-6 mx-auto mb-2 ${
                formData.businessType === "registered" ? "text-[#610b0c]" : "text-gray-400"
              }`} />
              <p className="font-medium text-sm">Registered Business</p>
              <p className="text-xs text-gray-500 mt-1">Company/LLC</p>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business/Hostel Name *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent"
              placeholder="Sunrise Hostel"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent resize-none"
              placeholder="Street address, city, region"
              rows="3"
              required
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SellerStepOne;