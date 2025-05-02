import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Clipboard, CreditCard, ChevronRight, Users, BarChart, DollarSign, Award, Gift } from "lucide-react";
import { ApplySection } from "./howComoponents/applySection";
import { Link } from "react-router-dom";
import Page from "./howComoponents/page";
import FaQ from "./howComoponents/faQ";

// Simple Link component for demonstration


export default function AffiliateProgram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    steps: false,
    earnings: false,
    testimonials: false,
    faq: false
  });
  
  const sectionRefs = {
    hero: useRef(null),
    steps: useRef(null),
    earnings: useRef(null),
    testimonials: useRef(null),
    faq: useRef(null)
  };

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
    
    // Animated step sequence
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(stepInterval);
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observers = [];
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [key]: true }));
            if (key === 'earnings' && !counting) {
              setCounting(true);
            }
          }
        },
        { threshold: 0.2 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (counting && count < 500) {
      const timer = setTimeout(() => {
        setCount(prev => prev + 5);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [counting, count]);

  // Timeline data
  const timelineSteps = [
    { title: "Apply", description: "Complete your affiliate application" },
    { title: "Review", description: "Our team reviews your application (24-48 hours)" },
    { title: "Approval", description: "Receive your unique affiliate link and dashboard access" },
    { title: "Promote", description: "Share your link through your preferred channels" },
    { title: "Earn", description: "Earn commissions on successful bookings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-start overflow-hidden">
      {/* Hero Section with Animation */}
      <div 
        ref={sectionRefs.hero}
        className={`text-center max-w-3xl mt-16 px-6 transition-all duration-1000 transform ${
          visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-block mb-6 relative">
          <div className="absolute -right-4 -top-4 bg-[#610b0c] text-white text-sm font-bold rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
            New
          </div>
          <span className="bg-[#610b0c]/10 text-[#610b0c] font-medium py-2 px-4 rounded-full">
            Affiliate Program
          </span>
        </div>
        
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#610b0c] to-[#912c2d] text-transparent bg-clip-text">
          Turn Your Influence Into Income
        </h1>
        <p className="text-gray-600 text-xl mb-6">
          Join our network of successful affiliates promoting premium student accommodations and earn up to 20% commission on every booking.
        </p>
        
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mt-8 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DollarSign className="h-6 w-6 text-[#610b0c] mx-auto mb-2" />
            <p className="text-2xl font-bold">{count > 450 ? "15%" : `${Math.floor(count/50)}%`}</p>
            <p className="text-sm text-gray-500">Base Commission</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Users className="h-6 w-6 text-[#610b0c] mx-auto mb-2" />
            <p className="text-2xl font-bold">{count}+</p>
            <p className="text-sm text-gray-500">Active Affiliates</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <BarChart className="h-6 w-6 text-[#610b0c] mx-auto mb-2" />
            <p className="text-2xl font-bold">30%</p>
            <p className="text-sm text-gray-500">Avg. Conversion</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/affiliate-page">
            <button className="bg-[#610b0c] hover:bg-[#7e1f24] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:transform hover:scale-105">
              Apply Now
            </button>
          </Link>
          
        </div>
      </div>
      
    

      {/* Timeline Section */}
      <div className="w-full max-w-5xl px-6 my-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Your Journey with Us</h2>
        
        <div className="relative">
          {/* Horizontal line connecting dots */}
          <div className="absolute top-10 left-0 w-full h-1 bg-gray-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full bg-[#610b0c] text-white flex items-center justify-center z-10 mb-4 ${
                  index === activeStep % timelineSteps.length ? "ring-4 ring-[#610b0c]/20" : ""
                }`}>
                  {index + 1}
                </div>
                <h4 className="font-bold text-[#610b0c] mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ApplySection />
      <Page />
      <FaQ />
  

      

     
   
    </div>
  );
}