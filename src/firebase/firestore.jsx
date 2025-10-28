import { db, storage } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 🔹 Utility: Upload file and get its download URL
const uploadFile = async (uid, path, file) => {
  if (!file) return null;
  const fileRef = ref(storage, `${path}/${uid}/${file.name || Date.now()}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

/* ======================================================
   🔸 SELLER APPLICATION
====================================================== */
export const createSellerApplication = async (uid, sellerData, documents) => {
  try {
    const documentURLs = {};

    // Upload and map all relevant documents
    if (documents.ghanaCardFront)
      documentURLs.ghanaCardFrontURL = await uploadFile(
        uid,
        "seller-documents/ghana-card-front",
        documents.ghanaCardFront,
      );

    if (documents.ghanaCardBack)
      documentURLs.ghanaCardBackURL = await uploadFile(
        uid,
        "seller-documents/ghana-card-back",
        documents.ghanaCardBack,
      );

    if (documents.proofOfOwnership)
      documentURLs.proofOfOwnershipURL = await uploadFile(
        uid,
        "seller-documents/proof-of-ownership",
        documents.proofOfOwnership,
      );

    if (documents.businessRegistration)
      documentURLs.businessRegistrationURL = await uploadFile(
        uid,
        "seller-documents/business-registration",
        documents.businessRegistration,
      );

    // Save seller application in Firestore
    await setDoc(doc(db, "sellerApplications", uid), {
      ...sellerData,
      documents: documentURLs,
      createdAt: serverTimestamp(),
      status: "pending",
    });

    // Create/update user profile
    await setDoc(
      doc(db, "users", uid),
      {
        uid,
        email: sellerData.email,
        fullName: sellerData.fullName,
        phone: sellerData.phone,
        role: "seller",
        applicationStatus: "pending",
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );

    return true;
  } catch (error) {
    console.error("Error creating seller application:", error);
    throw error;
  }
};

/* ======================================================
   🔸 STUDENT → EMPLOYEE APPLICATION
====================================================== */
export const fetchStudentData = async (uid) => {
  try {
    const docRef = doc(db, "Student_Users", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Student not found");
    return docSnap.data();
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export const applyForEmployee = async (uid, studentData, formData) => {
  try {
    // Upload documents
    const [schoolIdURL, nationalIdURL] = await Promise.all([
      uploadFile(uid, "employees/school_id", formData.schoolIdPhoto),
      uploadFile(uid, "employees/national_id", formData.nationalIdPhoto),
    ]);

    const fullName =
      `${studentData.firstName} ${studentData.surname || ""}`.trim();

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

    // Store employee application
    await setDoc(doc(db, "Employees", uid), cleanFormData);

    // Update student record
    await updateDoc(doc(db, "Student_Users", uid), {
      isEmployeeApplied: true,
      isAccepted: false,
    });

    // Optional: send confirmation email
    try {
      const emailResponse = await fetch(
        "https://hostelhubbbackend.onrender.com/api/send-application-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: cleanFormData.email,
            role: cleanFormData.department,
          }),
        },
      );
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Failed to send email:", errorText);
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
    }

    return true;
  } catch (error) {
    console.error("Error applying for employee:", error);
    throw error;
  }
};
