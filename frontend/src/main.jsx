import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const STABLE_HOST = 'studenttaskmanager-mehedi-hasan86s-projects.vercel.app';
const ALLOWED_HOSTS = new Set([STABLE_HOST, 'studenttaskmanager-three.vercel.app']);

const host = window.location.hostname;
const isDev = host === 'localhost' || host.endsWith('.firebaseapp.com') || host.endsWith('.web.app');
if (!isDev && !ALLOWED_HOSTS.has(host)) {
  window.location.replace('https://' + STABLE_HOST + window.location.pathname + window.location.search);
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
