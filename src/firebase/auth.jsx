import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      // Authentication was successful if we reach here
      const user = userCredential.user;
      console.log("Login successful:", user.email);
      return user;
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error;
    }
  };
  
