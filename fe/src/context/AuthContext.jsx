import React, { createContext, useContext, useState } from "react";

// 1. Context banao
const AuthContext = createContext();

// 2. Provider component banao
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook banao use karne ke liye (optional but easy)
export const useAuth = () => useContext(AuthContext);
