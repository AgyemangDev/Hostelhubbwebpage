import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { auth } from "../../../firebase/FirebaseConfig";
import { getProductById, updateProduct } from "../../../firebase/productUtils";
import ProductForm from "../ProductForm";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        setInitialData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          location: product.location,
          tags: product.tags || [],
          images: product.images || [],
          previewImages: product.images || [],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/seller-dashboard/products");
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleSubmit = async (formData) => {

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
      };

      await updateProduct(productId, productData);

      alert("Product updated successfully!");
      navigate("/seller-dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.message || "Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#610b0c]" />
      </div>
    );
  }

  return (
    <ProductForm
      title="Edit Product"
      description="Update your product details"
      submitLabel="Update Product"
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/seller-dashboard/products")}
      loading={loading}
    />
  );
};

export default EditProduct;
