import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Admin redirect
  if (user?.role === "admin" && location.pathname !== "/admin") {
    return <Navigate to="/admin" replace />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Email not verified
  if (!user.isVerified && location.pathname !== "/verify-email") {
    return <Navigate to="/verify-email" replace />;
  }

  // Registered check
  if (user.isVerified && !user.isRegistered && location.pathname !== "/registration") {
    return <Navigate to="/registration" replace />;
  }

  // All checks passed
  return children;
};
