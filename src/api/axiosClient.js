import axios from 'axios';

/**
 * Pre-configured Axios instance for DocuMind.
 * Prepared for future integration with a FastAPI backend.
 * Base URL can be configured via environment variable VITE_API_BASE_URL.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: attach auth tokens when auth is integrated
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('documind_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle global errors (e.g. 401 unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Future redirect to login when session expires
      console.warn('Unauthorized request - session may be expired.');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
