"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import LeftInfoSection from "../signupComponents/LeftInfoSection"
import ProgressBar from "../signupComponents/ProgressBar"
import StepOne from "../signupComponents/StepOne"
import StepTwo from "../signupComponents/StepTwo"
import StepFour from "../signupComponents/StepFour"
import StepThree from "../signupComponents/StepThree"
import { useFirebaseEmployeeApplication } from "../../assets/hooks/useFirebaseEmployeeApplication"

const AffiliatePage = () => {
  const { isSubmitting, userData, handleApplication, submitEmployeeApplication } = useFirebaseEmployeeApplication();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    program: "",
    startYear: "",
    department: "",
    expectations: "",
    endYear: "",
    schoolIdPhoto: null,
    nationalIdPhoto: null,
  })
  const [schoolIdPhotoName, setSchoolIdPhotoName] = useState("")
  const [nationalIdPhotoName, setNationalIdPhotoName] = useState("")
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleFileChange = (e) => {
    const { name, files } = e.target;
 
    if (name === "schoolIdPhoto") {
      setSchoolIdPhotoName(files[0].name);
      setFormData((prev) => ({
        ...prev,
        schoolIdPhoto: files[0],
      }));
    } else if (name === "nationalIdPhoto") {
      setNationalIdPhotoName(files[0].name);
      setFormData((prev) => ({
        ...prev,
        nationalIdPhoto: files[0],
      }));
    }
  }
  
  const validateStep = () => {
    if (currentStep === 1) {
      return formData.email.trim() && formData.password.trim();
    }
    if (currentStep === 2) {
      return formData.program.trim() && formData.startYear.trim() && formData.endYear.trim();
    }
    if (currentStep === 3) {
      return formData.department && formData.expectations.trim();
    }
   
    if (currentStep === 4) {
      // Check if both schoolIdPhoto and nationalIdPhoto are selected
      return formData.schoolIdPhoto && formData.nationalIdPhoto;
    }
    return false;
  }
  
  const nextStep = async () => {
    if (!validateStep()) {
      alert("Please complete all required fields before continuing.");
      return;
    }
 
    // Only run email/password verification in Step 1
    if (currentStep === 1) {
      setIsLoading(true);
      try {
        const result = await handleApplication(formData.email, formData.password);
        
        if (result && result.name) {
          alert(`Logged in as ${result.name}`);
          setCurrentStep((prev) => prev + 1);
          window.scrollTo(0, 0);
        } else {
          alert("Authentication failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Authentication failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
      return;
    }
 
    // For steps 2 to 4
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      alert("Please upload both documents before submitting.");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Starting employee application submission...");
      // Submit employee application with form data
      await submitEmployeeApplication({
        program: formData.program,
        startYear: formData.startYear,
        endYear: formData.endYear,
        department: formData.department,
        expectations: formData.expectations,
        schoolIdPhoto: formData.schoolIdPhoto,
        nationalIdPhoto: formData.nationalIdPhoto,
      });
      
      console.log("Application submitted successfully!");
      // Navigate to success page after successful submission
      navigate("/affiliate-success");
    } catch (error) {
      console.error("Submission error:", error);
      // Show more specific error message
      if (error.message.includes("Unsupported field value")) {
        alert("There was an issue with the file uploads. Please try again with smaller image files.");
      } else {
        alert("Failed to submit application: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
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
              <StepOne
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                isLoading={isLoading}
              />
            )}
            {currentStep === 2 && (
              <StepTwo formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 3 && (
              <StepThree formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 4 && (
              <StepFour
                formData={formData}
                handleFileChange={handleFileChange}
                schoolIdPhotoName={schoolIdPhotoName}
                nationalIdPhotoName={nationalIdPhotoName}
              />
            )}
            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-gray-600 hover:text-[#610b0c]"
                  disabled={isLoading}
                >
                  Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`bg-[#610b0c] text-white px-6 py-2 rounded-lg hover:bg-[#4e090a] transition ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading && currentStep === 1 ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Next"
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep() || isLoading}
                  className={`bg-[#610b0c] text-white px-6 py-2 rounded-lg hover:bg-[#4e090a] transition ${
                    (!validateStep() || isLoading) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliatePage;