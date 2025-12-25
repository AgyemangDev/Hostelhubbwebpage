import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

import PrivacyPolicy from "./components/PrivacyPolicy";
import TransactionPolicy from "./components/TransactionPolicy";
import StorageTermsAgreement from "./components/Terms/StorageTermsAgreement";
import TermsPage from "./components/TermsPage";
import Download from "./components/download/Download";
import ProductsPage from "./components/Products/ProductsPage";
import AppDetailPage from "./components/Products/AppDetailPage";

import HostelRedirect from "./components/HostelRedirect";
import AffiliatePage from "./components/Affiliate/AffiliatePage";
import AffiliateSuccess from "./components/Affiliate/AffiliateSuccess";
import AgentApplicationSuccess from "./components/Affiliate/AgentApplicationSuccess";
import AgentApplicationFailure from "./components/Affiliate/AgentApplicationFailure";
import AgentDashboard from "./components/AgentDashboard/AgentDashboard";
import AgentSession from "./components/AgentDashboard/AgentSession";
import SessionReports from "./components/AgentDashboard/SessionReports";
import AffiliateProgramSection from "./components/AffiliateProgramSection";
import HowAffiliateWorks from "./components/HowAffiliateWorks";
import AgentDashboardLayout from "./components/AgentDashboard/AgentDashboardLayout"; // NEW
import PrivateRoute from "./routes/PrivateRoute";
import SellerPrivateRoute from "./routes/SellerPrivateRoute";

import "./index.css";
import Login from "./components/Login";
import AffiliateApplications from "./components/AgentDashboard/AffiliateApplications";
import { AuthProvider } from "./firebase/AuthContext";
import { SellerProvider } from "./context/SellerContext";

// Seller Imports
import SellerDashboard from "./components/SellerComponents/SellerDashboard";
import SellerDashboardLayout from "./components/SellerComponents/SellerDashboardLayout";
import SellerPage from "./components/SellerComponents/Seller/SellerPage";
import SellerSuccess from "./components/SellerComponents/Seller/SellerSuccess";
import SellerApplications from "./components/SellerComponents/SellerApplications";
import SellerApplicationSuccess from "./components/SellerComponents/Seller/SellerApplicationSuccess";
import AboutMarketPlace from "./components/SellerComponents/Seller/AboutMarketPlace";
import SellerLogin from "./components/SellerComponents/SellerLogin";
import Notifications from "./components/SellerComponents/Seller-tabs/Notifications";
import Analytics from "./components/SellerComponents/Seller-tabs/Analytics";
import AddProduct from "./components/SellerComponents/Seller-tabs/AddProducts";
import Subscription from "./components/SellerComponents/Seller-tabs/Subscription";
import Products from "./components/SellerComponents/Seller-tabs/Products";
import EditProduct from "./components/SellerComponents/Seller-tabs/EditProduct";
import Orders from "./components/SellerComponents/Seller-tabs/Orders";


const App = () => {
  return (
    <AuthProvider>
      <SellerProvider>
      <Router>
        <div className="font-sans overflow-x-hidden scroll-smooth relative">
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<HomePage />} />

            {/* Products Pages */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:appId" element={<AppDetailPage />} />

            {/* Policy Pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<TransactionPolicy />} />
            <Route path="/storage-terms" element={<StorageTermsAgreement />} />
            <Route path="/hostel/:hostelId" element={<HostelRedirect />} />
            <Route path="/login" element={<Login />} />

            <Route path="/seller-login" element={<SellerLogin />} />

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

            <Route path="/download" element={<Download />} />

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

            {/* Seller Routes*/}
            <Route path="/signup-page" element={<SellerPage />} />
            <Route path="/become-a-seller" element={<AboutMarketPlace />} />
            <Route path="/seller-success" element={<SellerSuccess />} />
            <Route
              path="/seller-application"
              element={<SellerApplications />}
            />
            <Route
              path="/seller-application-success"
              element={<SellerApplicationSuccess />}
            />
            <Route
              path="/seller-application-failure"
              element={<AgentApplicationFailure />}
            />

            <Route path="/download" element={<Download />} />

            {/* Agent Dashboard with Sidebar Layout */}
            <Route
              path="/seller-dashboard"
              element={
                <SellerPrivateRoute>
                  <SellerDashboardLayout />
                </SellerPrivateRoute>
              }
            >
              <Route index element={<SellerDashboard />} />
              <Route path=":id" element={<SellerDashboard />} />
              <Route path=":id/:token" element={<SellerDashboard />} />
              <Route
                path=":id/:token/:referralCode"
                element={<SellerDashboard />}
              />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="subscriptions" element={<Subscription />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="edit-product/:productId" element={<EditProduct />} />
            </Route>
          </Routes>
        </div>
      </Router>
      </SellerProvider>
    </AuthProvider>
  );
};

export default App;
