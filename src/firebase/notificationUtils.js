/**
 * @file This file contains utility functions for sending and managing push notifications.
 */

import { db } from "./FirebaseConfig";
import { updateAnalytics } from "./analyticsUtils";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 🔹 Send a push notification via Expo and update analytics.
 *
 * @param {string} sellerId - The ID of the seller sending the notification.
 * @param {object} notificationData - The notification data (title, message, etc.).
 * @returns {Promise<object>} - A promise that resolves to an object with the results of the send operation.
 */
export const sendPushNotification = async (sellerId, notificationData) => {
  try {
    const { title, message, targetAudience, priority } = notificationData;

    // Get Expo push tokens based on target audience
    const pushTokens = await getTargetAudiencePushTokens(
      targetAudience,
      sellerId,
    );

    if (pushTokens.length === 0) {
      throw new Error("No users found for the selected audience");
    }

    // Prepare Expo push notification messages
    const messages = pushTokens.map((token) => ({
      to: token,
      sound: "default",
      title: title,
      body: message,
      priority: priority === "high" ? "high" : "default",
      data: {
        sellerId,
        type: "seller_notification",
        targetAudience,
      },
    }));

    // Send to Expo Push Notification service
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const responseData = await response.json();

    // Check for errors
    const errors =
      responseData.data?.filter((item) => item.status === "error") || [];

    if (errors.length > 0) {
      console.error("Some notifications failed:", errors);
    }

    // Calculate successful deliveries
    const successCount = pushTokens.length - errors.length;
    const failureCount = errors.length;

    // Save notification to history
    await addDoc(collection(db, "Notification_History"), {
      sellerId,
      title,
      message,
      targetAudience,
      priority,
      delivered: successCount,
      failed: failureCount,
      sentAt: serverTimestamp(),
    });

    // Update analytics
    await updateAnalytics(sellerId, null, "notificationsSent", 1);
    await updateAnalytics(sellerId, null, "notificationsDelivered", successCount);
    await updateAnalytics(sellerId, null, "notificationsFailed", failureCount);

    return {
      success: true,
      delivered: successCount,
      failed: failureCount,
      total: pushTokens.length,
    };
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw error;
  }
};

/**
 * 🔹 Get an array of push tokens based on the selected target audience.
 *
 * @param {string} targetAudience - The target audience ("all", "students", etc.).
 * @param {string} sellerId - The ID of the seller (for targeting specific user groups).
 * @returns {Promise<string[]>} - A promise that resolves to an array of push tokens.
 */
const getTargetAudiencePushTokens = async (targetAudience, sellerId) => {
  try {
    let pushTokens = [];

    switch (targetAudience) {
      case "all":
        // Get all users with push tokens
        pushTokens = await getAllUserPushTokens();
        break;

      case "students":
        // Get only verified students
        pushTokens = await getStudentPushTokens();
        break;

      case "recent_viewers":
        // Get users who viewed seller's products recently (last 7 days)
        pushTokens = await getRecentViewersPushTokens(sellerId);
        break;

      case "interested":
        // Get users who liked or saved seller's products
        pushTokens = await getInterestedUsersPushTokens(sellerId);
        break;

      default:
        pushTokens = await getAllUserPushTokens();
    }

    // Filter out invalid tokens
    return pushTokens.filter(
      (token) => token && token.startsWith("ExponentPushToken"),
    );
  } catch (error) {
    console.error("Error getting push tokens:", error);
    throw error;
  }
};

/**
 * 🔹 Get all user push tokens from the `Student_Users` collection.
 *
 * @param {boolean} [includeUserId=false] - Whether to include the user ID in the returned array.
 * @returns {Promise<string[]|object[]>} - A promise that resolves to an array of tokens or token-ID objects.
 */
const getAllUserPushTokens = async (includeUserId = false) => {
  try {
    const usersRef = collection(db, "Student_Users");
    const q = query(usersRef, where("expoPushToken", "!=", null));
    const querySnapshot = await getDoc(q);

    const tokens = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.expoPushToken) {
        if (includeUserId) {
          tokens.push({ token: data.expoPushToken, userId: doc.id });
        } else {
          tokens.push(data.expoPushToken);
        }
      }
    });

    return tokens;
  } catch (error) {
    console.error("Error fetching all user tokens:", error);
    return [];
  }
};

/**
 * 🔹 Get push tokens for verified students only.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of push tokens.
 */
const getStudentPushTokens = async () => {
  try {
    const studentsRef = collection(db, "Student_Users");
    const q = query(
      studentsRef,
      where("expoPushToken", "!=", null),
      where("isVerified", "==", true), // Assuming you have a verification field
    );
    const querySnapshot = await getDoc(q);

    const tokens = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.expoPushToken) {
        tokens.push(data.expoPushToken);
      }
    });

    return tokens;
  } catch (error) {
    console.error("Error fetching student tokens:", error);
    return [];
  }
};

/**
 * 🔹 Get push tokens of users who have recently viewed a seller's products.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<string[]>} - A promise that resolves to an array of push tokens.
 */
const getRecentViewersPushTokens = async (sellerId) => {
  try {
    // Get all users with push tokens first
    const allUserTokens = await getAllUserPushTokens(true); // Get tokens with user IDs

    // Get product views from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const viewsRef = collection(db, "Product_Views");
    const q = query(
      viewsRef,
      where("sellerId", "==", sellerId),
      where("viewedAt", ">=", sevenDaysAgo),
    );

    const querySnapshot = await getDoc(q);
    const userIds = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId) {
        userIds.add(data.userId);
      }
    });

    // Filter the tokens based on the user IDs
    const tokens = allUserTokens
      .filter((user) => userIds.has(user.userId))
      .map((user) => user.token);

    return tokens;
  } catch (error) {
    console.error("Error fetching recent viewers tokens:", error);
    // Fallback to all users if tracking not available
    return await getAllUserPushTokens();
  }
};

