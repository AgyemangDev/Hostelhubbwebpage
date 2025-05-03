import { db, storage } from "./FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchStudentData = async (uid) => {
    try {
      const docRef = doc(db, "Student_Users", uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data(); // This is the full student data object
      } else {
        console.error("No such student user found!");
        throw new Error("Student data not found");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw error;
    }
  };

  export const applyForEmployee = async (uid, studentData, formData) => {
    try {
      // First upload the files and get their URLs
      console.log("Starting file uploads...");
      
      // Helper function to upload a single file
      const uploadFile = async (file, path) => {
        if (!file) {
          throw new Error(`File ${path} is missing`);
        }
        
        console.log(`Uploading file to ${path}...`);
        const fileRef = ref(storage, `employees/${uid}/${path}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        console.log(`File uploaded successfully to ${path}`);
        return downloadURL;
      };
  
      // Upload both files in parallel
      const [schoolIdURL, nationalIdURL] = await Promise.all([
        uploadFile(formData.schoolIdPhoto, `school_id_${Date.now()}.jpg`),
        uploadFile(formData.nationalIdPhoto, `national_id_${Date.now()}.jpg`),
      ]);
  
      console.log("Files uploaded successfully");
  
      // Create a clean copy of form data without File objects
      const cleanFormData = {
        program: formData.program,
        startYear: formData.startYear,
        endYear: formData.endYear,
        department: formData.department,
        expectations: formData.expectations,
        // Replace File objects with URLs
        schoolIdURL,
        nationalIdURL,
        // Add user information
        uid,
        name: `${studentData.firstName} ${studentData.surname || ""}`,
        phone: studentData.phoneNumber || "",
        email: studentData.email || "",
        isAccepted: false,
        createdAt: serverTimestamp(),
      };
  
      console.log("Creating employee document...");
      
      // Create Employee document with clean data
      await setDoc(doc(db, "Employees", uid), cleanFormData);
      
      console.log("Employee document created successfully");
  
      // Update Student_Users document
      console.log("Updating student user document...");
      await updateDoc(doc(db, "Student_Users", uid), {
        isEmployeeApplied: true,
        isAccepted: false,
      });
      
      console.log("Student user document updated successfully");
      return true;
    } catch (error) {
      console.error("Error in applyForEmployee:", error);
      throw error;
    }
  };