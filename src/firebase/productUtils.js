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
  orderBy,
  limit,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/**
 * 🔹 Upload multiple images to Firebase Storage
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
 * 🔹 Create a new product
 */
export const createProduct = async (
  sellerId,
  productData,
  images,
  onProgress,
) => {
  try {
    // First, create the product document to get the ID
    const productsRef = collection(db, "Products");
    const productDoc = await addDoc(productsRef, {
      ...productData,
      sellerId,
      images: [], // Will be updated after upload
      views: 0,
      likes: 0,
      sales: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const productId = productDoc.id;

    // Upload images
    const imageUrls = await uploadProductImages(
      sellerId,
      productId,
      images,
      onProgress,
    );

    // Update product with image URLs
    await updateDoc(doc(db, "Products", productId), {
      images: imageUrls,
    });

    return productId;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/**
 * 🔹 Get all products for a seller
 */
export const getSellerProducts = async (sellerId) => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(
      productsRef,
      where("sellerId", "==", sellerId),
      orderBy("createdAt", "desc"),
    );

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
 * 🔹 Get a single product by ID
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
 * 🔹 Update a product
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
 * 🔹 Delete a product and its images
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

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * 🔹 Toggle product status (active/inactive)
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

/**
 * 🔹 Increment product views
 */
export const incrementProductViews = async (productId) => {
  try {
    const productRef = doc(db, "Products", productId);
    await updateDoc(productRef, {
      views: increment(1),
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    throw error;
  }
};

/**
 * 🔹 Increment product likes
 */
export const incrementProductLikes = async (productId) => {
  try {
    const productRef = doc(db, "Products", productId);
    await updateDoc(productRef, {
      likes: increment(1),
    });
  } catch (error) {
    console.error("Error incrementing likes:", error);
    throw error;
  }
};

/**
 * 🔹 Increment product sales
 */
export const incrementProductSales = async (productId) => {
  try {
    const productRef = doc(db, "Products", productId);
    await updateDoc(productRef, {
      sales: increment(1),
    });
  } catch (error) {
    console.error("Error incrementing sales:", error);
    throw error;
  }
};

/**
 * 🔹 Get seller analytics
 */
export const getSellerAnalytics = async (sellerId) => {
  try {
    const products = await getSellerProducts(sellerId);

    // Calculate totals
    const totalViews = products.reduce(
      (sum, product) => sum + (product.views || 0),
      0,
    );
    const totalLikes = products.reduce(
      (sum, product) => sum + (product.likes || 0),
      0,
    );
    const totalSales = products.reduce(
      (sum, product) => sum + (product.sales || 0),
      0,
    );
    const totalRevenue = products.reduce(
      (sum, product) => sum + (product.sales || 0) * (product.price || 0),
      0,
    );

    // Get weekly data (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyProducts = products.filter((product) => {
      const createdAt = product.createdAt?.toDate();
      return createdAt && createdAt >= sevenDaysAgo;
    });

    const weeklyViews = weeklyProducts.reduce(
      (sum, product) => sum + (product.views || 0),
      0,
    );
    const weeklySales = weeklyProducts.reduce(
      (sum, product) => sum + (product.sales || 0),
      0,
    );
    const weeklyRevenue = weeklyProducts.reduce(
      (sum, product) => sum + (product.sales || 0) * (product.price || 0),
      0,
    );

    // Get monthly data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyProducts = products.filter((product) => {
      const createdAt = product.createdAt?.toDate();
      return createdAt && createdAt >= thirtyDaysAgo;
    });

    const monthlyViews = monthlyProducts.reduce(
      (sum, product) => sum + (product.views || 0),
      0,
    );
    const monthlySales = monthlyProducts.reduce(
      (sum, product) => sum + (product.sales || 0),
      0,
    );
    const monthlyRevenue = monthlyProducts.reduce(
      (sum, product) => sum + (product.sales || 0) * (product.price || 0),
      0,
    );

    // Calculate trends (dummy calculation for now)
    const weeklyTrend = weeklyViews > 0 ? "+12%" : "0%";
    const monthlyTrend = monthlyViews > 0 ? "+24%" : "0%";

    return {
      total: {
        products: products.length,
        views: totalViews,
        likes: totalLikes,
        sales: totalSales,
        revenue: totalRevenue,
      },
      weekly: {
        views: weeklyViews,
        sales: weeklySales,
        revenue: weeklyRevenue,
        trend: weeklyTrend,
      },
      monthly: {
        views: monthlyViews,
        sales: monthlySales,
        revenue: monthlyRevenue,
        trend: monthlyTrend,
      },
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

/**
 * 🔹 Search products by category and location
 */
export const searchProducts = async (filters) => {
  try {
    const { category, location, minPrice, maxPrice } = filters;

    let q = query(collection(db, "Products"), where("status", "==", "active"));

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (location) {
      q = query(q, where("location", "==", location));
    }

    const querySnapshot = await getDocs(q);
    let products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Filter by price range (client-side filtering)
    if (minPrice !== undefined || maxPrice !== undefined) {
      products = products.filter((product) => {
        const price = product.price || 0;
        if (minPrice !== undefined && price < minPrice) return false;
        if (maxPrice !== undefined && price > maxPrice) return false;
        return true;
      });
    }

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * 🔹 Get featured/popular products
 */
export const getFeaturedProducts = async (limitCount = 10) => {
  try {
    const productsRef = collection(db, "Products");
    const q = query(
      productsRef,
      where("status", "==", "active"),
      orderBy("views", "desc"),
      limit(limitCount),
    );

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
    console.error("Error fetching featured products:", error);
    throw error;
  }
};
