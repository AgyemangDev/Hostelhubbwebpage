import { useState } from "react";
import { loginUser } from "../../firebase/auth";
import { fetchStudentData, applyForEmployee } from "../../firebase/firestore";

export const useFirebaseEmployeeApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleApplication = async (email, password) => {
    setIsSubmitting(true);
    try {
      // First, login the user
      const user = await loginUser(email, password);
      if (!user || !user.uid) {
        throw new Error("Login failed");
      }

      // Then fetch their student data
      const studentData = await fetchStudentData(user.uid);
      if (!studentData) {
        throw new Error("Failed to fetch student data");
      }

      // Check if user has already applied
      if (studentData.isEmployeeApplied) {
        setIsSubmitting(false);
        alert(
          "You have already applied for this program. Kindly wait for confirmation from our team.",
        );
        return null; // prevent proceeding
      }

      // Store user data for later use
      setUserData({
        uid: user.uid,
        ...studentData,
        name: `${studentData.firstName} ${studentData.surname}`,
      });

      setIsSubmitting(false);
      return {
        name: `${studentData.firstName} ${studentData.surname}`,
        uid: user.uid,
        data: studentData,
      };
    } catch (error) {
      console.error("Application process error:", error);
      setIsSubmitting(false);
      throw error;
    }
  };

  const submitEmployeeApplication = async (formData) => {
    if (!userData || !userData.uid) {
      throw new Error("User not authenticated");
    }

    setIsSubmitting(true);
    try {
      await applyForEmployee(userData.uid, userData, formData);
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error("Error submitting employee application:", error);
      setIsSubmitting(false);
      throw error;
    }
  };

  return {
    isSubmitting,
    userData,
    handleApplication,
    submitEmployeeApplication,
  };
};
