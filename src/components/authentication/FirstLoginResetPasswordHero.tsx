'use client';

import { ApiError } from '@/lib/api/client';
import { resetFirstLoginPassword } from '@/lib/api/dashboard';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { validatePasswordResetInput } from '@/modules/auth/application/password-reset';
import Image from 'next/image';
import mainLogo from '@public/images/shared/main-logo.svg';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const FirstLoginResetPasswordHero = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    const validation = validatePasswordResetInput(currentPassword, newPassword, confirmPassword);
    if (validation) {
      setErrorMessage(validation);
      return;
    }

    const token = getStoredAuthToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetFirstLoginPassword(token, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      router.replace('/dashboard');
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Não foi possível redefinir a senha.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="bg-background-6 border-stroke-7 mx-auto w-full min-w-[400px] max-w-[400px] rounded-[20px] border px-10 py-14">
            <div className="mb-10 flex justify-center">
              <Image src={mainLogo} alt="Inkai" width={150} height={36} className="dark:invert" />
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-heading-6 text-accent">Primeiro acesso</h1>
              <p className="text-tagline-3 text-accent/70 mt-2">Redefina sua senha para continuar.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="mb-4 space-y-2">
                <label htmlFor="current-password" className="text-tagline-2 text-accent block font-medium select-none">
                  Senha atual
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="auth-form-input"
                  placeholder="Senha atual"
                  minLength={8}
                  required
                />
              </fieldset>

              <fieldset className="mb-4 space-y-2">
                <label htmlFor="new-password" className="text-tagline-2 text-accent block font-medium select-none">
                  Nova senha
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="auth-form-input"
                  placeholder="No mínimo 8 caracteres"
                  minLength={8}
                  required
                />
              </fieldset>

              <fieldset className="mb-3 space-y-2">
                <label htmlFor="confirm-password" className="text-tagline-2 text-accent block font-medium select-none">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="auth-form-input"
                  placeholder="Repita a nova senha"
                  minLength={8}
                  required
                />
              </fieldset>

              {errorMessage && <p className="text-tagline-3 text-ns-red mt-3">{errorMessage}</p>}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-md btn-primary w-full first-letter:uppercase before:content-none disabled:opacity-50">
                  {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
                </button>
              </div>
            </form>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  clearStoredAuthToken();
                  router.replace('/login');
                }}
                className="border-stroke-7 text-tagline-2 text-accent/85 hover:bg-background-7 hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition">
                Sair
              </button>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default FirstLoginResetPasswordHero;
