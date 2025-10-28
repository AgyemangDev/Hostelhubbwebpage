const RememberMe = ({ rememberMe, setRememberMe }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
      <input
        id="remember-me"
        type="checkbox"
        checked={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
        className="h-4 w-4 text-[#610b0c] focus:ring-[#610b0c] border-gray-300 rounded"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
    </div>
    <div>
      <a href="#" className="text-sm font-medium text-[#610b0c] hover:text-[#4d0909]">Forgot password?</a>
    </div>
  </div>
);

export default RememberMe;
