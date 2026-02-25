import { AuthTokenResponse, ImpersonationExchangeResponse, MeResponse } from '@/lib/api/dashboard';

export interface AuthGateway {
  loginWithEmail(email: string, password: string): Promise<AuthTokenResponse>;
  exchangeImpersonationHash(token: string, hash: string): Promise<ImpersonationExchangeResponse>;
  getMe(token: string): Promise<MeResponse>;
}
