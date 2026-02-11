import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#610b0c] text-white hover:bg-[#4a0809] disabled:bg-gray-400",
    secondary: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    outline: "border-2 border-[#610b0c] text-[#610b0c] hover:bg-[#610b0c] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
