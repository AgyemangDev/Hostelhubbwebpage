import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Clipboard, CreditCard, ChevronRight, Users, BarChart, DollarSign, Award, Gift } from "lucide-react";

// Simple Link component for demonstration
const Link = ({ href, children }) => (
  <a href={href} className="inline-block">{children}</a>
);

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

  // Simulated commission earnings calculator
  const [commissionData, setCommissionData] = useState({
    referrals: 10,
    conversionRate: 30,
    averageBookingValue: 1000
  });


  // FAQ data
  const faqItems = [
    {
      question: "Who can join the affiliate program?",
      answer: "Our affiliate program is open to student influencers, bloggers, content creators, university representatives, and anyone with an audience interested in student accommodation. We review all applications to ensure alignment with our brand values."
    },
    {
      question: "How and when do I get paid?",
      answer: "We process payments on a monthly basis. Once your commission balance reaches $50, you can request a payout through PayPal, bank transfer, or store credit. All payments are processed within 7 business days of your request."
    },
    {
      question: "What marketing materials do you provide?",
      answer: "We provide a comprehensive range of marketing materials including banner ads, email templates, social media graphics, product images, and text links. All materials are regularly updated to reflect seasonal promotions and campaigns."
    },
    {
      question: "How do I track my referrals and earnings?",
      answer: "Our advanced affiliate dashboard provides real-time tracking of clicks, conversions, and earnings. You can filter data by date ranges, see which properties are converting best, and download detailed reports for your records."
    }
  ];

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

      {/* How It Works Section with Step Animation */}
      <div 
        ref={sectionRefs.steps}
        className={`w-full max-w-6xl px-6 my-16 transition-all duration-1000 transform ${
          visibleSections.steps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">How You'll Benefit</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our affiliate program is designed to reward you generously while providing all the tools you need to succeed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy Sign-Up",
              description: "Complete our simple application process and get approved within 48 hours to start earning.",
              icon: <CheckCircle size={32} className="mb-4 text-[#610b0c]" />
            },
            {
              title: "Powerful Tools",
              description: "Access custom tracking links, marketing materials, and a real-time dashboard to monitor your performance.",
              icon: <Clipboard size={32} className="mb-4 text-[#610b0c]" />
            },
            {
              title: "Generous Rewards",
              description: "Earn up to 20% commission on every successful booking with monthly payments and bonuses.",
              icon: <CreditCard size={32} className="mb-4 text-[#610b0c]" />
            }
          ].map((step, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg p-8 shadow-lg transition-all duration-500 transform ${
                activeStep === index ? "scale-105 shadow-xl border-l-4 border-[#610b0c]" : "scale-100"
              } hover:shadow-xl`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-[#610b0c]/10 ${
                  activeStep === index ? "animate-bounce" : ""
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#610b0c] mb-4 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

  

      {/* Benefits Grid */}
      <div className="w-full max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Affiliate Benefits</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We provide everything you need to succeed as our affiliate partner.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <DollarSign size={24} />,
              title: "Competitive Commission",
              description: "Earn up to 20% on every successful booking referral"
            },
            {
              icon: <Gift size={24} />,
              title: "Bonus Rewards",
              description: "Earn additional bonuses for high-performing months"
            },
            {
              icon: <Award size={24} />,
              title: "Recognition Program",
              description: "Top affiliates receive exclusive perks and priority support"
            },
            {
              icon: <BarChart size={24} />,
              title: "Advanced Dashboard",
              description: "Track your performance in real-time with detailed analytics"
            }
          ].map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#610b0c]/10 rounded-full flex items-center justify-center mb-4">
                <div className="text-[#610b0c]">{benefit.icon}</div>
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div 
        ref={sectionRefs.testimonials}
        className={`max-w-6xl mx-auto w-full px-6 py-16 transition-all duration-1000 transform ${
          visibleSections.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">What Our Affiliates Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Join hundreds of successful affiliates who are already earning with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Morgan",
              role: "Student Blogger",
              image: "/api/placeholder/80/80",
              quote: "I've been able to earn consistent income by helping fellow students find quality accommodation. The dashboard makes it easy to track my performance.",
              earnings: "$1,240 last month"
            },
            {
              name: "Jamie Williams",
              role: "University Ambassador",
              image: "/api/placeholder/80/80",
              quote: "The commission rates are fantastic and the payment process is seamless. I'd recommend this program to anyone in the student housing space.",
              earnings: "$860 last month"
            },
            {
              name: "Taylor Reed",
              role: "Content Creator",
              image: "/api/placeholder/80/80",
              quote: "What impressed me the most was how helpful the support team is. They provided all the materials I needed to succeed and respond quickly to questions.",
              earnings: "$1,520 last month"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-lg shadow-lg transition-all duration-300 transform ${
                index === activeStep % 3 ? "scale-105" : "scale-100"
              }`}
            >
              <div className="flex flex-col">
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="mt-auto flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-[#610b0c]">{testimonial.role}</p>
                    <p className="text-sm font-medium text-green-600 mt-1">{testimonial.earnings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div 
        ref={sectionRefs.faq}
        className={`w-full bg-gray-50 py-16 transition-all duration-1000 transform ${
          visibleSections.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know about our affiliate program.
          </p>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <ChevronRight
                    className={`transform transition-transform ${
                      selectedFAQ === index ? "rotate-90" : ""
                    }`}
                    size={20}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    selectedFAQ === index 
                      ? "max-h-40 pb-4 opacity-100" 
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Animation */}
      <div className="w-full bg-gradient-to-r from-[#610b0c] to-[#912c2d] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join our affiliate program today and turn your influence into income.
          </p>
          
          <div className="space-y-2">
            <Link href="/affiliate-page
            ">
              <button className="bg-white text-[#610b0c] text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 transform w-full sm:w-auto">
                Apply Now
              </button>
            </Link>
            
            <p className="text-white/80 mt-6">
              Applications are reviewed within 24-48 hours
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">No application or monthly fees</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Dedicated affiliate support team</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Monthly payments with no minimum</span>
            </div>
            <div className="flex items-start">
              <div className="text-white mr-2 mt-1">✓</div>
              <span className="text-white/90 text-sm">Comprehensive marketing materials</span>
            </div>
          </div>
          
          <p className="text-white/80 mt-8">
            Questions? Contact our affiliate team at <span className="underline">affiliates@example.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}