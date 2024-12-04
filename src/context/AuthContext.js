import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = JSON.parse(atob(token.split(".")[1]));
      console.log("Setting user from token:", decodedUser);
      setUser(decodedUser);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = JSON.parse(atob(token.split(".")[1]));
    console.log("User logged in:", decodedUser);
    setUser(decodedUser);
  };

  const logout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
