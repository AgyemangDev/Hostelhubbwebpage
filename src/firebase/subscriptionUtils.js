import { db } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 🔹 Get seller subscription status and limits
 */
export const getSellerSubscription = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();

    return {
      subscriptionStatus: userData.subscriptionStatus || "free",
      productCount: userData.productCount || 0,
      weeklyNotifications: userData.weeklyNotifications || 0,
      notificationResetDate: userData.notificationResetDate || null,
      subscriptionExpiryDate: userData.subscriptionExpiryDate || null,
    };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
};

/**
 * 🔹 Check if seller can post a product
 */
export const canPostProduct = async (uid) => {
  try {
    const subscription = await getSellerSubscription(uid);

    // Premium users can post unlimited products
    if (subscription.subscriptionStatus === "premium") {
      return { allowed: true, reason: null };
    }

    // Free users can only post 1 product
    if (subscription.productCount >= 1) {
      return {
        allowed: false,
        reason: "Free plan limited to 1 product. Upgrade to Premium for unlimited products.",
      };
    }

    return { allowed: true, reason: null };
  } catch (error) {
    console.error("Error checking product limit:", error);
    throw error;
  }
};

/**
 * 🔹 Check if seller can send notification
 */
export const canSendNotification = async (uid) => {
  try {
    const subscription = await getSellerSubscription(uid);

    // Check if we need to reset weekly counter
    await checkAndResetNotificationCounter(uid, subscription);

    // Fetch updated data after potential reset
    const updatedSubscription = await getSellerSubscription(uid);

    // Premium users can send unlimited notifications
    if (updatedSubscription.subscriptionStatus === "premium") {
      return { allowed: true, remaining: "unlimited", reason: null };
    }

    // Free users can send 3 notifications per week
    const remaining = 3 - updatedSubscription.weeklyNotifications;
    
    if (remaining <= 0) {
      return {
        allowed: false,
        remaining: 0,
        reason: "Weekly notification limit reached. Upgrade to Premium for unlimited notifications.",
      };
    }

    return { allowed: true, remaining, reason: null };
  } catch (error) {
    console.error("Error checking notification limit:", error);
    throw error;
  }
};

/**
 * 🔹 Reset notification counter if a week has passed
 */
const checkAndResetNotificationCounter = async (uid, subscription) => {
  try {
    const userRef = doc(db, "users", uid);

    // If no reset date exists, set it to now + 7 days
    if (!subscription.notificationResetDate) {
      const nextResetDate = new Date();
      nextResetDate.setDate(nextResetDate.getDate() + 7);

      await updateDoc(userRef, {
        notificationResetDate: nextResetDate.toISOString(),
        weeklyNotifications: 0,
      });
      return;
    }

    // Check if reset date has passed
    const resetDate = new Date(subscription.notificationResetDate);
    const now = new Date();

    if (now >= resetDate) {
      // Reset the counter and set new reset date
      const nextResetDate = new Date();
      nextResetDate.setDate(nextResetDate.getDate() + 7);

      await updateDoc(userRef, {
        notificationResetDate: nextResetDate.toISOString(),
        weeklyNotifications: 0,
      });
    }
  } catch (error) {
    console.error("Error resetting notification counter:", error);
  }
};

/**
 * 🔹 Increment product count when seller creates a product
 */
export const incrementProductCount = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      productCount: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing product count:", error);
    throw error;
  }
};

/**
 * 🔹 Decrement product count when seller deletes a product
 */
export const decrementProductCount = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentCount = userDoc.data().productCount || 0;
      
      // Don't go below 0
      if (currentCount > 0) {
        await updateDoc(userRef, {
          productCount: increment(-1),
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error("Error decrementing product count:", error);
    throw error;
  }
};

/**
 * 🔹 Increment notification count when seller sends a notification
 */
export const incrementNotificationCount = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      weeklyNotifications: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error incrementing notification count:", error);
    throw error;
  }
};

/**
 * 🔹 Upgrade seller to premium (after successful payment)
 * @param {string} uid - User ID
 * @param {number} months - Number of months for subscription
 */
