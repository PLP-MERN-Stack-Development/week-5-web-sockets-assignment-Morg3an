import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    const login = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwt);
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (!token || !user) {
            logout(); // clean out on mount if invalid
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};