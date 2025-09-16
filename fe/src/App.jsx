import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./route/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
