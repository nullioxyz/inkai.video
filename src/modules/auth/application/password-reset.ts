export const validatePasswordResetInput = (currentPassword: string, newPassword: string, confirmation: string): string | null => {
  if (!currentPassword || !newPassword || !confirmation) {
    return 'Preencha todos os campos de senha.';
  }

  if (newPassword.length < 8) {
    return 'A nova senha precisa ter pelo menos 8 caracteres.';
  }

  if (newPassword !== confirmation) {
    return 'A confirmação da senha não confere.';
  }

  return null;
};
