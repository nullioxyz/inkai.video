export const mustRedirectToFirstLoginReset = (mustResetPassword: boolean, pathname: string): boolean => {
  if (!mustResetPassword) {
    return false;
  }

  return pathname !== '/first-login/reset-password';
};
