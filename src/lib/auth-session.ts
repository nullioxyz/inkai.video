import { AUTH_TOKEN_KEY } from './auth-constants';
import { buildAuthCookie, buildAuthCookieClear } from './auth-cookie';

export const getStoredAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setStoredAuthToken = (token: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  document.cookie = buildAuthCookie(token, window.location.protocol === 'https:');
};

export const clearStoredAuthToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = buildAuthCookieClear();
};
