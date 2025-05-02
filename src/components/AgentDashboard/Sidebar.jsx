"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  UserCircle,
  Share2,
  CalendarDays,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "Main",
    links: [
      { to: "/agent-dashboard", label: "Dashboard", icon: LayoutDashboard },
      ,
    ],
  },
  

];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-72 h-screen bg-white text-white  flex flex-col shadow-lg"
    >
      {/* Branding Header */}
      <div className="h-16 flex items-center px-6  bg-[#610b0c]">
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
                  className="flex items-center gap-3 px-4 py-3 rounded-md  transition-colors duration-200 group"
                >
                  <link.icon className="h-5 w-5 text-[#610b0c] group-hover:text-[#ffdddd]" />
                  <span className="text-sm text-[#610b0c] font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className=" px-6 py-4">
        <Link
          to="/logout"
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
