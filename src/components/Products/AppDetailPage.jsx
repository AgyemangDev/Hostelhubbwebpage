import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Star, Smartphone, Check } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import appleStore from "../../assets/apple.png";
import playStore from "../../assets/playstore.png";

// Flux screenshots
import flux1 from "../../assets/flux1.jpeg";
import flux2 from "../../assets/flux2.jpeg";
import flux3 from "../../assets/flux3.jpeg";
import flux4 from "../../assets/flux4.jpeg";
import flux5 from "../../assets/flux5.jpeg";

// App logos from public folder
const hostelhubbLogo = "/logo192.png";
const fluxLogo = "/flux.png";

const appsData = {
  "hostelhubb-client": {
    name: "HostelHubb",
    tagline: "Hostel Accommodation & Storage Reservation",
    description: "Find accommodation and storage — fast, easy & secure! Whether it's affordable student accommodation or secure storage close to you, we've got options that fit your budget and lifestyle.",
    longDescription: "HostelHubb is the ultimate platform for students seeking hostel accommodation and secure storage solutions. Browse verified hostel listings near your institution, express interest in multiple hostels, and get approved by hostel managers. Need to store your belongings during vacation? Our storage service handles pickup, secure storage, and delivery right back to you. With real-time booking confirmations, secure payments, and 24/7 support, HostelHubb simplifies student living like never before.",
    logo: hostelhubbLogo,
    color: "from-[#fff5f5] to-[#fecaca]",
    bgColor: "bg-[#9a0b0d]",
    textColor: "text-gray-900",
    subtextColor: "text-gray-700",
    backLinkColor: "text-gray-600 hover:text-gray-900",
    features: [
      { title: "Hostel Booking", desc: "Browse and book verified student accommodations near your institution with ease" },
      { title: "Storage Services", desc: "Secure storage with convenient pickup and delivery — perfect for vacations" },
      { title: "Express Interest", desc: "Reserve hostels you're interested in. Multiple bookings allowed until approved" },
      { title: "Real-time Updates", desc: "Get instant booking confirmations and status updates from hostel managers" },
      { title: "Secure Payments", desc: "Safe payment processing with HostelHubb receipts for all transactions" },
      { title: "24/7 Support", desc: "Get help whenever you need it with our always-available support team" },
    ],
    screenshots: [],
    rating: 4.8,
    reviews: "2.5K",
    downloads: "10K+",
    version: "1.0.0",
    size: "45 MB",
    updated: "Dec 2024",
    platform: "iOS & Android",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb",
    appStoreLink: "https://apps.apple.com/us/app/hostelhubb/id6738483533",
    tips: [
      "Select your institution during signup to see nearby hostels",
      "You can express interest in multiple hostels at once",
      "Pay the subscription fee for semi-annual platform access",
      "Complete hostel payment within 24 hours of approval to secure your spot",
      "For storage, choose your preferred pickup point at any available hall on campus",
    ],
  },
  "hostelhubb-admin": {
    name: "HostelHubb Seller",
    tagline: "Sell to students on the fastest-growing platform",
    description: "Join the best and fastest-selling platform for student products. Set up your store, get approved, and start selling instantly to thousands of students on HostelHubb.",
    longDescription: "HostelHubb Seller is your gateway to reaching thousands of students looking for products and services. Create your seller account, set up your store with all necessary details, and get approved by our team. Once verified, add your products and start selling instantly. Access your seller dashboard to manage orders, track analytics, view notifications, and grow your business. Join our growing network of sellers and tap into the student market today.",
    logo: hostelhubbLogo,
    color: "from-[#f0f4f8] to-[#c7d9e8]",
    bgColor: "bg-[#1e3a5f]",
    textColor: "text-gray-900",
    subtextColor: "text-gray-700",
    backLinkColor: "text-gray-600 hover:text-gray-900",
    features: [
      { title: "Easy Store Setup", desc: "Create your store with all necessary details through our web platform" },
      { title: "Quick Approval", desc: "Our team reviews your store to ensure quality and authenticity" },
      { title: "Product Management", desc: "Add, edit, and manage your product listings with ease" },
      { title: "Order Tracking", desc: "View and manage all incoming orders in real-time" },
      { title: "Analytics Dashboard", desc: "Track your sales performance and business insights" },
      { title: "Notifications", desc: "Stay updated on new orders, approvals, and important updates" },
    ],
    screenshots: [],
    rating: 4.7,
    reviews: "850",
    downloads: "5K+",
    version: "1.0.0",
    size: "52 MB",
    updated: "Dec 2024",
    platform: "Web Dashboard",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb",
    appStoreLink: "https://apps.apple.com/us/app/hostelhubb/id6738483533",
    tips: [
      "Download the HostelHubb app first to create your account",
      "Access the web platform to set up your seller store",
      "Add high-quality product images to attract more buyers",
      "Respond quickly to orders to maintain good seller ratings",
    ],
  },
  "flux": {
    name: "Flux",
    tagline: "A beautiful, privacy-focused task management app",
    description: "Keep everything on your device. Flux is a stunning task manager with calendar sync, smart alarms, and timelines — all while keeping your data 100% private and offline.",
    longDescription: "Flux is your personal productivity companion built with privacy at its core. Create and organize tasks with priorities, sync with your device calendars (Google, iCloud, Outlook), set smart alarms with snooze and repeat options, and organize your work into focused time blocks with Timelines. All your data stays on your device — no accounts, no cloud, no tracking. Protected by Face ID, Touch ID, or your device passcode. Made with ❤️ for people who value their privacy.",
    logo: fluxLogo,
    color: "from-[#f5f0ff] to-[#ddd6fe]",
    bgColor: "bg-[#6b21a8]",
    textColor: "text-gray-900",
    subtextColor: "text-gray-700",
    backLinkColor: "text-gray-600 hover:text-gray-900",
    features: [
      { title: "Task Management", desc: "Create, edit, and organize tasks with priorities (Low, Medium, High, Urgent) and track status with satisfying animations" },
      { title: "Calendar Integration", desc: "Sync with Google, iCloud, Outlook and more. Import events as tasks with color-coded organization" },
      { title: "Smart Alarms", desc: "Set alarms with quick presets, repeat options (Daily, Weekly, Monthly), and snooze functionality" },
      { title: "Timelines", desc: "Create focused work sessions, organize tasks into time blocks, and track actual vs estimated duration" },
      { title: "Privacy First", desc: "100% offline, biometric authentication, no account required. Your data never leaves your device" },
      { title: "Beautiful Design", desc: "Clean modern interface with smooth animations, dark mode support, and haptic feedback" },
    ],
    screenshots: [flux1, flux2, flux3, flux4, flux5],
    rating: 4.9,
    reviews: "3.2K",
    downloads: "15K+",
    version: "1.0.0",
    size: "38 MB",
    updated: "Dec 2024",
    platform: "iOS & Android",
    builtWith: "React Native 0.81 • Expo SDK 54",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.flux.time",
    appStoreLink: "https://apps.apple.com/app/flux-time",
    tips: [
      "Swipe tasks to quickly complete or delete them",
      "Long press on the tab bar for quick actions",
      "Pull to refresh to sync calendar events",
      "Tap the alarm preview to see exactly when it will ring",
    ],
  },
};

