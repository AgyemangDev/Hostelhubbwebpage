import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Discover from "./Discover";
import ContactAndSocialSection from "./ContactAndSocialSection";
import WhatsAppChannel from "./WhatsAppChannel";
import Footer from "./Footer";
import HostelhubbWork from "./HowWeWork/HostelhubbWork";


const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howweworkRef = useRef(null);
  const sellerRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const whatsAppRef = useRef(null);
  const footerRef = useRef(null);
  

  const sectionRefs = {
    hero: heroRef,
    seller: sellerRef,
    howwework: howweworkRef,
    testimonials: testimonialsRef,
    whatsapp: whatsAppRef,
    cta: ctaRef,
    footer: footerRef,
  };

  // Handle section scroll from URL params
  useEffect(() => {
    const section = searchParams.get("section");
    if (section && sectionRefs[section]?.current) {
      setTimeout(() => {
        sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
        // Clear the param after scrolling
        setSearchParams({});
      }, 100);
    }
  }, [searchParams]);

  const scrollToSection = (sectionRef) => {
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    const sections = [
      heroRef,
      featuresRef,
      sellerRef,
      testimonialsRef,
      ctaRef,
      whatsAppRef,
      footerRef,
   
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
    <>
      <Navbar
        heroRef={heroRef}
        featuresRef={featuresRef}
        howweworkRef={howweworkRef}
        testimonialsRef={testimonialsRef}
        ctaRef={ctaRef}
        whatsAppRef={whatsAppRef}
      />
      <div ref={heroRef}>
        <HeroSection scrollToNextSection={scrollToNextSection} />
      </div>

   

      <div ref={howweworkRef}>
        <HostelhubbWork />
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
  );
};

export default HomePage;
