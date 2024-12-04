import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Discover from "./components/Discover";
import ContactAndSocialSection from "./components/ContactAndSocialSection";
import Footer from "./components/Footer";
import { FaArrowDown } from "react-icons/fa";
import "./index.css";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TransactionPolicy from "./components/TransactionPolicy";
import TermsPage from "./components/TermsPage";

const App = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  const [buttonText, setButtonText] = useState("Click Me!");
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to the next section
  const scrollToNextSection = () => {
    const sections = [heroRef, featuresRef, testimonialsRef, ctaRef, footerRef];
    const currentSectionIndex = sections.findIndex(
      (section) =>
        section.current && section.current.getBoundingClientRect().top >= 0
    );

    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex >= sections.length) {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex];
      nextSection?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrollPosition) {
        setButtonText("Go Back");
      } else {
        setButtonText("Click Me!");
      }

      const heroBottom = heroRef.current?.getBoundingClientRect().bottom || 0;
      setShowScrollButton(heroBottom < window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="font-sans overflow-x-hidden scroll-smooth relative">
        <Routes>
          {/* Main Route */}
          <Route
            path="/"
            element={
              <>
                {/* Navbar */}
                <Navbar
                  ctaRef={ctaRef}
                  featuresRef={featuresRef}
                  testimonialsRef={testimonialsRef}
                />

                {/* Sections */}
                <div ref={heroRef}>
                  <HeroSection scrollToNextSection={scrollToNextSection} />
                </div>
                <div ref={featuresRef}>
                  <FeaturesSection />
                </div>
                <div ref={testimonialsRef}>
                  <Discover />
                </div>
                <div ref={ctaRef}>
                  <ContactAndSocialSection />
                </div>
                <div ref={footerRef}>
                  <Footer />
                </div>

                {/* Scroll Button */}
                {showScrollButton && (
                  <button
                    onClick={scrollToNextSection}
                    className="fixed bottom-6 left-6 p-4 bg-secondary text-white rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  >
                    <span className="flex items-center">
                      <FaArrowDown size={24} className="mr-2 animate-bounce" />
                      <span className="text-lg animate-pulse">
                        {buttonText}
                      </span>
                    </span>
                  </button>
                )}
              </>
            }
          />

          {/* Policy Routes */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<TransactionPolicy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
