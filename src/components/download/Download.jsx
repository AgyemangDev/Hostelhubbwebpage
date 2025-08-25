import React from 'react';
import Logo from "../../assets/icon.png";

function Download() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-28 h-28 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-2xl bg-white ring-4 ring-red-100">
            <img src={Logo} alt="HostelHubb Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">HostelHubb</h1>
          <p className="text-gray-600 text-xl font-medium">Hostel Accommodation & Storage Reservation</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Download the App</h2>
            <p className="text-gray-600 leading-relaxed">Access student accommodation and secure storage solutions right from your mobile device. Book, manage, and connect with ease.</p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-8">
            {/* App Store Button */}
            <a 
              href="https://apps.apple.com/us/app/hostelhubb/id6738483533"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1 sm:flex-initial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-10 h-10 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </a>

            {/* Google Play Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1 sm:flex-initial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-10 h-10 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </a>
          </div>

          {/* Device Compatibility */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full">
              <svg className="w-4 h-4 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9,1C7.89,1 7,1.89 7,3V4H8V3A1,1 0 0,1 9,1H15A1,1 0 0,1 16,3V4H17V3C17,1.89 16.11,1 15,1H9M12,2A1,1 0 0,0 11,3A1,1 0 0,0 12,4A1,1 0 0,0 13,3A1,1 0 0,0 12,2M7,5V6H17V5H22V7H20V19A2,2 0 0,1 18,21H6A2,2 0 0,1 4,19V7H2V5H7M6,7V19H18V7H6Z"/>
              </svg>
              <span className="text-red-700 text-sm font-medium">Available for iOS and Android</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hostel Booking Feature */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hostel Booking</h3>
                <p className="text-gray-600 text-sm">Find & book student accommodation</p>
              </div>
            </div>
            <div className="flex items-center text-red-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
              </svg>
              <span className="text-sm font-medium">Easy & Secure</span>
            </div>
          </div>

          {/* Storage Booking Feature */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Storage Solutions</h3>
                <p className="text-gray-600 text-sm">Reserve secure storage spaces</p>
              </div>
            </div>
            <div className="flex items-center text-red-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
              <span className="text-sm font-medium">Fully Secure</span>
            </div>
          </div>

          {/* Real-time Updates Feature */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Real-time Updates</h3>
                <p className="text-gray-600 text-sm">Get instant booking confirmations</p>
              </div>
            </div>
            <div className="flex items-center text-red-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              <span className="text-sm font-medium">Instant Alerts</span>
            </div>
          </div>

          {/* Support Feature */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Get help whenever you need it</p>
              </div>
            </div>
            <div className="flex items-center text-red-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z"/>
              </svg>
              <span className="text-sm font-medium">Always Available</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">Join thousands of students who trust HostelHubb</p>
        </div>
      </div>
    </div>
  );
}

export default Download;