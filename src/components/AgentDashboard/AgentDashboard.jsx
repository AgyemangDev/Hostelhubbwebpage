import React, { useEffect, useState } from "react";
import { ExternalLink, ArrowLeft, Pencil } from "lucide-react";
import DashboardHome from "./DashboardHome";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import { useAuth } from "../../firebase/AuthContext"; // ✅ Import auth context

const AgentDashboard = () => {
    const { user } = useAuth(); // ✅ get current logged in user
    const [uploading, setUploading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Editable fields
    const [phoneNumber, setPhoneNumber] = useState("");
    const [expectations, setExpectation] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [agentLocation, setAgentLocation] = useState("");

    useEffect(() => {
        if (user) {
            setPhoneNumber(user.phoneNumber || "");
            setExpectation(user.expectations || "");
            setProfilePicture(user.agentProfilePicture || "");
            setAgentLocation(user.location || "");
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

            setProfilePicture(downloadURL);
            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong while uploading the image.");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async () => {
        if (!user?.uid) return;

        try {
            const employeeRef = doc(db, "Employees", user.uid);
            await updateDoc(employeeRef, {
                phoneNumber,
                expectations,
                agentProfilePicture: profilePicture,
            });
            alert("Profile updated successfully!");
            setEditMode(false);
        } catch (error) {
            console.error("Update error:", error);
            alert("Something went wrong while updating the profile.");
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-[#610b0c] font-semibold">
                    Please log in to access your dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-white to-red-50 text-gray-800 min-h-screen p-6">
            {!editMode ? (
                <>
                    <div className="mb-6 text-sm text-[#610b0c] font-medium">
                        Dashboard / Home
                    </div>

                    <div className="mb-8 bg-gradient-to-r from-white to-red-50 rounded-xl p-6 shadow-lg border border-red-200">
                        <div className="flex items-center space-x-4 mb-4">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Agent"
                                    className="w-16 h-16 rounded-full object-cover border border-red-300"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-sm border border-red-300">
                                    No Image
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl text-[#610b0c] font-bold">
                                    Welcome to your {user?.department} Dashboard
                                </h2>
                                <p className="text-[#610b0c] text-sm">
                                    Agent Code:{" "}
                                    <span className="bg-[#610b0c] text-white px-2 py-1 rounded font-mono">
                    {user?.agentCode}
                  </span>
                                </p>
                            </div>
                        </div>

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

                            {user?.department === "Hostel Agent" && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-[#610b0c] text-white hover:bg-white hover:text-[#610b0c] border border-[#610b0c] py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center"
                                >
                                    <Pencil size={14} className="mr-1" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <DashboardHome user={user} />
                </>
            ) : (
                // Edit Mode
                <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <button
                        onClick={() => setEditMode(false)}
                        className="flex items-center text-[#610b0c] mb-4 hover:underline"
                    >
                        <ArrowLeft className="mr-2" size={18} /> Back to Dashboard
                    </button>

                    <h2 className="text-2xl font-bold text-[#610b0c] mb-4">
                        Edit Your Profile
                    </h2>

                    <div className="space-y-4">
                        {profilePicture && (
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border border-red-300 mb-2"
                            />
                        )}
                        <div>
                            <label className="text-sm font-medium text-[#610b0c]">
                                Upload Profile Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="text-sm text-gray-700 border border-red-300 rounded p-2 mt-1"
                            />
                            {uploading && (
                                <p className="text-xs text-red-500 mt-2">Uploading...</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#610b0c]">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full border border-red-200 p-2 rounded mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#610b0c]">
                                Location
                            </label>
                            <select
                                value={agentLocation}
                                onChange={(e) => setAgentLocation(e.target.value)}
                                className="w-full border border-red-200 p-2 rounded mt-1 bg-white"
                            >
                                <option value="">Select your location</option>
                                <option value="Kumasi">Kumasi</option>
                                <option value="Accra">Accra</option>
                                <option value="Sunyani">Sunyani</option>
                                <option value="Tamale">Tamale</option>
                                <option value="Takoradi">Takoradi</option>
                                <option value="Cape Coast">Cape Coast</option>
                                <option value="Ho">Ho</option>
                                <option value="Bolgatanga">Bolgatanga</option>
                                <option value="Wa">Wa</option>
                                <option value="Koforidua">Koforidua</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#610b0c]">Bio</label>
                            <textarea
                                value={expectations}
                                onChange={(e) => setExpectation(e.target.value)}
                                className="w-full border border-red-200 p-2 rounded mt-1"
                                rows={4}
                            />
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            className="mt-4 bg-[#610b0c] text-white px-4 py-2 rounded hover:bg-red-800 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentDashboard;
