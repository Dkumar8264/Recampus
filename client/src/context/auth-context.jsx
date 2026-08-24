import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('campusHubAccessToken');

    if (!token) {
      setIsBootstrapping(false);
      return;
    }

    api
      .get('/auth/me')
      .then((response) => setUser(response.data.user))
      .catch(() => {
        localStorage.removeItem('campusHubAccessToken');
        localStorage.removeItem('campusHubRefreshToken');
      })
      .finally(() => setIsBootstrapping(false));
  }, []);

  const persistAuth = (authPayload) => {
    localStorage.setItem('campusHubAccessToken', authPayload.accessToken);
    localStorage.setItem('campusHubRefreshToken', authPayload.refreshToken);
    setUser(authPayload.user);
  };

  const signup = async (formValues) => {
    const response = await api.post('/auth/signup', formValues);
    persistAuth(response.data);
  };

  const login = async (formValues) => {
    const response = await api.post('/auth/login', formValues);
    persistAuth(response.data);
  };

  const logout = () => {
    localStorage.removeItem('campusHubAccessToken');
    localStorage.removeItem('campusHubRefreshToken');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), isBootstrapping, signup, login, logout }),
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
