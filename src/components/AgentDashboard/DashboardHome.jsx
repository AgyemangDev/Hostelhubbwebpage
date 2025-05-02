import React from "react";
import ReferralStats from "./ReferralStats";

const DashboardHome = ({ userId, token, referralCode }) => {
  return (
    <section id="home" className="bg-white rounded-xl p-6 shadow mb-6">


      {/* Stats */}
      <ReferralStats />
    </section>
  );
};

export default DashboardHome;