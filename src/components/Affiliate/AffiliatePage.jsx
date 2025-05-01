"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import LeftInfoSection from "../signupComponents/LeftInfoSection"
import ProgressBar from "../signupComponents/ProgressBar"
import StepOne from "../signupComponents/StepOne"
import StepTwo from "../signupComponents/StepTwo"
import StepThree from "../signupComponents/StepThree"

const AffiliatePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    startDate: "",
    endDate: "",
    currentYear: "",
    passportPhoto: null,
    idCardPhoto: null,
  })

  const [passportPhotoName, setPassportPhotoName] = useState("")
  const [idCardPhotoName, setIdCardPhotoName] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))
      name === "passportPhoto"
        ? setPassportPhotoName(files[0].name)
        : setIdCardPhotoName(files[0].name)
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/affiliate-success")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LeftInfoSection />
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl"
        >
          <ProgressBar currentStep={currentStep} />

          <form onSubmit={handleSubmit} className="space-y-5">
            {currentStep === 1 && (
              <StepOne formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 2 && (
              <StepTwo formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 3 && (
              <StepThree
                formData={formData}
                handleFileChange={handleFileChange}
                passportPhotoName={passportPhotoName}
                idCardPhotoName={idCardPhotoName}
              />
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-gray-600 hover:text-[#610b0c]"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#610b0c] text-white px-6 py-2 rounded-lg hover:bg-[#4e090a] transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#610b0c] text-white px-6 py-2 rounded-lg hover:bg-[#4e090a] transition"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AffiliatePage
