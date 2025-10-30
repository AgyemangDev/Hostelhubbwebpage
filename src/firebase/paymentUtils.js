import { db } from "./FirebaseConfig";
import {
  doc,
  addDoc,
  query,
  getDocs,
  where,
  orderBy,
  collection,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { upgradeSellerToPremium } from "./subscriptionUtils";

/**
 * 🔹 PAYSTACK CONFIGURATION
 * Your developer should replace these with actual Paystack keys
 */
const PAYSTACK_CONFIG = {
  // Use test keys for development
  publicKey: "pk_test_xxxxxxxxxxxxxxxxxxxx", // Replace with actual public key
  secretKey: "sk_test_xxxxxxxxxxxxxxxxxxxx", // Replace with actual secret key (backend only!)

  // Use live keys for production
  // publicKey: "pk_live_xxxxxxxxxxxxxxxxxxxx",
  // secretKey: "sk_live_xxxxxxxxxxxxxxxxxxxx",
};

/**
 * 🔹 Initialize Paystack payment
 * This function prepares and initializes a Paystack transaction
 */
export const initializePaystackPayment = async (paymentData) => {
  try {
    const { email, amount, plan, months, userId } = paymentData;

    // Validate required fields
    if (!email || !amount || !plan || !userId) {
      throw new Error("Missing required payment data");
    }

    // Generate unique reference
    const reference = `SUB_${userId}_${Date.now()}`;

    // Prepare callback URL (where Paystack redirects after payment)
    const callbackUrl = `${window.location.origin}/seller-dashboard/payment-callback`;

    // Save payment intent to Firestore (for tracking)
    await addDoc(collection(db, "Payment_Intents"), {
      userId,
      email,
      amount: amount / 100, // Convert back to GHS
      plan,
      months,
      reference,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    /**
     * ⚠️ IMPORTANT: FOR YOUR DEVELOPER
     *
     * Option 1: Frontend Integration (Simpler but less secure)
     * Use Paystack Inline JS (recommended for quick implementation)
     */

    // Initialize Paystack Inline
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_CONFIG.publicKey,
      email: email,
      amount: amount, // Amount in kobo/pesewas
      currency: "GHS",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Subscription Plan",
            variable_name: "subscription_plan",
            value: plan,
          },
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: userId,
          },
          {
            display_name: "Months",
            variable_name: "months",
            value: months.toString(),
          },
        ],
      },
      callback: function (response) {
        // Payment successful
        window.location.href = `${callbackUrl}?reference=${response.reference}`;
      },
      onClose: function () {
        // Payment cancelled
        console.log("Payment cancelled");
      },
    });

    // Open payment modal
    handler.openIframe();

    return {
      success: true,
      reference,
    };

    /**
     * Option 2: Backend Integration (More secure, recommended for production)
     *
     * Your developer should create a backend endpoint that:
     * 1. Receives payment data from frontend
     * 2. Initializes Paystack transaction using secret key
     * 3. Returns authorization URL to frontend
     * 4. Frontend redirects user to Paystack payment page
     *
     * Example backend endpoint code (Node.js/Express):
     *
     * app.post('/api/initialize-payment', async (req, res) => {
     *   const { email, amount, plan, months, userId } = req.body;
     *
     *   const paystackData = {
     *     email,
     *     amount: amount * 100, // Convert to pesewas
     *     currency: 'GHS',
     *     reference: `SUB_${userId}_${Date.now()}`,
     *     callback_url: `${process.env.FRONTEND_URL}/seller-dashboard/payment-callback`,
     *     metadata: {
     *       plan,
     *       months,
     *       userId
     *     }
     *   };
     *
     *   const response = await fetch('https://api.paystack.co/transaction/initialize', {
     *     method: 'POST',
     *     headers: {
     *       'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
     *       'Content-Type': 'application/json'
     *     },
     *     body: JSON.stringify(paystackData)
     *   });
     *
     *   const data = await response.json();
     *   res.json(data);
     * });
     *
     * Frontend would then call this endpoint:
     *
     * const response = await fetch('/api/initialize-payment', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify(paymentData)
     * });
     * const data = await response.json();
     * window.location.href = data.data.authorization_url;
     */
  } catch (error) {
    console.error("Error initializing Paystack payment:", error);
    throw error;
  }
};

/**
 * 🔹 Verify Paystack payment
 * This should be called after user returns from Paystack
 */
