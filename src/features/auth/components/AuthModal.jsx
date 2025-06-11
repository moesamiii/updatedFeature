import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthModal = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login({ userId, password });
      alert("تم تسجيل الدخول بنجاح!");
      onClose();
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl flex flex-row bg-white rounded-2xl overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Section (Image) */}
        <div className="w-1/2 bg-gradient-to-b from-blue-50 to-white p-8 flex flex-col justify-center items-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-xl text-blue-500 hover:text-blue-700"
          >
            ×
          </button>
          <img
            src="/Group 452466.png"
            alt="doctors"
            className="w-full max-w-xs my-6"
          />
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-1/2 bg-white p-10" dir="rtl">
          <h3 className="w-[364px] h-[21px] text-[30px] leading-[100%] font-bold text-[#222222] text-center mb-6">
            تسجيل الدخول
          </h3>

          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="relative mt-1">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="الايميل"
                  className="w-[364px] h-[52px] px-4 pr-12 border border-[#DDE3E8] rounded-[16px] bg-white focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                />

                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  👤
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="relative mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-[364px] h-[52px] px-4 pr-12 border border-[#DDE3E8] rounded-[16px] bg-white focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
                />

                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  🔒
                </span>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Forgot Password */}
            <div className="w-[364px] h-[17px] text-[12px] leading-[140%] font-normal text-blue-500 hover:underline cursor-pointer text-left mt-2">
              هل نسيت كلمة المرور؟
            </div>

            {/* Login Button */}
            <button
              className="w-[364px] h-[52px] bg-gradient-to-r from-[#2196F3] to-[#0D8AF0] text-white rounded-[16px] font-semibold shadow-md hover:from-[#1E88E5] hover:to-[#0D8AF0] transition-all duration-300 disabled:opacity-50 mt-4 mx-auto"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>

            {/* Create Account */}
            <div className="w-[364px] h-[24px] text-[16px] leading-[100%] font-normal text-center text-gray-600 mt-2">
              ليس لديك حساب؟{" "}
              <span className="text-blue-600 underline hover:underline cursor-pointer font-normal">
                إنشاء حساب جديد
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
