import { useState } from "react";
import { AuthModal, useAuth } from "./features/auth";

export default function LoginPage() {
  const { token, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 ">
      <h1 className="text-3xl font-bold mb-6">Login Page</h1>

      {token ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-green-600 text-lg">✅ You are logged in!</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-red-600 text-lg">❌ You are not logged in.</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      )}

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
