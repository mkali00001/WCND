import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children })=> {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (user?.role === "admin" && location.pathname !== "/admin") {
    return <Navigate to="/admin" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isRegistered && location.pathname !== "/registration") {
    return <Navigate to="/registration" replace />;
  }

  return children;
}

