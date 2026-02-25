import { describe, expect, it } from 'vitest';
import { buildLoginRequestHeaders, resolveCountryCodeFromLanguage } from '../login-context';

describe('login context', () => {
  it('extracts country code from language format', () => {
    expect(resolveCountryCodeFromLanguage('pt-BR')).toBe('BR');
    expect(resolveCountryCodeFromLanguage('en_US')).toBe('US');
    expect(resolveCountryCodeFromLanguage('es')).toBeNull();
  });

  it('builds backend login headers from context', () => {
    const headers = buildLoginRequestHeaders({
      language: 'pt-BR',
      countryCode: 'BR',
      region: 'SP',
      city: 'Sao Paulo',
      timezone: 'America/Sao_Paulo',
    });

    expect(headers).toEqual({
      'Accept-Language': 'pt-BR',
      'X-Country-Code': 'BR',
      'X-Region': 'SP',
      'X-City': 'Sao Paulo',
      'X-Timezone': 'America/Sao_Paulo',
    });
  });
});
