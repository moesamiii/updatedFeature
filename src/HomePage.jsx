import { useAuth } from "./features/auth";

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🏠 Home Page - Protected</h1>
      <p>✅ You are inside the protected page.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
