"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ heroRef, featuresRef, testimonialsRef, ctaRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle tab click and scrolling
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "Home") {
      heroRef?.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "Features") {
      featuresRef?.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "Discover") {
      testimonialsRef?.current?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "Contact") {
      ctaRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu after selection
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-4">
      <nav
        className={`flex items-center gap-4 px-4 py-2 bg-white rounded-full shadow-md shadow-accent transition-all duration-300 ${
          isScrolled ? "bg-opacity-90 backdrop-blur-sm" : ""
        }`}
      >
        <button
          className="p-2 bg-accent rounded-full hover:bg-gray-800 transition-colors"
          onClick={() => handleTabClick("Home")}
          aria-label="Home"
        >
          <div className="font-semibold text-white">HostelHubb</div>
        </button>

        {["Home", "Features", "Discover"].map((tab) => (
          <div key={tab} className="relative">
            <button
              className={`hidden md:block px-4 py-2 transition-colors ${
                activeTab === tab
                  ? "text-accent font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
            {activeTab === tab && (
              <div className="absolute left-0 right-0 -bottom-1 mx-auto h-1 w-1 rounded-full bg-accent" />
            )}
          </div>
        ))}

        <button
          className="hidden md:block px-6 py-2 transition-colors"
          onClick={() => handleTabClick("Contact")}
        >
          Contact
        </button>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-lg md:hidden">
          {["Home", "Features", "Discover"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left px-4 py-2 transition-colors ${
                activeTab === tab
                  ? "text-accent font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
          <button
            className="w-full text-left px-4 py-2 transition-colors"
            onClick={() => handleTabClick("Contact")}
          >
            Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
