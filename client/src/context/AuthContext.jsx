import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("apexlead_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.me(token);
        setUser(data.user);
      } catch {
        localStorage.removeItem("apexlead_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistSession(data) {
    localStorage.setItem("apexlead_token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function login(email, password) {
    const data = await api.login({ email, password });
    persistSession(data);
  }

  async function register(name, email, password) {
    const data = await api.register({ name, email, password });
    persistSession(data);
  }

  function logout() {
    localStorage.removeItem("apexlead_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
