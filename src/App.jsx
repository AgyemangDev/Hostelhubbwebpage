import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Discover from "./components/Discover";
import ContactAndSocialSection from "./components/ContactAndSocialSection";
import WhatsAppChannel from "./components/WhatsAppChannel"; // New Component
import Footer from "./components/Footer";
import "./index.css";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TransactionPolicy from "./components/TransactionPolicy";
import TermsPage from "./components/TermsPage";
import HostelRedirect from "./components/HostelRedirect";

const App = () => {
  // Refs for each section
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const whatsAppRef = useRef(null); // New WhatsApp Channel Section Ref
  const footerRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (sectionRef) => {
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the next section logic
  const scrollToNextSection = () => {
    const sections = [
      heroRef,
      featuresRef,
      testimonialsRef,
      ctaRef,
      whatsAppRef, // Include WhatsApp Section in Scroll Logic
      footerRef,
    ];
    const currentSectionIndex = sections.findIndex(
      (section) =>
        section.current && section.current.getBoundingClientRect().top >= 0
    );

    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex >= sections.length) {
      heroRef.current?.scrollIntoView({ behavior: "smooth" }); // Go back to top
    } else if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex];
      scrollToSection(nextSection);
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
                  heroRef={heroRef}
                  featuresRef={featuresRef}
                  testimonialsRef={testimonialsRef}
                  ctaRef={ctaRef}
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
                <div ref={whatsAppRef}>
                  <WhatsAppChannel scrollToNextSection={scrollToNextSection} />
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
          <Route path="/hostel/:hostelId" element={<HostelRedirect />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
