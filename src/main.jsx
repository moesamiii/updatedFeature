import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./features/auth";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider config={{ apiUrl: "https://test.newulmmed.com/api" }}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
