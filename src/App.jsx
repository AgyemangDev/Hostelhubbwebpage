import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

import PrivacyPolicy from "./components/PrivacyPolicy";
import TransactionPolicy from "./components/TransactionPolicy";
import StorageTermsAgreement from "./components/Terms/StorageTermsAgreement";
import TermsPage from "./components/TermsPage";

import HostelRedirect from "./components/HostelRedirect";
import AffiliatePage from "./components/Affiliate/AffiliatePage";
import AffiliateSuccess from "./components/Affiliate/AffiliateSuccess";
import AgentApplicationSuccess from "./components/Affiliate/AgentApplicationSuccess";
import AgentApplicationFailure from "./components/Affiliate/AgentApplicationFailure";
import AgentDashboard from "./components/AgentDashboard/AgentDashboard";
import AgentSession from "./components/AgentDashboard/AgentSession";
import SessionReports from "./components/AgentDashboard/SessionReports";
import HowAffiliateWorks from "./components/HowAffiliateWorks";
import AgentDashboardLayout from "./components/AgentDashboard/AgentDashboardLayout"; // NEW
import PrivateRoute from "./routes/PrivateRoute";


import "./index.css";
import Login from "./components/Login";
import AffiliateApplications from "./components/AgentDashboard/AffiliateApplications";
import { AuthProvider } from "./firebase/AuthContext";


const App = () => {
  return (
    <AuthProvider>
     
      <Router>
        <div className="font-sans overflow-x-hidden scroll-smooth relative">
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<HomePage />} />

            {/* Policy Pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<TransactionPolicy />} />
            <Route path="/storage-terms" element={<StorageTermsAgreement />} />
            <Route path="/hostel/:hostelId" element={<HostelRedirect />} />
            <Route path="/login" element={<Login />} />

            {/* Affiliate Pages */}
            <Route path="/affiliate-page" element={<AffiliatePage />} />
            <Route path="/get-started" element={<HowAffiliateWorks />} />
            <Route path="/affiliate-success" element={<AffiliateSuccess />} />
            <Route
              path="/affiliate-application"
              element={<AffiliateApplications />}
            />
            <Route
              path="/agent-application-success"
              element={<AgentApplicationSuccess />}
            />
            <Route
              path="/agent-application-failure"
              element={<AgentApplicationFailure />}
            />

            {/* Agent Dashboard with Sidebar Layout */}
            <Route
              path="/agent-dashboard"
              element={
                <PrivateRoute>
                  <AgentDashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AgentDashboard />} />
              <Route path=":id" element={<AgentDashboard />} />
              <Route path=":id/:token" element={<AgentDashboard />} />
              <Route
                path=":id/:token/:referralCode"
                element={<AgentDashboard />}
              />
              <Route path="session" element={<AgentSession />} />
              <Route path="reports" element={<SessionReports />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
