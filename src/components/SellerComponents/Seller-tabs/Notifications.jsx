import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Send,
  Crown,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import {
  canSendNotification,
  incrementNotificationCount,
  getSellerSubscription,
} from "../../../firebase/subscriptionUtils";
import {
  sendPushNotification,
  getNotificationHistory,
} from "../../../firebase/notificationUtils";
import NotificationHistoryItem from "./NotificationComponents/NotificationHistoryComponent";

const Notifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);
  const [canSend, setCanSend] = useState({
    allowed: false,
    remaining: 0,
    reason: "",
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState("free");
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Check notification limit on mount
  useEffect(() => {
    const checkNotificationLimit = async () => {
      try {
        setCheckingLimit(true);
        const user = auth.currentUser;

        if (!user) {
          navigate("/seller-login");
          return;
        }

        // Check if user can send notification
        const result = await canSendNotification(user.uid);
        setCanSend(result);

        // Get subscription status
        const subscription = await getSellerSubscription(user.uid);
        setSubscriptionStatus(subscription.subscriptionStatus);

        // Fetch notification history
        const history = await getNotificationHistory(user.uid);
        setNotificationHistory(history);
      } catch (error) {
        console.error("Error checking notification limit:", error);
        setCanSend({
          allowed: false,
          remaining: 0,
          reason: "Error checking notification limit. Please try again.",
        });
      } finally {
        setCheckingLimit(false);
      }
    };

    checkNotificationLimit();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Notification title is required";
    } else if (formData.title.trim().length > 20) {
      newErrors.title = "Title must be less than 20 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length > 50) {
      newErrors.message = "Message must be less than 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !canSend.allowed) {
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare notification data
      const notificationData = {
        title: formData.title.trim(),
        message: formData.message.trim(),
        sellerId: user.uid,
      };

      // Send push notification via Expo
      await sendPushNotification(user.uid, notificationData);

      // Increment notification count
      await incrementNotificationCount(user.uid);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      // Reset form
      setFormData({
        title: "",
        message: "",
      });

      // Refresh data
      const result = await canSendNotification(user.uid);
      setCanSend(result);

      const history = await getNotificationHistory(user.uid);
      setNotificationHistory(history);
    } catch (error) {
      console.error("Error sending notification:", error);
      setErrors({
        submit:
          error.message || "Failed to send notification. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (checkingLimit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#610b0c] mx-auto mb-4" />
          <p className="text-gray-600">Loading notification settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Push Notifications
          </h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {subscriptionStatus === "premium"
                ? "Unlimited"
                : `${canSend.remaining || 0} remaining`}
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Send push notifications to all users of the HostelHubb mobile app
        </p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">
              Notification Sent Successfully!
            </h3>
            <p className="text-sm text-green-700">
              Your notification has been sent to the selected audience.
            </p>
          </div>
        </div>
      )}

      {/* Subscription Limit Warning */}
      {!canSend.allowed && (
        <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Weekly Notification Limit Reached
              </h3>
              <p className="text-sm text-gray-600 mb-4">{canSend.reason}</p>
              <button
                onClick={() => navigate("/seller-dashboard/subscriptions")}
                className="px-4 py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors text-sm flex items-center gap-2"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Create Notification
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={!canSend.allowed}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., New Listings Available!"
                  maxLength={100}
                />
                <div className="flex items-center justify-between mt-1">
                  {errors.title ? (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {formData.title.length}/20 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={!canSend.allowed}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your notification message..."
                  maxLength={50}
                />
                <div className="flex items-center justify-between mt-1">
                  {errors.message ? (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/50 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !canSend.allowed}
                className="w-full py-3 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {canSend.allowed ? "Send Notification" : "Limit Reached"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sent This Week</span>
                <span className="font-semibold text-gray-900">
                  {subscriptionStatus === "free"
                    ? `${3 - (canSend.remaining || 0)}/3`
                    : "Unlimited"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className="font-semibold text-[#610b0c]">
                  {subscriptionStatus === "premium"
                    ? "∞"
                    : canSend.remaining || 0}
                </span>
              </div>
              {subscriptionStatus === "free" && (
                <>
                  <div className="pt-3 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-[#610b0c] h-2 rounded-full transition-all"
                        style={{
                          width: `${((3 - (canSend.remaining || 0)) / 3) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Resets every Monday
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Upgrade Card */}
          {subscriptionStatus === "free" && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm p-6 border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Go Premium
                </h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Upgrade to send unlimited notifications and reach more
                customers!
              </p>
              <button
                onClick={() => navigate("/seller-dashboard/subscription")}
                className="w-full py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors text-sm font-medium"
              >
                Upgrade Now
              </button>
            </div>
          )}

          {/* Tips Card */}
          <div className="bg-blue-50 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Keep titles short and attention-grabbing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Include a clear call-to-action
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Send during peak hours (9 AM - 8 PM)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                Make your message clear and concise
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Notification History */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Notifications
        </h2>

        {notificationHistory.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications sent yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notificationHistory.slice(0, 5).map((notification) => (
              <NotificationHistoryItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Notification History Item Component

export default Notifications;
