import { describe, expect, it, vi } from 'vitest';
import { AuthGateway } from '../../domain/contracts';
import { loginWithEmailUseCase } from '../login-with-email';

describe('loginWithEmailUseCase', () => {
  it('normalizes email before calling gateway', async () => {
    const gateway: AuthGateway = {
      loginWithEmail: vi.fn().mockResolvedValue({
        access_token: 'token',
        token_type: 'bearer',
        expires_in: 3600,
      }),
      exchangeImpersonationHash: vi.fn(),
      getMe: vi.fn(),
    };

    await loginWithEmailUseCase(gateway, {
      email: '  USER@MAIL.COM  ',
      password: 'password-123',
    });

    expect(gateway.loginWithEmail).toHaveBeenCalledWith('user@mail.com', 'password-123');
  });
});
