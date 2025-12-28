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

  // if (loading) return <RouteFallback />;

  // if (!user) {
  //   // Redirect them to the /connexion page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they login, which is a nicer user experience.
  //   return <Navigate to="/connexion" state={{ from: location }} replace />;
  // }

  // // Strict Role Check if requiredRole is provided
  // if (requiredRole && user.accountType !== requiredRole && user.accountType !== 'admin') {
  //   // Allow admin to access everything, otherwise restrict.
  //   // Redirect to home or reasonable default if role mismatch.
  //   return <Navigate to="/" replace />;
  // }

  return children;
  // return children;
};
