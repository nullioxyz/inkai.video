import { describe, expect, it } from 'vitest';
import { messages } from '../messages';

const requiredKeys = [
  'auth.common.or',
  'auth.login.emailLabel',
  'auth.login.passwordLabel',
  'auth.login.submit',
  'auth.firstLogin.title',
  'auth.firstLogin.submit',
  'auth.signup.usernameLabel',
  'auth.signup.submit',
  'dashboard.loadingVideos',
] as const;

describe('auth and dashboard i18n messages', () => {
  it('contains required keys in all supported locales', () => {
    for (const locale of Object.keys(messages) as Array<keyof typeof messages>) {
      for (const key of requiredKeys) {
        const value = messages[locale][key];
        expect(typeof value).toBe('string');
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
