import { Loader2, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const LoginButton = ({ isLoading, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={isLoading}
    className={`w-full py-3 px-4 flex items-center justify-center text-white font-semibold rounded-lg shadow-md transition-all ${
      isLoading ? "bg-[#610b0c]/70" : "bg-[#610b0c] hover:bg-[#4d0909]"
    }`}
  >
    {isLoading ? (
      <>
        <Loader2 className="animate-spin h-5 w-5 mr-2" />
        Logging in...
      </>
    ) : (
      <>
        Login
        <ChevronRight className="ml-2 h-5 w-5" />
      </>
    )}
  </motion.button>
);

export default LoginButton;
