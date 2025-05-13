import React from "react";
import ReferralStats from "./ReferralStats";

const DashboardHome = ({ user }) => {
  return (
    <section
      id="home"
      className="bg-white rounded-xl p-4 md:p-6 shadow mb-6 w-full overflow-x-hidden"
    >
      {/* Responsive container */}
      <div className="max-w-full">
        {/* Stats */}
        <ReferralStats user={user}/>
      </div>
    </section>
  );
};

export default DashboardHome;
