import { AUTH_TOKEN_KEY, AUTH_TOKEN_MAX_AGE_SECONDS } from './auth-constants';

const resolveSecureSuffix = (isSecure: boolean): string => (isSecure ? '; secure' : '');

export const buildAuthCookie = (token: string, isSecure: boolean) =>
  `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${AUTH_TOKEN_MAX_AGE_SECONDS}; samesite=lax${resolveSecureSuffix(isSecure)}`;

export const buildAuthCookieClear = () => `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
