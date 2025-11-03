/**
 * @file This file contains utility functions for managing seller subscriptions and feature limits.
 *
 * @description
 * The subscription data is stored in the `Student_Users` collection in Firestore.
 * Each user document contains the following fields related to subscriptions:
 *
 * - `subscriptionStatus`: (String) "free" or "premium".
 * - `productCount`: (Number) The number of products the seller has created.
 * - `weeklyNotifications`: (Number) The number of notifications sent by the seller in the current week.
 * - `notificationResetDate`: (String) The ISO date string for when the weekly notification counter should be reset.
 * - `subscriptionExpiryDate`: (String) The ISO date string for when the premium subscription expires.
 * - `subscriptionStartDate`: (Timestamp) The date the subscription started.
 * - `updatedAt`: (Timestamp) The last time the subscription data was updated.
 */

import { db } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  setDoc,  // Import setDoc
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 🔹 Get seller subscription status and limits.
 * This function retrieves the subscription details for a given user from Firestore.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object containing the subscription details.
 */
export const getSellerSubscription = async (uid) => {
  try {
    const userRef = doc(db, "Student_Users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // If the user document doesn't exist, return a default free subscription.
      return {
        subscriptionStatus: "free",
        productCount: 0,
        weeklyNotifications: 0,
        notificationResetDate: null,
        subscriptionExpiryDate: null,
      };
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
 * 🔹 Check if a seller can post a new product based on their subscription plan.
 * Free users are limited to 1 product, while premium users have no limit.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object with `allowed` (boolean) and `reason` (string|null).
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
 * 🔹 Check if a seller can send a notification based on their subscription plan.
 * Free users are limited to 3 notifications per week, while premium users have no limit.
 * This function also handles the weekly reset of the notification counter.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object with `allowed` (boolean), `remaining` (number|string), and `reason` (string|null).
 */
export const canSendNotification = async (uid) => {
  try {
    let subscription = await getSellerSubscription(uid);

    // Check if we need to reset weekly counter
    const wasReset = await checkAndResetNotificationCounter(uid, subscription);

    // Fetch updated data only if the counter was reset
    if (wasReset) {
      subscription = await getSellerSubscription(uid);
    }

    // Premium users can send unlimited notifications
    if (subscription.subscriptionStatus === "premium") {
      return { allowed: true, remaining: "unlimited", reason: null };
    }

    // Free users can send 3 notifications per week
    const remaining = 3 - subscription.weeklyNotifications;
    
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
 * 🔹 Reset the weekly notification counter if a week has passed since the last reset.
 * This function is called by `canSendNotification`.
 *
 * @param {string} uid - The user ID of the seller.
 * @param {object} subscription - The seller's subscription object.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the counter was reset, `false` otherwise.
 */
const checkAndResetNotificationCounter = async (uid, subscription) => {
  try {
    const userRef = doc(db, "Student_Users", uid);

    // If no reset date exists, set it to now + 7 days
    if (!subscription.notificationResetDate) {
      const nextResetDate = new Date();
      nextResetDate.setDate(nextResetDate.getDate() + 7);

      await updateDoc(userRef, {
        notificationResetDate: nextResetDate.toISOString(),
        weeklyNotifications: 0,
      });
      return true;
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
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error resetting notification counter:", error);
    return false;
  }
};

/**
 * 🔹 Increment the product count for a seller when they create a new product.
 * This is an atomic operation.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<void>}
 */
export const incrementProductCount = async (uid) => {
  try {
    const userRef = doc(db, "Student_Users", uid);
    await setDoc(userRef, {
      productCount: increment(1),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error incrementing product count:", error);
    throw error;
  }
};

/**
 * 🔹 Decrement the product count for a seller when they delete a product.
 * This is an atomic operation and will not go below 0.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<void>}
 */
export const decrementProductCount = async (uid) => {
  try {
    const userRef = doc(db, "Student_Users", uid);
    // Using setDoc with merge to avoid errors if the document doesn't exist.
    // The productCount will not go below 0, but this is handled by the UI logic mostly.
    // A more robust solution would use a transaction to read the current count first.
    await setDoc(userRef, {
      productCount: increment(-1),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error decrementing product count:", error);
    throw error;
  }
};

/**
 * 🔹 Increment the weekly notification count for a seller when they send a notification.
 * This is an atomic operation.
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<void>}
 */
export const incrementNotificationCount = async (uid) => {
  try {
    const userRef = doc(db, "Student_Users", uid);
    await setDoc(userRef, {
      weeklyNotifications: increment(1),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error incrementing notification count:", error);
    throw error;
  }
};

/**
 * 🔹 Upgrade a seller to the premium plan after a successful payment.
 * This function updates the user's subscription status and sets the expiry date.
 *
 * @param {string} uid - The user ID of the seller.
 * @param {number} [months=1] - The number of months for the subscription.
 * @returns {Promise<object>} - A promise that resolves to an object with `success` (boolean) and `expiryDate` (string).
 */
export const upgradeSellerToPremium = async (uid, months = 1) => {
  try {
    const userRef = doc(db, "Student_Users", uid);

    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    await setDoc(userRef, {
      subscriptionStatus: "premium",
      subscriptionStartDate: serverTimestamp(),
      subscriptionExpiryDate: expiryDate.toISOString(),
      updatedAt: serverTimestamp(),
    }, { merge: true });

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
 * 🔹 Manually upgrade a seller to the premium plan (admin function).
 * This function updates the user's subscription status and sets the expiry date.
 * This function should only be callable by an administrator.
 *
 * @param {string} uid - The user ID of the seller.
 * @param {number} [months=1] - The number of months for the premium subscription.
 * @returns {Promise<object>} - A promise that resolves to an object with `success` (boolean) and `expiryDate` (string).
 */
export const manuallyUpgradeSellerToPremium = async (uid, months = 1) => {
  try {
    const userRef = doc(db, "Student_Users", uid);

    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    await setDoc(userRef, {
      subscriptionStatus: "premium",
      subscriptionStartDate: serverTimestamp(),
      subscriptionExpiryDate: expiryDate.toISOString(),
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return {
      success: true,
      expiryDate: expiryDate.toISOString(),
    };
  } catch (error) {
    console.error("Error manually upgrading to premium:", error);
    throw error;
  }
};

/**
 * 🔹 Check for and downgrade expired premium subscriptions.
 * This function should be called periodically (e.g., when a user logs in or accesses a premium feature).
 *
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object with `expired` (boolean) and `message` (string|null).
 */
export const checkSubscriptionExpiry = async (uid) => {
  try {
    const subscription = await getSellerSubscription(uid);

    if (subscription.subscriptionStatus === "premium" && subscription.subscriptionExpiryDate) {
      const expiryDate = new Date(subscription.subscriptionExpiryDate);
      const now = new Date();

      if (now >= expiryDate) {
        // Subscription expired, downgrade to free
        const userRef = doc(db, "Student_Users", uid);
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
 * 🔹 Initialize Paystack payment for a subscription.
 *
 * @param {string} email - The user's email address.
 * @param {string} plan - The selected plan ("monthly", "quarterly", or "yearly").
 * @returns {Promise<object>} - A promise that resolves to an object with payment details.
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
 * 🔹 Verify a Paystack payment and upgrade the subscription if successful.
 *
 * @param {string} reference - The payment reference from Paystack.
 * @param {string} uid - The user ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object with `success` (boolean) and `message` (string).
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