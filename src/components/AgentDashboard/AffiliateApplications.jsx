import React, { useState, useEffect } from "react";
import { User, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Link  } from "react-router-dom";

const PublicAffiliatePage = () => {
  const [applicationStatus, setApplicationStatus] = useState("none"); // "none", "pending", "approved", "rejected"
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  // Application form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    students: "",
    experience: ""
  });

  useEffect(() => {
    // Simulate API call to check if user has an application
    const checkApplicationStatus = async () => {
      setLoading(true);
      try {
        // In real implementation, this would be an API call
        // For demo purposes, we'll simulate different statuses
        
        // Simulate API response (would come from your backend)
        const demoResponse = {
          // Try changing this to "pending", "approved", or "rejected" to see different states
          status: "approved",
          user: {
            name: "John Doe",
            email: "john@example.com",
            applicationDate: "2025-04-28"
          }
        };
        
        setApplicationStatus(demoResponse.status);
        setUser(demoResponse.user);
        
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Simulate loading delay
        
      } catch (error) {
        console.error("Error fetching application status:", error);
        setLoading(false);
      }
    };

    checkApplicationStatus();
  }, []);


 

 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#610b0c] mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (applicationStatus === "approved") {
    window.location.href = "/agent-dashboard";
    return null; // Prevent rendering anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-[#610b0c] text-white">
          <h2 className="text-xl font-semibold">Affiliate Program Portal</h2>
          <p className="mt-1 text-sm">Join our program to earn commissions</p>
        </div>
        
          {applicationStatus === "pending" && (
            <div className="text-center">
              <Clock size={48} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Application Under Review</h3>
              <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-yellow-700">
                  Hello {user?.name}, your application submitted on {user?.applicationDate} is currently being reviewed by our team.
                </p>
              </div>
              <p className="mt-4 text-gray-600">
                We'll email you at {user?.email} once a decision has been made.
              </p>
              <button
                disabled
                className="mt-4 w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
              >
                Login to Dashboard
              </button>
            </div>
          )}

          {applicationStatus === "rejected" && (
            <div className="text-center">
              <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Application Not Approved</h3>
              <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-700">
                  We're sorry {user?.name}, but we couldn't approve your application at this time.
                </p>
              </div>
              <p className="mt-4 text-gray-600">
                Please contact support for more information or to apply again after 30 days.
              </p>
              <button
                className="mt-4 w-full bg-[#610b0c] text-white py-2 px-4 rounded hover:opacity-90"
              >
                <Link to={'/login'}>
                Apply Again
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
  
  );
};

export default PublicAffiliatePage;