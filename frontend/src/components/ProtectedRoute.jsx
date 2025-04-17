import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const location = useLocation();
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        if (user && allowedRoles && !allowedRoles.includes(user.role)) {
            setUnauthorized(true);
            showToast('error', 'You do not have permission to access this page.');
        }
    }, [user, allowedRoles, location.pathname]);

    if (!user) return <Navigate to="/login" />;

    if (unauthorized) {
        return null;
    }

    return <Outlet />;
};

export default ProtectedRoute;