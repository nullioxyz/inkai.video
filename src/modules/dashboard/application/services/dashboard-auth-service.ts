import { resolveApiErrorMessage } from '@/lib/api/client';
import { resetFirstLoginPassword } from '@/lib/api/dashboard';
import { AuthGateway } from '@/modules/auth/domain/contracts';

export const fetchDashboardMe = async (gateway: AuthGateway, token: string) => {
  return gateway.getMe(token);
};

export const resetDashboardPassword = async (
  token: string,
  currentPassword: string,
  newPassword: string,
  confirmation: string,
) => {
  try {
    return await resetFirstLoginPassword(token, {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmation,
    });
  } catch (error) {
    throw new Error(resolveApiErrorMessage(error, 'Não foi possível redefinir a senha.'));
  }
};
