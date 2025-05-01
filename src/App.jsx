import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Discover from "./components/Discover";
import ContactAndSocialSection from "./components/ContactAndSocialSection";
import WhatsAppChannel from "./components/WhatsAppChannel";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TransactionPolicy from "./components/TransactionPolicy";
import TermsPage from "./components/TermsPage";
import HostelRedirect from "./components/HostelRedirect";
import AffiliatePage from "./components/Affiliate/AffiliatePage";
import AffiliateSuccess from "./components/Affiliate/AffiliateSuccess";
import AgentApplicationSuccess from "./components/Affiliate/AgentApplicationSuccess";
import AgentApplicationFailure from "./components/Affiliate/AgentApplicationFailure";
import AgentDashboard from "./components/AgentDashboard/AgentDashboard";
import AffiliateProgramSection from "./components/AffiliateProgramSection";
import HowAffiliateWorks from "./components/HowAffiliateWorks";
import AgentDashboardLayout from "./components/AgentDashboard/AgentDashboardLayout"; // NEW

import "./index.css";
import DashboardEarnings from "./components/AgentDashboard/Bookings";
import Referall from "./components/AgentDashboard/Referall";
import Settings from "./components/AgentDashboard/DashboardSettings";
import BookingStatsPage from "./components/AgentDashboard/Bookings";
import Earnings from "./components/AgentDashboard/Earnings";
import Login from "./components/Login";

const App = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const whatsAppRef = useRef(null);
  const footerRef = useRef(null);
  const affiliateRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    const sections = [
      heroRef,
      featuresRef,
      testimonialsRef,
      ctaRef,
      whatsAppRef,
      footerRef,
      affiliateRef
    ];
    const currentSectionIndex = sections.findIndex(
      (section) =>
        section.current && section.current.getBoundingClientRect().top >= 0
    );

    const nextSectionIndex = currentSectionIndex + 1;
    if (nextSectionIndex >= sections.length) {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (nextSectionIndex < sections.length) {
      const nextSection = sections[nextSectionIndex];
      scrollToSection(nextSection);
    }
  };

  return (
    <Router>
      <div className="font-sans overflow-x-hidden scroll-smooth relative">
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar
                  heroRef={heroRef}
                  featuresRef={featuresRef}
                  testimonialsRef={testimonialsRef}
                  ctaRef={ctaRef}
                  affiliateRef={affiliateRef}
                  whatsAppRef={whatsAppRef}
                />
                <div ref={heroRef}>
                  <HeroSection scrollToNextSection={scrollToNextSection} />
                </div>
                <div ref={featuresRef}>
                  <FeaturesSection />
                </div>
                <div ref={affiliateRef}>
                  <AffiliateProgramSection />
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

          {/* Policy Pages */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<TransactionPolicy />} />
          <Route path="/hostel/:hostelId" element={<HostelRedirect />} />
          <Route path="/login" element={<Login />} />

          {/* Affiliate Pages */}
          <Route path="/affiliate-page" element={<AffiliatePage />} />
          <Route path="/get-started" element={<HowAffiliateWorks />} />
          <Route path="/affiliate-success" element={<AffiliateSuccess />} />
          <Route path="/agent-application-success" element={<AgentApplicationSuccess />} />
          <Route path="/agent-application-failure" element={<AgentApplicationFailure />} />

          {/* Agent Dashboard with Sidebar Layout */}
          <Route path="/agent-dashboard" element={<AgentDashboardLayout />}>
            <Route index element={<AgentDashboard />} />
            <Route path="agent-dashboard/booking" element={<BookingStatsPage />} />
            <Route path="agent-dashboard/earnings" element={<Earnings />} />
            <Route path="agent-dashboard/referral" element={<Referall />} />
            <Route path="agent-dashboard/settings" element={<Settings />} />
            <Route path=":id" element={<AgentDashboard />} />
            <Route path=":id/:token" element={<AgentDashboard />} />
            <Route path=":id/:token/:referralCode" element={<AgentDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
