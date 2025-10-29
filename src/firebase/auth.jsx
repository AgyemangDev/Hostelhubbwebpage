import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./FirebaseConfig";

/**
 * 🔹 Login for normal users (before applying as seller)
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "Student_Users", user.uid));
    if (!userDoc.exists()) {
      throw new Error(
        "Invalid login. Please sign up in the HostelHubb mobile app first.",
      );
    }

    return { ...user, ...userDoc.data() };
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

/**
 * 🔹 Login for approved sellers accessing dashboard
 */
export const loginSeller = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User not found in system.");
    }

    const userData = userDoc.data();

    if (userData.role !== "seller") {
      throw new Error("Access denied. Not registered as a seller.");
    }

    if (!userData.approved) {
      throw new Error("Your seller account is pending admin approval.");
    }

    return { ...user, ...userData, role: "seller" };
  } catch (error) {
    console.error("Seller login error:", error.message);
    throw error;
  }
};
