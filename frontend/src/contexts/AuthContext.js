import React, { createContext, useState, useEffect } from 'react';
// Make sure apiAdminLogin is imported from your services/api.js file
import { apiLogin, apiRegister, apiGetProfile, apiAdminLogin } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const profile = await apiGetProfile(token);
          setUser(profile);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);
  
  // This function now calls your real backend endpoint
  const adminLogin = async (email, password) => {
    const data = await apiAdminLogin(email, password); // Assumes apiAdminLogin exists in api.js
    setUser(data.user);
    setToken(data.accessToken);
    localStorage.setItem('token', data.accessToken);
  };

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setUser(data.user);
    setToken(data.accessToken);
    localStorage.setItem('token', data.accessToken);
  };

  const register = async (name, email, password) => {
    await apiRegister(name, email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, adminLogin, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};