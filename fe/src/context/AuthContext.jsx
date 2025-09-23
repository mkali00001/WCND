import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ALLOWED_ORIGIN}/api/me`, { withCredentials: true });
      setUser(res.data);
      setLoading(false)
      console.log(res.data)
      return res.data;
    } catch (err) {
      setUser(null);
      return null;
    }
    finally{
      setLoading(false)
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

export const useAuth = () => useContext(AuthContext);
