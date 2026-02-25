import { AuthGateway } from '../domain/contracts';

export const loginWithEmailUseCase = async (gateway: AuthGateway, args: { email: string; password: string }) => {
  const email = args.email.trim().toLowerCase();
  return gateway.loginWithEmail(email, args.password);
};
