import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const InputField = ({ label, type, value, onChange, showToggle, showPassword, setShowPassword }) => {
  const isPassword = label.toLowerCase() === "password";

  return (
    <div className="mb-5">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {isPassword ? (
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        ) : (
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <input
          id={label}
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          placeholder={`Enter your ${label.toLowerCase()}`}
          onChange={onChange}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#610b0c]"
        />
        {showToggle && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
