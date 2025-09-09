import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../outlet/Layout";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../src/components/dashboard/Dashboard"
import { useAuth } from "../context/AuthContext";
import RegistrationForm from "../components/registration/RegistrationForm";
import ForgotPassword from "../auth/ResetPassword";
import ConferencePortal from "../auth/ConferencePortal";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes */}
        <Route index element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/dsh" element={<Dashboard/>} />
        <Route path="/conport" element={<ConferencePortal/>} />

        {/* Protected Routes */}
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
