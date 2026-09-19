import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gonbite_user")) || null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem("gonbite_token"));

  useEffect(() => {
    if (user) localStorage.setItem("gonbite_user", JSON.stringify(user));
    else localStorage.removeItem("gonbite_user");
    if (token) localStorage.setItem("gonbite_token", token);
    else localStorage.removeItem("gonbite_token");
  }, [user, token]);

  const logout = () => {
    setUser(null); setToken(null);
  };

  const value = useMemo(() => ({
    user, token, logout, isAuthenticated: Boolean(token && user), API,
    setSession: (data) => { setUser(data.user); setToken(data.token); },
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
export { API };
