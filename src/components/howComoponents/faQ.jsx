"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"

const FaQ = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [visibleSections, setVisibleSections] = useState({
    faq: false,
  })

  const sectionRefs = {
    faq: useRef(null),
  }

  // Intersection Observer for section animations
  useEffect(() => {
    const observers = []

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }))
          }
        },
        { threshold: 0.2 },
      )

      if (ref.current) {
        observer.observe(ref.current)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // FAQ data
  const faqItems = [
    {
      question: "Who can join the HostelHubb Partner Network?",
      answer:
        "Our partner program is exclusively for currently enrolled students. We welcome students from all academic backgrounds who are interested in helping fellow students find accommodation, manage storage, or create content for our platform.",
    },
    {
      question: "How and when do I get paid as a partner?",
      answer:
        "We process payments on a monthly basis. For affiliates and agents, you'll earn commissions on successful bookings. Receptionists and storage assistants receive stipends based on hours worked and performance. Videographers and designers are compensated per project. All payments are processed within 7 business days after the end of each month.",
    },
    {
      question: "What marketing materials do you provide for affiliates?",
      answer:
        "We provide a comprehensive range of marketing materials including digital flyers, email templates, social media graphics, presentation templates, and text links. All materials are regularly updated to reflect seasonal promotions and campaigns, and are designed specifically for a student audience.",
    },
    {
      question: "How do I track my referrals and earnings?",
      answer:
        "Our partner dashboard provides real-time tracking of clicks, conversions, and earnings. You can filter data by date ranges, see which properties are converting best, and download detailed reports for your records. The dashboard is mobile-friendly so you can check your stats between classes.",
    },
    {
      question: "Can I work as a partner while taking classes?",
      answer:
        "Our program is specifically designed to work around your class schedule. You can set your own hours and work as much or as little as you want. Many of our most successful partners balance their partner activities with full course loads.",
    },
    {
      question: "What kind of support will I receive as a partner?",
      answer:
        "You'll have access to a dedicated partner success manager who can answer questions and provide guidance. We also offer regular training sessions, a partner community forum, and resources to help you maximize your earnings while maintaining your academic focus.",
    },
    {
      question: "Is there a minimum time commitment required?",
      answer:
        "There's no strict minimum time commitment, but we do expect our partners to be actively engaged. Most successful partners dedicate at least 5-10 hours per week to their role, but this can be flexible around exam periods and academic commitments.",
    },
    {
      question: "Can international students join the partner program?",
      answer:
        "Yes, international students are welcome to apply as long as they are currently enrolled at a recognized educational institution and have the legal right to work in their country of study. Please check your student visa requirements before applying.",
    },
  ]

  return (
    <>
      {/* FAQ Section */}
      <div
        ref={sectionRefs.faq}
        className={`w-full bg-gray-50 py-16 transition-all duration-1000 transform ${
          visibleSections.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know about our student partner program.
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
                    className={`transform transition-transform ${selectedFAQ === index ? "rotate-90" : ""}`}
                    size={20}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    selectedFAQ === index ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions about the HostelHubb Partner Network?</p>
            <button className="bg-[#610b0c] hover:bg-[#912c2d] text-white font-bold py-2 px-6 rounded-full transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FaQ
