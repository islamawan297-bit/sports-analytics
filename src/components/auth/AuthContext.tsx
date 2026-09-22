'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, UserProfile } from '@/lib/api';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role?: 'USER' | 'ADMIN') => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const savedToken = localStorage.getItem('sports_analytics_jwt');
    const savedUser = localStorage.getItem('sports_analytics_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // Ignore JSON parse errors
      }
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.login({ email, password: pass });
    setToken(res.accessToken);
    setUser(res.user);
    localStorage.setItem('sports_analytics_jwt', res.accessToken);
    localStorage.setItem('sports_analytics_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
  };

  const register = async (name: string, email: string, pass: string, role: 'USER' | 'ADMIN' = 'USER') => {
    const res = await api.register({ name, email, password: pass, role });
    setToken(res.accessToken);
    setUser(res.user);
    localStorage.setItem('sports_analytics_jwt', res.accessToken);
    localStorage.setItem('sports_analytics_user', JSON.stringify(res.user));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sports_analytics_jwt');
    localStorage.removeItem('sports_analytics_user');
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
