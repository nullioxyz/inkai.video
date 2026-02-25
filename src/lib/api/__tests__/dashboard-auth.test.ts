import { describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../client';
import { exchangeImpersonationHash, getMe, loginWithEmail, resetFirstLoginPassword } from '../dashboard';

vi.mock('../client', () => ({
  apiRequest: vi.fn(),
}));

describe('dashboard auth api', () => {
  it('sends login payload with context headers', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        access_token: 'abc',
        token_type: 'bearer',
        expires_in: 3600,
      },
    });

    const response = await loginWithEmail('user@mail.com', 'password', {
      language: 'pt-BR',
      countryCode: 'BR',
      region: 'SP',
      city: 'Sao Paulo',
      timezone: 'America/Sao_Paulo',
    });

    expect(response.access_token).toBe('abc');
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      json: { email: 'user@mail.com', password: 'password' },
      headers: {
        'Accept-Language': 'pt-BR',
        'X-Country-Code': 'BR',
        'X-Region': 'SP',
        'X-City': 'Sao Paulo',
        'X-Timezone': 'America/Sao_Paulo',
      },
    });
  });

  it('loads me payload', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        id: 7,
        name: 'Rafael',
        email: 'rafael@mail.com',
        username: 'rafael',
        phone_number: null,
        active: true,
        credit_balance: 11,
        must_reset_password: true,
        last_login_at: null,
        created_at: null,
        updated_at: null,
      },
    });

    const me = await getMe('token');

    expect(me.id).toBe(7);
    expect(me.must_reset_password).toBe(true);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/auth/me', { token: 'token' });
  });

  it('exchanges impersonation hash using authenticated token', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        access_token: 'impersonated-token',
        token_type: 'bearer',
        expires_in: 3600,
        impersonation: {
          is_impersonating: true,
          actor_id: 10,
          subject_id: 20,
        },
      },
    });

    const response = await exchangeImpersonationHash('admin-token', 'a'.repeat(64));

    expect(response.access_token).toBe('impersonated-token');
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/auth/impersonation/exchange', {
      method: 'POST',
      token: 'admin-token',
      json: { hash: 'a'.repeat(64) },
    });
  });

  it('resets first login password', async () => {
    vi.mocked(apiRequest).mockResolvedValue({
      data: {
        id: 7,
        name: 'Rafael',
        email: 'rafael@mail.com',
        username: 'rafael',
        phone_number: null,
        active: true,
        credit_balance: 11,
        must_reset_password: false,
        last_login_at: null,
        created_at: null,
        updated_at: null,
      },
    });

    const response = await resetFirstLoginPassword('token', {
      current_password: 'password',
      password: 'new-password-123',
      password_confirmation: 'new-password-123',
    });

    expect(response.must_reset_password).toBe(false);
    expect(vi.mocked(apiRequest)).toHaveBeenCalledWith('/api/auth/first-login/reset-password', {
      method: 'POST',
      token: 'token',
      json: {
        current_password: 'password',
        password: 'new-password-123',
        password_confirmation: 'new-password-123',
      },
    });
  });
});
