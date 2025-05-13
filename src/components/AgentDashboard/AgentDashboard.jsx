import React, { useEffect, useState } from "react";
import { ExternalLink, UploadCloud } from "lucide-react";
import DashboardHome from "./DashboardHome";
import { useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const AgentDashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("User data from route state:", user);
    }
  }, [user]);

  const handleShare = () => {
    if (!user?.agentCode) return;

    const message = `Hi there! 😊 I’m recommending you to book your hostel or storage with HostelHubb — Ghana’s trusted student accommodation platform. 

Use my agent code "${user.agentCode}" when booking to help support me and unlock the best options available!

HostelHubb is available on the App Store, Play Store, or visit 🌐 https://hostelhubb.com. Let me know if you need help! 🙌`;

    if (navigator.share) {
      navigator
        .share({
          title: "Book with HostelHubb",
          text: message,
          url: "https://hostelhubb.com",
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user?.uid) return;

    try {
      setUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `agentProfilePictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const employeeRef = doc(db, "Employees", user.uid);
      await updateDoc(employeeRef, {
        agentProfilePicture: downloadURL,
      });

      alert("Profile picture uploaded successfully! Refresh to see changes.");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-red-50 text-gray-800 min-h-screen p-6">
      <div className="mb-6 text-sm text-[#610b0c] font-medium">
        Dashboard / Home
      </div>

      <div className="mb-8 bg-gradient-to-r from-white to-red-50 rounded-xl p-6 shadow-lg border border-red-200">
        <h2 className="text-2xl text-[#610b0c] font-bold mb-2">
          Welcome to your {user?.department} Dashboard
        </h2>

        <p className="text-[#610b0c] mb-2">
          Your Agent code:{" "}
          <span className="bg-[#610b0c] text-white px-2 py-1 rounded font-mono">
            {user?.agentCode}
          </span>
        </p>

        <p className="text-sm text-[#610b0c] mb-4">
          Share your agent code with anyone you help book accommodation or
          storage on HostelHubb to gain more commission/bonuses.
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={handleShare}
            className="bg-white text-[#610b0c] border border-[#610b0c] hover:text-white hover:bg-[#610b0c] py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <ExternalLink size={14} className="mr-1" />
            Share your link
          </button>
        </div>

        {/* Upload profile image if missing */}
        {user?.department === "Hostel Agent" && !user?.agentProfilePicture && (
          <div className="mt-4">
            <label className="block text-sm text-[#610b0c] font-medium mb-2">
              Upload your profile picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="text-sm text-gray-700 border border-red-300 rounded p-2"
            />
            {uploading && <p className="text-xs text-red-500 mt-2">Uploading...</p>}
          </div>
        )}
      </div>

      <DashboardHome user={user} />
    </div>
  );
};

export default AgentDashboard;
