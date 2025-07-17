import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ children }) => {
    const { user, token } = useAuth();

    if (!user || !token) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes;