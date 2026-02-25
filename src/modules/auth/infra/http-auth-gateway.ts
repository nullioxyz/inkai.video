import { exchangeImpersonationHash, getMe, loginWithEmail } from '@/lib/api/dashboard';
import { AuthGateway } from '../domain/contracts';

export const createHttpAuthGateway = (): AuthGateway => {
  return {
    loginWithEmail: async (email, password) => loginWithEmail(email, password),
    exchangeImpersonationHash: async (token, hash) => exchangeImpersonationHash(token, hash),
    getMe: async (token) => getMe(token),
  };
};
