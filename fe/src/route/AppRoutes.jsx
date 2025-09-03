import React from "react";
import { Routes, Route } from "react-router-dom";



import Layout from "../outlet/Layout";
import Home from "../components/home/Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Dashboard from "../components/dashboard/Dashboard";
import OpenRoute from "./OpenRoute";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<OpenRoute />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
