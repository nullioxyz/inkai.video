import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import SessionExpiredLoginModal from '../SessionExpiredLoginModal';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../components/AuthLogo', () => ({
  default: () => createElement('div', null, 'logo'),
}));

describe('SessionExpiredLoginModal', () => {
  it('renders nothing when modal is closed', () => {
    const html = renderToStaticMarkup(
      createElement(SessionExpiredLoginModal, {
        open: false,
        onRestoreSession: vi.fn(),
      }),
    );

    expect(html).toBe('');
  });

  it('renders relogin form when modal is open', () => {
    const html = renderToStaticMarkup(
      createElement(SessionExpiredLoginModal, {
        open: true,
        onRestoreSession: vi.fn(),
      }),
    );

    expect(html).toContain('auth.login.sessionExpired');
    expect(html).toContain('auth.login.emailLabel');
    expect(html).toContain('auth.login.passwordLabel');
    expect(html).toContain('auth.login.submit');
  });
});
