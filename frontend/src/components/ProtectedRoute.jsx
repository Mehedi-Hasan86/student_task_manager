/**
 * ProtectedRoute — route guard for authenticated views.
 *
 * Shows a spinner while the session is being restored, redirects
 * unauthenticated visitors to /login, and otherwise renders the wrapped
 * page (e.g. the Dashboard).
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Session is still being restored from localStorage.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  // No session -> bounce to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}