import axios from 'axios';

const accessTokenKey = 'recampusAccessToken';
const refreshTokenKey = 'recampusRefreshToken';
const legacyAccessTokenKey = 'campusHubAccessToken';
const legacyRefreshTokenKey = 'campusHubRefreshToken';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(accessTokenKey) ?? localStorage.getItem(legacyAccessTokenKey);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken =
      localStorage.getItem(refreshTokenKey) ?? localStorage.getItem(legacyRefreshTokenKey);
    const isAuthRefreshRequest = originalRequest?.url?.includes('/auth/refresh-token');

    if (error.response?.status !== 401 || originalRequest?._retry || !refreshToken || isAuthRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await api.post('/auth/refresh-token', { refreshToken });
      localStorage.setItem(accessTokenKey, response.data.accessToken);
      localStorage.setItem(refreshTokenKey, response.data.refreshToken);
      localStorage.removeItem(legacyAccessTokenKey);
      localStorage.removeItem(legacyRefreshTokenKey);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem(accessTokenKey);
      localStorage.removeItem(refreshTokenKey);
      localStorage.removeItem(legacyAccessTokenKey);
      localStorage.removeItem(legacyRefreshTokenKey);
      return Promise.reject(refreshError);
    }
  }
);
