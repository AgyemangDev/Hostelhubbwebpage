import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { loginUser } from "../../firebase/auth"; // ✅ import our login function

export const useFirebaseSellerApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sellerData, setSellerData] = useState(null);

  /**
   * Step 1: Authenticate user (using email + password)
   * Step 2: Create seller application record in Firestore
   */
  const submitSellerApplication = async (formData) => {
    setIsSubmitting(true);
    try {
      // ✅ Step 1: Log in user from the "users" collection (mobile app account)
      const user = await loginUser(formData.email, formData.password);

      if (!user?.uid) {
        throw new Error(
          "Login failed. Please sign up in the HostelHubb mobile app first.",
        );
      }

      // ✅ Step 2: Prepare seller application data
      const sellerApplicationData = {
        uid: user.uid,
        fullName: formData.fullName || user.fullName || "",
        email: user.email || formData.email,
        phone: formData.phone || user.phone || "",
        businessType: formData.businessType,
        businessName: formData.businessName,
        businessAddress: formData.businessAddress,
        status: "pending",
        role: "seller",
        isVerified: false,
        appliedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // ✅ Step 3: Create Firestore record in Seller_Applications
      await setDoc(
        doc(db, "Seller_Applications", user.uid),
        sellerApplicationData,
      );

      // ✅ Step 4: Store locally
      setSellerData({
        uid: user.uid,
        ...sellerApplicationData,
      });

      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error("❌ Error submitting seller application:", error.message);
      setIsSubmitting(false);
      throw error;
    }
  };

  return {
    isSubmitting,
    sellerData,
    submitSellerApplication,
  };
};
