import { Navigate } from "react-router-dom";
import { useSeller } from "../context/SellerContext";

const SellerPrivateRoute = ({ children }) => {
  const { seller, loading } = useSeller();

  if (loading) return <p>Loading...</p>;
  if (!seller) return <Navigate to="/seller-login" />;

  return children;
};

export default SellerPrivateRoute;
