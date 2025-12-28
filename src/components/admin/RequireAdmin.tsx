import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RouteFallback } from "@/components/common/RouteFallback";

export function RequireAdmin({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Check if user is logged in and has admin role
    // Note: Adjust 'admin' to match your exact role string in AuthContext/Backend

    // if (loading) {
    //     return <RouteFallback />;
    // }

    // if (!user || user.accountType !== 'admin') {
    //     // Redirect to login if no user, or home/dashboard if user but not admin
    //     // For security, treating both as unauthorized for this route
    //     return <Navigate to="/connexion" state={{ from: location }} replace />;
    // }

    return children;
}
