import { describe, expect, it, vi } from 'vitest';
import * as api from '@/lib/api/dashboard';
import { createHttpAuthGateway } from '../http-auth-gateway';

vi.mock('@/lib/api/dashboard', () => ({
  loginWithEmail: vi.fn(),
  exchangeImpersonationHash: vi.fn(),
  getMe: vi.fn(),
}));

describe('http auth gateway', () => {
  it('delegates login and me calls to api layer', async () => {
    vi.mocked(api.loginWithEmail).mockResolvedValue({
      access_token: 'abc',
      token_type: 'bearer',
      expires_in: 3600,
    });
    vi.mocked(api.getMe).mockResolvedValue({
      id: 1,
      name: 'User',
      email: 'user@mail.com',
      username: 'user',
      phone_number: null,
      active: true,
      credit_balance: 10,
      must_reset_password: false,
      last_login_at: null,
      created_at: null,
      updated_at: null,
    });
    vi.mocked(api.exchangeImpersonationHash).mockResolvedValue({
      access_token: 'impersonated-token',
      token_type: 'bearer',
      expires_in: 3600,
      impersonation: {
        is_impersonating: true,
        actor_id: 1,
        subject_id: 2,
      },
    });

    const gateway = createHttpAuthGateway();
    const token = await gateway.loginWithEmail('user@mail.com', 'password');
    const impersonated = await gateway.exchangeImpersonationHash('abc', 'a'.repeat(64));
    const me = await gateway.getMe('abc');

    expect(token.access_token).toBe('abc');
    expect(impersonated.access_token).toBe('impersonated-token');
    expect(me.id).toBe(1);
  });
});
