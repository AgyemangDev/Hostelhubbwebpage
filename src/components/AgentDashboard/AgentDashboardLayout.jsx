"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AgentDashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 md:ml-0 mt-16 md:mt-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AgentDashboardLayout;