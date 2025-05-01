import { motion } from "framer-motion"

const ProgressBar = ({ currentStep }) => {
  const stepTitles = ["Personal Information", "Academic Details", "Document Upload"]
  const percentage = (currentStep / 3) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
        <span className="text-sm text-gray-500">{stepTitles[currentStep - 1]}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
          className="bg-[#610b0c] h-2 rounded-full"
        />
      </div>
    </div>
  )
}

export default ProgressBar
