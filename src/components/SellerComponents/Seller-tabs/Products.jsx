import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import { getSellerProducts, deleteProduct } from "../../../firebase/productUtils";
import { decrementProductCount } from "../../../firebase/subscriptionUtils";
import { Loader2, Edit, Plus, Trash2, AlertCircle, X } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
          const sellerProducts = await getSellerProducts(user.uid);
          const sortedProducts = sellerProducts.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return b.createdAt.toDate() - a.createdAt.toDate();
            }
            return 0;
          });
          setProducts(sortedProducts);
        } else {
          navigate("/seller-login");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setDeleting(true);
      const user = auth.currentUser;
      
      if (!user) {
        alert("User not authenticated");
        return;
      }

      console.log("Deleting product:", productToDelete.id);

      // Delete product from Firebase
      await deleteProduct(productToDelete.id, user.uid);

      // Decrement product count in subscription
      await decrementProductCount(user.uid);

      // Remove from local state
      setProducts(products.filter(p => p.id !== productToDelete.id));

      // Close modal
      setShowDeleteModal(false);
      setProductToDelete(null);

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.message || "Failed to delete product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#610b0c]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Products</h1>
        <button
          onClick={() => navigate("/seller-dashboard/add-product")}
          className="flex items-center gap-2 px-4 py-2 bg-[#610b0c] text-white rounded-lg hover:bg-[#4a0809] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't added any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <img 
                src={product.frontImage || product.images[0]} 
                alt={product.name} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-[#610b0c] mb-1">
                  GH₵{product.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {product.category}
                </p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 pb-4 border-b">
                  <span>👁️ {product.views || 0} views</span>
                  <span>❤️ {product.likes || 0} likes</span>
                  <span>🛒 {product.sales || 0} sales</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/seller-dashboard/edit-product/${product.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={handleDeleteCancel}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={deleting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Product?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold">"{productToDelete?.name}"</span>? 
              This action cannot be undone and will permanently remove the product and all its images.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={deleting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
