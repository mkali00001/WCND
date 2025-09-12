import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../outlet/Layout";
import Login from "../auth/Login";
import OpenRoute from "./OpenRoute";
import Signup from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../src/components/dashboard/Dashboard";
import RegistrationForm from "../components/registration/RegistrationForm";
import ForgotPassword from "../auth/ResetPassword";
import ChangePasswordCard from "../components/changePassword/ChangePasswordCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes */}
        <Route element={<OpenRoute />}>
          <Route index element={<Signup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="registration"
          element={
            <ProtectedRoute>
              <RegistrationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="change-password"
          element={
            <ProtectedRoute>
              <ChangePasswordCard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
