import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../outlet/Layout";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../src/components/dashboard/Dashboard"
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Open Routes */}
        <Route index element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
