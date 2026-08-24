import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('campusHubAccessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('campusHubRefreshToken');
    const isAuthRefreshRequest = originalRequest?.url?.includes('/auth/refresh-token');

    if (error.response?.status !== 401 || originalRequest?._retry || !refreshToken || isAuthRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await api.post('/auth/refresh-token', { refreshToken });
      localStorage.setItem('campusHubAccessToken', response.data.accessToken);
      localStorage.setItem('campusHubRefreshToken', response.data.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('campusHubAccessToken');
      localStorage.removeItem('campusHubRefreshToken');
      return Promise.reject(refreshError);
    }
  }
);
