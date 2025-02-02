import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    }, []);

    // Function to validate token with backend
    const validateToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const response = await axios.get('/api/users/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.valid) {
                setCurrentUser({ token });
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

    // Validate token on mount
    useEffect(() => {
        validateToken();
    }, [validateToken]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setCurrentUser({ token });
    };

    const value = { currentUser, login, logout, validateToken };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
