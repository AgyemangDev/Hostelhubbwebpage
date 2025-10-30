import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  Package,
  PlusSquare,
  CreditCard,
  LogOut,
  Crown,
  Bell,
  BarChart3,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig"; // Adjust path as needed

const Sidebar = ({ isMobile, sidebarOpen, setSidebarOpen }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("free");
  const [productCount, setProductCount] = useState(0);
  const [weeklyNotifications, setWeeklyNotifications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user subscription data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        // Fetch user document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Set subscription status (default to 'free' if not set)
          setSubscriptionStatus(userData.subscriptionStatus || "free");

          // Set product count
          setProductCount(userData.productCount || 0);

          // Set weekly notifications count
          setWeeklyNotifications(userData.weeklyNotifications || 0);
        } else {
          throw new Error("User data not found");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      path: "/seller-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Product",
      path: "/seller-dashboard/add-product",
      icon: PlusSquare,
      disabled: subscriptionStatus === "free" && productCount >= 1,
      lockIcon: subscriptionStatus === "free" && productCount >= 1,
    },
    {
      name: "Notifications",
      path: "/seller-dashboard/notifications",
      icon: Bell,
      badge: subscriptionStatus === "free" ? `${weeklyNotifications}/3` : null,
    },
    {
      name: "Analytics",
      path: "/seller-dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Subscription",
      path: "/seller-dashboard/subscriptions",
      icon: CreditCard,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("seller_data");
    window.location.href = "/seller-login";
  };

  const handleUpgrade = () => {
    // Navigate to subscription/payment page
    window.location.href = "/seller-dashboard/subscription";
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-40 flex flex-col justify-between transform transition-transform duration-300 ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : "translate-x-0 w-72"
        }`}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 bg-[#610b0c]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-white rounded-md flex items-center justify-center text-[#610b0c] font-black text-lg">
                HH
              </div>
              <h2 className="text-xl font-bold text-white">Seller Hub</h2>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Subscription Badge */}
          {loading ? (
            <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
              <span className="ml-2 text-sm text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="px-4 py-3 bg-red-50 border-b border-red-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <span className="text-xs text-red-600">{error}</span>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown
                    className={`h-5 w-5 ${
                      subscriptionStatus === "premium"
                        ? "text-amber-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {subscriptionStatus === "premium" ? "Premium" : "Free Plan"}
                  </span>
                </div>
                {subscriptionStatus === "free" && (
                  <button
                    onClick={handleUpgrade}
                    className="text-xs text-[#610b0c] font-medium hover:underline transition-all"
                  >
                    Upgrade
                  </button>
                )}
              </div>

              {/* Limits Display for Free Users */}
              {subscriptionStatus === "free" && (
                <div className="mt-2 pt-2 border-t border-amber-100">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Products</span>
                    <span className="font-semibold">{productCount}/1</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                    <span>Notifications</span>
                    <span className="font-semibold">
                      {weeklyNotifications}/3 weekly
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4 px-4 space-y-2">
          {navItems.map(
            ({ name, path, icon: Icon, badge, disabled, lockIcon }) => (
              <NavLink
                key={name}
                to={disabled ? "#" : path}
                end
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    disabled
                      ? "text-gray-400 cursor-not-allowed bg-gray-50"
                      : isActive
                        ? "bg-[#610b0c] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault();
                    return;
                  }
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {name}
                </div>

                {/* Badge or Lock Icon */}
                {badge && !lockIcon && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      disabled
                        ? "bg-gray-200 text-gray-500"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {badge}
                  </span>
                )}

                {lockIcon && <Crown className="w-4 h-4 text-gray-400" />}
              </NavLink>
            ),
          )}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
