import { describe, expect, it } from 'vitest';
import { buildAuthCookie, buildAuthCookieClear } from '@/lib/auth-cookie';
import { AUTH_TOKEN_KEY } from '@/lib/auth-constants';

describe('auth cookie helpers', () => {
  it('builds auth cookie for insecure contexts', () => {
    expect(buildAuthCookie('token-123', false)).toBe(
      `${AUTH_TOKEN_KEY}=token-123; path=/; max-age=2592000; samesite=lax`,
    );
  });

  it('builds auth cookie for secure contexts', () => {
    expect(buildAuthCookie('token-123', true)).toBe(
      `${AUTH_TOKEN_KEY}=token-123; path=/; max-age=2592000; samesite=lax; secure`,
    );
  });

  it('builds clear cookie', () => {
    expect(buildAuthCookieClear()).toBe(`${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`);
  });
});
