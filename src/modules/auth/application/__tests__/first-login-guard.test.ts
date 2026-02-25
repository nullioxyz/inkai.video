import { describe, expect, it } from 'vitest';
import { mustRedirectToFirstLoginReset } from '../first-login-guard';

describe('first login guard', () => {
  it('does not redirect when user does not need reset', () => {
    expect(mustRedirectToFirstLoginReset(false, '/dashboard')).toBe(false);
    expect(mustRedirectToFirstLoginReset(false, '/first-login/reset-password')).toBe(false);
  });

  it('redirects to first-login page when reset is required and route is different', () => {
    expect(mustRedirectToFirstLoginReset(true, '/dashboard')).toBe(true);
    expect(mustRedirectToFirstLoginReset(true, '/dashboard/credits')).toBe(true);
    expect(mustRedirectToFirstLoginReset(true, '/dashboard/gallery')).toBe(true);
  });

  it('keeps user on first-login page when reset is required', () => {
    expect(mustRedirectToFirstLoginReset(true, '/first-login/reset-password')).toBe(false);
  });
});
