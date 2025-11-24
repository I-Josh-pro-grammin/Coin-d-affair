import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout as logoutAction } from '@/redux/Features/authSlice';
import {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetCurrentUserQuery,
} from '@/redux/api/apiSlice';

interface User {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  accountType?: 'customer' | 'business' | 'admin';
  isVerified?: boolean;
}

interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  accountType: 'customer' | 'business';
  number?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signup: (data: SignupPayload) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [triggerGetMe] = useLazyGetCurrentUserQuery();
  const [loading, setLoading] = useState(true);

  const persist = (token: string, usr: User) => {
    dispatch(setCredentials({ user: usr, access_token: token }));
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(usr));
  };

  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      if (storedToken && storedUser) {
        dispatch(setCredentials({ user: JSON.parse(storedUser), access_token: storedToken }));
      }

      try {
        const data = await triggerGetMe().unwrap();
        if (data?.user) {
          persist(storedToken, data.user);
        }
      } catch (error) {
        dispatch(logoutAction());
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [dispatch, triggerGetMe]);

  const signup = async (payload: SignupPayload) => {
    await registerMutation(payload).unwrap();
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await loginMutation({ email, password }).unwrap();
    persist(response.token, response.user);
    return response.user;
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };


  return (
    <AuthContext.Provider
      value={{
        user: authState?.user ?? null,
        token: authState?.access_token ?? null,
        loading,
        signup,
        login,
        logout,
      }}
    >
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