import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { RouteFallback } from "@/components/common/RouteFallback";
import { useSelector } from "react-redux";

export function RequireAdmin({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const { user } = useSelector((state: any) => state.auth);
    const { user: authUser } = useAuth();

    // Check if user is logged in and has admin role
    // Note: Adjust 'admin' to match your exact role string in AuthContext/Backend
    // if (loading) {
    //     return <RouteFallback />;
    // }
    console.log(authUser);

    if(authUser?.account_type == 'admin') {
        return children;
    }else{
        return <Navigate to="/" state={{ from: location }} replace />;
    }

}
