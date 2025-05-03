

import { useState, useRef, useEffect } from "react"
import { CheckCircle, Clipboard, CreditCard } from "lucide-react"

const RoleSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [counting, setCounting] = useState(false)
  const [count, setCount] = useState(0)
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    steps: false,
    earnings: false,
    testimonials: false,
    faq: false,
  })

  const sectionRefs = {
    hero: useRef(null),
    steps: useRef(null),
    earnings: useRef(null),
    testimonials: useRef(null),
    faq: useRef(null),
  }

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true)

    // Animated step sequence
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(stepInterval)
  }, [])

  // Intersection Observer for section animations
  useEffect(() => {
    const observers = []

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }))
            if (key === "earnings" && !counting) {
              setCounting(true)
            }
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

  // Counter animation
  useEffect(() => {
    if (counting && count < 500) {
      const timer = setTimeout(() => {
        setCount((prev) => prev + 5)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [counting, count])

  return (
    <>
      {/* How It Works Section with Step Animation */}
      <div
        ref={sectionRefs.steps}
        className={`w-full max-w-6xl px-6 my-16 transition-all duration-1000 transform ${
          visibleSections.steps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">How You'll Benefit</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our partner program is designed to reward you generously while providing all the tools you need to succeed as
          a student.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy Sign-Up",
              description:
                "Complete our simple application process and get approved within 48 hours to start earning while you study.",
              icon: <CheckCircle size={32} className="mb-4 text-[#610b0c]" />,
            },
            {
              title: "Powerful Tools",
              description:
                "Access custom tracking links, marketing materials, and a real-time dashboard to monitor your performance between classes.",
              icon: <Clipboard size={32} className="mb-4 text-[#610b0c]" />,
            },
            {
              title: "Generous Rewards",
              description:
                "Earn competitive commissions on every successful booking with monthly payments that help support your student lifestyle.",
              icon: <CreditCard size={32} className="mb-4 text-[#610b0c]" />,
            },
          ].map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-8 shadow-lg transition-all duration-500 transform ${
                activeStep === index ? "scale-105 shadow-xl border-l-4 border-[#610b0c]" : "scale-100"
              } hover:shadow-xl`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full bg-[#610b0c]/10 ${
                    activeStep === index ? "animate-bounce" : ""
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#610b0c] mb-4 mt-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RoleSection
