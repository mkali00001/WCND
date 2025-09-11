import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../outlet/Layout";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../src/components/dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";
import RegistrationForm from "../components/registration/RegistrationForm";
import ForgotPassword from "../auth/ResetPassword";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes */}
        <Route index element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="registration"
          element={
            <ProtectedRoute user={user}>
              <RegistrationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