export const verifyPaystackPayment = async (reference) => {
  try {
    if (!reference) {
      throw new Error("Payment reference is required");
    }

    /**
     * ⚠️ IMPORTANT: FOR YOUR DEVELOPER
     *
     * NEVER verify payments from frontend in production!
     * This is a security risk. Always verify from backend.
     *
     * Backend endpoint example (Node.js/Express):
     *
     * app.get('/api/verify-payment/:reference', async (req, res) => {
     *   const { reference } = req.params;
     *
     *   const response = await fetch(
     *     `https://api.paystack.co/transaction/verify/${reference}`,
     *     {
     *       method: 'GET',
     *       headers: {
     *         'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
     *       }
     *     }
     *   );
     *
     *   const data = await response.json();
     *
     *   if (data.status && data.data.status === 'success') {
     *     // Payment successful - upgrade user
     *     const { user_id, months } = data.data.metadata;
     *     await upgradeUserToPremium(user_id, months);
     *
     *     res.json({ success: true, data: data.data });
     *   } else {
     *     res.json({ success: false, message: 'Payment failed' });
     *   }
     * });
     */

    // Call your backend verification endpoint
    const response = await fetch(`/api/verify-payment/${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Payment verification failed");
    }

    // Update payment intent in Firestore
    // Note: You'll need to query by reference to get the document ID
    const paymentIntentsRef = collection(db, "Payment_Intents");
    const q = query(paymentIntentsRef, where("reference", "==", reference));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        status: "completed",
        verifiedAt: serverTimestamp(),
      });
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

/**
 * 🔹 Handle payment callback
 * Called when user returns from Paystack
 */
export const handlePaymentCallback = async (reference, userId) => {
  try {
    // Verify payment
    const verification = await verifyPaystackPayment(reference);

    if (verification.success) {
      // Extract metadata
      const metadata = verification.data.metadata;
      const months = parseInt(metadata.months);

      // Upgrade user to premium
      await upgradeSellerToPremium(userId, months);

      return {
        success: true,
        message: "Payment successful! Your account has been upgraded.",
      };
    } else {
      throw new Error("Payment verification failed");
    }
  } catch (error) {
    console.error("Error handling payment callback:", error);
    throw error;
  }
};

/**
 * 🔹 Get payment history for a user
 */
export const getPaymentHistory = async (userId) => {
  try {
    const paymentIntentsRef = collection(db, "Payment_Intents");
    const q = query(
      paymentIntentsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const history = [];

    querySnapshot.forEach((doc) => {
      history.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return history;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return [];
  }
};

/**
 * 🔹 Cancel subscription
 * Note: This doesn't refund, just prevents auto-renewal
 */
export const cancelSubscription = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      subscriptionAutoRenew: false,
      cancelledAt: serverTimestamp(),
    });

    return {
      success: true,
      message:
        "Subscription cancelled. You can still use premium features until the end of your billing period.",
    };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    throw error;
  }
};

/**
 * 🔹 WEBHOOK HANDLER (FOR YOUR DEVELOPER)
 *
 * Create a backend endpoint to receive Paystack webhooks
 * This is crucial for handling payment events automatically
 *
 * Example webhook handler (Node.js/Express):
 *
 * const crypto = require('crypto');
 *
 * app.post('/api/paystack-webhook', async (req, res) => {
 *   // Verify webhook signature
 *   const hash = crypto
 *     .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
 *     .update(JSON.stringify(req.body))
 *     .digest('hex');
 *
 *   if (hash !== req.headers['x-paystack-signature']) {
 *     return res.status(401).send('Invalid signature');
 *   }
 *
 *   const event = req.body;
 *
 *   // Handle different event types
 *   switch(event.event) {
 *     case 'charge.success':
 *       // Payment successful
 *       const { reference, metadata } = event.data;
 *       await upgradeUserToPremium(metadata.user_id, metadata.months);
 *
 *       // Update payment intent
 *       await updatePaymentIntent(reference, 'completed');
 *       break;
 *
 *     case 'charge.failed':
 *       // Payment failed
 *       await updatePaymentIntent(event.data.reference, 'failed');
 *       break;
 *
 *     case 'subscription.disable':
 *       // Subscription cancelled
 *       await handleSubscriptionCancellation(event.data);
 *       break;
 *   }
 *
 *   res.sendStatus(200);
 * });
 */

/**
 * 🔹 TESTING PAYSTACK
 *
 * Test Cards (for development):
 * - Success: 4084084084084081
 * - Decline: 4084080000000408
 * - PIN Required: 507850785078507812 (PIN: 1234)
 *
 * Test Payment Flow:
 * 1. Use test public key
 * 2. Enter test card details
 * 3. OTP for test transactions: 123456
 * 4. Verify payment on backend
 * 5. Check Paystack dashboard for transaction
 */

export default {
  initializePaystackPayment,
  verifyPaystackPayment,
  handlePaymentCallback,
  getPaymentHistory,
  cancelSubscription,
};
