import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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
  
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};