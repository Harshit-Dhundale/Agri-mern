// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  // Try to initialize from localStorage if available.
  const [currentUser, setCurrentUser] = useState(() => {
    const userJSON = localStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  }, []);

  // validateToken: fetch full user details from /api/users/validate-token.
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const response = await axios.get('/api/users/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.valid && response.data.user) {
        setCurrentUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token validation failed:', error.response?.data || error.message);
      logout();
      return false;
    }
  }, [logout]);

  // On mount, call validateToken to update currentUser.
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  // In login, store the token then fetch full user data.
  const login = async (token) => {
    localStorage.setItem('token', token);
    await validateToken();
  };

  const value = { currentUser, login, logout, validateToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;