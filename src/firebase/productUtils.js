/**
 * @file This file contains utility functions for managing products, including CRUD operations.
 */

import { db, storage } from "./FirebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/**
 * 🔹 Upload multiple images to Firebase Storage for a product.
 *
 * @param {string} sellerId - The ID of the seller.
 * @param {string} productId - The ID of the product.
 * @param {File[]} images - An array of image files to upload.
 * @param {function} onProgress - A callback function to report upload progress.
 * @returns {Promise<string[]>} - A promise that resolves to an array of image download URLs.
 */
const uploadProductImages = async (sellerId, productId, images, onProgress) => {
  try {
    const imageUrls = [];
    const totalImages = images.length;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const timestamp = Date.now();
      const fileName = `${timestamp}_${image.name}`;
      const imageRef = ref(
        storage,
        `products/${sellerId}/${productId}/${fileName}`,
      );

      // Upload image
      await uploadBytes(imageRef, image);

      // Get download URL
      const downloadUrl = await getDownloadURL(imageRef);
      imageUrls.push(downloadUrl);

      // Update progress
      if (onProgress) {
        const progress = Math.round(((i + 1) / totalImages) * 100);
        onProgress(progress);
      }
    }

    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

/**
 * 🔹 Create a new product in Firestore and upload its images to Storage.
 *
 * @param {string} sellerId - The ID of the seller.
 * @param {object} productData - The product data to be saved.
 * @param {File[]} images - An array of image files to upload.
 * @param {function} onProgress - A callback function to report upload progress.
 * @returns {Promise<string>} - A promise that resolves to the new product's ID.
 */
export const createProduct = async (
  sellerId,
  productData,
  images,
  onProgress,
) => {
  try {
    console.log("Starting product creation...");
    console.log("Seller ID:", sellerId);
    console.log("Product Data:", productData);
    console.log("Number of images:", images.length);

    // Validate images
    if (!images || images.length === 0) {
      throw new Error("At least one image is required");
    }

    // First, create the product document to get the ID
    const productsRef = collection(db, "Products");
    console.log("Creating product document...");
    
    const productDoc = await addDoc(productsRef, {
      ...productData,
      sellerId,
      images: [], // Will be updated after upload
      frontImage: "", // Will be updated after upload
      views: 0,
      likes: 0,
      sales: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const productId = productDoc.id;
    console.log("Product document created with ID:", productId);

    // Upload images
    console.log("Starting image upload...");
    const imageUrls = await uploadProductImages(
      sellerId,
      productId,
      images,
      onProgress,
    );
    console.log("Images uploaded successfully:", imageUrls);

    // Update product with image URLs (first image is the front image)
    console.log("Updating product with image URLs...");
    await updateDoc(doc(db, "Products", productId), {
      images: imageUrls,
      frontImage: imageUrls[0] || "",
    });

    // Update analytics to increment product count
    console.log("Updating analytics...");
    const { updateAnalytics } = await import("./analyticsUtils");
    await updateAnalytics(sellerId, productId, "products", 1);

    console.log("Product created successfully!");
    return productId;
  } catch (error) {
    console.error("Error creating product:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw error;
  }
};

/**
 * 🔹 Get all products for a specific seller.
 * NOTE: This function does not order the products. The client should handle sorting.
 *
 * @param {string} sellerId - The ID of the seller.
 * @returns {Promise<object[]>} - A promise that resolves to an array of product objects.
 */
export const getSellerProducts = async (sellerId) => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(productsRef, where("sellerId", "==", sellerId));

    const querySnapshot = await getDocs(q);
    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};

/**
 * 🔹 Get a single product by its ID.
 *
 * @param {string} productId - The ID of the product.
 * @returns {Promise<object>} - A promise that resolves to the product object.
 */
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "Products", productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }

    return {
      id: productDoc.id,
      ...productDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/**
 * 🔹 Update a product in Firestore.
 *
 * @param {string} productId - The ID of the product to update.
 * @param {object} updates - An object containing the fields to update.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the update was successful.
 */
export const updateProduct = async (productId, updates) => {
  try {
    const productRef = doc(db, "Products", productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * 🔹 Delete a product from Firestore and its associated images from Storage.
 *
 * @param {string} productId - The ID of the product to delete.
 * @param {string} sellerId - The ID of the seller (for image path construction).
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the deletion was successful.
 */
export const deleteProduct = async (productId, sellerId) => {
  try {
    // Get product data first
    const product = await getProductById(productId);

    // Delete all images from storage
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        try {
          // Extract path from URL
          const imagePath = imageUrl.split("/o/")[1].split("?")[0];
          const decodedPath = decodeURIComponent(imagePath);
          const imageRef = ref(storage, decodedPath);
          return deleteObject(imageRef);
        } catch (err) {
          console.error("Error deleting image:", err);
          return Promise.resolve(); // Continue even if one image fails
        }
      });

      await Promise.all(deletePromises);
    }

    // Delete product document
    await deleteDoc(doc(db, "Products", productId));

    // Update analytics to decrement product count
    const { updateAnalytics } = await import("./analyticsUtils");
    await updateAnalytics(sellerId, productId, "products", -1);

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * 🔹 Toggle a product's status between "active" and "inactive".
 *
 * @param {string} productId - The ID of the product.
 * @param {string} currentStatus - The current status of the product.
 * @returns {Promise<string>} - A promise that resolves to the new status.
 */
export const toggleProductStatus = async (productId, currentStatus) => {
  try {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await updateProduct(productId, { status: newStatus });
    return newStatus;
  } catch (error) {
    console.error("Error toggling product status:", error);
    throw error;
  }
};
