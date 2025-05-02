"use client"

import { motion } from "framer-motion"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const StepOne = ({ formData, handleInputChange, nextStep }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Step 1: Login Info</h2>
      <p className="text-gray-500 mb-6">Login with your Hostelhubb Account details</p>

      {/* Email input */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Password input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password || ""}
            onChange={handleInputChange}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Next Button
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={nextStep}
        className="w-full py-3 px-4 flex items-center justify-center text-white font-semibold rounded-lg shadow-md bg-[#610b0c] hover:bg-[#4d0909] transition-all"
      >
        Next
      </motion.button> */}
    </div>
  )
}

export default StepOne
