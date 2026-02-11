import { Eye, ShoppingCart } from "lucide-react";

const TopProductItem = ({ product, rank }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center justify-center w-8 h-8 bg-[#610b0c] text-white rounded-full font-bold text-sm">
      {rank}
    </div>
    {product.images && product.images[0] && (
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-12 h-12 object-cover rounded-lg"
      />
    )}
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
      <p className="text-xs text-gray-600">GH₵{product.price}</p>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1 text-gray-600">
        <Eye className="w-4 h-4" />
        {product.views || 0}
      </div>
      <div className="flex items-center gap-1 text-gray-600">
        <ShoppingCart className="w-4 h-4" />
        {product.sales || 0}
      </div>
    </div>
  </div>
);

export default TopProductItem;
