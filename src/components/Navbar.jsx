"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Home, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  heroRef,
  featuresRef,
  sellerRef,
  testimonialsRef,
  ctaRef,
  affiliateRef,
  howweworkRef,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { displayName: "Home", routeName: "home", ref: heroRef },
    { displayName: "Seller", routeName: "seller", ref: sellerRef },
    // { displayName: "Features", routeName: "features", ref: featuresRef },
    { displayName: "How We Work", routeName: "howwework", ref: howweworkRef },
    { displayName: "Affiliate", routeName: "affiliate", ref: affiliateRef },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item) => {
    setActiveRoute(item.routeName);
    if (item.ref?.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[80%] max-w-5xl h-[65px] rounded-2xl bg-white border border-gray-200 shadow-xl">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
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

          {/* CTA Button Placeholder (optional) */}
          <div className="hidden md:flex">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 text-white font-semibold rounded-full bg-[#9a0b0d] hover:bg-[#7c070a] transition-all"
            >
              Agent Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 w-64 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl transition-all duration-300">
          <div className="px-4 py-5 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.routeName}
                onClick={() => handleNavigation(item)}
                className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 ease-in-out overflow-hidden
    ${
      activeRoute === item.routeName
        ? "text-white"
        : "text-gray-800 hover:text-[#9a0b0d]"
    }
    group
  `}
              >
                {/* Bubble animation for active item */}
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out z-0
      ${
        activeRoute === item.routeName
          ? "bg-[#9a0b0d] scale-100 shadow-md"
          : "scale-0"
      }
      group-hover:scale-100 group-hover:bg-[#9a0b0d]/10
    `}
                ></span>

                {/* Text above background */}
                <span className="relative z-10">{item.displayName}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 px-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
              className="w-full px-4 py-2 text-white font-semibold rounded-full bg-[#9a0b0d] hover:bg-[#7c070a] transition-all"
            >
              Agent Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
