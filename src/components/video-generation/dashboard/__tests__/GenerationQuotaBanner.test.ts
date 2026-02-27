import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import GenerationQuotaBanner from '../GenerationQuotaBanner';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    t: (key: string, vars?: Record<string, string>) => {
      if (key === 'quota.limitReached') {
        return 'Limit reached';
      }
      if (key === 'quota.contactSupport') {
        return 'Contact support';
      }
      if (key === 'quota.nearLimit') {
        return `Remaining: ${vars?.remaining ?? ''}`;
      }
      return key;
    },
  }),
}));

describe('GenerationQuotaBanner', () => {
  it('renders limit reached CTA when user quota is exhausted', () => {
    const html = renderToStaticMarkup(
      createElement(GenerationQuotaBanner, {
        quota: {
          daily_limit: 10,
          used_today: 10,
          remaining_today: 0,
          near_limit: true,
          limit_reached: true,
        },
      }),
    );

    expect(html).toContain('Limit reached');
    expect(html).toContain('Contact support');
    expect(html).toContain('/contact-us');
  });

  it('renders near limit warning with remaining count', () => {
    const html = renderToStaticMarkup(
      createElement(GenerationQuotaBanner, {
        quota: {
          daily_limit: 10,
          used_today: 9,
          remaining_today: 1,
          near_limit: true,
          limit_reached: false,
        },
      }),
    );

    expect(html).toContain('Remaining: 1');
  });

  it('renders request error fallback when quota is unavailable', () => {
    const html = renderToStaticMarkup(
      createElement(GenerationQuotaBanner, {
        quota: null,
        quotaError: 'Unable to load quota.',
      }),
    );

    expect(html).toContain('Unable to load quota.');
  });
});
