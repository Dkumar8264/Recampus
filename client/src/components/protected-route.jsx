import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context.jsx';

export function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <p className="text-sm text-stone-600">Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
