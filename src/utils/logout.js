// src/utils/logout.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { clearAgentData } from "./agentStorage";

/**
 * Logout function that signs out the user and clears cached agent data
 */
export const logoutUser = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Clear cached agent data from storage
    clearAgentData();
    
    // Clear any other cached data as needed
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    
    console.log("User logged out successfully and cache cleared");
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};