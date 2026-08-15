/**
 * Global authentication context.
 *
 * Holds the current user and provides the auth actions used across the
 * application (login / register / Google sign-in / logout). The session is
 * persisted in localStorage (JWT + user profile) so a page refresh keeps
 * the user signed in; the JWT is also re-validated against the backend.
 */
import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the session from localStorage on first load and verify the
  // token is still valid against the backend.
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      authAPI.getMe().catch(() => logout());
    }
    setLoading(false);
  }, []);

  /** Email + password sign-in; stores the JWT and user profile. */
  const login = async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  /** Google (Firebase) sign-in; syncs the Firebase identity with the backend. */
  const loginWithGoogle = async (name, email) => {
    const { data } = await authAPI.firebaseLogin({ name, email });
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  /** Creates a new account and starts a session. */
  const register = async (name, email, password) => {
    const { data } = await authAPI.register({ name, email, password });
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  /** Clears the local session. */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook for consuming the auth context; throws if used outside the provider. */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};