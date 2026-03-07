'use client';

import { useLocale } from '@/context/LocaleContext';
import { ApiError } from '@/lib/api/client';
import { setStoredAuthToken } from '@/lib/auth-session';
import { createAuthModule } from '@/modules/auth';
import { loginWithImpersonationUseCase } from '@/modules/auth/application/login-with-impersonation';
import { resolvePostLoginRoute } from '@/modules/auth/application/post-login-route';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AuthCard from './components/AuthCard';
import AuthErrorMessage from './components/AuthErrorMessage';
import AuthField from './components/AuthField';
import AuthLogo from './components/AuthLogo';
import AuthSubmitButton from './components/AuthSubmitButton';

const authModule = createAuthModule();

interface SessionExpiredLoginModalProps {
  open: boolean;
  onRestoreSession: (token: string) => void;
}

const SessionExpiredLoginModal = ({ open, onRestoreSession }: SessionExpiredLoginModalProps) => {
  const router = useRouter();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const session = await loginWithImpersonationUseCase(authModule.gateway, {
        email,
        password,
        impersonationHash: null,
      });

      setStoredAuthToken(session.accessToken);
      onRestoreSession(session.accessToken);

      if (session.mustResetPassword) {
        router.push(resolvePostLoginRoute(session.mustResetPassword));
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t('auth.login.error'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-8">
      <div className="w-full max-w-[420px]">
        <AuthCard className="min-w-0 max-w-none">
          <div className="mb-10 flex justify-center">
            <AuthLogo />
          </div>

          <p className="mb-6 text-center text-sm text-white/80">{t('auth.login.sessionExpired')}</p>

          <form onSubmit={handleSubmit}>
            <AuthField
              id="session-email"
              label={t('auth.login.emailLabel')}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={t('auth.login.emailPlaceholder')}
            />
            <AuthField
              id="session-password"
              label={t('auth.login.passwordLabel')}
              type="password"
              value={password}
              onChange={setPassword}
              placeholder={t('auth.login.passwordPlaceholder')}
              minLength={8}
            />
            <AuthErrorMessage message={errorMessage} />
            <AuthSubmitButton label={isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')} disabled={isSubmitting} />
          </form>
        </AuthCard>
      </div>
    </div>
  );
};

export default SessionExpiredLoginModal;
