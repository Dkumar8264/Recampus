import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);
const accessTokenKey = 'recampusAccessToken';
const refreshTokenKey = 'recampusRefreshToken';
const legacyAccessTokenKey = 'campusHubAccessToken';
const legacyRefreshTokenKey = 'campusHubRefreshToken';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem(accessTokenKey) ?? localStorage.getItem(legacyAccessTokenKey);

    if (!token) {
      setIsBootstrapping(false);
      return;
    }

    if (!localStorage.getItem(accessTokenKey)) {
      localStorage.setItem(accessTokenKey, token);
    }

    api
      .get('/auth/me')
      .then((response) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
        localStorage.removeItem(legacyAccessTokenKey);
        localStorage.removeItem(legacyRefreshTokenKey);
      })
      .finally(() => setIsBootstrapping(false));
  }, []);

  const persistAuth = (authPayload) => {
    localStorage.setItem(accessTokenKey, authPayload.accessToken);
    localStorage.setItem(refreshTokenKey, authPayload.refreshToken);
    localStorage.removeItem(legacyAccessTokenKey);
    localStorage.removeItem(legacyRefreshTokenKey);
    setUser(authPayload.user);
  };

  const signup = async (formValues) => {
    const response = await api.post('/auth/signup', formValues);
    if (response.data.accessToken) {
      persistAuth(response.data);
    }

    return response.data;
  };

  const login = async (formValues) => {
    const response = await api.post('/auth/login', formValues);
    persistAuth(response.data);
  };

  const googleLogin = async (credential) => {
    const response = await api.post('/auth/google', { credential });
    persistAuth(response.data);
  };

  const verifyEmail = async (formValues) => {
    const response = await api.post('/auth/verify-email', formValues);
    persistAuth(response.data);
  };

  const resendVerification = async (email) => {
    await api.post('/auth/resend-verification', { email });
  };

  const logout = () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(legacyAccessTokenKey);
    localStorage.removeItem(legacyRefreshTokenKey);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      signup,
      login,
      googleLogin,
      verifyEmail,
      resendVerification,
      logout
    }),
    [user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
};
