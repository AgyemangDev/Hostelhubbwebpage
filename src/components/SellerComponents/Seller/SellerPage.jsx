"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SellerLeftInfo from "../../SellerAuthComponents/SellerLeftInfo";
import SellerProgressBar from "../../SellerAuthComponents/SellerProgressBar";
import SellerStepOne from "../../SellerAuthComponents/SellerStepOne";
import SellerStepTwo from "../../SellerAuthComponents/SellerStepTwo";
import { loginUser } from "../../../firebase/auth";
import { useFirebaseSellerApplication } from "../../../assets/hooks/useFirebaseSellerApplication";

const SellerSignupPage = () => {
  const navigate = useNavigate();
  const { isSubmitting, submitSellerApplication } =
    useFirebaseSellerApplication();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessType: "",
    businessName: "",
    businessAddress: "",
    ghanaCardFront: null,
    ghanaCardBack: null,
    businessRegistration: null,
    proofOfOwnership: null,
  });
  const [fileNames, setFileNames] = useState({
    ghanaCardFront: "",
    ghanaCardBack: "",
    businessRegistration: "",
    proofOfOwnership: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileNames((prev) => ({ ...prev, [name]: files[0].name }));
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Step 1 validation (login)
  const handleLoginStep = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const user = await loginUser(email, password);
      if (user?.uid) {
        setFormData((prev) => ({ ...prev, uid: user.uid }));
        setCurrentStep(2);
      } else {
        alert("Invalid credentials. Please sign up in the mobile app first.");
      }
    } catch (error) {
      alert(
        "Invalid login. Please sign up in the HostelHubb mobile app first.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 validation (documents)
  const validateStepTwo = () => {
    const {
      ghanaCardFront,
      ghanaCardBack,
      businessType,
      businessRegistration,
      proofOfOwnership,
    } = formData;

    if (!ghanaCardFront || !ghanaCardBack) {
      alert("Please upload both sides of your Ghana Card.");
      return false;
    }

    if (businessType === "registered" && !businessRegistration) {
      alert(
        "Business registration document is required for registered businesses.",
      );
      return false;
    }

    if (businessType === "personal" && !proofOfOwnership) {
      // Optional: Warn but not block
      console.warn("Proof of ownership skipped (personal business).");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStepTwo()) return;

    setIsLoading(true);
    try {
      await submitSellerApplication(formData);
      navigate("/seller-success");
    } catch (error) {
      alert("Failed to submit application: " + error.message);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#610b0c]">
                  Login with your HostelHubb Account
                </h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="button"
                  onClick={handleLoginStep}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  {isLoading ? "Verifying..." : "Next →"}
                </button>

                <p className="text-sm text-gray-600">
                  Don’t have an account? Sign up on the HostelHubb mobile app
                  first.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <SellerStepTwo
                formData={formData}
                handleFileChange={handleFileChange}
                handleInputChange={handleInputChange}
                fileNames={fileNames}
              />
            )}

            {currentStep === 2 && (
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-gray-600 hover:text-[#610b0c] font-medium"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto bg-gradient-to-r from-[#610b0c] to-[#8b1214] text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all font-semibold"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerSignupPage;
