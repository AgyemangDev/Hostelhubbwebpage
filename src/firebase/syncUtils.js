/**
 * @file One-time sync utilities to fix data inconsistencies
 */

import { db } from "./FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * 🔹 One-time sync function to update analytics for all sellers with existing products
 * This should be run once to fix the product count for sellers who already have products
 * 
 * @param {string} sellerId - The ID of the seller to sync (optional, if not provided syncs all)
 * @returns {Promise<object>} - A promise that resolves to sync results
 */
export const syncAllProductCounts = async (sellerId = null) => {
  try {
    console.log("Starting product count sync...");
    const results = {
      sellersProcessed: 0,
      productsFound: 0,
      errors: [],
    };

    // Get all products or products for specific seller
    const productsRef = collection(db, "Products");
    const q = sellerId 
      ? query(productsRef, where("sellerId", "==", sellerId))
      : query(productsRef);
    
    const productsSnapshot = await getDocs(q);
    
    // Group products by seller
    const sellerProducts = {};
    productsSnapshot.forEach((doc) => {
      const product = doc.data();
      const sid = product.sellerId;
      
      if (!sellerProducts[sid]) {
        sellerProducts[sid] = [];
      }
      sellerProducts[sid].push({
        id: doc.id,
        ...product,
      });
    });

    console.log(`Found ${Object.keys(sellerProducts).length} sellers with products`);

    // Update analytics for each seller
    for (const [sid, products] of Object.entries(sellerProducts)) {
      try {
        const productCount = products.length;
        results.productsFound += productCount;
        results.sellersProcessed++;

        console.log(`Syncing ${productCount} products for seller ${sid}`);

        // Update analytics total
        const analyticsRef = doc(db, "Analytics", sid, "total", "all");
        await setDoc(analyticsRef, {
          products: productCount,
          views: 0,
          likes: 0,
          sales: 0,
          revenue: 0,
          updatedAt: serverTimestamp(),
        }, { merge: true });

        console.log(`✅ Synced seller ${sid}: ${productCount} products`);
      } catch (error) {
        console.error(`Error syncing seller ${sid}:`, error);
        results.errors.push({
          sellerId: sid,
          error: error.message,
        });
      }
    }

    console.log("Sync complete!", results);
    return results;
  } catch (error) {
    console.error("Error in syncAllProductCounts:", error);
    throw error;
  }
};

/**
 * 🔹 Sync subscription product count with actual products
 * 
 * @param {string} sellerId - The ID of the seller
 * @returns {Promise<number>} - The actual product count
 */
export const syncSubscriptionProductCount = async (sellerId) => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, where("sellerId", "==", sellerId));
    const snapshot = await getDocs(q);
    const actualCount = snapshot.size;

    // Update Student_Users with actual count
    const userRef = doc(db, "Student_Users", sellerId);
    await setDoc(userRef, {
      productCount: actualCount,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    console.log(`Synced subscription count for ${sellerId}: ${actualCount}`);
    return actualCount;
  } catch (error) {
    console.error("Error syncing subscription count:", error);
    throw error;
  }
};
