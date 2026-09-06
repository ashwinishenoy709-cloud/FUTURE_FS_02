import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import PublicHome from "./pages/PublicHome.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route path="/" element={<PublicHome />} />

      {/* Admin Login */}
      <Route path="/admin" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private CRM */}
      <Route path="/admin/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}