/**
 * @file This file contains utility functions for managing orders in Firestore.
 */

import { db } from "./FirebaseConfig";
import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

/**
 * 🔹 Listen for real-time updates to orders for a specific seller.
 *
 * This function sets up a real-time listener on the 'orders' collection.
 * It filters orders by 'sellerId' and calls the onUpdate callback
 * with the new list of orders whenever there's a change.
 *
 * @param {string} sellerId - The ID of the seller whose orders to fetch.
 * @param {function} onUpdate - Callback function to be invoked with the orders array.
 * @param {function} onError - Callback function to handle errors.
 * @returns {function} - An unsubscribe function to detach the listener.
 */
export const getOrdersForSeller = (sellerId, onUpdate, onError) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("sellerId", "==", sellerId));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // Sort orders by creation date, newest first
        orders.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        onUpdate(orders);
      },
      (error) => {
        console.error("Error listening to orders:", error);
        if (onError) {
          onError(error);
        }
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up order listener:", error);
    if (onError) {
      onError(error);
    }
    // Return a no-op function if setup fails
    return () => {};
  }
};

/**
 * 🔹 Update the status of a specific order.
 *
 * @param {string} orderId - The ID of the order to update.
 * @param {string} newStatus - The new status to set for the order.
 *   (e.g., 'Processing', 'Completed', 'Cancelled').
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    if (!orderId || !newStatus) {
      throw new Error("Order ID and new status are required for an update.");
    }
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: newStatus,
    });
  } catch (error) {
    console.error(`Error updating order ${orderId} to status ${newStatus}:`, error);
    throw error;
  }
};
