'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('vibe_token');
        if (token) {
            api.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('vibe_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('vibe_token', res.data.token);
        setUser(res.data.user);
    };

    const register = async (username: string, email: string, password: string) => {
        const res = await api.post('/auth/register', { username, email, password });
        localStorage.setItem('vibe_token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('vibe_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);