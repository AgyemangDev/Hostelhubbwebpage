import React from "react";
import StatCard from "./StatCard";
import { Users, Star, Hotel, Shield } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "5.0", label: "User Rating", icon: Star },
    { value: "200+", label: "Hostels", icon: Hotel },
    { value: "100%", label: "Secure Payments", icon: Shield },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
};

export default StatsGrid;
