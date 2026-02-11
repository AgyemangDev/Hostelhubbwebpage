import React from "react";
import DiscoverInfoCard from "./DiscoverComponents/DiscoverInfoCard";
import StatsGrid from "./DiscoverComponents/StatsGrid";

const Discover = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - text and info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[#610b0c] to-[#8b1214] bg-clip-text text-transparent">
                  HostelHubb?
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Experience effortless hostel booking and management. From
                verified listings to secure payments and real-time updates —
                HostelHubb simplifies student living like never before.
              </p>
            </div>
            <DiscoverInfoCard />
          </div>

          {/* Right side - statistics */}
          <div className="w-full">
            <StatsGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
