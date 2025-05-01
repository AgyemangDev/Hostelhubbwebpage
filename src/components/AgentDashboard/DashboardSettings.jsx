"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, Mail, LogOut, AlertTriangle, X, Check, Loader2 } from "lucide-react"

export default function Settings() {
  const [agent, setAgent] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+233123456789",
        reviewState: "Under Review",
        profileImage: ""
      }
      setAgent(user)
      setFormData(user)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => {
      setAgent(prev => prev ? { ...prev, ...formData } : null)
      setIsUpdating(false)
      const toast = document.getElementById("success-toast")
      if (toast) {
        toast.classList.remove("translate-y-full", "opacity-0")
        setTimeout(() => toast.classList.add("translate-y-full", "opacity-0"), 3000)
      }
    }, 800)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
        <p className="text-gray-500">Loading your profile...</p>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 pb-4 flex flex-col sm:flex-row items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="h-24 w-24 rounded-full border-4 border-blue-100 flex items-center justify-center bg-blue-50">
              {agent.profileImage ? (
                <img src={agent.profileImage} alt={agent.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-blue-600" />
              )}
            </motion.div>
            <div className="text-center sm:text-left flex-1 space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">{agent.name}</h2>
              <div className="flex items-center gap-2 text-gray-500"><Mail className="h-4 w-4" />{agent.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Phone className="h-4 w-4" />{agent.phone}</div>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border">{agent.reviewState}</div>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="p-6">
            <form onSubmit={handleUpdate} className="space-y-6">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Your ${field}`}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isUpdating}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
                  isUpdating ? "bg-[#610b0c] " : "bg-[#610b0c] hover:opacity-50%"
                }`}
              >
                {isUpdating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</> : "Update Profile"}
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button onClick={() => setDeleteModalOpen(true)} className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">Delete Account</button>
            <button onClick={() => window.location.href = "/login"} className="w-full sm:w-auto ml-auto px-4 py-2 border text-gray-700 rounded-md flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" />Logout
            </button>
          </div>
        </div>
      </motion.div>

      <div id="success-toast" className="fixed bottom-4 right-4 bg-green-100 border text-green-800 px-4 py-3 rounded-lg shadow-lg translate-y-full opacity-0 transition-all duration-300 flex items-center gap-2">
        <Check className="h-5 w-5" /> Profile updated successfully!
      </div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setDeleteModalOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-full"><AlertTriangle className="h-6 w-6 text-red-600" /></div><h3 className="text-xl font-semibold">Delete Account</h3></div>
                <button onClick={() => setDeleteModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="h-5 w-5 text-gray-500" /></button>
              </div>
              <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 border rounded-md text-gray-700">Cancel</button>
                <button onClick={() => { alert("Account deleted."); window.location.href = "/" }} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
