import { describe, expect, it } from 'vitest';
import { resolveApiLocale } from '../resolve-api-locale';

describe('resolveApiLocale', () => {
  it('prioritizes selected frontend locale for guests', () => {
    const locale = resolveApiLocale({
      isAuthenticated: false,
      frontendLocale: 'pt-BR',
      browserLocale: 'en-US',
    });

    expect(locale).toBe('pt-BR');
  });

  it('falls back to browser locale when frontend locale is unavailable', () => {
    const locale = resolveApiLocale({
      isAuthenticated: false,
      browserLocale: 'it-IT',
    });

    expect(locale).toBe('it');
  });
});
