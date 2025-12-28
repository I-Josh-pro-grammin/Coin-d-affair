import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RouteFallback } from "@/components/common/RouteFallback";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredRole?: 'user' | 'business' | 'admin';
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // if (loading) return <RouteFallback />;

  if (!user) {
    // Redirect them to the /connexion page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }


  // // Strict Role Check if requiredRole is provided
  // if (requiredRole && user.accountType !== requiredRole && user.accountType !== 'admin') {
  //   // Allow admin to access everything, otherwise restrict.
  //   // Redirect to home or reasonable default if role mismatch.
  //   return <Navigate to="/" replace />;
  // }
    console.log("ProtectedRoute - Current user:", user.account_type);

  useEffect(() => {
    if (user.account_type === 'admin') {
        navigate("/admin", { replace: true });
        // window.location.reload();
      } else if (user.account_type === 'business') {
        navigate("/dashboard", { replace: true });
        // window.location.reload();
      } else {
        navigate("/", { replace: true });
        // window.location.reload();
      }
  }, [user, navigate]);

  return children;
  // return children;
};
