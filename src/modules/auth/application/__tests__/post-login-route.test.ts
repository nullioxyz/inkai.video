import { describe, expect, it } from 'vitest';
import { resolvePostLoginRoute } from '../post-login-route';

describe('post login route', () => {
  it('routes to first login reset page when user must reset password', () => {
    expect(resolvePostLoginRoute(true)).toBe('/first-login/reset-password');
  });

  it('routes to dashboard when reset is not required', () => {
    expect(resolvePostLoginRoute(false)).toBe('/dashboard');
  });
});
