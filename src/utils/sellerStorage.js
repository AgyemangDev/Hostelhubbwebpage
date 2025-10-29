/**
 * Utility functions for managing seller data in browser storage
 * This ensures seller data is cached and reused across the seller dashboard
 */

const SELLER_DATA_KEY = "hostelhubb_seller_data";
const SELLER_DATA_TIMESTAMP_KEY = "hostelhubb_seller_data_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save seller data to localStorage with timestamp
 * @param {Object} sellerData - The seller data object to cache
 */
export const saveSellerData = (sellerData) => {
  try {
    const timestamp = Date.now();
    localStorage.setItem(SELLER_DATA_KEY, JSON.stringify(sellerData));
    localStorage.setItem(SELLER_DATA_TIMESTAMP_KEY, timestamp.toString());
    console.log("Seller data saved to storage:", sellerData);
  } catch (error) {
    console.error("Failed to save seller data to storage:", error);
  }
};

/**
 * Retrieve seller data from localStorage
 * @returns {Object|null} - Cached seller data or null if not found/expired
 */
export const getSellerData = () => {
  try {
    const cachedData = localStorage.getItem(SELLER_DATA_KEY);
    const timestamp = localStorage.getItem(SELLER_DATA_TIMESTAMP_KEY);

    if (!cachedData || !timestamp) return null;

    const cacheAge = Date.now() - parseInt(timestamp);
    if (cacheAge > CACHE_DURATION) {
      console.log("Seller data cache expired, clearing storage");
      clearSellerData();
      return null;
    }

    const sellerData = JSON.parse(cachedData);
    console.log("Seller data retrieved from storage:", sellerData);
    return sellerData;
  } catch (error) {
    console.error("Failed to retrieve seller data from storage:", error);
    return null;
  }
};

/**
 * Clear seller data from localStorage
 */
export const clearSellerData = () => {
  try {
    localStorage.removeItem(SELLER_DATA_KEY);
    localStorage.removeItem(SELLER_DATA_TIMESTAMP_KEY);
    console.log("Seller data cleared from storage");
  } catch (error) {
    console.error("Failed to clear seller data from storage:", error);
  }
};

/**
 * Update specific fields in the cached seller data
 * @param {Object} updates - Fields to update
 */
export const updateSellerData = (updates) => {
  try {
    const currentData = getSellerData();
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      saveSellerData(updatedData);
      console.log("Seller data updated in storage:", updates);
      return updatedData;
    }
    return null;
  } catch (error) {
    console.error("Failed to update seller data in storage:", error);
    return null;
  }
};

/**
 * Check if seller data exists and is valid
 * @returns {boolean} - True if valid cached seller data exists
 */
export const hasValidSellerData = () => {
  const data = getSellerData();
  return data !== null && typeof data === "object" && data.uid;
};

/**
 * Get seller data with fallback to API fetch
 * @param {Function} fetchFunction - Function to fetch seller data from API
 * @returns {Object|null} - Seller data from cache or API
 */
export const getSellerDataWithFallback = async (fetchFunction) => {
  const cachedData = getSellerData();
  if (cachedData) return cachedData;

  try {
    const freshData = await fetchFunction();
    if (freshData) {
      saveSellerData(freshData);
      return freshData;
    }
  } catch (error) {
    console.error("Failed to fetch fresh seller data:", error);
  }

  return null;
};

/**
 * Extract essential seller info for reports or headers
 * @param {Object} sellerData - Full seller data object
 * @returns {Object} - Essential seller info
 */
export const getSellerSessionInfo = (sellerData = null) => {
  const data = sellerData || getSellerData();
  if (!data) return null;

  return {
    sellerId: data.uid || data.sellerId,
    shopName: data.shopName || "",
    ownerName: data.displayName || data.name || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || "",
    approved: data.approved || false,
    role: data.role || "seller",
    location: data.location || "",
    profilePicture: data.profilePicture || "",
  };
};
