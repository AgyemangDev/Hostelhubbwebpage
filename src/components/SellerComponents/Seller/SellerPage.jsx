"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SellerLeftInfo from "../../SellerAuthComponents/SellerLeftInfo";
import SellerProgressBar from "../../SellerAuthComponents/SellerProgressBar";
import SellerStepOne from "../../SellerAuthComponents/SellerStepOne";
import SellerStepTwo from "../../SellerAuthComponents/SellerStepTwo";
import { useFirebaseSellerApplication } from "../../../assets/hooks/useFirebaseSellerApplication";

const SellerSignupPage = () => {
  const { isSubmitting, submitSellerApplication } =
    useFirebaseSellerApplication();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal & Business Information
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessType: "", // personal or registered
    businessName: "",
    businessAddress: "",

    // Step 2: Verification Documents
    ghanaCardFront: null,
    ghanaCardBack: null,
    businessRegistration: null, // Optional - only for registered businesses
    proofOfOwnership: null, // Property ownership documents
  });

  const [fileNames, setFileNames] = useState({
    ghanaCardFront: "",
    ghanaCardBack: "",
    businessRegistration: "",
    proofOfOwnership: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      const {
        fullName,
        email,
        phone,
        password,
        confirmPassword,
        businessType,
        businessName,
        businessAddress,
      } = formData;

      if (
        !fullName.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !password.trim()
      ) {
        alert("Please fill in all personal information fields.");
        return false;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return false;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return false;
      }

      if (!businessType) {
        alert("Please select your business type.");
        return false;
      }

      if (!businessName.trim() || !businessAddress.trim()) {
        alert("Please fill in all business information fields.");
        return false;
      }

      return true;
    }

    if (currentStep === 2) {
      const {
        ghanaCardFront,
        ghanaCardBack,
        proofOfOwnership,
        businessType,
        businessRegistration,
      } = formData;

      // Ghana Card (both sides) and Proof of Ownership are mandatory
      if (!ghanaCardFront || !ghanaCardBack) {
        alert("Please upload both sides of your Ghana Card.");
        return false;
      }

      if (!proofOfOwnership) {
        alert("Please upload proof of property ownership.");
        return false;
      }

      // Business Registration is mandatory only for registered businesses
      if (businessType === "registered" && !businessRegistration) {
        alert("Please upload your business registration certificate.");
        return false;
      }

      return true;
    }

    return false;
  };

  const nextStep = () => {
    if (!validateStep()) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      return;
    }

    setIsLoading(true);
    try {
      console.log("Starting seller application submission...");

      await submitSellerApplication(formData);

      console.log("Application submitted successfully!");
      navigate("/seller-success");
    } catch (error) {
      console.error("Submission error:", error);
      if (error.message.includes("email-already-in-use")) {
        alert(
          "This email is already registered. Please use a different email or login.",
        );
      } else if (error.message.includes("weak-password")) {
        alert("Password should be at least 6 characters long.");
      } else {
        alert("Failed to submit application: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SellerLeftInfo />

      <div className="w-full md:w-3/5 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl"
        >
          <SellerProgressBar currentStep={currentStep} totalSteps={2} />

          <form onSubmit={handleSubmit} className="space-y-5">
            {currentStep === 1 && (
              <SellerStepOne
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {currentStep === 2 && (
              <SellerStepTwo
                formData={formData}
                handleFileChange={handleFileChange}
                fileNames={fileNames}
              />
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="text-gray-600 hover:text-[#610b0c] font-medium transition-colors"
                  disabled={isLoading}
                >
                  ← Back
                </button>
              )}

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`ml-auto bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all font-semibold ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!validateStep() || isLoading}
                  className={`ml-auto bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all font-semibold ${
                    !validateStep() || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
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

export default SellerSignupPage;
