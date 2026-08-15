/**
 * Application entry point.
 *
 * Renders the React app into #root. Before mounting, it enforces a
 * canonical (Firebase-authorized) origin so that Google sign-in can never
 * be attempted from an unauthorized deployment URL.
 *
 * Why this exists: every Vercel deployment gets a random hash URL
 * (e.g. studenttaskmanager-xxxx-mehedi-hasan86s-projects.vercel.app).
 * Firebase only allows OAuth from the explicitly registered domains below,
 * so any other hostname is redirected to the stable alias. Without this
 * guard, users hitting a hash URL receive `auth/unauthorized-domain`.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/** Canonical production host registered in Firebase / Google Cloud Console. */
const STABLE_HOST = 'studenttaskmanager-mehedi-hasan86s-projects.vercel.app';

/** Hosts allowed to render the app without redirection. */
const ALLOWED_HOSTS = new Set([STABLE_HOST, 'studenttaskmanager-three.vercel.app']);

const host = window.location.hostname;

// Localhost and Firebase-hosted origins are always safe.
const isDev = host === 'localhost' || host.endsWith('.firebaseapp.com') || host.endsWith('.web.app');

if (!isDev && !ALLOWED_HOSTS.has(host)) {
  // Redirect unauthorized hosts to the canonical URL, preserving the route.
  window.location.replace('https://' + STABLE_HOST + window.location.pathname + window.location.search);
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}