'use client';

import { useLocale } from '@/context/LocaleContext';
import { ApiError } from '@/lib/api/client';
import { getStoredAuthToken, setStoredAuthToken } from '@/lib/auth-session';
import { createAuthModule } from '@/modules/auth';
import { loginWithImpersonationUseCase } from '@/modules/auth/application/login-with-impersonation';
import { resolvePostLoginRoute } from '@/modules/auth/application/post-login-route';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import AuthBackLink from './components/AuthBackLink';
import AuthCard from './components/AuthCard';
import AuthErrorMessage from './components/AuthErrorMessage';
import AuthField from './components/AuthField';
import AuthLogo from './components/AuthLogo';
import AuthPanel from './components/AuthPanel';
import AuthSubmitButton from './components/AuthSubmitButton';

const authModule = createAuthModule();

const LoginHero = () => {
  const router = useRouter();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (getStoredAuthToken()) {
      router.replace('/dashboard');
    }
  }, [router]);

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
        impersonationHash:
          typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('impersonation_hash') : null,
      });
      setStoredAuthToken(session.accessToken);
      router.push(resolvePostLoginRoute(session.mustResetPassword));
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
    <AuthPanel>
      <AuthCard>
        <div className="mb-10 flex justify-center">
          <AuthLogo />
        </div>

        <form onSubmit={handleSubmit}>
          <AuthField
            id="email"
            label={t('auth.login.emailLabel')}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder={t('auth.login.emailPlaceholder')}
          />
          <AuthField
            id="password"
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

        <div className="mt-6 flex justify-center">
          <AuthBackLink href="/" label={t('auth.login.backToLanding')} />
        </div>
      </AuthCard>
    </AuthPanel>
  );
};

LoginHero.displayName = 'LoginHero';
export default LoginHero;
