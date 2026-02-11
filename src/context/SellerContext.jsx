import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch seller data
        try {
          const studentRef = doc(db, "Student_Users", user.uid);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            const studentData = studentSnap.data();
            
            // Only set seller if they're an accepted business
            if (studentData.isBusinessAccepted === true) {
              const sellerData = {
                ...studentData,
                uid: user.uid,
                email: user.email,
              };
              setSeller(sellerData);
              localStorage.setItem("hostelhubb_seller_data", JSON.stringify(sellerData));
            } else {
              // Not an accepted seller, clear data
              setSeller(null);
              localStorage.removeItem("hostelhubb_seller_data");
            }
          }
        } catch (error) {
          console.error("Error fetching seller data:", error);
        }
      } else {
        // User is signed out
        setSeller(null);
        localStorage.removeItem("hostelhubb_seller_data");
      }
      
      setAuthChecked(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginSeller = async (email, password) => {
    setLoading(true);

    try {
      // Firebase Authentication (persistence is already set in FirebaseConfig)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch Student_Users doc
      const studentRef = doc(db, "Student_Users", uid);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        // User not in Student_Users → redirect to signup/become-seller
        await auth.signOut(); // Sign out if not a valid seller
        return { success: false, reason: "becomeSeller" };
      }

      const studentData = studentSnap.data();

      // Check isBusinessAccepted
      if (studentData.isBusinessAccepted === true) {
        // Verified seller - auth state listener will handle setting seller
        const sellerData = {
          ...studentData,
          uid: uid,
          email: userCredential.user.email,
        };
        return { success: true, data: sellerData };
      } else if (studentData.isBusinessAccepted === false) {
        // Application under review
        await auth.signOut(); // Sign out if not accepted
        return { success: false, reason: "underReview" };
      } else {
        // User hasn't applied yet
        await auth.signOut(); // Sign out if not applied
        return { success: false, reason: "becomeSeller" };
      }
    } catch (error) {
      console.error("Firebase Auth error:", error.code, error.message);
      return { success: false, reason: "authError" };
    } finally {
      setLoading(false);
    }
  };

  const logoutSeller = async () => {
    try {
      await auth.signOut();
      setSeller(null);
      localStorage.removeItem("hostelhubb_seller_data");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SellerContext.Provider value={{ seller, loading, authChecked, loginSeller, logoutSeller }}>
      {!authChecked ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#610b0c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