export const upgradeSellerToPremium = async (uid, months = 1) => {
  try {
    const userRef = doc(db, "users", uid);

    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    await updateDoc(userRef, {
      subscriptionStatus: "premium",
      subscriptionStartDate: serverTimestamp(),
      subscriptionExpiryDate: expiryDate.toISOString(),
      updatedAt: serverTimestamp(),
    });

    return {
      success: true,
      expiryDate: expiryDate.toISOString(),
    };
  } catch (error) {
    console.error("Error upgrading to premium:", error);
    throw error;
  }
};

/**
 * 🔹 Check and downgrade expired premium subscriptions
 */
export const checkSubscriptionExpiry = async (uid) => {
  try {
    const subscription = await getSellerSubscription(uid);

    if (subscription.subscriptionStatus === "premium" && subscription.subscriptionExpiryDate) {
      const expiryDate = new Date(subscription.subscriptionExpiryDate);
      const now = new Date();

      if (now >= expiryDate) {
        // Subscription expired, downgrade to free
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          subscriptionStatus: "free",
          subscriptionExpiryDate: null,
          updatedAt: serverTimestamp(),
        });

        return {
          expired: true,
          message: "Your premium subscription has expired.",
        };
      }
    }

    return { expired: false };
  } catch (error) {
    console.error("Error checking subscription expiry:", error);
    throw error;
  }
};

/**
 * 🔹 Initialize Paystack payment for subscription
 * This is a dummy implementation - replace with actual Paystack integration
 */
export const initializeSubscriptionPayment = async (email, plan) => {
  try {
    // Define subscription plans
    const plans = {
      monthly: {
        amount: 5000, // GH₵50.00 in pesewas
        name: "Monthly Premium",
        months: 1,
      },
      quarterly: {
        amount: 13500, // GH₵135.00 in pesewas (10% discount)
        name: "Quarterly Premium",
        months: 3,
      },
      yearly: {
        amount: 48000, // GH₵480.00 in pesewas (20% discount)
        name: "Yearly Premium",
        months: 12,
      },
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      throw new Error("Invalid subscription plan");
    }

    // TODO: Replace with actual Paystack API call
    const paystackResponse = {
      status: true,
      message: "Authorization URL created",
      data: {
        authorization_url: "https://checkout.paystack.com/dummy-url",
        access_code: "dummy-access-code",
        reference: `SUB_${Date.now()}`,
      },
    };

    return {
      success: true,
      paymentUrl: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference,
      plan: selectedPlan,
    };

    /* ACTUAL PAYSTACK IMPLEMENTATION:
    
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: selectedPlan.amount,
        currency: "GHS",
        metadata: {
          plan: plan,
          months: selectedPlan.months,
          custom_fields: [
            {
              display_name: "Subscription Plan",
              variable_name: "subscription_plan",
              value: selectedPlan.name,
            },
          ],
        },
        callback_url: `${window.location.origin}/seller-dashboard/payment-callback`,
      }),
    });

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || "Payment initialization failed");
    }

    return {
      success: true,
      paymentUrl: data.data.authorization_url,
      reference: data.data.reference,
      plan: selectedPlan,
    };
    */
  } catch (error) {
    console.error("Error initializing payment:", error);
    throw error;
  }
};

/**
 * 🔹 Verify Paystack payment and upgrade subscription
 */
export const verifySubscriptionPayment = async (reference, uid) => {
  try {
    // TODO: Replace with actual Paystack verification
    const verificationResponse = {
      status: true,
      message: "Verification successful",
      data: {
        status: "success",
        metadata: {
          plan: "monthly",
          months: 1,
        },
      },
    };

    if (verificationResponse.data.status === "success") {
      const months = verificationResponse.data.metadata.months;
      await upgradeSellerToPremium(uid, months);

      return {
        success: true,
        message: "Subscription activated successfully!",
      };
    } else {
      throw new Error("Payment verification failed");
    }

    /* ACTUAL PAYSTACK IMPLEMENTATION:
    
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      throw new Error("Payment verification failed");
    }

    // Extract plan details from metadata
    const months = data.data.metadata.months;
    
    // Upgrade user to premium
    await upgradeSellerToPremium(uid, months);

    return {
      success: true,
      message: "Subscription activated successfully!",
    };
    */
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};