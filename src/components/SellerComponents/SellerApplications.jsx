import React, { useState, useEffect } from "react";
import { User, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";

const SellerStatusPage = () => {
  const [applicationStatus, setApplicationStatus] = useState("none"); // none, pending, approved, rejected
  const [user, setUser] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerStatus = async (uid) => {
      try {
        // 🔹 Fetch seller application info
        const sellerRef = doc(db, "sellerApplications", uid);
        const sellerSnap = await getDoc(sellerRef);

        if (sellerSnap.exists()) {
          const data = sellerSnap.data();
          setSellerData(data);
          setApplicationStatus(data.status || "pending");
        } else {
          // fallback: check in users collection
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setSellerData(data);
            setApplicationStatus(data.applicationStatus || "none");
          } else {
            setApplicationStatus("none");
          }
        }
      } catch (error) {
        console.error("Error fetching seller status:", error);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Listen for logged-in user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchSellerStatus(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#610b0c] mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading seller status...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <User size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">
          Please log in to check your status.
        </p>
        <Link
          to="/login"
          className="bg-[#610b0c] text-white px-6 py-2 rounded hover:bg-[#4e090a]"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-[#610b0c] text-white">
          <h2 className="text-xl font-semibold">Seller Application Status</h2>
          <p className="mt-1 text-sm">
            Track your seller account verification progress
          </p>
        </div>

        {/* 🕒 Pending */}
        {applicationStatus === "pending" && (
          <div className="text-center p-6">
            <Clock size={48} className="mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Application Under Review
            </h3>
            <p className="mt-2 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3">
              Hi {sellerData?.name || user?.email}, your application is being
              reviewed by our team.
            </p>
            <p className="mt-4 text-gray-600">
              You’ll receive an email once a decision has been made.
            </p>
            <button
              disabled
              className="mt-4 w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
            >
              Waiting for Approval
            </button>
          </div>
        )}

        {/* ✅ Approved */}
        {applicationStatus === "approved" && (
          <div className="text-center p-6">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Application Approved!
            </h3>
            <div className="mt-2 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-700">
                Congratulations {sellerData?.name || user?.email}! You’ve been
                approved as a seller.
              </p>
              {sellerData?.approvedAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Approved on{" "}
                  {new Date(
                    sellerData.approvedAt.seconds * 1000,
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
            <p className="mt-4 text-gray-600">
              You can now access your seller dashboard to manage listings and
              track sales.
            </p>
            <Link
              to="/seller-dashboard"
              className="mt-4 block w-full bg-[#610b0c] text-white py-2 px-4 rounded hover:bg-[#4e090a]"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* ❌ Rejected */}
        {applicationStatus === "rejected" && (
          <div className="text-center p-6">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Application Not Approved
            </h3>
            <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">
                Sorry {sellerData?.name || user?.email}, your application wasn’t
                approved.
              </p>
              {sellerData?.rejectionReason && (
                <p className="text-sm text-gray-500 mt-2">
                  Reason: {sellerData.rejectionReason}
                </p>
              )}
            </div>
            <p className="mt-4 text-gray-600">
              You can reach out to support or reapply after 30 days.
            </p>
            <Link
              to="/login"
              className="mt-4 block w-full bg-[#610b0c] text-white py-2 px-4 rounded hover:bg-[#4e090a]"
            >
              Reapply
            </Link>
          </div>
        )}

        {/* 🧍‍♂️ No Application Yet */}
        {applicationStatus === "none" && (
          <div className="text-center p-6">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No Application Found
            </h3>
            <p className="mt-2 text-gray-600">
              You haven’t submitted an application yet.
            </p>
            <Link
              to="/apply-seller"
              className="mt-4 block w-full bg-[#610b0c] text-white py-2 px-4 rounded hover:bg-[#4e090a]"
            >
              Apply as a Seller
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerStatusPage;
