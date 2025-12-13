import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function RequireAdmin({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading spinner
    }

    // Check if user is logged in and has admin role
    // Note: Adjust 'admin' to match your exact role string in AuthContext/Backend
    // if (!user || user.accountType !== 'admin') {
    //     return <Navigate to="/connexion" state={{ from: location }} replace />;
    // }

    return children;
}
