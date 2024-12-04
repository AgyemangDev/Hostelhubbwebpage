// TermsNavbar.js
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaArrowLeft } from "react-icons/fa";

function TermsNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center md:justify-center relative">
      {/* Back Button Icon */}
      <Link
        to="/" // Update this path to your main app's home route
        className="text-wine text-2xl p-2 rounded-full hover:bg-wine-light transition duration-300 ease-in-out focus:outline-none md:absolute md:left-4"
        aria-label="Go back to main site"
      >
        <FaArrowLeft />
      </Link>

      {/* Centered Title */}
      <h1 className="text-xl font-bold text-wine mr-10">Policies</h1>

      {/* Hamburger Icon - Only Visible on Mobile */}
      <button
        onClick={toggleMenu}
        className="text-wine text-2xl focus:outline-none md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links - Hidden on small screens unless menu is open */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:space-x-8 ${
          isOpen ? "flex" : "hidden"
        } absolute md:static top-16 left-0 w-full bg-white md:w-auto md:bg-transparent md:space-y-0 space-y-4 p-4 md:p-0 shadow-md md:shadow-none`}
      >
        <Link
          to="/terms"
          className="text-secondary font-medium text-lg transition duration-300  transform hover:scale-110 hover:text-secondary-light hover:underline hover:underline-offset-4"
        >
          General Terms
        </Link>
        <Link
          to="/privacy-policy"
          className="text-secondary font-medium text-lg transition duration-300  transform hover:scale-110 hover:text-secondary-light hover:underline hover:underline-offset-4"
        >
          Privacy
        </Link>
        <Link
          to="/cookie-policy"
          className="text-secondary font-medium text-lg transition duration-300 ease-in-out transform hover:scale-110 hover:text-secondary- hover:underline hover:underline-offset-4"
        >
          Transaction
        </Link>
      </div>
    </nav>
  );
}

export default TermsNavbar;
