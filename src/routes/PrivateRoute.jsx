import { Navigate } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;

    return children;
};

export default PrivateRoute;
