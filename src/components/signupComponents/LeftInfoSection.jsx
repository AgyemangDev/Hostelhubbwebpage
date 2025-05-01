import { motion } from "framer-motion"
import { Building, CheckCircle } from "lucide-react"

const LeftInfoSection = () => {
  return (
    <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#610b0c] to-[#8a1010] text-white p-8 justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="mb-8"
        >
          <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Building className="h-10 w-10" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">Become a HostelHubb Agent</h1>
        <p className="text-white/80 mb-6">
          Join our network of campus agents and earn commissions by helping students find their perfect accommodation.
        </p>

        {[
          "Earn commission on every successful booking",
          "Flexible working hours that fit around your studies",
          "Gain valuable experience in marketing and sales",
          "Build your professional network on campus",
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-3 mb-2">
            <div className="bg-white/10 p-2 rounded-full mt-1">
              <CheckCircle className="h-4 w-4" />
            </div>
            <p className="text-sm text-white/80">{text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default LeftInfoSection
