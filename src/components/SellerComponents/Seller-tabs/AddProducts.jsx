import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Crown, Loader2 } from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import {
  canPostProduct,
  incrementProductCount,
} from "../../../firebase/subscriptionUtils";
import { createProduct } from "../../../firebase/productUtils";
import ProductForm from "../ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);
  const [canPost, setCanPost] = useState({ allowed: false, reason: "" });
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const checkProductLimit = async () => {
      try {
        setCheckingLimit(true);
        const user = auth.currentUser;
        if (!user) {
          navigate("/seller-login");
          return;
        }
        const result = await canPostProduct(user.uid);
        setCanPost(result);
      } catch (error) {
        console.error("Error checking product limit:", error);
        setCanPost({
          allowed: false,
          reason: "Unable to verify posting limits. Please try again.",
        });
      } finally {
        setCheckingLimit(false);
      }
    };
    checkProductLimit();
  }, [navigate]);

  const handleSubmit = async (formData) => {
    console.log("=== STARTING PRODUCT SUBMISSION ===");
    console.log("Form Data received:", formData);
    console.log("Images:", formData.images);
    console.log("Images are File objects:", formData.images.every(img => img instanceof File));

    try {
      setLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        console.error("No authenticated user found");
        throw new Error("User not authenticated");
      }
      
      console.log("User authenticated:", user.uid);

      // Validate images are File objects
      if (!formData.images || formData.images.length === 0) {
        throw new Error("Please add at least one product image");
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        location: formData.location.trim(),
        tags: formData.tags,
        status: "active",
      };

      console.log("Product data prepared:", productData);
      console.log("Calling createProduct...");

      const productId = await createProduct(
        user.uid,
        productData,
        formData.images,
        setUploadProgress
      );

      console.log("Product created with ID:", productId);
      console.log("Incrementing product count...");

      await incrementProductCount(user.uid);
      
      console.log("Product count incremented successfully");
      console.log("=== PRODUCT SUBMISSION COMPLETE ===");
      
      alert("Product added successfully!");
      navigate("/seller-dashboard/products");
    } catch (error) {
      console.error("=== ERROR IN PRODUCT SUBMISSION ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      alert(error.message || "Failed to create product. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (checkingLimit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#610b0c]" />
      </div>
    );
  }

  if (!canPost.allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-amber-50 border-2 border-amber-200 rounded-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Limit Reached
          </h2>
          <p className="text-gray-600 mb-6">{canPost.reason}</p>
          <button
            onClick={() => navigate("/seller-dashboard/subscriptions")}
            className="px-6 py-3 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors flex items-center gap-2 mx-auto"
          >
            <Crown className="h-5 w-5" />
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      title="Add New Product"
      description="List your product for sale"
      submitLabel="Publish Product"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/seller-dashboard/products")}
      loading={loading}
    />
  );
};

export default AddProduct;
