import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./features/auth";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Redirect / to /login */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={token ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
