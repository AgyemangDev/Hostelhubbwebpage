import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  AlertCircle,
  Crown,
  Loader2,
  CheckCircle,
  Tag,
  MapPin,
} from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import {
  canPostProduct,
  incrementProductCount,
} from "../../../firebase/subscriptionUtils";
import { createProduct } from "../../../firebase/productUtils";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);
  const [canPost, setCanPost] = useState({ allowed: false, reason: "" });
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    location: "",
    tags: [],
    images: [],
    previewImages: [],
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: "fashion", label: "Fashion" },
    { value: "electronics", label: "Electronics" },
    { value: "home", label: "Home & Living" },
    { value: "beauty", label: "Beauty & Health" },
    { value: "sports", label: "Sports & Fitness" },
    { value: "accessories", label: "Accessories" },
    { value: "others", label: "Other Products" },
  ];

  const productTags = [
    "Handmade",
    "Eco-friendly",
    "Imported",
    "Limited Edition",
    "Locally Made",
    "New Arrival",
    "Best Seller",
    "On Sale",
    "Customizable",
    "High Quality",
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      setErrors((prev) => ({
        ...prev,
        images: "Maximum 5 images allowed",
      }));
      return;
    }
    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Each image must be less than 5MB",
      }));
      return;
    }
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      previewImages: [...prev.previewImages, ...newPreviewImages],
    }));
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(formData.previewImages[index]);
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previewImages: prev.previewImages.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.trim().length < 20)
      newErrors.description = "Description must be at least 20 characters";
    if (!formData.price) newErrors.price = "Price is required";
    else if (parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.location.trim())
      newErrors.location = "Location is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        location: formData.location.trim(),
        tags: formData.tags,
        sellerId: user.uid,
        status: "active",
      };

      const productId = await createProduct(
        user.uid,
        productData,
        formData.images,
        setUploadProgress
      );

      await incrementProductCount(user.uid);
      alert("Product added successfully!");
      navigate("/seller-dashboard/products");
    } catch (error) {
      console.error("Error creating product:", error);
      setErrors({
        submit: error.message || "Failed to create product. Please try again.",
      });
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Product
        </h1>
        <p className="text-gray-600">List your product for sale</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Men's Leather Jacket"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your product (minimum 20 characters)..."
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Pricing & Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (GH₵) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#610b0c] ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Accra, Ghana"
          />
        </div>

        {/* Tags */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#610b0c]" /> Product Tags (Optional)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {productTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                  formData.tags.includes(tag)
                    ? "bg-[#610b0c] text-white border-[#610b0c]"
                    : "border-gray-300 text-gray-700 hover:border-[#610b0c]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Product Images <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload up to 5 images (max 5MB each)
          </p>

          {formData.previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.previewImages.map((preview, i) => (
                <div key={i} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {formData.images.length < 5 && (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#610b0c]">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700">
                  Click to upload product images
                </p>
              </div>
            </label>
          )}

          {errors.images && (
            <p className="text-sm text-red-600 mt-2">{errors.images}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition flex items-center justify-center gap-2 font-medium disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" /> Publish Product
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/seller-dashboard/products")}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
