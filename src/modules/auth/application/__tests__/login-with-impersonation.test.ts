import { describe, expect, it, vi } from 'vitest';
import { AuthGateway } from '../../domain/contracts';
import { loginWithImpersonationUseCase } from '../login-with-impersonation';

const buildGateway = (): AuthGateway => ({
  loginWithEmail: vi.fn(),
  exchangeImpersonationHash: vi.fn(),
  getMe: vi.fn(),
});

describe('loginWithImpersonationUseCase', () => {
  it('logs in and loads me without impersonation hash', async () => {
    const gateway = buildGateway();
    vi.mocked(gateway.loginWithEmail).mockResolvedValue({
      access_token: 'admin-token',
      token_type: 'bearer',
      expires_in: 3600,
    });
    vi.mocked(gateway.getMe).mockResolvedValue({
      id: 1,
      name: 'Admin',
      email: 'admin@mail.com',
      username: 'admin',
      phone_number: null,
      active: true,
      credit_balance: 0,
      must_reset_password: false,
      last_login_at: null,
      created_at: null,
      updated_at: null,
    });

    const result = await loginWithImpersonationUseCase(gateway, {
      email: ' ADMIN@MAIL.COM ',
      password: 'password',
    });

    expect(gateway.loginWithEmail).toHaveBeenCalledWith('admin@mail.com', 'password');
    expect(gateway.exchangeImpersonationHash).not.toHaveBeenCalled();
    expect(gateway.getMe).toHaveBeenCalledWith('admin-token');
    expect(result).toEqual({
      accessToken: 'admin-token',
      mustResetPassword: false,
      isImpersonating: false,
    });
  });

  it('exchanges hash and uses impersonated token for me', async () => {
    const gateway = buildGateway();
    vi.mocked(gateway.loginWithEmail).mockResolvedValue({
      access_token: 'admin-token',
      token_type: 'bearer',
      expires_in: 3600,
    });
    vi.mocked(gateway.exchangeImpersonationHash).mockResolvedValue({
      access_token: 'impersonated-token',
      token_type: 'bearer',
      expires_in: 3600,
      impersonation: {
        is_impersonating: true,
        actor_id: 10,
        subject_id: 11,
      },
    });
    vi.mocked(gateway.getMe).mockResolvedValue({
      id: 11,
      name: 'User',
      email: 'user@mail.com',
      username: 'user',
      phone_number: null,
      active: true,
      credit_balance: 5,
      must_reset_password: true,
      last_login_at: null,
      created_at: null,
      updated_at: null,
    });

    const result = await loginWithImpersonationUseCase(gateway, {
      email: 'admin@mail.com',
      password: 'password',
      impersonationHash: 'a'.repeat(64),
    });

    expect(gateway.exchangeImpersonationHash).toHaveBeenCalledWith('admin-token', 'a'.repeat(64));
    expect(gateway.getMe).toHaveBeenCalledWith('impersonated-token');
    expect(result).toEqual({
      accessToken: 'impersonated-token',
      mustResetPassword: true,
      isImpersonating: true,
    });
  });
});
