import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RouteFallback } from "@/components/common/RouteFallback";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredRole?: 'user' | 'business' | 'admin';
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <RouteFallback />;

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  // if (requiredRole && user.accountType !== requiredRole && user.accountType !== 'admin') {
  //   // If user isn't the required role (but allow 'admin' to access everything), redirect to profile
  //   return <Navigate to="/profil" replace />;
  // }

  return children;
};
