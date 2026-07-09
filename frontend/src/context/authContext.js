import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1/";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('expense-tracker-token'));
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    // Set axios default header whenever token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('expense-tracker-token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('expense-tracker-token');
        }
    }, [token]);

    // On mount, validate existing token
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`${BASE_URL}me`);
                setUser(res.data);
            } catch (err) {
                // Token invalid/expired — clear it
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const register = useCallback(async (name, email, password) => {
        try {
            setAuthError(null);
            const res = await axios.post(`${BASE_URL}register`, { name, email, password });
            setToken(res.data.token);
            setUser({ _id: res.data._id, name: res.data.name, email: res.data.email });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setAuthError(message);
            return { success: false, message };
        }
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            setAuthError(null);
            const res = await axios.post(`${BASE_URL}login`, { email, password });
            setToken(res.data.token);
            setUser({ _id: res.data._id, name: res.data.name, email: res.data.email });
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setAuthError(message);
            return { success: false, message };
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAuthError(null);
    }, []);

    const value = useMemo(() => ({
        user,
        token,
        loading,
        authError,
        setAuthError,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    }), [user, token, loading, authError, register, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
