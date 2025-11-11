import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
  memberSince?: string;
  role?: 'customer' | 'seller';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signup: (data: { name: string; email: string; password: string; role?: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const persist = (tok: string, usr: User) => {
    setToken(tok);
    setUser(usr);
    localStorage.setItem('auth_token', tok);
    localStorage.setItem('auth_user', JSON.stringify(usr));
  };

  const signup = async ({ name, email, password, role }: { name: string; email: string; password: string; role?: string }) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const fakeToken = 'fake-signup-token';
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: (role as any) || 'customer',
      isVerified: true,
      memberSince: new Date().getFullYear().toString(),
    };
    persist(fakeToken, newUser);
    setLoading(false);
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    const fakeToken = 'fake-login-token';
    const loggedUser: User = {
      id: '1',
      name: email.split('@')[0] || 'Utilisateur',
      email,
      isVerified: true,
      memberSince: '2023',
    };
    persist(fakeToken, loggedUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}