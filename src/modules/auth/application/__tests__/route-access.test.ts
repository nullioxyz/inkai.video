import { describe, expect, it } from 'vitest';
import { resolveRouteAccess } from '../route-access';

describe('route access', () => {
  it('redirects logged user from login to dashboard', () => {
    const result = resolveRouteAccess({ pathname: '/login', hasToken: true });
    expect(result).toEqual({ redirectTo: '/dashboard', noIndex: true });
  });

  it('redirects logged user from auth impersonate to dashboard', () => {
    const result = resolveRouteAccess({ pathname: '/auth/impersonate', hasToken: true });
    expect(result).toEqual({ redirectTo: '/dashboard', noIndex: true });
  });

  it('redirects anonymous user from internal routes to login', () => {
    expect(resolveRouteAccess({ pathname: '/dashboard', hasToken: false })).toEqual({
      redirectTo: '/login',
      noIndex: true,
    });
    expect(resolveRouteAccess({ pathname: '/first-login/reset-password', hasToken: false })).toEqual({
      redirectTo: '/login',
      noIndex: true,
    });
  });

  it('allows anonymous user on login and keeps noindex', () => {
    const result = resolveRouteAccess({ pathname: '/login', hasToken: false });
    expect(result).toEqual({ redirectTo: null, noIndex: true });
  });

  it('allows logged user on internal routes and keeps noindex', () => {
    const result = resolveRouteAccess({ pathname: '/dashboard/gallery', hasToken: true });
    expect(result).toEqual({ redirectTo: null, noIndex: true });
  });

  it('does not apply noindex or redirect for public routes', () => {
    const result = resolveRouteAccess({ pathname: '/pricing', hasToken: false });
    expect(result).toEqual({ redirectTo: null, noIndex: false });
  });
});
