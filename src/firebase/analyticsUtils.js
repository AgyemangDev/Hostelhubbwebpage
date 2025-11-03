import { db } from "./FirebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  writeBatch,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { getWeek, getYear, getMonth } from 'date-fns';


/**
 * ----------------------------------------------------------------
 * Analytics Data Model
 * ----------------------------------------------------------------
 *
 * We use a separate `Analytics` collection to store pre-aggregated data for each seller.
 * This approach is highly scalable and cost-effective, as it minimizes reads and complex queries.
 *
 * /Analytics/{sellerId}/
 *   - daily/{YYYY-MM-DD}
 *     - views: 100
 *     - sales: 10
 *     - revenue: 500
 *   - weekly/{YYYY-WW}
 *     - views: 700
 *     - sales: 70
 *     - revenue: 3500
 *   - monthly/{YYYY-MM}
 *     - views: 3000
 *     - sales: 300
 *     - revenue: 15000
 *   - total
 *     - products: 50
 *     - views: 10000
 *     - likes: 2000
 *     - sales: 1000
 *     - revenue: 50000
 *   - topProducts: [
 *       { productId: "...", name: "...", views: 1000, sales: 100, revenue: 5000 },
 *       ...
 *     ]
 */

/**
 * 🔹 Get the current date's identifiers for analytics documents.
 * @returns {object} - An object with `day`, `week`, and `month` identifiers.
 */
const getAnalyticsDateIds = () => {
    const now = new Date();
    const year = getYear(now);
    const month = getMonth(now) + 1; // 1-based month
    const week = getWeek(now);

    return {
        day: `${year}-${String(month).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
        week: `${year}-${String(week).padStart(2, '0')}`,
        month: `${year}-${String(month).padStart(2, '0')}`,
    };
};

/**
 * 🔹 Update analytics data when an event occurs (e.g., product view, sale).
 * This function uses a batched write to atomically update daily, weekly, monthly, and total analytics.
 *
 * @param {string} sellerId - The ID of the seller.
 * @param {string} productId - The ID of the product.
 * @param {string} eventType - The type of event ("views", "likes", "sales").
 * @param {number} [value=1] - The value to increment by (e.g., number of sales).
 * @param {number} [revenue=0] - The revenue from the sale, if applicable.
 */
export const updateAnalytics = async (sellerId, productId, eventType, value = 1, revenue = 0) => {
    try {
        const { day, week, month } = getAnalyticsDateIds();
        const batch = writeBatch(db);

        const analyticsRef = doc(db, "Analytics", sellerId);

        // Document references for different time periods
        const dailyRef = doc(analyticsRef, "daily", day);
        const weeklyRef = doc(analyticsRef, "weekly", week);
        const monthlyRef = doc(analyticsRef, "monthly", month);
        const totalRef = doc(analyticsRef, "total", "all"); // "total/all" to avoid confusion

        // Data to be updated
        const updateData = {
            [eventType]: increment(value),
            updatedAt: serverTimestamp(),
        };

        if (eventType === "sales") {
            updateData.revenue = increment(revenue);
        }

        // Add updates to the batch
        batch.set(dailyRef, updateData, { merge: true });
        batch.set(weeklyRef, updateData, { merge: true });
        batch.set(monthlyRef, updateData, { merge: true });
        batch.set(totalRef, updateData, { merge: true });

        // Commit the batch
        await batch.commit();

        // Update top products
        await updateTopProducts(sellerId);

    } catch (error) {
        console.error("Error updating analytics:", error);
        // We don't throw here to avoid breaking user-facing operations
    }
};

/**
 * 🔹 Update the list of top products for a seller.
 * This function is called after an analytics event occurs.
 * In a production environment, this might be better as a scheduled Cloud Function.
 *
 * @param {string} sellerId - The ID of the seller.
 */
export const updateTopProducts = async (sellerId) => {
    try {
        const productsRef = collection(db, "Products");
        const q = query(
            productsRef,
            where("sellerId", "==", sellerId),
            orderBy("views", "desc"),
            limit(5)
        );

        const querySnapshot = await getDocs(q);
        const topProducts = [];

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            topProducts.push({
                productId: doc.id,
                name: product.name,
                views: product.views || 0,
                sales: product.sales || 0,
                revenue: (product.sales || 0) * (product.price || 0),
            });
        });

        const analyticsRef = doc(db, "Analytics", sellerId, "total", "all");
        await updateDoc(analyticsRef, { topProducts });

    } catch (error) {
        console.error("Error updating top products:", error);
    }
};


/**
 * 🔹 Get seller analytics for a given time range.
 * This function reads the pre-aggregated data from the `Analytics` collection.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<object>} - A promise that resolves to the seller's analytics data.
 */
export const getSellerAnalytics = async (sellerId) => {
    try {
        const { day, week, month } = getAnalyticsDateIds();
        const analyticsRef = doc(db, "Analytics", sellerId);

        const dailySnap = await getDoc(doc(analyticsRef, "daily", day));
        const weeklySnap = await getDoc(doc(analyticsRef, "weekly", week));
        const monthlySnap = await getDoc(doc(analyticsRef, "monthly", month));
        const totalSnap = await getDoc(doc(analyticsRef, "total", "all"));

        const getSnapData = (snap) => snap.exists() ? snap.data() : {};

        const analytics = {
            daily: getSnapData(dailySnap),
            weekly: getSnapData(weeklySnap),
            monthly: getSnapData(monthlySnap),
            total: getSnapData(totalSnap),
            topProducts: getSnapData(totalSnap).topProducts || [],
        };
        
        // Calculate trends (example: weekly views trend)
        const previousWeek = getWeek(new Date(new Date().setDate(new Date().getDate() - 7)));
        const previousWeekId = `${getYear(new Date())}-${String(previousWeek).padStart(2, '0')}`;
        const prevWeeklySnap = await getDoc(doc(analyticsRef, "weekly", previousWeekId));
        const prevWeeklyData = getSnapData(prevWeeklySnap);

        const weeklyViews = analytics.weekly.views || 0;
        const prevWeeklyViews = prevWeeklyData.views || 0;

        if (prevWeeklyViews > 0) {
            const trend = ((weeklyViews - prevWeeklyViews) / prevWeeklyViews) * 100;
            analytics.weekly.trend = `${trend.toFixed(0)}%`;
        } else if (weeklyViews > 0) {
            analytics.weekly.trend = "+100%";
        } else {
            analytics.weekly.trend = "0%";
        }


        return analytics;

    } catch (error) {
        console.error("Error fetching seller analytics for seller:", sellerId, error);
        throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
};