/**
 * 🔹 Get push tokens of users who have liked a seller's products.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<string[]>} - A promise that resolves to an array of push tokens.
 */
const getInterestedUsersPushTokens = async (sellerId) => {
  try {
    // Get all users with push tokens first
    const allUserTokens = await getAllUserPushTokens(true); // Get tokens with user IDs

    // Get users who liked seller's products
    const likesRef = collection(db, "Product_Likes");
    const q = query(likesRef, where("sellerId", "==", sellerId));

    const querySnapshot = await getDoc(q);
    const userIds = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId) {
        userIds.add(data.userId);
      }
    });

    // Filter the tokens based on the user IDs
    const tokens = allUserTokens
      .filter((user) => userIds.has(user.userId))
      .map((user) => user.token);

    return tokens;
  } catch (error) {
    console.error("Error fetching interested users tokens:", error);
    // Fallback to all users if tracking not available
    return await getAllUserPushTokens();
  }
};

/**
 * 🔹 Get the notification history for a seller.
 *
 * @param {string} sellerId - The ID of the seller.
 * @param {number} [limitCount=10] - The maximum number of history items to fetch.
 * @returns {Promise<object[]>} - A promise that resolves to an array of notification history objects.
 */
export const getNotificationHistory = async (sellerId, limitCount = 10) => {
  try {
    const historyRef = collection(db, "Notification_History");
    const q = query(
      historyRef,
      where("sellerId", "==", sellerId),
      orderBy("sentAt", "desc"),
      limit(limitCount),
    );

    const querySnapshot = await getDoc(q);
    const history = [];

    querySnapshot.forEach((doc) => {
      history.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return history;
  } catch (error) {
    console.error("Error fetching notification history:", error);
    return [];
  }
};

/**
 * 🔹 Save a user's Expo push token to their document in the `Student_Users` collection.
 * This function is intended to be called from the mobile app.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} expoPushToken - The user's Expo push token.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the token was saved successfully.
 */
export const saveExpoPushToken = async (userId, expoPushToken) => {
  try {
    const userRef = collection(db, "Student_Users");
    const q = query(userRef, where("uid", "==", userId));
    const querySnapshot = await getDoc(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        expoPushToken,
        tokenUpdatedAt: serverTimestamp(),
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error saving push token:", error);
    throw error;
  }
};

/**
 * 🔹 Track a product view event for analytics and notification targeting.
 *
 * @param {string} productId - The ID of the viewed product.
 * @param {string} userId - The ID of the user who viewed the product.
 * @param {string} sellerId - The ID of the product's seller.
 * @returns {Promise<void>}
 */
export const trackProductView = async (productId, userId, sellerId) => {
  try {
    await addDoc(collection(db, "Product_Views"), {
      productId,
      userId,
      sellerId,
      viewedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error tracking product view:", error);
  }
};

/**
 * 🔹 Track a product like event for analytics and notification targeting.
 *
 * @param {string} productId - The ID of the liked product.
 * @param {string} userId - The ID of the user who liked the product.
 * @param {string} sellerId - The ID of the product's seller.
 * @returns {Promise<void>}
 */
export const trackProductLike = async (productId, userId, sellerId) => {
  try {
    await addDoc(collection(db, "Product_Likes"), {
      productId,
      userId,
      sellerId,
      likedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error tracking product like:", error);
  }
};

/**
 * 🔹 Schedule a notification to be sent at a future time.
 * NOTE: This requires a backend service (e.g., Cloud Function) to process the scheduled notifications.
 *
 * @param {string} sellerId - The ID of the seller.
 * @param {object} notificationData - The notification data.
 * @param {Date} scheduledTime - The time to send the notification.
 * @returns {Promise<object>} - A promise that resolves to a success message.
 */
export const scheduleNotification = async (
  sellerId,
  notificationData,
  scheduledTime,
) => {
  try {
    // Save scheduled notification to Firestore
    await addDoc(collection(db, "Scheduled_Notifications"), {
      sellerId,
      ...notificationData,
      scheduledTime,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: "Notification scheduled successfully",
    };

    // NOTE: You'll need a Cloud Function or backend service to process scheduled notifications
  } catch (error) {
    console.error("Error scheduling notification:", error);
    throw error;
  }
};

/**
 * 🔹 Get notification analytics for a seller from the pre-aggregated analytics collection.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to an object with notification analytics.
 */
export const getNotificationAnalytics = async (sellerId) => {
  try {
    const analyticsRef = doc(db, "Analytics", sellerId, "total", "all");
    const analyticsSnap = await getDoc(analyticsRef);

    if (analyticsSnap.exists()) {
      const data = analyticsSnap.data();
      const totalSent = data.notificationsSent || 0;
      const totalDelivered = data.notificationsDelivered || 0;
      const totalFailed = data.notificationsFailed || 0;

      const deliveryRate =
        totalDelivered + totalFailed > 0
          ? ((totalDelivered / (totalDelivered + totalFailed)) * 100).toFixed(1)
          : 0;

      return {
        totalSent,
        totalDelivered,
        totalFailed,
        deliveryRate: `${deliveryRate}%`,
      };
    } else {
      // Return default values if no analytics document exists
      return {
        totalSent: 0,
        totalDelivered: 0,
        totalFailed: 0,
        deliveryRate: "0%",
      };
    }
  } catch (error) {
    console.error("Error fetching notification analytics:", error);
    return {
      totalSent: 0,
      totalDelivered: 0,
      totalFailed: 0,
      deliveryRate: "0%",
    };
  }
};
