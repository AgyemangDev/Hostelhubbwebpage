import { useState } from "react";
import { registerUser } from "../../firebase/auth";
import { createSellerApplication } from "../../firebase/firestore";

export const useFirebaseSellerApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  const submitSellerApplication = async (formData) => {
    setIsSubmitting(true);
    try {
      // Step 1: Register the user with email and password
      const user = await registerUser(formData.email, formData.password);
      
      if (!user || !user.uid) {
        throw new Error("User registration failed");
      }

      // Step 2: Prepare seller application data
      const sellerApplicationData = {
        // Personal Information
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        
        // Business Information
        businessType: formData.businessType, // "personal" or "registered"
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
        
        // Application Status
        applicationStatus: "pending", // pending, approved, rejected
        isVerified: false,
        role: "seller",
        
        // Timestamps
        appliedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // Step 3: Upload documents and create seller application
      await createSellerApplication(
        user.uid, 
        sellerApplicationData, 
        {
          ghanaCardFront: formData.ghanaCardFront,
          ghanaCardBack: formData.ghanaCardBack,
          proofOfOwnership: formData.proofOfOwnership,
          businessRegistration: formData.businessType === "registered" ? formData.businessRegistration : null,
        }
      );

      // Store seller data
      setSellerData({
        uid: user.uid,
        ...sellerApplicationData
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error("Error submitting seller application:", error);
      setIsSubmitting(false);
      throw error;
    }
  };

  return {
    isSubmitting,
    sellerData,
    submitSellerApplication
  };
};