import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Context banao
const AuthContext = createContext();

// 2. Provider component banao
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/me`, { withCredentials: true });
      setUser(res.data);
      return res.data;
    } catch (err) {
      setUser(null);
      return null;
    }
  };



  useEffect(() => {
    fetchUserData()
  }, [])

  const logout = () => {
    axios
      .post(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/logout`, {}, { withCredentials: true })
      .then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ fetchUserData, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook banao use karne ke liye (optional but easy)
export const useAuth = () => useContext(AuthContext);
