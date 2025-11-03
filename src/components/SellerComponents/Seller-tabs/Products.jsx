import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";
import { getSellerProducts } from "../../../firebase/productUtils";
import { Loader2, Edit, Plus } from "lucide-react";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-600">GH₵{product.price}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => navigate(`/seller-dashboard/edit-product/${product.id}`)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
