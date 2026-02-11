import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SellerDashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "p-4" : "ml-72 p-6"
        }`}
      >
        {/* Top Nav for mobile */}
        {isMobile && (
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-[#610b0c]">
              Seller Dashboard
            </h1>
            <button
              className="p-2 rounded-lg bg-[#610b0c] text-white"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboardLayout;
