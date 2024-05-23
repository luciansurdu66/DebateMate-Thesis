import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  });

  useEffect(() => {
    if (authState.token) {
      AuthService.setAuthHeader(authState.token);
    }
  }, [authState]);

  const setAuthInfo = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuthState({ token, role });
  };

  const clearAuthInfo = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthState({ token: null, role: null });
    AuthService.setAuthHeader(null);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider}