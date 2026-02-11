import { Eye } from "lucide-react";

const ProductRow = ({ product }) => (
  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <img
      src={product.images?.[0] || "https://via.placeholder.com/50"}
      alt={product.name}
      className="w-12 h-12 rounded-lg object-cover"
    />
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
      <p className="text-sm text-gray-500">GH₵{product.price}</p>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <Eye className="w-4 h-4" />
      {product.views || 0}
    </div>
  </div>
);

export default ProductRow;
