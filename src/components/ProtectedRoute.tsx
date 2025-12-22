import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RouteFallback } from "@/components/common/RouteFallback";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  // if (loading) return <RouteFallback />;
  // if (!user) return <Navigate to="/auth/login" replace />;
  // TEMPORARY BYPASS FOR DEVELOPMENT
  return children;
};
