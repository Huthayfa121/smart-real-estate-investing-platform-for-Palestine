'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  kycStatus?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual API call
    console.log('Login:', email);
    // Simulate successful login for demo
    setUser({ _id: '1', name: 'مستخدم تجريبي', email, role: 'investor', kycStatus: 'verified' });
  };

  const signup = async (data: any) => {
    // TODO: Implement actual API call
    console.log('Signup:', data);
    // Simulate successful signup for demo
    setUser({ _id: '1', name: data.name, email: data.email, role: data.role || 'investor', kycStatus: 'pending' });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const refreshUser = async () => {
    // TODO: Implement actual API call
    console.log('Refresh user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
