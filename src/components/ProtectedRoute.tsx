import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RouteFallback } from "@/components/common/RouteFallback";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <RouteFallback />;

  if (!user) {
    // Redirect them to the /connexion page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return children;
};
