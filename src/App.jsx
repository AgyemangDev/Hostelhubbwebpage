import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Discover from "./components/Discover";
import ContactAndSocialSection from "./components/ContactAndSocialSection";
import Footer from "./components/Footer";
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