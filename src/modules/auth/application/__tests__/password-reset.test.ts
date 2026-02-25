import { describe, expect, it } from 'vitest';
import { validatePasswordResetInput } from '../password-reset';

describe('password reset validation', () => {
  it('requires all fields', () => {
    expect(validatePasswordResetInput('', '12345678', '12345678')).toBe('Preencha todos os campos de senha.');
    expect(validatePasswordResetInput('12345678', '', '12345678')).toBe('Preencha todos os campos de senha.');
    expect(validatePasswordResetInput('12345678', '12345678', '')).toBe('Preencha todos os campos de senha.');
  });

  it('requires minimum password length', () => {
    expect(validatePasswordResetInput('12345678', '1234', '1234')).toBe('A nova senha precisa ter pelo menos 8 caracteres.');
  });

  it('requires matching confirmation', () => {
    expect(validatePasswordResetInput('12345678', '12345678', '87654321')).toBe('A confirmação da senha não confere.');
  });

  it('returns null when payload is valid', () => {
    expect(validatePasswordResetInput('current123', 'new-password-123', 'new-password-123')).toBeNull();
  });
});
