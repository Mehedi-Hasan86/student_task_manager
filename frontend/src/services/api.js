/**
 * Axios HTTP client for the backend REST API.
 *
 * - Base URL points at /api in development (proxied by Vite) or the
 *   configured production API base when VITE_API_BASE_URL is set.
 * - A request interceptor attaches the stored JWT as a Bearer token.
 * - A response interceptor clears session data and redirects to /login
 *   whenever the API answers 401 (expired/invalid token).
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global 401 responses: drop the session and bounce to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/** Authentication endpoints. */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  firebaseLogin: (data) => api.post('/auth/firebase', data),
};

/** Task management endpoints. */
export const taskAPI = {
  getStats: () => api.get('/tasks/stats'),
  getTasks: (params) => api.get('/tasks', { params }),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;