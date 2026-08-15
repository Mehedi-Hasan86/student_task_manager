/**
 * Firebase initialization module.
 *
 * Central place for the Firebase web app configuration and shared auth
 * objects. Every auth-aware component imports `auth` and `googleProvider`
 * from here so the Firebase app is initialized exactly once.
 */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/** Firebase web app configuration (Firebase project: smarttaskmanager-ecee7). */
const firebaseConfig = {
  apiKey: 'AIzaSyBommpqdW8QpJyzjyViqGEGRS6qd1wu7nI',
  authDomain: 'smarttaskmanager-ecee7.firebaseapp.com',
  projectId: 'smarttaskmanager-ecee7',
  storageBucket: 'smarttaskmanager-ecee7.firebasestorage.app',
  messagingSenderId: '784953740224',
  appId: '1:784953740224:web:e5ce21e8f30a9d274d5625',
  measurementId: 'G-H0MJRRYX9W',
};

const app = initializeApp(firebaseConfig);

/** Firebase Auth instance shared across the application. */
export const auth = getAuth(app);

/** Google OAuth provider pre-configured for Firebase sign-in. */
export const googleProvider = new GoogleAuthProvider();