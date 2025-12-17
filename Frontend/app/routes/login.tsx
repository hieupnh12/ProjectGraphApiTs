import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useGraphQLLogin, useGraphQLSignup } from "../api/graphql/hooks";

export default function login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginMutation = useGraphQLLogin();
  const signupMutation = useGraphQLSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (!formData.fullName.trim()) {
          setError("Vui lòng nhập họ tên");
          return;
        }
        await signupMutation.signup(formData.fullName, formData.email, formData.password);
        setFormData({ fullName: "", email: "", password: "" });
        setIsSignUp(false);
        setError("Đăng ký thành công! Vui lòng đăng nhập.");
      } else {
        await loginMutation.login(formData.email, formData.password);
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || "http://localhost:8080/api"}/auth/facebook`;
  };

  const isLoading = loginMutation.loading || signupMutation.loading;

  return (
    <div className="flex h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-cyan-100">
      {/* Left Section - Illustration */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-10 bg-gradient-to-br from-cyan-200 to-teal-100">
        <div className="flex flex-col items-center gap-5">
          {/* Badge */}
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold bg-gradient-to-br from-cyan-300 to-teal-300 bg-clip-text text-transparent">
              M
            </span>
          </div>

          {/* Text */}
          <p className="text-white text-lg text-center max-w-xs leading-relaxed font-medium">
            Find 3d Objects, Mockups and Illustrations here
          </p>

          {/* Animated Shapes */}
          <div className="relative w-80 h-80 flex items-center justify-center mt-10">
            {/* Shape 1 - Pink Circle */}
            <div
              className="absolute w-20 h-20 bg-pink-300 rounded-full opacity-60 top-[10%] left-[10%] animate-bounce"
              style={{ animationDuration: "6s", animationDelay: "0s" }}
            ></div>

            {/* Shape 2 - Teal Ellipse */}
            <div
              className="absolute w-28 h-14 bg-teal-300 rounded-full opacity-60 top-1/2 left-[20%] animate-bounce"
              style={{ animationDuration: "6s", animationDelay: "1s" }}
            ></div>

            {/* Shape 3 - Purple Circle */}
            <div
              className="absolute w-24 h-24 bg-purple-300 rounded-full opacity-50 top-[20%] right-[15%] animate-bounce"
              style={{ animationDuration: "6s", animationDelay: "2s" }}
            ></div>

            {/* Shape 4 - Teal Ellipse */}
            <div
              className="absolute w-32 h-16 bg-teal-200 rounded-full opacity-40 bottom-[15%] right-[10%] animate-bounce"
              style={{ animationDuration: "6s", animationDelay: "1.5s" }}
            ></div>

            {/* Shape 5 - Blue Circle */}
            <div
              className="absolute w-20 h-20 bg-blue-300 rounded-full opacity-50 bottom-[20%] left-[15%] animate-bounce"
              style={{ animationDuration: "6s", animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Language Selector */}
          <div className="flex justify-end gap-2 text-sm text-gray-400 mb-6 cursor-pointer hover:text-gray-600">
            <span>English (US)</span>
            <span>▼</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {isSignUp ? "Create Account" : "Login"}
          </h2>

          {/* Alert Message */}
          {error && (
            <div
              className={`p-3 rounded-lg text-center text-sm mb-4 animate-in fade-in slide-in-from-top-2 duration-300 ${
                error.includes("thành công")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Social Login Buttons */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:border-blue-400 hover:shadow-md"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="hidden sm:inline">Google</span>
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:border-blue-600 hover:shadow-md"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    fill="#1877F2"
                  />
                </svg>
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-300 text-sm my-2">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span>- OR -</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Full Name Input (Sign Up Only) */}
            {isSignUp && (
              <div>
                <div className="relative flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                  <User
                    size={20}
                    className="text-cyan-400 mr-3 flex-shrink-0"
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required={isSignUp}
                    disabled={isLoading}
                    className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <div className="relative flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                <Mail size={20} className="text-cyan-400 mr-3 flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 hover:border-gray-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                <Lock size={20} className="text-cyan-400 mr-3 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="text-cyan-400 hover:text-teal-500 disabled:opacity-60 disabled:cursor-not-allowed ml-2 flex-shrink-0 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Auth Toggle */}
          <div className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? (
              <>
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setFormData({ fullName: "", email: "", password: "" });
                    setError("");
                  }}
                  className="text-cyan-500 hover:text-teal-500 font-semibold transition-colors"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setFormData({ fullName: "", email: "", password: "" });
                    setError("");
                  }}
                  className="text-cyan-500 hover:text-teal-500 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
