import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiRequest, setPreferredApiLocale } from '../client';

const createJsonResponse = (payload: unknown) => ({
  ok: true,
  headers: new Headers({ 'content-type': 'application/json' }),
  json: async () => payload,
  text: async () => JSON.stringify(payload),
});

describe('api client accept-language header', () => {
  afterEach(() => {
    setPreferredApiLocale(null);
    vi.unstubAllGlobals();
  });

  it('uses preferred locale when set', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createJsonResponse({ data: true }));
    vi.stubGlobal('fetch', fetchMock);

    setPreferredApiLocale('it');
    await apiRequest('/api/ping');

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers;
    expect(headers.get('Accept-Language')).toBe('it');
  });

  it('falls back to browser locale when preferred locale is not set', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createJsonResponse({ data: true }));
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('navigator', { language: 'pt-BR' });

    await apiRequest('/api/ping');

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers;
    expect(headers.get('Accept-Language')).toBe('pt-BR');
  });

  it('handles 204 no content without json parse errors', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => {
        throw new Error('should not parse json');
      },
      text: async () => '',
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await apiRequest('/api/ping');
    expect(response).toBeNull();
  });
});
