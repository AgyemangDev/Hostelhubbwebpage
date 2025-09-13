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

const AgentSession = ({ user: propUser, onBack }) => {
    const { user: authUser, loading } = useAuth();
    const currentUser = propUser || authUser;

    const [agentName, setAgentName] = useState("");
    const [agentIdNumber, setAgentIdNumber] = useState(""); // from Firestore or manual
    const [agentCode, setAgentCode] = useState(""); // optional code from DB

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    const [hostelName, setHostelName] = useState("");

    const [amountPaid, setAmountPaid] = useState("");
    const [managerShare, setManagerShare] = useState("");
    const [agentCommission, setAgentCommission] = useState("");
    const [receiptNumber, setReceiptNumber] = useState("");

    const [submitting, setSubmitting] = useState(false);

    // Prefill agent info (auth + Employees doc)
    useEffect(() => {
        if (!currentUser) return;

        // prefill from auth profile when available
        setAgentName((prev) => prev || currentUser.displayName || currentUser.name || "");

        const fetchEmployee = async () => {
            try {
                const empRef = firestoreDoc(db, "Employees", currentUser.uid);
                const snap = await getDoc(empRef);
                if (snap.exists()) {
                    const d = snap.data();
                    setAgentName((prev) => prev || d.displayName || d.name || d.agentName || "");
                    setAgentIdNumber((prev) => prev || d.agentIdNumber || d.employeeId || "");
                    setAgentCode((prev) => prev || d.agentCode || "");
                }
            } catch (err) {
                console.error("Failed to fetch employee doc:", err);
            }
        };

        fetchEmployee();
    }, [currentUser]);

    const handleSubmit = async () => {
        if (!currentUser?.uid) {
            alert("You must be logged in to submit a session report.");
            return;
        }

        // required fields validation
        if (
            !agentName ||
            !agentIdNumber ||
            !customerName ||
            !hostelName ||
            !amountPaid ||
            !receiptNumber
        ) {
            alert(
                "Please fill in all required fields (Agent Name, Agent ID Number, Customer Name, Hostel Name, Amount Paid, and Receipt Number)."
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
            const reportData = {
                agentId: currentUser.uid, // Firebase UID required by rules
                agentIdNumber: agentIdNumber.trim(),
                agentCode: agentCode || null,
                agentName: agentName.trim(),
                customerName: customerName.trim(),
                hostelName: hostelName.trim(),
                amountPaid: Number(amountPaid),
                managerShare: managerShare ? Number(managerShare) : 0,
                agentCommission: agentCommission ? Number(agentCommission) : 0,
                receiptNumber: receiptNumber.trim(),
                createdAt: serverTimestamp(),
                status: "pending",
            };

            if (customerPhone) reportData.customerPhone = customerPhone.trim();
            if (clientName) reportData.clientName = clientName.trim();
            if (clientPhone) reportData.clientPhone = clientPhone.trim();

            console.log("Submitting report:", reportData);

            await addDoc(collection(db, "SessionReports"), reportData);

            alert("Session report submitted successfully!");

            // reset form
            setAgentName("");
            setAgentIdNumber("");
            setAgentCode("");
            setCustomerName("");
            setCustomerPhone("");
            setClientName("");
            setClientPhone("");
            setHostelName("");
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-red-100">
                    <button
                        onClick={onBack}
                        className="flex items-center text-[#610b0c] mb-4 hover:text-red-800 transition-colors duration-200"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                    </button>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#610b0c] mb-2">Create Session Report</h1>
                        <p className="text-gray-600">Fill in the details to create a new session report</p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#610b0c] to-red-800 p-6">
                        <h2 className="text-white text-xl font-semibold flex items-center">
                            <Receipt className="mr-2" size={24} />
                            Session Details
                        </h2>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Agent Information Section */}
                        <div className="bg-red-50 rounded-xl p-6 border-l-4 border-[#610b0c]">
                            <h3 className="text-lg font-semibold text-[#610b0c] mb-4 flex items-center">
                                <User className="mr-2" size={20} />
                                Agent Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#610b0c] mb-2">Agent Name *</label>
                                    <input
                                        type="text"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                        className="w-full border-2 border-red-200 focus:border-[#610b0c] p-3 rounded-lg outline-none"
                                        placeholder="Enter agent name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#610b0c] mb-2">Agent ID Number *</label>
                                    <input
                                        type="text"
                                        value={agentIdNumber}
                                        onChange={(e) => setAgentIdNumber(e.target.value)}
                                        className="w-full border-2 border-red-200 focus:border-[#610b0c] p-3 rounded-lg outline-none"
                                        placeholder="Enter agent ID number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#610b0c] mb-2">Agent Firebase UID (System)</label>
                                    <input
                                        type="text"
                                        value={currentUser?.uid || ""}
                                        readOnly
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#610b0c] mb-2">Agent Code (from DB)</label>
                                    <input
                                        type="text"
                                        value={agentCode}
                                        readOnly
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Customer Information Section */}
                        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
                            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                                <User className="mr-2" size={20} />
                                Customer Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-blue-800 mb-2">Customer Name *</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full border-2 border-blue-200 focus:border-blue-600 p-3 rounded-lg outline-none"
                                        placeholder="Enter customer name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-blue-800 mb-2">Customer Phone Number</label>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        className="w-full border-2 border-blue-200 focus:border-blue-600 p-3 rounded-lg outline-none"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Client Details */}
                        <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                <User className="mr-2" size={20} />
                                Additional Client Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-green-800 mb-2">Client Name</label>
                                    <input
                                        type="text"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full border-2 border-green-200 focus:border-green-600 p-3 rounded-lg outline-none"
                                        placeholder="Enter client name (if different)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-800 mb-2">Client Phone</label>
                                    <input
                                        type="tel"
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(e.target.value)}
                                        className="w-full border-2 border-green-200 focus:border-green-600 p-3 rounded-lg outline-none"
                                        placeholder="Enter client phone"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hostel Information */}
                        <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
                            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                                <Building className="mr-2" size={20} />
                                Hostel Information
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-purple-800 mb-2">Hostel Name *</label>
                                <input
                                    type="text"
                                    value={hostelName}
                                    onChange={(e) => setHostelName(e.target.value)}
                                    className="w-full border-2 border-purple-200 focus:border-purple-600 p-3 rounded-lg outline-none"
                                    placeholder="Enter hostel name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-600">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                                <DollarSign className="mr-2" size={20} />
                                Financial Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-yellow-800 mb-2">Amount Paid *</label>
                                    <input
                                        type="number"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(e.target.value)}
                                        className="w-full border-2 border-yellow-200 focus:border-yellow-600 p-3 rounded-lg outline-none"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-yellow-800 mb-2">Manager's Share</label>
                                    <input
                                        type="number"
                                        value={managerShare}
                                        onChange={(e) => setManagerShare(e.target.value)}
                                        className="w-full border-2 border-yellow-200 focus:border-yellow-600 p-3 rounded-lg outline-none"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-yellow-800 mb-2">Agent Commission</label>
                                    <input
                                        type="number"
                                        value={agentCommission}
                                        onChange={(e) => setAgentCommission(e.target.value)}
                                        className="w-full border-2 border-yellow-200 focus:border-yellow-600 p-3 rounded-lg outline-none"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-yellow-800 mb-2">Receipt Number *</label>
                                <input
                                    type="text"
                                    value={receiptNumber}
                                    onChange={(e) => setReceiptNumber(e.target.value)}
                                    className="w-full border-2 border-yellow-200 focus:border-yellow-600 p-3 rounded-lg outline-none"
                                    placeholder="Enter receipt number"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-gradient-to-r from-[#610b0c] to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                <Receipt className="mr-2" size={20} />
                                {submitting ? "Submitting..." : "Submit Session Report"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentSession;
