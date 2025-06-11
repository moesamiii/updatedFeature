import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  saveToken,
  getToken,
  clearToken,
  saveRefreshToken,
  getRefreshToken,
  clearRefreshToken,
} from "../utils/tokenUtils";
import { loginApi, refreshTokenApi } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children, config }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  const [refreshToken, setRefreshTokenState] = useState(getRefreshToken());

  const lastTokenRef = useRef(token);
  const lastRefreshTokenRef = useRef(refreshToken);

  const isInitialRefreshDoneRef = useRef(false);
  const isRefreshingRef = useRef(false); // Prevent overlapping refreshes

  const login = async (credentials) => {
    const data = await loginApi(credentials, config.apiUrl);

    saveToken(data.token);
    saveRefreshToken(data.refreshToken);

    setToken(data.token);
    setRefreshTokenState(data.refreshToken);

    lastTokenRef.current = data.token;
    lastRefreshTokenRef.current = data.refreshToken;

    setUser({
      userId: data.userId,
      email: data.email,
      name: data.arabicName || data.englishName,
    });
  };

  const logout = () => {
    clearToken();
    clearRefreshToken();
    setToken(null);
    setRefreshTokenState(null);
    lastTokenRef.current = null;
    lastRefreshTokenRef.current = null;
    setUser(null);
    isInitialRefreshDoneRef.current = false;
    isRefreshingRef.current = false;
  };

  // ✅ Refresh token on first page load (safe)
  useEffect(() => {
    const tryRefreshToken = async () => {
      if (!isInitialRefreshDoneRef.current && !getToken() && refreshToken) {
        try {
          isRefreshingRef.current = true;

          const data = await refreshTokenApi(refreshToken, config.apiUrl);

          // Update token
          if (data.accessToken && data.accessToken !== lastTokenRef.current) {
            saveToken(data.accessToken);
            setToken(data.accessToken);
            lastTokenRef.current = data.accessToken;
          }

          // Update refreshToken ONLY if returned by backend
          if (
            data.refreshToken &&
            data.refreshToken !== lastRefreshTokenRef.current
          ) {
            saveRefreshToken(data.refreshToken);
            setRefreshTokenState(data.refreshToken);
            lastRefreshTokenRef.current = data.refreshToken;
          }

          console.log("Token refreshed!");

          isInitialRefreshDoneRef.current = true;
          isRefreshingRef.current = false;
        } catch (err) {
          console.error("Failed to refresh token:", err);
          logout();
        }
      }
    };

    tryRefreshToken();
  }, [refreshToken, config.apiUrl]);

  // ✅ Auto refresh every 1 minute (safe version)
  useEffect(() => {
    let intervalId;

    if (token && refreshToken) {
      console.log("Starting auto-refresh interval...");

      intervalId = setInterval(async () => {
        if (isRefreshingRef.current) {
          console.log("Skip refresh: already in progress.");
          return;
        }

        try {
          isRefreshingRef.current = true;

          const data = await refreshTokenApi(refreshToken, config.apiUrl);

          // Update token
          if (data.accessToken && data.accessToken !== lastTokenRef.current) {
            saveToken(data.accessToken);
            setToken(data.accessToken);
            lastTokenRef.current = data.accessToken;
          }

          // Update refreshToken ONLY if returned by backend
          if (
            data.refreshToken &&
            data.refreshToken !== lastRefreshTokenRef.current
          ) {
            saveRefreshToken(data.refreshToken);
            setRefreshTokenState(data.refreshToken);
            lastRefreshTokenRef.current = data.refreshToken;
          }

          console.log("Token auto-refreshed!");

          // Optional: if backend sends empty refreshToken → logout
          if (data.refreshToken === "") {
            console.warn("Refresh token is empty → logging out.");
            logout();
          }

          isRefreshingRef.current = false;
        } catch (err) {
          console.error("Auto refresh failed:", err);
          logout();
        }
      }, 1 * 60 * 1000); // Refresh every 1 minute
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Cleared auto-refresh interval.");
      }
    };
  }, [refreshToken, config.apiUrl]);

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
