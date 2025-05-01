"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarDays,
  CheckCircle,
  TrendingUp,
  XCircle,
} from "lucide-react";

const data = [
  { month: "Jan", earnings: 20 },
  { month: "Feb", earnings: 35 },
  { month: "Mar", earnings: 50 },
  { month: "Apr", earnings: 40 },
  { month: "May", earnings: 60 },
];

export default function BookingStatsPage() {
  return (
    <main className="min-h-screen bg-white text-[#610b0c] p-6 md:p-10 space-y-10">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Booking Statistics</h1>
      </section>

      {/* Stat Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<CalendarDays className="h-7 w-7 text-[#610b0c]" />}
          title="Total Bookings"
          value="120"
        />
        <StatCard
          icon={<CheckCircle className="h-7 w-7 text-[#610b0c]" />}
          title="Successful"
          value="95"
        />
        <StatCard
          icon={<XCircle className="h-7 w-7 text-[#610b0c]" />}
          title="Failed/Pending"
          value="25"
        />
      </section>

      {/* Earnings Chart */}
      <section className="bg-white border border-[#610b0c]/10 rounded-2xl shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#610b0c]">Earnings Overview</h2>
          <TrendingUp className="h-5 w-5 text-[#610b0c]" />
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#610b0c" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#610b0c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="#999"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                stroke="#999"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "none" }}
                itemStyle={{ color: "#610b0c" }}
                labelStyle={{ color: "#610b0c" }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#610b0c"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#610b0c]/10 shadow-sm flex items-center gap-4">
      <div className="rounded-full bg-[#f3f3f3] p-2.5">{icon}</div>
      <div>
        <p className="text-sm text-[#610b0c]/70">{title}</p>
        <h3 className="text-xl font-bold text-[#610b0c]">{value}</h3>
      </div>
    </div>
  );
}
