import { describe, expect, it } from 'vitest';
import { normalizeImpersonationHash } from '../impersonation-hash';

describe('normalizeImpersonationHash', () => {
  it('returns normalized hash when valid', () => {
    const hash = 'a'.repeat(64);
    expect(normalizeImpersonationHash(hash)).toBe(hash);
  });

  it('rejects empty or invalid values', () => {
    expect(normalizeImpersonationHash('')).toBeNull();
    expect(normalizeImpersonationHash('abc')).toBeNull();
    expect(normalizeImpersonationHash('z'.repeat(64))).toBeNull();
  });
});
