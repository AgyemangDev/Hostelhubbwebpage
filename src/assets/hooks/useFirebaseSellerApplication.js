import { useState } from "react";
import { storage, db } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useFirebaseSellerApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSellerApplication = async (formData) => {
    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("User not authenticated");

      // ✅ Validate required fields
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
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // If businessType is registered, require businessRegistration
      if (formData.businessType === "registered" && !formData.businessRegistration) {
        throw new Error("Business registration document is required for registered businesses");
      }

      // If businessType is personal, proofOfOwnership is recommended but optional
      if (formData.businessType === "personal" && !formData.proofOfOwnership) {
        console.warn("Proof of ownership skipped for personal business");
      }

      // ✅ Helper to upload file and return its URL
      const uploadFile = async (file, path) => {
        if (!file) return null;
        const storageRef = ref(storage, `${path}/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      // ✅ Upload files
      const ghanaCardFrontUrl = await uploadFile(formData.ghanaCardFront, "seller_docs");
      const ghanaCardBackUrl = await uploadFile(formData.ghanaCardBack, "seller_docs");
      const proofOfOwnershipUrl = await uploadFile(formData.proofOfOwnership, "seller_docs");
      const businessRegistrationUrl = await uploadFile(formData.businessRegistration, "seller_docs");

      // ✅ Save to Seller_Applications
      const sellerRef = doc(db, "Seller_Applications", user.uid);
      await setDoc(sellerRef, {
        ...formData,
        uid: user.uid,
        ghanaCardFront: ghanaCardFrontUrl,
        ghanaCardBack: ghanaCardBackUrl,
        proofOfOwnership: proofOfOwnershipUrl,
        businessRegistration: businessRegistrationUrl,
        createdAt: serverTimestamp(),
        status: "pending", // for admin review
      });

      // ✅ Update Student_Users to track business application
      const studentRef = doc(db, "Student_Users", user.uid);
      await setDoc(studentRef, { isBusinessAccepted: false }, { merge: true });

      setIsSubmitting(false);
      return true;

    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      throw error;
    }
  };

  return { isSubmitting, submitSellerApplication };
};

