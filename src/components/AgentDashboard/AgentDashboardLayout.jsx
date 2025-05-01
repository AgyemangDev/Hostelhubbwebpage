import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AgentDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentDashboardLayout;
