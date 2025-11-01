import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cachedSeller = JSON.parse(localStorage.getItem("hostelhubb_seller_data"));
    if (cachedSeller) setSeller(cachedSeller);
  }, []);

  const loginSeller = async (email, password) => {
    setLoading(true);

    try {
      // Step 1: Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Step 2: Fetch Student_Users doc
      const studentRef = doc(db, "Student_Users", uid);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        // User not in Student_Users → redirect to signup/become-seller
        return { success: false, reason: "becomeSeller" };
      }

      const studentData = studentSnap.data();

      // Step 3: Check isBusinessAccepted
      if (studentData.isBusinessAccepted === true) {
        // Verified seller
        setSeller(studentData);
        localStorage.setItem("hostelhubb_seller_data", JSON.stringify(studentData));
        return { success: true, data: studentData };
      } else if (studentData.isBusinessAccepted === false) {
        // Application under review
        return { success: false, reason: "underReview" };
      } else {
        // User hasn't applied yet
        return { success: false, reason: "becomeSeller" };
      }
    } catch (error) {
      console.error("Firebase Auth error:", error.code, error.message);
      return { success: false, reason: "authError" };
    } finally {
      setLoading(false);
    }
  };

  const logoutSeller = () => {
    setSeller(null);
    localStorage.removeItem("hostelhubb_seller_data");
  };

  return (
    <SellerContext.Provider value={{ seller, loading, loginSeller, logoutSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
