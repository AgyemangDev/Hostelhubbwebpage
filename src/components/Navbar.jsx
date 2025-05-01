"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Home } from "lucide-react"; // Import the Home icon from lucide-react
import { useNavigate } from "react-router-dom"; // Corrected import

const Navbar = ({ heroRef, featuresRef, testimonialsRef, ctaRef, affiliateRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Corrected hook usage

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
    },{ 
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
    <div className={`fixed top-0 left-0 w-full z-50 bg-accent ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo with Icon */}
          <div className="flex items-center w-[120px] h-10  rounded-lg">
            <button
              onClick={() => handleNavigation(navItems[0])}
              className="font-bold text-xl flex items-center transition-transform transform hover:scale-110" // Added hover animation
              aria-label="HostelHubb"
            >
              <Home size={24} className="text-white mr-2" /> {/* Home icon */}
              <span className="text-white">HostelHubb</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.routeName}
                onClick={() => handleNavigation(item)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center ${
                  activeRoute === item.routeName
                    ? "text-[#610b0c]"
                    : "text-white hover:text-gray"
                }`}
              >
                {item.displayName}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              className="bg-[#610b0c] text-white text-sm font-medium px-4 py-2 rounded-md flex items-center transition-transform transform hover:scale-110" // Added hover animation
              onClick={() => navigate("/login")}
            >
              Login <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.routeName}
                onClick={() => handleNavigation(item)}
                className={`block w-full text-left px-3 py-3 text-sm font-medium rounded-md ${
                  activeRoute === item.routeName
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.displayName}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button
                className="block w-full text-left px-3 py-3 text-sm font-medium bg-black text-white rounded-md flex items-center justify-between"
                onClick={() => navigate("/login")}
              >
                Login
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
