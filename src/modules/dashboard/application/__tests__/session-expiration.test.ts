import { ApiError } from '@/lib/api/client';
import { describe, expect, it } from 'vitest';
import { isSessionExpiredError, shouldRedirectToLogin } from '../session-expiration';

describe('session expiration helpers', () => {
  it('redirects to login when hydrated without token and session is not expired', () => {
    expect(
      shouldRedirectToLogin({
        isHydrated: true,
        token: null,
        sessionExpired: false,
      }),
    ).toBe(true);
  });

  it('does not redirect when session is expired and re-login modal should be shown', () => {
    expect(
      shouldRedirectToLogin({
        isHydrated: true,
        token: null,
        sessionExpired: true,
      }),
    ).toBe(false);
  });

  it('does not redirect before hydration', () => {
    expect(
      shouldRedirectToLogin({
        isHydrated: false,
        token: null,
        sessionExpired: false,
      }),
    ).toBe(false);
  });

  it('detects auth errors as session expiration', () => {
    expect(isSessionExpiredError(new ApiError('Unauthorized', 401, {}))).toBe(true);
    expect(isSessionExpiredError(new ApiError('Forbidden', 403, {}))).toBe(true);
    expect(isSessionExpiredError(new ApiError('Page Expired', 419, {}))).toBe(true);
    expect(isSessionExpiredError(new ApiError('Request failed', 500, { message: 'Unauthenticated.' }))).toBe(true);
  });

  it('ignores non-auth errors', () => {
    expect(isSessionExpiredError(new ApiError('Bad request', 400, {}))).toBe(false);
    expect(isSessionExpiredError(new Error('unknown'))).toBe(false);
  });

  it('detects legacy unauthorized generic errors', () => {
    expect(isSessionExpiredError(new Error('unauthorized'))).toBe(true);
    expect(isSessionExpiredError(new Error('session expired'))).toBe(true);
  });
});
