"use client"

import { useState } from "react"
import {
  Wallet,
  ArrowDownCircle,
  Calendar,
  DollarSign,
  X,
  TrendingUp,
  CreditCard,
  ChevronRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Earnings = () => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [earnings] = useState([
    { id: 1, date: "Apr 30, 2025", amount: 120 },
    { id: 2, date: "Apr 25, 2025", amount: 90 },
    { id: 3, date: "Apr 20, 2025", amount: 75 },
  ])

  const total = earnings.reduce((sum, e) => sum + e.amount, 0)

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount)
    if (!amt || amt <= 0) return alert("Enter a valid amount")
    alert(`Withdrawal initiated for GHC ${amt.toFixed(2)}`)
    setWithdrawAmount("")
    setWithdrawModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Your <span className="text-[#610b0c]">Earnings</span>
        </h1>
        <button
          onClick={() => setWithdrawModalOpen(true)}
          className="flex items-center gap-2 bg-[#610b0c] hover:bg-[#4d0909] text-white py-2 px-4 rounded-lg shadow"
        >
          <CreditCard className="h-4 w-4" />
          Withdraw
        </button>
      </div>

      {/* Total Earnings */}
      <div className="bg-[#610b0c] text-white p-6 rounded-2xl mb-6 relative overflow-hidden shadow">
        <div className="flex justify-between">
          <div>
            <p className="flex items-center gap-2 text-white/80">
              <Wallet className="h-4 w-4" />
              Total Earnings
            </p>
            <p className="text-4xl font-bold mt-2">GHC {total.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
        <p className="mt-4 text-sm text-white/70 flex items-center gap-1">
          <ArrowDownCircle className="h-4 w-4" />
          Last withdrawal: Apr 15, 2025
        </p>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Calendar className="h-5 w-5 text-[#610b0c]" />
          Recent Earnings
        </h2>
        {earnings.map((entry) => (
          <div key={entry.id} className="flex justify-between items-center py-2 border-b last:border-none">
            <div className="flex items-center gap-3">
              <div className="bg-[#610b0c]/10 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-[#610b0c]" />
              </div>
              <span className="text-gray-700">{entry.date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800">GHC {entry.amount.toFixed(2)}</span>
              <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </div>
        ))}
        <button className="w-full mt-6 py-3 text-[#610b0c] font-medium border border-[#610b0c]/20 rounded-lg hover:bg-[#610b0c]/5">
          View All Transactions
        </button>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {withdrawModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setWithdrawModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#610b0c]" />
                  Withdraw
                </h3>
                <button onClick={() => setWithdrawModalOpen(false)} className="hover:bg-gray-100 p-1 rounded-full">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Enter the amount you want to withdraw to your bank account.
              </p>
              <div className="relative mb-4">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">GHC</div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full border text-black px-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Available</span>
                <span className="font-medium">GHC {total.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setWithdrawModalOpen(false)}
                  className="flex-1 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex-1 py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#4d0909]"
                >
                  Withdraw
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Earnings
