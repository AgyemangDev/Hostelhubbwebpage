import React from "react";
import StatCard from "./StatCard";
import { Users, Star, Hotel, Shield } from "lucide-react";

const StatsGrid = () => {
  const statsData = [
    {
      value: "10K+",
      label: "Active Users",
      gradient: "bg-gradient-to-br from-rose-500 to-amber-200",
      shadow: "shadow-rose-300",
      icon: Users,
    },
    {
      value: "5.0 Stars",
      label: "User Satisfaction",
      gradient: "bg-gradient-to-br from-purple-800 to-purple-300",
      shadow: "shadow-purple-300",
      icon: Star,
    },
    {
      value: "200+",
      label: "Hostels Available",
      gradient: "bg-gradient-to-br from-teal-500 to-green-500",
      shadow: "shadow-teal-300",
      icon: Hotel,
    },
    {
      value: "100%",
      label: "Secure Payments",
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
      shadow: "shadow-yellow-300",
      icon: Shield,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:w-1/2">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          label={stat.label}
          gradient={stat.gradient}
          shadow={stat.shadow}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;