const AppDetailPage = () => {
  const { appId } = useParams();
  const app = appsData[appId];

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">App not found</h1>
          <Link to="/products" className="text-[#9a0b0d] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${app.color} pt-28 pb-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/products"
            className={`inline-flex items-center ${app.backLinkColor} mb-8 transition-colors`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* App Icon */}
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
              <img src={app.logo} alt={app.name} className="w-24 h-24 object-contain" />
            </div>

            {/* App Info */}
            <div className="flex-1">
              <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${app.textColor}`}>{app.name}</h1>
              <p className={`text-xl ${app.subtextColor} mb-4`}>{app.tagline}</p>
              <p className={`${app.subtextColor} max-w-2xl mb-6`}>{app.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className={`font-semibold ${app.textColor}`}>{app.rating}</span>
                  <span className={app.subtextColor}>({app.reviews} reviews)</span>
                </div>
                <div className={`flex items-center gap-2 ${app.textColor}`}>
                  <Download size={20} />
                  <span>{app.downloads} downloads</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={app.playStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <img src={playStore} alt="Play Store" className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
                <a
                  href={app.appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <img src={appleStore} alt="App Store" className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About {app.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            {app.longDescription}
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${app.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <Check size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Screenshots</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 px-2">
            {app.screenshots.map((screenshot, idx) => (
              <div
                key={idx}
                className="shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-gray-800 bg-gray-800"
              >
                <img 
                  src={screenshot} 
                  alt={`${app.name} screenshot ${idx + 1}`}
                  className="h-[500px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section - Only for apps with tips */}
        {app.tips && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">💡 Tips</h2>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
              <ul className="space-y-4">
                {app.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* App Info */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">App Information</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-gray-500 text-sm mb-1">Version</div>
              <div className="font-semibold text-gray-900">{app.version}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Size</div>
              <div className="font-semibold text-gray-900">{app.size}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm mb-1">Last Updated</div>
              <div className="font-semibold text-gray-900">{app.updated}</div>
            </div>
            {app.platform && (
              <div>
                <div className="text-gray-500 text-sm mb-1">Platform</div>
                <div className="font-semibold text-gray-900">{app.platform}</div>
              </div>
            )}
            {app.builtWith && (
              <div className="md:col-span-2">
                <div className="text-gray-500 text-sm mb-1">Built With</div>
                <div className="font-semibold text-gray-900">{app.builtWith}</div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AppDetailPage;
