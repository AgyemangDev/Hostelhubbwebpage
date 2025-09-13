"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const navItems = [
  {
    title: "Main",
    links: [
      { to: "/agent-dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/agent-dashboard/session", label: "Session", icon: FolderOpen },
    ],
  },
];

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const MobileToggle = () => (
    <button
      onClick={toggleSidebar}
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#610b0c] text-white shadow-lg"
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <>
      <MobileToggle />

      <AnimatePresence>
        {sidebarOpen && (
          <>
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <motion.aside
              initial={isMobile ? { x: -280 } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -280 } : { x: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed md:fixed z-40 h-screen bg-white text-white flex flex-col shadow-lg w-72"
            >
              {/* Branding */}
              <div className="h-16 flex items-center px-6 bg-[#610b0c]">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 bg-white rounded-md flex items-center justify-center text-[#610b0c] font-black text-lg">
                    HH
                  </div>
                  <span className="text-lg font-semibold">Agent Dashboard</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-5 px-4 space-y-6">
                {navItems.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[11px] uppercase text-[#610b0c] font-semibold px-2 mb-2 tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => isMobile && setSidebarOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 group hover:bg-red-50"
                        >
                          <link.icon className="h-5 w-5 text-[#610b0c] group-hover:text-[#610b0c]" />
                          <span className="text-sm text-[#610b0c] font-medium">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Logout */}
              <div className="px-6 py-4">
                <Link
                  to="/logout"
                  className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
