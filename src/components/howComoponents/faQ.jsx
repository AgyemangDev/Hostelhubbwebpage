import React, { useState, useEffect , useRef} from 'react'
import { CheckCircle, Clipboard, CreditCard, ChevronRight, Users, BarChart, DollarSign, Award, Gift } from "lucide-react";


const FaQ = () => {
      const [isVisible, setIsVisible] = useState(false);
      const [activeStep, setActiveStep] = useState(0);
      const [counting, setCounting] = useState(false);
      const [count, setCount] = useState(0);
      const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    
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
     const [selectedFAQ, setSelectedFAQ] = useState(null);
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
  return (
    <>
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
    </>
  )
}

export default FaQ