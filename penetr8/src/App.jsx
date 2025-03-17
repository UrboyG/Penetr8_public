import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Authen from "./Authen";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Va from "./pages/VulnScan";
import Dashboard from "./pages/dashboard";
import Report from "./pages/Report";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, Navigate } from "react-router-dom";
import UserSettings from "./pages/UserSettings";
import { getIDURL } from './libs/GoogleID';

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={getIDURL()}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Authen />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/va/:fileId"
            element={<ProtectedRoute element={<Va />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/report"
            element={<ProtectedRoute element={<Report />} />}
          />
          <Route
            path="/UserSettings"
            element={<ProtectedRoute element={<UserSettings />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
