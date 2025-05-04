import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  MapPin,
  Phone,
  Users,
  Megaphone,
  Camera,
  Palette,
  Truck,
  ClipboardCheck,
  Award,
  DollarSign,
  Gift,
  ChevronRight,
} from "lucide-react";

export default function JobOpenings() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePosition, setActivePosition] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    openings: false,
    whyJoin: false,
  });

  const sectionRefs = {
    hero: useRef(null),
    openings: useRef(null),
    whyJoin: useRef(null),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);

    // Animated position rotation
    const positionInterval = setInterval(() => {
      setActivePosition((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(positionInterval);
  }, []);

  // Intersection Observer for section animations
  useEffect(() => {
    const observers = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
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
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Job listings data
  const jobOpenings = [
    {
      title: "Customer Service Receptionist",
      count: "2-3 positions",
      description:
        "Handle the dashboard, make calls to hostel managers and students regarding bookings, and intervene to speed up processes when needed.",
      icon: <Phone className="w-8 h-8 text-[#610b0c]" />,
    },
    {
      title: "Grounds Marketing Personnel",
      count: "Multiple positions",
      description:
        "Conduct on-site advertisement for hostels booking and storage services during peak seasons.",
      icon: <Megaphone className="w-8 h-8 text-[#610b0c]" />,
    },
    {
      title: "Student Pickup Assistant",
      count: "3 per hall",
      description:
        "Assist students with move-in and pickup services, assigned specifically to individual residence halls.",
      icon: <Truck className="w-8 h-8 text-[#610b0c]" />,
    },
    {
      title: "Hostel Onboarding Specialist",
      count: "Multiple positions",
      description:
        "Assist with uploading more hostels on board, including data collection and verification.",
      icon: <ClipboardCheck className="w-8 h-8 text-[#610b0c]" />,
    },
    {
      title: "Graphic Designer",
      count: "1 position",
      description:
        "Create compelling visual assets for our marketing campaigns across digital and print media.",
      icon: <Palette className="w-8 h-8 text-[#610b0c]" />,
    },
    {
      title: "Videographer",
      count: "1 position",
      description:
        "Produce high-quality video content showcasing our properties and services for marketing purposes.",
      icon: <Camera className="w-8 h-8 text-[#610b0c]" />,
    },
  ];

  // Why Join reasons
  const whyJoinReasons = [
    {
      title: "Competitive Compensation",
      description:
        "Enjoy competitive salaries and bonus opportunities based on performance.",
      icon: <DollarSign className="h-8 w-8 text-[#610b0c]" />,
    },
    {
      title: "Growth Opportunities",
      description:
        "Be part of a rapidly expanding company with clear paths for career advancement.",
      icon: <Award className="h-8 w-8 text-[#610b0c]" />,
    },
    {
      title: "Team Environment",
      description:
        "Work alongside passionate colleagues in a collaborative and supportive culture.",
      icon: <Users className="h-8 w-8 text-[#610b0c]" />,
    },
    {
      title: "Employee Benefits",
      description:
        "Access to exclusive perks, flexible schedules, and recognition programs.",
      icon: <Gift className="h-8 w-8 text-[#610b0c]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-start overflow-hidden">
      {/* Hero Section with Animation */}
      <div
        ref={sectionRefs.hero}
        className={`text-center max-w-3xl mt-16 px-6 transition-all duration-1000 transform ${
          visibleSections.hero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-block mb-6 relative">
          <div className="absolute -right-4 -top-4 bg-[#610b0c] text-white text-sm font-bold rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
            New
          </div>
          <span className="bg-[#610b0c]/10 text-[#610b0c] font-medium py-2 px-4 rounded-full">
            We're Hiring!
          </span>
        </div>

        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#610b0c] to-[#912c2d] text-transparent bg-clip-text">
          Join Our Dynamic Team
        </h1>
        <p className="text-gray-600 text-xl mb-6">
          Be part of our mission to provide premium student accommodations and
          help shape the future of student housing services.
        </p>

        {/* Featured position - rotating */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8 mb-8 transition-all duration-500 transform hover:scale-105">
          <div className="flex items-center justify-center mb-4">
            {jobOpenings[activePosition].icon}
            <h3 className="text-2xl font-bold ml-3 text-[#610b0c]">
              {jobOpenings[activePosition].title}
            </h3>
          </div>
          <p className="text-gray-600">
            {jobOpenings[activePosition].description}
          </p>
          <div className="mt-4">
            <span className="bg-[#610b0c]/10 text-[#610b0c] text-sm font-medium py-1 px-3 rounded-full">
              {jobOpenings[activePosition].count}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="#openings"
            className="bg-[#610b0c] hover:bg-[#7a1011] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 inline-block"
          >
            View All Openings
          </a>
        </div>
      </div>

      {/* Job Openings Section */}
      <div
        id="openings"
        ref={sectionRefs.openings}
        className={`w-full max-w-5xl px-6 my-16 transition-all duration-1000 transform ${
          visibleSections.openings
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Current Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobOpenings.map((job, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                index === activePosition ? "ring-2 ring-[#610b0c]" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="bg-[#610b0c]/10 p-3 rounded-lg">
                    {job.icon}
                  </div>
                  <span className="bg-[#610b0c]/10 text-[#610b0c] text-sm font-medium py-1 px-3 rounded-full">
                    {job.count}
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-4 text-gray-800">
                  {job.title}
                </h3>
                <p className="mt-4 text-gray-600">{job.description}</p>

                <div className="mt-6">
                  <a
                    href="/affiliate-page"
                    className="text-[#610b0c] font-medium hover:text-[#7a1011] transition-colors duration-300 flex items-center"
                  >
                    Apply for this position
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Join Us Section */}
      <div
        ref={sectionRefs.whyJoin}
        className={`w-full bg-[#610b0c]/5 py-16 transition-all duration-1000 transform ${
          visibleSections.whyJoin
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Join Our Team?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyJoinReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-[#610b0c]/10 p-3 rounded-lg">
                    {reason.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-[#610b0c]">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#610b0c] mb-4">
                Ready to Apply?
              </h3>
              <p className="text-gray-600 mb-6">
                Join our team of passionate professionals dedicated to
                transforming student accommodation experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/affiliate-page"
                  className="bg-[#610b0c] hover:bg-[#7a1011] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Apply Now
                </a>
                <a
                  href="tel:+0595116541"
                  className="border border-[#610b0c] text-[#610b0c] hover:bg-[#610b0c]/10 font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="w-full max-w-5xl px-6 my-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#610b0c]">
            Our Company Values
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#610b0c]/10 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#610b0c]" />
              </div>
              <h3 className="font-bold text-gray-800">Teamwork</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#610b0c]/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-[#610b0c]" />
              </div>
              <h3 className="font-bold text-gray-800">Excellence</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#610b0c]/10 flex items-center justify-center mb-4">
                <Megaphone className="w-8 h-8 text-[#610b0c]" />
              </div>
              <h3 className="font-bold text-gray-800">Innovation</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#610b0c]/10 flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-[#610b0c]" />
              </div>
              <h3 className="font-bold text-gray-800">Integrity</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
