// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  getAgentData,
  saveAgentData,
  clearAgentData,
} from "../utils/agentStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // "student", "employee", "seller"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        clearAgentData();
        setUser(null);
        setUserType(null);
        setLoading(false);
        return;
      }

      try {
        // ✅ Check local cache first
        const cachedData = getAgentData();
        if (cachedData && cachedData.uid === currentUser.uid) {
          setUser(cachedData);
          setUserType(cachedData.userType || null);
          setLoading(false);
          return;
        }

        // ✅ Fetch from Firestore
        const studentRef = doc(db, "Student_Users", currentUser.uid);
        const employeeRef = doc(db, "Employees", currentUser.uid);
        const sellerRef = doc(db, "Sellers", currentUser.uid);

        const [studentSnap, employeeSnap, sellerSnap] = await Promise.all([
          getDoc(studentRef),
          getDoc(employeeRef),
          getDoc(sellerRef),
        ]);

        let combinedData = null;

        if (sellerSnap.exists()) {
          // 🧾 Seller account detected
          const sellerData = sellerSnap.data();
          combinedData = {
            ...sellerData,
            uid: currentUser.uid,
            email: currentUser.email,
            userType: "seller",
          };
          setUserType("seller");
        } else if (employeeSnap.exists()) {
          // 🧾 Employee account detected
          const employeeData = employeeSnap.data();
          combinedData = {
            ...employeeData,
            uid: currentUser.uid,
            email: currentUser.email,
            userType: "employee",
          };
          setUserType("employee");
        } else if (studentSnap.exists()) {
          // 🧾 Student account detected
          const studentData = studentSnap.data();
          combinedData = {
            ...studentData,
            uid: currentUser.uid,
            email: currentUser.email,
            userType: "student",
          };
          setUserType("student");
        } else {
          // fallback if user exists but no Firestore record
          combinedData = {
            uid: currentUser.uid,
            email: currentUser.email,
            userType: "unknown",
          };
        }

        // ✅ Cache and set
        if (combinedData) {
          saveAgentData(combinedData);
          setUser(combinedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(currentUser);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userType, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
