import { db } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 🔹 Send push notification via Expo
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

    // Save notification to history
    await addDoc(collection(db, "Notification_History"), {
      sellerId,
      title,
      message,
      targetAudience,
      priority,
      delivered: successCount,
      failed: errors.length,
      sentAt: serverTimestamp(),
    });

    return {
      success: true,
      delivered: successCount,
      failed: errors.length,
      total: pushTokens.length,
    };
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw error;
  }
};

/**
 * 🔹 Get push tokens based on target audience
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
 * 🔹 Get all user push tokens
 */
const getAllUserPushTokens = async () => {
  try {
    const usersRef = collection(db, "Student_Users");
    const q = query(usersRef, where("expoPushToken", "!=", null));
    const querySnapshot = await getDocs(q);

    const tokens = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.expoPushToken) {
        tokens.push(data.expoPushToken);
      }
    });

    return tokens;
  } catch (error) {
    console.error("Error fetching all user tokens:", error);
    return [];
  }
};

/**
 * 🔹 Get student push tokens only
 */
const getStudentPushTokens = async () => {
  try {
    const studentsRef = collection(db, "Student_Users");
    const q = query(
      studentsRef,
      where("expoPushToken", "!=", null),
      where("isVerified", "==", true), // Assuming you have a verification field
    );
    const querySnapshot = await getDocs(q);

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
 * 🔹 Get push tokens of users who viewed seller's products recently
 */
const getRecentViewersPushTokens = async (sellerId) => {
  try {
    // Get product views from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const viewsRef = collection(db, "Product_Views");
    const q = query(
      viewsRef,
      where("sellerId", "==", sellerId),
      where("viewedAt", ">=", sevenDaysAgo),
    );

    const querySnapshot = await getDocs(q);
    const userIds = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId) {
        userIds.add(data.userId);
      }
    });

    // Get push tokens for these users
    const tokens = [];
    for (const userId of userIds) {
      const userRef = collection(db, "Student_Users");
      const userQuery = query(userRef, where("uid", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      userSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.expoPushToken) {
          tokens.push(userData.expoPushToken);
        }
      });
    }

    return tokens;
  } catch (error) {
    console.error("Error fetching recent viewers tokens:", error);
    // Fallback to all users if tracking not available
    return await getAllUserPushTokens();
  }
};

/**
 * 🔹 Get push tokens of users who liked/saved seller's products
 */
const getInterestedUsersPushTokens = async (sellerId) => {
  try {
    // Get users who liked seller's products
    const likesRef = collection(db, "Product_Likes");
    const q = query(likesRef, where("sellerId", "==", sellerId));

    const querySnapshot = await getDocs(q);
    const userIds = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId) {
        userIds.add(data.userId);
      }
    });

    // Get push tokens for these users
    const tokens = [];
    for (const userId of userIds) {
      const userRef = collection(db, "Student_Users");
      const userQuery = query(userRef, where("uid", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      userSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.expoPushToken) {
          tokens.push(userData.expoPushToken);
        }
      });
    }

    return tokens;
  } catch (error) {
    console.error("Error fetching interested users tokens:", error);
    // Fallback to all users if tracking not available
    return await getAllUserPushTokens();
  }
};

/**
 * 🔹 Get notification history for a seller
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
    console.error("Error fetching notification history:", error);
    return [];
  }
};

/**
 * 🔹 Save user's Expo push token (to be called from mobile app)
 */
export const saveExpoPushToken = async (userId, expoPushToken) => {
  try {
    const userRef = collection(db, "Student_Users");
    const q = query(userRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

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
 * 🔹 Track product view (for targeting recent viewers)
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
 * 🔹 Track product like (for targeting interested users)
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
 * 🔹 Schedule notification (for future implementation)
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
 * 🔹 Get notification analytics
 */
export const getNotificationAnalytics = async (sellerId) => {
  try {
    const historyRef = collection(db, "Notification_History");
    const q = query(historyRef, where("sellerId", "==", sellerId));

    const querySnapshot = await getDocs(q);

    let totalSent = 0;
    let totalDelivered = 0;
    let totalFailed = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalSent += 1;
      totalDelivered += data.delivered || 0;
      totalFailed += data.failed || 0;
    });

    const deliveryRate =
      totalSent > 0
        ? ((totalDelivered / (totalDelivered + totalFailed)) * 100).toFixed(1)
        : 0;

    return {
      totalSent,
      totalDelivered,
      totalFailed,
      deliveryRate: `${deliveryRate}%`,
    };
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
