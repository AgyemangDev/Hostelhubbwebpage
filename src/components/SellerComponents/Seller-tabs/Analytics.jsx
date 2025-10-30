import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Loader2,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import { getSellerAnalytics } from "../../../firebase/productUtils";
import { getNotificationAnalytics } from "../../../firebase/notificationUtils";
import InsightCard from "./AnaliticComponents/InsightCard";
import TopProductItem from "./AnaliticComponents/TopProductItem";
import StatCard from "./AnaliticComponents/StatCard";
import ComparisonCard from "./AnaliticComponents/ComparisonCard";

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("weekly"); // weekly, monthly, all
  const [analytics, setAnalytics] = useState({
    total: {
      products: 0,
      views: 0,
      likes: 0,
      sales: 0,
      revenue: 0,
    },
    weekly: {
      views: 0,
      sales: 0,
      revenue: 0,
      trend: "0%",
    },
    monthly: {
      views: 0,
      sales: 0,
      revenue: 0,
      trend: "0%",
    },
  });
  const [notificationStats, setNotificationStats] = useState({
    totalSent: 0,
    totalDelivered: 0,
    totalFailed: 0,
    deliveryRate: "0%",
  });
  const [topProducts, setTopProducts] = useState([]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = auth.currentUser;

        if (!user) {
          navigate("/seller-login");
          return;
        }

        // Fetch product analytics
        const productAnalytics = await getSellerAnalytics(user.uid);
        setAnalytics(productAnalytics);

        // Fetch notification analytics
        const notifAnalytics = await getNotificationAnalytics(user.uid);
        setNotificationStats(notifAnalytics);

        // Get top performing products
        if (productAnalytics.topProducts) {
          setTopProducts(productAnalytics.topProducts);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setError("Failed to load analytics data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  // Get current time range data
  const getCurrentData = () => {
    if (timeRange === "weekly") return analytics.weekly;
    if (timeRange === "monthly") return analytics.monthly;
    return analytics.total;
  };

  // Export analytics data
  const handleExport = () => {
    const data = {
      exportDate: new Date().toISOString(),
      timeRange,
      analytics,
      notificationStats,
      topProducts,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${timeRange}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#610b0c] mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Analytics
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Track your performance and grow your business
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === "weekly"
                  ? "bg-[#610b0c] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === "monthly"
                  ? "bg-[#610b0c] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === "all"
                  ? "bg-[#610b0c] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Time
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          label="Total Views"
          value={currentData.views || 0}
          trend={currentData.trend}
          color="blue"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Sales"
          value={currentData.sales || 0}
          trend={currentData.trend}
          color="green"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`GH₵${(currentData.revenue || 0).toLocaleString()}`}
          trend={currentData.trend}
          color="purple"
        />
        <StatCard
          icon={Heart}
          label="Total Likes"
          value={analytics.total.likes || 0}
          color="red"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Products</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Products</span>
              <span className="text-lg font-bold text-gray-900">
                {analytics.total.products}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Views</span>
              <span className="text-lg font-bold text-gray-900">
                {analytics.total.views.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Views/Product</span>
              <span className="text-lg font-bold text-gray-900">
                {analytics.total.products > 0
                  ? Math.round(analytics.total.views / analytics.total.products)
                  : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Sales</span>
              <span className="text-lg font-bold text-gray-900">
                {analytics.total.sales}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Conversion Rate</span>
              <span className="text-lg font-bold text-gray-900">
                {analytics.total.views > 0
                  ? (
                      (analytics.total.sales / analytics.total.views) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Order Value</span>
              <span className="text-lg font-bold text-gray-900">
                GH₵
                {analytics.total.sales > 0
                  ? (analytics.total.revenue / analytics.total.sales).toFixed(0)
                  : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Sent</span>
              <span className="text-lg font-bold text-gray-900">
                {notificationStats.totalSent}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivered</span>
              <span className="text-lg font-bold text-gray-900">
                {notificationStats.totalDelivered}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Delivery Rate</span>
              <span className="text-lg font-bold text-green-600">
                {notificationStats.deliveryRate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Performance Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComparisonCard
            label="Weekly Performance"
            views={analytics.weekly.views}
            sales={analytics.weekly.sales}
            revenue={analytics.weekly.revenue}
            trend={analytics.weekly.trend}
          />
          <ComparisonCard
            label="Monthly Performance"
            views={analytics.monthly.views}
            sales={analytics.monthly.sales}
            revenue={analytics.monthly.revenue}
            trend={analytics.monthly.trend}
          />
          <ComparisonCard
            label="All Time"
            views={analytics.total.views}
            sales={analytics.total.sales}
            revenue={analytics.total.revenue}
          />
        </div>
      </div>

      {/* Top Performing Products */}
      {topProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Products
          </h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <TopProductItem
                key={product.id}
                product={product}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Chart visualization coming soon
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Integrate with Chart.js or Recharts for detailed insights
            </p>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            title="Boost Your Visibility"
            description={`Your products have ${analytics.total.views} total views. Consider using push notifications to reach more customers.`}
            actionText="Send Notification"
            actionLink="/seller-dashboard/notifications"
          />
          <InsightCard
            title="Add More Products"
            description={`You have ${analytics.total.products} product(s) listed. Adding more products can increase your revenue potential.`}
            actionText="Add Product"
            actionLink="/seller-dashboard/add-product"
          />
        </div>
      </div>
    </div>
  );
};
export default Analytics;
