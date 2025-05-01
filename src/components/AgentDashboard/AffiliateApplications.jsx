import React, { useState, useEffect } from "react";

const AffiliateApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Later you fetch real data from backend
    const fakeApplications = [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "0551234567", students: 15 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0249876543", students: 8 },
    ];
    setApplications(fakeApplications);
  }, []);

  const handleAccept = (id) => {
    // Logic to accept affiliate
    alert(`Accepted applicant with ID: ${id}`);
    // After accepting you might also update their status
  };

  const handleReject = (id) => {
    // Logic to reject affiliate
    alert(`Rejected applicant with ID: ${id}`);
    // After rejecting you might also update their status
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Affiliate Applications</h1>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((applicant) => (
            <div key={applicant.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg">{applicant.name}</h2>
              <p>Email: {applicant.email}</p>
              <p>Phone: {applicant.phone}</p>
              <p>Estimated Students: {applicant.students}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAccept(applicant.id)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(applicant.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AffiliateApplications;
