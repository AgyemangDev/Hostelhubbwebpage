"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, User, Loader2, EyeOff, Eye, ChevronRight, Shield, File, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    setIsLoading(true)

    // Simulate login logic with delay
    setTimeout(() => {
      setIsLoading(false)
      alert(`Logged in as ${email}`)
      setEmail("")
      setPassword("")

      // Navigate to agent dashboard
      navigate("/agent-dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Brand/Logo area */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#610b0c] to-[#8a1010] text-white p-8 justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
            }}
            className="mb-6 mx-auto"
          >
            <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-white/80">
            Log in to your account to access your dashboard, manage your settings, and view your activity.
          </p>
        </motion.div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          {/* Mobile logo - only visible on mobile */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="md:hidden flex justify-center mb-6"
          >
            <div className="h-16 w-16 bg-[#610b0c]/10 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-[#610b0c]" />
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold mb-2 text-gray-800">Login</h2>
          <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

          {/* email Input */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-[#610b0c] focus:ring-[#610b0c] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="text-sm font-medium text-[#610b0c] hover:text-[#4d0909]">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 px-4 flex items-center justify-center text-white font-semibold rounded-lg shadow-md transition-all ${
              isLoading ? "bg-[#610b0c]/70" : "bg-[#610b0c] hover:bg-[#4d0909]"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </motion.button>

          {/* Sign up option */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? Download Hostelhubb app and create an account.
             
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
