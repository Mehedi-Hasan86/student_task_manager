import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const GIS_CLIENT_ID = '784953740224-74pghlgspih40vk141nsvhaf62sp2rtg.apps.googleusercontent.com';
const IGNORED_AUTH_ERRORS = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/redirect-cancelled-by-user'];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const hadRedirect = sessionStorage.getItem('gs_redirect_started');
    if (hadRedirect) sessionStorage.removeItem('gs_redirect_started');
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await loginWithGoogle(result.user.displayName, result.user.email);
          navigate('/dashboard');
        } else if (hadRedirect) {
          setError(
            'Google sign-in did not complete. The popup may have been blocked — click Google Sign-In again, or use email and password.'
          );
        }
      } catch (err) {
        if (!IGNORED_AUTH_ERRORS.includes(err.code)) {
          setError(err.message || 'Google Sign-In failed. Please try again.');
        }
      }
    };
    handleRedirectResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const startRedirect = () => {
    sessionStorage.setItem('gs_redirect_started', '1');
    return signInWithRedirect(auth, googleProvider);
  };

  const handleGisCredential = async (credential) => {
    setLoading(true);
    setError('');
    try {
      const cred = GoogleAuthProvider.credential(credential);
      const result = await signInWithCredential(auth, cred);
      await loginWithGoogle(result.user.displayName, result.user.email);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Google Sign-In failed.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      if (window.location.hostname === 'localhost') {
        const result = await signInWithPopup(auth, googleProvider);
        await loginWithGoogle(result.user.displayName, result.user.email);
        navigate('/dashboard');
        return;
      }
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GIS_CLIENT_ID,
          callback: (resp) => {
            if (resp?.credential) handleGisCredential(resp.credential);
          },
        });
        window.google.accounts.id.prompt();
        return;
      }
      await startRedirect();
    } catch (err) {
      if (!IGNORED_AUTH_ERRORS.includes(err.code)) {
        setError(err.response?.data?.message || err.message || 'Google Sign-In failed. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Register to start organizing your academic tasks
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="you@university.edu"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input-field"
              placeholder="Minimum 6 characters"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-300 dark:border-gray-700"></div>
            <span className="relative bg-white px-3 text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn-secondary mt-4 flex w-full items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.173-2.763-6.173-6.173s2.763-6.173 6.173-6.173c1.554 0 2.977.577 4.075 1.526l3.057-3.057C19.336 2.193 16.037 1 12.24 1 6.033 1 12.24 16.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.852-4.225 11.218-9.84H12.24z"
              />
            </svg>
            Google Sign-In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
            Sign In
          </Link>
        </p>
        <p className="mt-4 text-center text-[10px] text-gray-400 dark:text-gray-500">
          build {typeof __BUILD_SHA__ !== 'undefined' ? __BUILD_SHA__ : 'dev'}
        </p>
      </div>
    </div>
  );
}