import { AuthGateway } from '../domain/contracts';
import { normalizeImpersonationHash } from './impersonation-hash';

interface LoginWithImpersonationArgs {
  email: string;
  password: string;
  impersonationHash?: string | null;
}

interface LoginWithImpersonationResult {
  accessToken: string;
  mustResetPassword: boolean;
  isImpersonating: boolean;
}

export const loginWithImpersonationUseCase = async (
  gateway: AuthGateway,
  args: LoginWithImpersonationArgs,
): Promise<LoginWithImpersonationResult> => {
  const normalizedEmail = args.email.trim().toLowerCase();
  const login = await gateway.loginWithEmail(normalizedEmail, args.password);

  let accessToken = login.access_token;
  let isImpersonating = false;

  const hash = normalizeImpersonationHash(args.impersonationHash);
  if (hash) {
    const exchanged = await gateway.exchangeImpersonationHash(accessToken, hash);
    accessToken = exchanged.access_token;
    isImpersonating = exchanged.impersonation.is_impersonating;
  }

  const me = await gateway.getMe(accessToken);

  return {
    accessToken,
    mustResetPassword: me.must_reset_password,
    isImpersonating,
  };
};
