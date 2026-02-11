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

