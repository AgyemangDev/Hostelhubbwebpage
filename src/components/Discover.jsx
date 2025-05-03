
import React from "react";
import DiscoverInfoCard from "./DiscoverComponents/DiscoverInfoCard";
import StatsGrid from "./DiscoverComponents/StatsGrid";

const Discover = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
    Why Choose HostelHubb?
  </h2>
  <p className="mt-4 text-lg text-gray-600">
    Simplifying Student Living with Hostels & Storage You Can Trust
  </p>
</div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <DiscoverInfoCard />
          <StatsGrid />
        </div>
      </div>
    </div>
  );
};

export default Discover;