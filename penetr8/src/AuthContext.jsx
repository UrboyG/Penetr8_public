import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return token !== null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => {
    localStorage.setItem("token", "some-token");
    setIsAuthenticated(true);
  };

  const loginWithGoogle = (googleToken) => {
    localStorage.setItem("token", googleToken); // เก็บ Google Token ใน localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}