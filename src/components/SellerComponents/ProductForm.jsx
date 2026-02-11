import { useState } from "react";
import { Upload, X, Tag, MapPin, CheckCircle } from "lucide-react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import Button from "../common/Button";

const ProductForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Submit",
  title = "Product Form",
  description = "",
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
    location: initialData.location || "",
    tags: initialData.tags || [],
    images: initialData.images || [],
    previewImages: initialData.previewImages || initialData.images || [],
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
    
    // Count only File objects (not URLs from existing images)
    const currentFileCount = formData.images.filter(img => img instanceof File).length;
    
    if (currentFileCount + files.length > 5) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Men's Leather Jacket"
            error={errors.name}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product (minimum 20 characters)..."
            rows={5}
            error={errors.description}
            required
          />
        </div>

        {/* Pricing & Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price (GH₵)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            error={errors.price}
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories}
            placeholder="Select category"
            error={errors.category}
            required
          />
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Accra, Ghana"
            icon={MapPin}
            error={errors.location}
            required
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
                className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
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
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Product Images <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Upload up to 5 images (max 5MB each). The first image will be the front image.
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
                  {i === 0 && (
                    <div className="absolute top-2 left-2 bg-[#610b0c] text-white text-xs px-2 py-1 rounded">
                      Front
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#610b0c] transition-colors">
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

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            icon={CheckCircle}
            className="flex-1"
          >
            {submitLabel}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
