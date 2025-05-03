"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ heroRef, featuresRef, testimonialsRef, ctaRef, affiliateRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items with display names and route names
  const navItems = [
    { 
      displayName: "Home", 
      routeName: "home",
      ref: heroRef
    },
    { 
      displayName: "Features", 
      routeName: "features",
      ref: featuresRef
    },
    { 
      displayName: "Affiliate", 
      routeName: "affiliate",
      ref: affiliateRef 
    },
    { 
      displayName: "Discover", 
      routeName: "discover",
      ref: testimonialsRef 
    },
    { 
      displayName: "Contact", 
      routeName: "contact",
      ref: ctaRef 
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle navigation
  const handleNavigation = (item) => {
    setActiveRoute(item.routeName);
    
    // Handle scroll if ref exists
    if (item.ref?.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" });
    }
    
    setIsMenuOpen(false);
  };

  return (
<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl h-[100px] rounded-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 shadow-xl">
{/* Glassmorphism background */}

      <div className="container mx-auto px-4 h-full">
      <div className="flex items-center justify-between h-full px-6">
          {/* Logo with rounded background */}
          <div className="flex items-center space-x-3">
  <Home size={28} className="text-[#9a0b0d]" />
  <span className="text-lg font-bold text-gray-800">HOSTELHUBB</span>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
  {navItems.map((item) => (
    <button
      key={item.routeName}
      onClick={() => handleNavigation(item)}
      className={`text-base font-semibold transition-colors ${
        activeRoute === item.routeName
          ? "text-[#9a0b0d]"
          : "text-gray-800 hover:text-[#9a0b0d]"
      }`}
    >
      {item.displayName}
    </button>
  ))}
</div>



          {/* CTA Button */}
          <div className="hidden md:flex">
  {/* <button
    onClick={() => navigate("/login")}
    className="bg-[#9a0b0d] text-white text-base font-semibold px-6 py-3 rounded-full transition-all duration-300"
  >
    Agent Login
  </button> */}
</div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700 dark:text-white" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide down with glassmorphism */}
      {isMenuOpen && (
  <div className="md:hidden absolute top-16 right-4 w-64 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl transition-all duration-300">
    <div className="px-4 py-5 space-y-3">
      {navItems.map((item) => (
        <button
          key={item.routeName}
          onClick={() => handleNavigation(item)}
          className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
            activeRoute === item.routeName
              ? "bg-[#9a0b0d]/90 text-white shadow-md"
              : "bg-gray-50 text-gray-800 hover:bg-gray-100"
          }`}
        >
          {item.displayName}
        </button>
      ))}
      <div className="pt-3">
        {/* <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold bg-[#9a0b0d] text-white rounded-lg shadow transition-all duration-300"
        >
          Login As Agent
          <ChevronRight size={18} />
        </button> */}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Navbar;