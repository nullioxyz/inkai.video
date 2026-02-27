import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../client';
import { institutionalApi, seoApi } from '../public-content';

vi.mock('../client', () => ({
  apiRequest: vi.fn(),
}));

describe('public content api', () => {
  const originalFrontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  beforeEach(() => {
    vi.mocked(apiRequest).mockReset();
    process.env.NEXT_PUBLIC_FRONTEND_URL = 'https://app.inkai.ai';
  });

  it('normalizes institutional list images urls', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'About',
          subtitle: null,
          short_description: null,
          description: null,
          slug: 'about',
          active: true,
          images: [
            { id: 1, name: 'Hero', url: '/storage/hero.jpg' },
            { id: 2, name: 'CDN', url: 'https://cdn.example.com/cover.jpg' },
          ],
          created_at: null,
          updated_at: null,
        },
      ],
    });

    const result = await institutionalApi.list('en');

    expect(result[0].images[0].url).toBe('https://app.inkai.ai/storage/hero.jpg');
    expect(result[0].images[1].url).toBe('https://cdn.example.com/cover.jpg');
  });

  it('normalizes seo images urls and keeps empty values stable', async () => {
    vi.mocked(apiRequest).mockResolvedValueOnce({
      data: {
        id: 3,
        slug: 'home',
        meta_title: null,
        meta_description: null,
        meta_keywords: null,
        canonical_url: null,
        og_title: null,
        og_description: null,
        twitter_title: null,
        twitter_description: null,
        images: [
          { id: 1, name: 'Cover', url: '/storage/cover.jpg' },
          { id: 2, name: 'Invalid', url: '   ' },
        ],
        active: true,
        created_at: null,
        updated_at: null,
      },
    });

    const result = await seoApi.show('home', 'en');

    expect(result.images[0].url).toBe('https://app.inkai.ai/storage/cover.jpg');
    expect(result.images[1].url).toBe('');
  });

  afterAll(() => {
    if (originalFrontendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_FRONTEND_URL;
      return;
    }
    process.env.NEXT_PUBLIC_FRONTEND_URL = originalFrontendUrl;
  });
});
