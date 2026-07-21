"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { displayName: "Home", routeName: "home", path: "/" },
  { displayName: "Hostels", routeName: "hostels", path: "/hostels" },
  { displayName: "Storage", routeName: "storage", path: "/storage" },
  { displayName: "Transport", routeName: "transport", path: "/transport" },
  { displayName: "News/Updates", routeName: "news", path: "/news" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { student, firebaseUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initials =
    isAuthenticated && student
      ? `${student.first_name?.[0] || ""}${student.surname?.[0] || ""}`.toUpperCase()
      : "";

  const isActive = (item) => pathname === item.path || (item.path === "/" && pathname === "/");

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[80%] max-w-5xl h-[65px] rounded-card bg-paper-raised border border-line transition-shadow ${
        isScrolled ? "shadow-xl" : "shadow-md"
      }`}
      style={{ top: "calc(var(--app-banner-height, 0px) + 1rem)" }}
    >
      <div className="mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Home size={26} className="text-maroon" />
          <span className="text-lg font-display font-bold tracking-tight text-ink">HOSTELHUBB</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.routeName}
              href={item.path}
              className={`text-[15px] font-semibold transition-colors ${
                isActive(item) ? "text-maroon" : "text-ink-soft hover:text-maroon"
              }`}
            >
              {item.displayName}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          {isAuthenticated ? (
            <button
              onClick={() => router.push("/account")}
              aria-label="View account"
              className="w-10 h-10 rounded-full bg-maroon text-white font-semibold flex items-center justify-center hover:bg-maroon-dark transition-colors overflow-hidden"
            >
              {firebaseUser?.photoURL ? (
                <img src={firebaseUser.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                initials || <User size={18} />
              )}
            </button>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 text-white text-sm font-semibold rounded-full bg-maroon hover:bg-maroon-dark transition-colors"
            >
              Log in
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-full border border-line"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[70px] right-0 w-64 bg-paper-raised border border-line rounded-card shadow-xl p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.routeName}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 rounded-full font-semibold text-sm ${
                isActive(item) ? "bg-maroon text-white" : "text-ink-soft hover:bg-maroon-50"
              }`}
            >
              {item.displayName}
            </Link>
          ))}
          <div className="border-t border-line pt-3 mt-2">
            {isAuthenticated ? (
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-maroon-50"
              >
                <span className="w-8 h-8 rounded-full bg-maroon text-white text-sm font-semibold flex items-center justify-center overflow-hidden">
                  {initials || <User size={16} />}
                </span>
                <span className="font-semibold">{student?.first_name || "My account"}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center px-4 py-2 text-white font-semibold rounded-full bg-maroon hover:bg-maroon-dark"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;