import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Users, ShoppingCart, DollarSign, TrendingUp, Calendar, BarChart2 } from "lucide-react";

const ReferralStats = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  
  // Mock data for different timeframes
  const statsData = {
    daily: {
      totalReferrals: 5,
      previousReferrals: 3,
      conversions: 2,
      previousConversions: 1,
      earnings: 20.00,
      previousEarnings: 15.00,
      currency: "GHC"
    },
    weekly: {
      totalReferrals: 17,
      previousReferrals: 13,
      conversions: 6,
      previousConversions: 4,
      earnings: 85.00,
      previousEarnings: 60.00,
      currency: "GHC"
    },
    monthly: {
      totalReferrals: 48,
      previousReferrals: 36,
      conversions: 12,
      previousConversions: 8,
      earnings: 180.00,
      previousEarnings: 120.00,
      currency: "GHC"
    }
  };
  
  // Get current stats based on selected timeframe
  const stats = statsData[timeframe];
  
  // Calculate percentage changes
  const referralChange = ((stats.totalReferrals - stats.previousReferrals) / stats.previousReferrals) * 100;
  const conversionChange = ((stats.conversions - stats.previousConversions) / stats.previousConversions) * 100;
  const earningsChange = ((stats.earnings - stats.previousEarnings) / stats.previousEarnings) * 100;
  
  const StatCard = ({ title, value, change, icon, prefix = "", suffix = "" }) => {
    const isPositive = change >= 0;
    
    return (
      <div className="relative overflow-hidden bg-white shadow-lg border border-red-200 transition-all duration-300 hover:shadow-xl hover:border-red-400 rounded-xl">
        <div className="absolute top-0 right-0 bg-gradient-to-br from-red-200 to-red-400 w-16 h-16 rounded-bl-3xl opacity-20"></div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-red-50">
              {React.cloneElement(icon, { className: "text-[#610b0c]" })}
            </div>
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'} text-sm font-medium`}>
              {isPositive ? <ArrowUpRight className="mr-1" size={16} /> : <ArrowDownRight className="mr-1" size={16} />}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          </div>
          
          <h2 className="text-lg font-medium text-gray-700 mb-2">{title}</h2>
          <p className="text-3xl font-bold mb-1 text-[#610b0c]">{prefix}{value.toLocaleString()}{suffix}</p>
          <p className="text-sm text-gray-500">vs previous {timeframe.replace('ly', '')}</p>
        </div>
      </div>
    );
  };

  return (
    <div id="referrals" className="space-y-6 bg-gray-50 p-6 rounded-xl border border-red-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0 text-[#610b0c]">Referral Performance</h1>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm border border-red-100">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${timeframe === 'daily' ? 'bg-[#610b0c] text-white' : 'text-[#610b0c] hover:bg-red-50'}`} 
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${timeframe === 'weekly' ? 'bg-[#610b0c] text-white' : 'text-[#610b0c] hover:bg-red-50'}`} 
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${timeframe === 'monthly' ? 'bg-[#610b0c] text-white' : 'text-[#610b0c] hover:bg-red-50'}`} 
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Successful Bookings" 
          value={stats.totalReferrals} 
          change={referralChange} 
          icon={<Users size={24} />}
        />
        
        <StatCard 
          title="Successful Withdrawals" 
          value={stats.conversions} 
          change={conversionChange} 
          icon={<ShoppingCart size={24} />} 
        />
        
        <StatCard 
          title="Total Earnings" 
          value={stats.earnings} 
          change={earningsChange} 
          prefix={stats.currency + " "} 
          icon={<DollarSign size={24} />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
              <TrendingUp size={20} className="mr-2 text-[#610b0c]" />
              Conversion Rate
            </h2>
            <span className="text-sm text-gray-500">25% avg</span>
          </div>
          <div className="h-48 flex items-end space-x-2">
            {[15, 18, 12, 25, 30, 22, 28].map((height, index) => (
              <div 
                key={index} 
                className="relative flex-1 group"
              >
                <div className="absolute inset-x-0 bottom-0 rounded-t-sm bg-gradient-to-t from-[#610b0c] to-red-400 transition-all duration-300 group-hover:from-red-700 group-hover:to-red-300" 
                  style={{ height: `${height * 2}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {height}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
              <BarChart2 size={20} className="mr-2 text-[#610b0c]" />
              Top Referral Sources
            </h2>
            <span className="text-sm text-gray-500">This {timeframe.replace('ly', '')}</span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Facebook", value: 42, color: "bg-[#610b0c]" },
              { name: "Direct Link", value: 28, color: "bg-red-700" },
              { name: "Twitter", value: 18, color: "bg-red-600" },
              { name: "Instagram", value: 12, color: "bg-red-500" }
            ].map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{source.name}</span>
                  <span className="font-medium">{source.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStats;