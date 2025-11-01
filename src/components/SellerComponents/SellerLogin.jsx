import { useState } from "react";
import { useSeller } from "../../context/SellerContext";
import { useNavigate } from "react-router-dom";
import Catalogue from "../../assets/Catalogue.gif";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { loginSeller, loading } = useSeller();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");

    const result = await loginSeller(email, password);

    if (!result.success) {
      switch (result.reason) {
        case "underReview":
          alert("Your business application is under review. Contact support.");
          break;
        case "becomeSeller":
          alert("You have not applied to be a seller yet. Redirecting to application page.");
          navigate("/become-a-seller");
          break;
        case "authError":
          alert("Login failed. Check your email and password.");
          break;
        default:
          alert("Login failed. Unknown error.");
      }
      return; // stop further execution
    }

    // If login successful
    if (rememberMe) {
      localStorage.setItem("hostelhubb_seller_data", JSON.stringify(result.data));
    }

    alert("Login successful! Redirecting to your dashboard.");
    navigate("/seller-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
        <img src={Catalogue} alt="E-commerce shopping" className="w-full h-full rounded-lg" />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="block lg:hidden mb-6 flex justify-center">
          <img src={Catalogue} alt="E-commerce animation" className="w-52 h-52 rounded-lg object-cover" />
        </div>

        <div className="w-full max-w-md">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-[#610b0c] mb-8">
              Login to Seller Account
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c] focus:border-transparent transition"
              />
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#610b0c] border-gray-300 rounded focus:ring-[#610b0c]"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#610b0c] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#7a0e0f] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
