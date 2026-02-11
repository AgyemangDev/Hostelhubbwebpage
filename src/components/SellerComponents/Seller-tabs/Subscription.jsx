import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Check,
  X,
  Loader2,
  AlertCircle,
  Zap,
  TrendingUp,
  Bell,
  Package,
  BarChart3,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import { getSellerSubscription } from "../../../firebase/subscriptionUtils";
import { initializePaystackPayment } from "../../../firebase/paymentUtils";
import FAQItem from "./SubscriptionComponents/FAQItem";
import TestimonialCard from "./SubscriptionComponents/TestimonialCard";
import BenefitCard from "./SubscriptionComponents/BenefitCard";

const Subscription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [error, setError] = useState(null);

  // Subscription plans
  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: 50,
      duration: "month",
      months: 1,
      popular: false,
      savings: null,
      description: "Perfect for trying out premium features",
    },
    {
      id: "quarterly",
      name: "Quarterly",
      price: 135,
      originalPrice: 150,
      duration: "3 months",
      months: 3,
      popular: true,
      savings: "Save 10%",
      description: "Best value for growing businesses",
    },
    {
      id: "yearly",
      name: "Yearly",
      price: 480,
      originalPrice: 600,
      duration: "year",
      months: 12,
      popular: false,
      savings: "Save 20%",
      description: "Maximum savings for committed sellers",
    },
  ];

  // Features comparison
  const features = [
    {
      category: "Products",
      items: [
        {
          name: "Product Listings",
          free: "1 product",
          premium: "Unlimited products",
        },
        {
          name: "Product Images",
          free: "3 per product",
          premium: "10 per product",
        },
        { name: "Featured Listings", free: false, premium: true },
        { name: "Priority Placement", free: false, premium: true },
      ],
    },
    {
      category: "Notifications",
      items: [
        {
          name: "Push Notifications",
          free: "3 per week",
          premium: "Unlimited",
        },
        { name: "Targeted Campaigns", free: false, premium: true },
        { name: "Schedule Notifications", free: false, premium: true },
        { name: "Analytics Dashboard", free: "Basic", premium: "Advanced" },
      ],
    },
    {
      category: "Analytics",
      items: [
        { name: "Views Tracking", free: true, premium: true },
        { name: "Sales Analytics", free: "Basic", premium: "Advanced" },
        { name: "Customer Insights", free: false, premium: true },
        { name: "Export Reports", free: false, premium: true },
      ],
    },
    {
      category: "Support",
      items: [
        { name: "Email Support", free: true, premium: true },
        { name: "Priority Support", free: false, premium: true },
        { name: "Dedicated Account Manager", free: false, premium: true },
        { name: "24/7 Support", free: false, premium: true },
      ],
    },
  ];

  // Fetch current subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (!user) {
          navigate("/seller-login");
          return;
        }

        const subscription = await getSellerSubscription(user.uid);
        setCurrentSubscription(subscription);
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setError("Failed to load subscription details");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [navigate]);

  // Handle payment initialization
  const handleSubscribe = async () => {
    try {
      setProcessingPayment(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Get user email
      const userEmail = user.email;

      if (!userEmail) {
        throw new Error("User email not found");
      }

      // Get selected plan details
      const plan = plans.find((p) => p.id === selectedPlan);

      // Initialize Paystack payment
      const paymentData = await initializePaystackPayment({
        email: userEmail,
        amount: plan.price * 100, // Convert to pesewas
        plan: selectedPlan,
        months: plan.months,
        userId: user.uid,
      });

      // Redirect to Paystack payment page
      if (paymentData.authorizationUrl) {
        window.location.href = paymentData.authorizationUrl;
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      setError(
        error.message || "Failed to initialize payment. Please try again.",
      );
      setProcessingPayment(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#610b0c] mx-auto mb-4" />
          <p className="text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  // Already premium
  if (currentSubscription?.subscriptionStatus === "premium") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <Crown className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            You're Already Premium!
          </h2>
          <p className="text-gray-700 mb-6">
            You're enjoying all the premium features. Your subscription is
            active.
          </p>
          {currentSubscription.subscriptionExpiryDate && (
            <p className="text-sm text-gray-600 mb-6">
              Expires on:{" "}
              {new Date(
                currentSubscription.subscriptionExpiryDate,
              ).toLocaleDateString()}
            </p>
          )}
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="px-6 py-3 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Upgrade to Premium
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock Your Full Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get unlimited products, notifications, and advanced analytics to
            grow your business faster
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? "ring-4 ring-[#610b0c] scale-105"
                    : "hover:shadow-xl"
                } ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#610b0c] text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {plan.description}
                  </p>

                  {/* Savings Badge */}
                  {plan.savings && (
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                      {plan.savings}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        GH₵{plan.price}
                      </span>
                      <span className="text-gray-600">/ {plan.duration}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through mt-1">
                        GH₵{plan.originalPrice}
                      </div>
                    )}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? "bg-[#610b0c] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </button>

                  {/* Key Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Unlimited Products
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Unlimited Notifications
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Advanced Analytics
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      Priority Support
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proceed to Payment Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleSubscribe}
              disabled={processingPayment}
              className="px-8 py-4 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
              {processingPayment ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-6 h-6" />
                  Proceed to Payment
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Secure payment powered by Paystack
            </p>
          </div>
        </div>

        {/* Features Comparison Table */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#610b0c] to-[#8b1416] px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Compare Plans
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-gray-50">
                    Free Plan
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#610b0c]">
                    Premium Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <>
                    <tr
                      key={`category-${categoryIndex}`}
                      className="bg-gray-100"
                    >
                      <td
                        colSpan={3}
                        className="px-6 py-3 text-sm font-bold text-gray-900"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={`item-${categoryIndex}-${itemIndex}`}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof item.free === "boolean" ? (
                            item.free ? (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-600">
                              {item.free}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center bg-red-50">
                          {typeof item.premium === "boolean" ? (
                            item.premium ? (
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-400 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-semibold text-[#610b0c]">
                              {item.premium}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitCard
            icon={Package}
            title="Unlimited Products"
            description="List as many products as you want with no restrictions"
          />
          <BenefitCard
            icon={Bell}
            title="Unlimited Notifications"
            description="Reach your customers anytime with unlimited push notifications"
          />
          <BenefitCard
            icon={BarChart3}
            title="Advanced Analytics"
            description="Get detailed insights into your sales and customer behavior"
          />
          <BenefitCard
            icon={Shield}
            title="Priority Support"
            description="Get help faster with dedicated support team"
          />
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Premium Sellers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Kwame Mensah"
              role="Accommodation Provider"
              content="Upgrading to premium was the best decision. My bookings increased by 300% in just 2 months!"
              rating={5}
            />
            <TestimonialCard
              name="Akosua Boateng"
              role="Service Provider"
              content="The unlimited notifications feature helped me reach more students. Totally worth it!"
              rating={5}
            />
            <TestimonialCard
              name="Kofi Asante"
              role="Product Seller"
              content="Advanced analytics helped me understand my customers better. Highly recommended!"
              rating={5}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Can I cancel my subscription anytime?"
              answer="Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major payment methods through Paystack, including mobile money, bank cards, and bank transfers."
            />
            <FAQItem
              question="Do you offer refunds?"
              answer="We offer a 7-day money-back guarantee. If you're not satisfied with premium features, contact our support team for a full refund."
            />
            <FAQItem
              question="Can I upgrade or downgrade my plan?"
              answer="Yes, you can change your plan at any time. The changes will take effect immediately and we'll prorate the charges."
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-[#610b0c] to-[#8b1416] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of successful sellers on HostelHubb Premium
          </p>
          <button
            onClick={handleSubscribe}
            disabled={processingPayment}
            className="px-8 py-4 bg-white text-[#610b0c] rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Subscription;
