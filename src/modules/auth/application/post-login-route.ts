export const resolvePostLoginRoute = (mustResetPassword: boolean): string => {
  return mustResetPassword ? '/first-login/reset-password' : '/dashboard';
};
