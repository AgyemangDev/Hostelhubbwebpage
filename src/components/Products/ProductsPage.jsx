import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

// App logos from public folder
const hostelhubbLogo = "/logo192.png";
const fluxLogo = "/flux.png";

const apps = [
  {
    id: "hostelhubb-client",
    name: "HostelHubb",
    tagline: "Accommodation & Storage Reservation",
    description: "Find student accommodation and secure storage — fast, easy & secure! Book hostels and storage services near your institution.",
    logo: hostelhubbLogo,
    color: "from-[#fff5f5] to-[#ffe0e0]",
    borderColor: "border-[#9a0b0d]/20",
    features: ["Hostel booking", "Storage services", "Real-time updates", "Secure payments"],
  },
  {
    id: "hostelhubb-admin",
    name: "HostelHubb Seller",
    tagline: "Sell to students instantly",
    description: "Join the fastest-selling platform for student products. Set up your store, get approved, and start selling to thousands of students.",
    logo: hostelhubbLogo,
    color: "from-[#f0f4f8] to-[#d9e4ed]",
    borderColor: "border-[#1e3a5f]/20",
    features: ["Store setup", "Order tracking", "Analytics", "Product management"],
  },
  {
    id: "flux",
    name: "Flux",
    tagline: "Privacy-focused task management",
    description: "A beautiful task manager with calendar sync, smart alarms, and timelines. 100% offline — your data never leaves your device.",
    logo: fluxLogo,
    color: "from-[#f5f0ff] to-[#e9dfff]",
    borderColor: "border-[#6b21a8]/20",
    features: ["Task management", "Calendar sync", "Smart alarms", "Timelines", "Privacy first"],
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#9a0b0d]">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our suite of apps designed to make your life easier. From hostel management to personal productivity.
          </p>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link
              key={app.id}
              to={`/products/${app.id}`}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#9a0b0d]/20 hover:-translate-y-2"
            >
              {/* App Icon Header */}
              <div className={`bg-gradient-to-br ${app.color} p-8 flex items-center justify-center`}>
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden">
                  <img src={app.logo} alt={app.name} className="w-20 h-20 object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{app.name}</h3>
                <p className="text-[#9a0b0d] font-medium mb-3">{app.tagline}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{app.description}</p>

                {/* Features Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {app.features.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                      +{app.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center text-[#9a0b0d] font-semibold group-hover:gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#9a0b0d] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-white/80">Apps in Service</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Hostels Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
