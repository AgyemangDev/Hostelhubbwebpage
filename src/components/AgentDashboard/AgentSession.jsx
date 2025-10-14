// src/components/AgentDashboard/AgentSession.jsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Building, DollarSign, Receipt } from "lucide-react";
import { useAuth } from "../../firebase/AuthContext";
import { db } from "../../firebase/FirebaseConfig";
import {
    collection,
    addDoc,
    serverTimestamp,
    doc as firestoreDoc,
    getDoc,
} from "firebase/firestore";
import { getAgentData, getAgentSessionInfo } from "../../utils/agentStorage";

const AgentSession = ({ user: propUser, onBack }) => {
    const { user: authUser, loading } = useAuth();
    const currentUser = propUser || authUser;

    const [agentName, setAgentName] = useState("");
    const [agentIdNumber, setAgentIdNumber] = useState(""); // from Firestore or manual
    const [agentCode, setAgentCode] = useState(""); // optional code from DB

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const [hostelName, setHostelName] = useState("");
    const [roomType, setRoomType] = useState("");

    const [amountPaid, setAmountPaid] = useState("");
    const [managerShare, setManagerShare] = useState("");
    const [agentCommission, setAgentCommission] = useState("");
    const [receiptNumber, setReceiptNumber] = useState("");

    const [submitting, setSubmitting] = useState(false);

    // Prefill agent info (prioritize cached data, fallback to Firestore)
    useEffect(() => {
        if (!currentUser) return;

        // First try to get agent info from cached data
        const cachedAgentInfo = getAgentSessionInfo();
        
        if (cachedAgentInfo) {
            // Use cached data if available
            setAgentName(cachedAgentInfo.agentName || "");
            setAgentIdNumber(cachedAgentInfo.agentIdNumber || "");
            setAgentCode(cachedAgentInfo.agentCode || "");
            console.log("Agent info loaded from cache:", cachedAgentInfo);
        } else {
            // Fallback to fetching from Firestore if no cached data
            const fetchEmployee = async () => {
                try {
                    const empRef = firestoreDoc(db, "Employees", currentUser.uid);
                    const snap = await getDoc(empRef);
                    if (snap.exists()) {
                        const d = snap.data();
                        setAgentName(d.displayName || d.name || d.agentName || "");
                        setAgentIdNumber(d.agentIdNumber || d.employeeId || "");
                        setAgentCode(d.agentCode || "");
                    }
                } catch (err) {
                    console.error("Failed to fetch employee doc:", err);
                }
            };

            fetchEmployee();
        }
    }, [currentUser]);

    const handleSubmit = async () => {
        if (!currentUser?.uid) {
            alert("You must be logged in to submit a session report.");
            return;
        }

        // required fields validation
        if (
            !agentName ||
            !customerName ||
            !hostelName ||
            !roomType ||
            !amountPaid ||
            !receiptNumber
        ) {
            alert(
                "Please fill in all required fields (Agent Name, Customer Name, Hostel Name, Room Type, Amount Paid, and Receipt Number)."
            );
            return;
        }

        // numeric validations
        if (isNaN(Number(amountPaid)) || Number(amountPaid) <= 0) {
            alert("Please enter a valid amount paid.");
            return;
        }
        if (managerShare && isNaN(Number(managerShare))) {
            alert("Please enter a valid manager's share.");
            return;
        }
        if (agentCommission && isNaN(Number(agentCommission))) {
            alert("Please enter a valid agent commission.");
            return;
        }

        setSubmitting(true);
        try {
            // Get additional agent info from cached storage
            const cachedAgentInfo = getAgentSessionInfo();
            
            const reportData = {
                agentId: currentUser.uid, // Firebase UID required by rules
                agentCode: agentCode || cachedAgentInfo?.agentCode || null,
                agentName: agentName.trim() || cachedAgentInfo?.agentName || '',
                agentEmail: cachedAgentInfo?.email || currentUser.email || '',
                agentDepartment: cachedAgentInfo?.department || '',
                agentLocation: cachedAgentInfo?.location || '',
                customerName: customerName.trim(),
                hostelName: hostelName.trim(),
                roomType: roomType.trim(),
                amountPaid: Number(amountPaid),
                managerShare: managerShare ? Number(managerShare) : 0,
                agentCommission: agentCommission ? Number(agentCommission) : 0,
                receiptNumber: receiptNumber.trim(),
                createdAt: serverTimestamp(),
                status: "pending",
            };

            if (customerPhone) reportData.customerPhone = customerPhone.trim();
            

            console.log("Submitting report:", reportData);

            await addDoc(collection(db, "SessionReports"), reportData);

            alert("Session report submitted successfully!");

            // reset form
            setAgentName("");
            setAgentCode("");
            setCustomerName("");
            setCustomerPhone("");
            setHostelName("");
            setRoomType("");
            setAmountPaid("");
            setManagerShare("");
            setAgentCommission("");
            setReceiptNumber("");
        } catch (error) {
            console.error("Error saving report:", error);
            alert(`Error saving session report: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#610b0c]">Checking authentication...</p>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#610b0c] text-center">
                    You must be logged in to create a session report. Please <strong>log in</strong>.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 mb-4 hover:text-gray-800 transition-colors duration-200 font-medium"
                    >
                        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
                    </button>

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Session Report</h1>
                        <p className="text-gray-600 text-sm">Complete the form below to submit a new session report</p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="text-lg font-medium text-gray-900 flex items-center">
                            <Receipt className="mr-2" size={20} />
                            Session Details
                        </h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Agent Information Section */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                                <User className="mr-2" size={18} />
                                Agent Information
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name *</label>
                                    <input
                                        type="text"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="Enter agent name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent UID (System)</label>
                                    <input
                                        type="text"
                                        value={currentUser?.uid || ""}
                                        readOnly
                                        className="w-full border border-gray-300 p-3 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Code</label>
                                    <input
                                        type="text"
                                        value={agentCode}
                                        readOnly
                                        className="w-full border border-gray-300 p-3 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Customer Information Section */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                                <User className="mr-2" size={18} />
                                Customer Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="Enter customer name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Phone Number</label>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hostel Information */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                                <Building className="mr-2" size={18} />
                                Accommodation Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name *</label>
                                    <input
                                        type="text"
                                        value={hostelName}
                                        onChange={(e) => setHostelName(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="Enter hostel name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                                    <input
                                        type="text"
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="e.g., Single Room, 2 in 1, 4 in 1, etc."
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                                <DollarSign className="mr-2" size={18} />
                                Financial Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Paid *</label>
                                    <input
                                        type="number"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Manager's Share</label>
                                    <input
                                        type="number"
                                        value={managerShare}
                                        onChange={(e) => setManagerShare(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Commission</label>
                                    <input
                                        type="number"
                                        value={agentCommission}
                                        onChange={(e) => setAgentCommission(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Number *</label>
                                    <input
                                        type="text"
                                        value={receiptNumber}
                                        onChange={(e) => setReceiptNumber(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 p-3 rounded-md outline-none transition-colors"
                                        placeholder="Enter receipt number"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    <Receipt className="mr-2" size={16} />
                                    {submitting ? "Submitting..." : "Submit Report"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentSession;
