import { db, storage } from "./FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchStudentData = async (uid) => {
  try {
    const docRef = doc(db, "Student_Users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
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
    console.log("Starting file uploads...");

    const uploadFile = async (file, path) => {
      if (!file) throw new Error(`File ${path} is missing`);

      console.log(`Uploading file to ${path}...`);
      const fileRef = ref(storage, `employees/${uid}/${path}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      console.log(`File uploaded to ${path}`);
      return downloadURL;
    };

    // Upload files in parallel
    const [schoolIdURL, nationalIdURL] = await Promise.all([
      uploadFile(formData.schoolIdPhoto, `school_id_${Date.now()}.jpg`),
      uploadFile(formData.nationalIdPhoto, `national_id_${Date.now()}.jpg`),
    ]);

    const fullName = `${studentData.firstName} ${studentData.surname || ""}`.trim();

    const cleanFormData = {
      program: formData.program,
      startYear: formData.startYear,
      endYear: formData.endYear,
      department: formData.department,
      expectations: formData.expectations,
      schoolIdURL,
      nationalIdURL,
      uid,
      name: fullName,
      phone: studentData.phoneNumber || "",
      email: studentData.email || "",
      isAccepted: false,
      createdAt: serverTimestamp(),
    };

    // Save to Firestore
    await setDoc(doc(db, "Employees", uid), cleanFormData);
    await updateDoc(doc(db, "Student_Users", uid), {
      isEmployeeApplied: true,
      isAccepted: false,
    });

    console.log("Firestore documents updated");

    // 🔔 Send confirmation email
    try {
      const emailResponse = await fetch("https://hostelhubbbackend.onrender.com/api/send-application-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: cleanFormData.email,
          role: cleanFormData.department, // Or formData.role if it’s dynamic
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Failed to send confirmation email:", errorText);
      } else {
        console.log("Confirmation email sent successfully");
      }
    } catch (emailError) {
      console.error("Error while sending confirmation email:", emailError);
    }

    return true;
  } catch (error) {
    console.error("Error in applyForEmployee:", error);
    throw error;
  }
};
