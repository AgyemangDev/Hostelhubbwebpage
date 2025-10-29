"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SellerLeftInfo from "../../SellerAuthComponents/SellerLeftInfo";
import SellerProgressBar from "../../SellerAuthComponents/SellerProgressBar";
import SellerStepTwo from "../../SellerAuthComponents/SellerStepTwo";
import { loginUser } from "../../../firebase/auth";
import { db } from "../../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
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

  const [errors, setErrors] = useState({});

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

const fetchStudentUserData = async (uid) => {
  try {
    const docRef = doc(db, "Student_Users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Check if the user already has a business application
      if (data.isBusinessAccepted !== undefined) {
        if (data.isBusinessAccepted === false) {
          alert(
            "Your business application is still under review. Kindly contact HostelHubb support for more information."
          );
          return false; // Stop progression
        } else if (data.isBusinessAccepted === true) {
          alert(
            "You already have an active business account. Kindly log in instead."
          );
          return false; // Stop progression
        }
      }

      // Build full name
      const fullName = `${data.firstName} ${data.surname}`;

      // Update formData with fetched data
      setFormData((prev) => ({
        ...prev,
        uid: data.id,
        fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        institution: data.institution || [],
        gender: data.gender,
      }));

      return true; // Allow progression
    } else {
      console.warn("No user document found!");
      return true; // Proceed anyway
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return true; // Proceed anyway
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
      // Fetch student info from Firestore and check business status
      const canProceed = await fetchStudentUserData(user.uid);
      if (!canProceed) return; // Stop if business exists or is under review

      // Proceed to step 2
      setCurrentStep(2);
    } else {
      alert("Invalid credentials. Please sign up in the mobile app first.");
    }
  } catch (error) {
    alert(
      "Invalid login. Please sign up in the HostelHubb mobile app first."
    );
  } finally {
    setIsLoading(false);
  }
};

// Step 2 validation (documents + all required fields)
const validateStepTwo = () => {
  const requiredFields = [
    "fullName",
    "email",
    "phoneNumber",
    "businessName",
    "businessType",
    "businessAddress",
    "ghanaCardFront",
    "ghanaCardBack"
  ];

  for (const field of requiredFields) {
    if (!formData[field]) {
      alert(`Please provide ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
      return false;
    }
  }

  // Business-specific checks
  if (formData.businessType === "registered" && !formData.businessRegistration) {
    alert("Business registration document is required for registered businesses.");
    return false;
  }

  if (formData.businessType === "personal" && !formData.proofOfOwnership) {
    console.warn("Proof of ownership skipped for personal business.");
  }

  return true;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate Step 2 fields before submission
  if (!validateStepTwo()) return;

  try {
    setIsLoading(true);

    // Submit the seller application (this handles file uploads internally)
    await submitSellerApplication(formData);

    // Navigate to success page when everything is done
    navigate("/seller-success");
  } catch (error) {
    console.error("Error during submission:", error);
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
                  Don't have an account? Sign up on the HostelHubb mobile app
                  first.
                </p>
              </div>
            )}(

            {currentStep === 2 && (
              <SellerStepTwo
                formData={formData}
                handleFileChange={handleFileChange}
                handleInputChange={handleInputChange}
                fileNames={fileNames}
                errors={errors}
                setErrors={setErrors}
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
