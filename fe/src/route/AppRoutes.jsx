import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../outlet/Layout";
import Login from "../auth/Login";
import OpenRoute from "./OpenRoute";
import Signup from "../auth/Signup";
import {ProtectedRoute} from "./ProtectedRoute";
import Dashboard from "../../src/components/dashboard/Dashboard";
import RegistrationForm from "../components/registration/RegistrationForm";
import ForgotPassword from "../auth/ResetPassword";
import ChangePasswordCard from "../components/changePassword/ChangePasswordCard";
import Access from "../auth/Access";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";
import VerifyEmail from "../components/emailVerification/VerifyEmail";
import ResendVerification from "../components/emailVerification/ResendVerification";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes */}
        <Route element={<OpenRoute />}>
          <Route index element={<Access />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email/:token" element={<VerifyEmail/>}/>
          <Route path="resend-verification" element={<ResendVerification/>}/>
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

        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
