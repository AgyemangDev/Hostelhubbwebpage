import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  TrendingUp,
  Eye,
  Heart,
  Bell,
  Crown,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Users,
  Calendar,
  Plus,
  Lock,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { auth } from "../../firebase/FirebaseConfig";
import { getSellerSubscription } from "../../firebase/subscriptionUtils";
import { getSellerProducts } from "../../firebase/productUtils";
import { getSellerAnalytics, syncProductCount } from "../../firebase/analyticsUtils";
import { syncAllProductCounts, syncSubscriptionProductCount } from "../../firebase/syncUtils";
import PremiumFeature from "./DashboardComponents/PremiumFeature";
import StatCard from "./DashboardComponents/StatCard";
import FeatureBadge from "./DashboardComponents/FeatureBadge";
import MetricRow from "./DashboardComponents/MetricRow";
import ProductRow from "./DashboardComponents/ProductRow";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [syncedThisSession, setSyncedThisSession] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
          navigate("/seller-login");
          return;
        }

        // Set greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        // Fetch subscription
        const subData = await getSellerSubscription(user.uid);
        setSubscription(subData);

        // Fetch products
        const productsData = await getSellerProducts(user.uid);
        // Sort products by creation date, newest first
        const sortedProducts = productsData.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate() - a.createdAt.toDate();
          }
          return 0;
        });
        setProducts(sortedProducts);

        // Fetch analytics
        const analyticsData = await getSellerAnalytics(user.uid);
        
        // Check if sync is needed (only once per session)
        const needsSync = !syncedThisSession && (
          analyticsData.total.products !== sortedProducts.length || 
          (sortedProducts.length > 0 && analyticsData.total.products === 0)
        );
        
        if (needsSync) {
          console.log("Product count mismatch detected, running automatic sync...");
          
          // Run comprehensive sync
          await syncAllProductCounts(user.uid);
          await syncSubscriptionProductCount(user.uid);
          
          // Mark as synced for this session
          setSyncedThisSession(true);
          
          // Refetch analytics after sync
          const updatedAnalytics = await getSellerAnalytics(user.uid);
          setAnalytics(updatedAnalytics);
          
          // Refetch subscription to get updated count
          const updatedSub = await getSellerSubscription(user.uid);
          setSubscription(updatedSub);
          
          console.log("✅ Automatic sync completed successfully");
        } else {
          setAnalytics(analyticsData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#610b0c] mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const isPremium = subscription?.subscriptionStatus === "premium";
  const canPostProduct = isPremium || (subscription?.productCount || 0) < 1;
  const notificationsRemaining = isPremium
    ? "∞"
    : 3 - (subscription?.weeklyNotifications || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {greeting}! 👋
            </h1>
            <p className="text-gray-600">
              Welcome back to your seller dashboard
            </p>
          </div>

          {/* Premium Badge */}
          <div className="flex items-center gap-3">
            {isPremium ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Premium Member</span>
              </div>
            ) : (
              <button
                onClick={() => navigate("/seller-dashboard/subscriptions")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#610b0c] to-[#8b1416] text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Upgrade to Premium</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Premium Upsell Banner (Only for Free Users) */}
        {!isPremium && (
          <div className="relative bg-[#610b0c] rounded-2xl p-8 overflow-hidden shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 -left-4 w-72 h-72  rounded-full mix-blend-multiply filter blur-xl animate-blob" />
            </div>

            <div className="relative grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-yellow-300" />
                  <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wide">
                    Limited Time Offer
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Unlock Your Full Potential
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Get unlimited products, notifications, and advanced analytics
                  to 3x your sales
                </p>
                <button
                  onClick={() => navigate("/seller-dashboard/subscriptions")}
                  className="px-6 py-3 bg-white text-[#610b0c] rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 group"
                >
                  See Premium Plans
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="space-y-3">
                <FeatureBadge icon={Package} text="Unlimited Products" />
                <FeatureBadge icon={Bell} text="Unlimited Notifications" />
                <FeatureBadge icon={BarChart3} text="Advanced Analytics" />
                <FeatureBadge icon={Target} text="Priority Placement" />
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Package}
            title="Total Products"
            value={analytics?.total.products || 0}
            color="bg-blue-500"
            gradient="from-blue-400 to-blue-600"
            subtitle={
              !isPremium && products.length >= 1
                ? "Limit reached"
                : "Active listings"
            }
            locked={!isPremium && products.length >= 1}
          />
          <StatCard
            icon={Eye}
            title="Total Views"
            value={analytics?.total.views || 0}
            color="bg-purple-500"
            gradient="from-purple-400 to-purple-600"
            subtitle="All time"
            trend={analytics?.weekly.trend}
          />
          <StatCard
            icon={ShoppingCart}
            title="Total Sales"
            value={analytics?.total.sales || 0}
            color="bg-green-500"
            gradient="from-green-400 to-green-600"
            subtitle="Orders completed"
            trend={analytics?.weekly.trend}
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`GH₵${analytics?.total.revenue || 0}`}
            color="bg-amber-500"
            gradient="from-amber-400 to-amber-600"
            subtitle="Lifetime earnings"
            trend={analytics?.weekly.trend}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Product Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#610b0c] to-[#8b1416] rounded-xl">
                <Plus className="w-6 h-6 text-white" />
              </div>
              {!canPostProduct && (
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                  <Lock className="w-3 h-3" />
                  Locked
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Add New Product
            </h3>
            <p className="text-gray-600 mb-4">
              {canPostProduct
                ? "List a new product and reach thousands of students"
                : "Upgrade to Premium to add more products"}
            </p>
            <button
              onClick={() =>
                canPostProduct
                  ? navigate("/seller-dashboard/add-product")
                  : navigate("/seller-dashboard/subscription")
              }
              disabled={!canPostProduct && !isPremium}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                canPostProduct
                  ? "bg-[#610b0c] text-white hover:bg-[#4a0809] shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-lg hover:shadow-xl"
              }`}
            >
              {canPostProduct ? (
                <>
                  <Plus className="w-5 h-5" />
                  Add Product
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5" />
                  Upgrade to Add More
                </>
              )}
            </button>
          </div>

          {/* Send Notification Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Bell className="w-6 h-6 text-white" />
              </div>
              {!isPremium && (
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {notificationsRemaining} left
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Send Notification
            </h3>
            <p className="text-gray-600 mb-4">
              {isPremium
                ? "Send unlimited push notifications to your customers"
                : `${notificationsRemaining} notifications remaining this week`}
            </p>
            <button
              onClick={() => navigate("/seller-dashboard/notifications")}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Bell className="w-5 h-5" />
              Create Notification
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Performance */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                This Week's Performance
              </h3>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">{analytics?.weekly.trend}</span>
              </div>
            </div>

            <div className="space-y-4">
              <MetricRow
                label="Views"
                value={analytics?.weekly.views || 0}
                icon={Eye}
                color="text-blue-600"
              />
              <MetricRow
                label="Sales"
                value={analytics?.weekly.sales || 0}
                icon={ShoppingCart}
                color="text-green-600"
              />
              <MetricRow
                label="Revenue"
                value={`GH₵${analytics?.weekly.revenue || 0}`}
                icon={DollarSign}
                color="text-amber-600"
              />
            </div>

            {!isPremium && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Get Advanced Analytics
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Unlock detailed insights with Premium
                    </p>
                    <button
                      onClick={() => navigate("/seller-dashboard/subscription")}
                      className="text-xs text-purple-600 font-semibold hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Recent Products
              </h3>
              <button
                onClick={() => navigate("/seller-dashboard/products")}
                className="text-sm text-[#610b0c] font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No products yet</p>
                <button
                  onClick={() => navigate("/seller-dashboard/add-product")}
                  className="px-4 py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors text-sm font-medium"
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 3).map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium Features Showcase (Free Users Only) */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full mb-4">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-semibold">
                  Premium Features
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Take Your Business to the Next Level
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join hundreds of successful sellers growing their business with
                Premium
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <PremiumFeature
                icon={Package}
                title="Unlimited Products"
                description="List as many products as you want with no restrictions"
              />
              <PremiumFeature
                icon={Bell}
                title="Unlimited Notifications"
                description="Reach your customers anytime with unlimited push notifications"
              />
              <PremiumFeature
                icon={BarChart3}
                title="Advanced Analytics"
                description="Get detailed insights into your sales and customer behavior"
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/seller-dashboard/subscriptions")}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
              >
                <Crown className="w-6 h-6" />
                View Premium Plans
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
