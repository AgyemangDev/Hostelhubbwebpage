import { Navigate } from "react-router-dom";
import { useSeller } from "../context/SellerContext";

const SellerPrivateRoute = ({ children }) => {
  const { seller, authChecked } = useSeller();

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#610b0c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!seller) {
    return <Navigate to="/seller-login" replace />;
  }

  return children;
};

export default SellerPrivateRoute;
