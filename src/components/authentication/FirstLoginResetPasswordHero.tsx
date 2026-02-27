'use client';

import { useLocale } from '@/context/LocaleContext';
import { ApiError } from '@/lib/api/client';
import { resetFirstLoginPassword } from '@/lib/api/dashboard';
import { clearStoredAuthToken, getStoredAuthToken } from '@/lib/auth-session';
import { validatePasswordResetInput } from '@/modules/auth/application/password-reset';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AuthCard from './components/AuthCard';
import AuthErrorMessage from './components/AuthErrorMessage';
import AuthField from './components/AuthField';
import AuthLogo from './components/AuthLogo';
import AuthPanel from './components/AuthPanel';
import AuthSubmitButton from './components/AuthSubmitButton';
import AuthTextButton from './components/AuthTextButton';
import AuthTitleBlock from './components/AuthTitleBlock';

const FirstLoginResetPasswordHero = () => {
  const router = useRouter();
  const { t } = useLocale();
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
        setErrorMessage(t('auth.firstLogin.error'));
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

        <AuthTitleBlock title={t('auth.firstLogin.title')} description={t('auth.firstLogin.description')} />

        <form onSubmit={handleSubmit}>
          <AuthField
            id="current-password"
            label={t('auth.firstLogin.currentPasswordLabel')}
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder={t('auth.firstLogin.currentPasswordPlaceholder')}
            minLength={8}
          />
          <AuthField
            id="new-password"
            label={t('auth.firstLogin.newPasswordLabel')}
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder={t('auth.firstLogin.newPasswordPlaceholder')}
            minLength={8}
          />
          <AuthField
            id="confirm-password"
            label={t('auth.firstLogin.confirmPasswordLabel')}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t('auth.firstLogin.confirmPasswordPlaceholder')}
            minLength={8}
          />

          <AuthErrorMessage message={errorMessage} />
          <AuthSubmitButton label={isSubmitting ? t('auth.firstLogin.submitting') : t('auth.firstLogin.submit')} disabled={isSubmitting} />
        </form>

        <div className="mt-6 flex justify-center">
          <AuthTextButton
            label={t('auth.firstLogin.logout')}
            onClick={() => {
              clearStoredAuthToken();
              router.replace('/login');
            }}
          />
        </div>
      </AuthCard>
    </AuthPanel>
  );
};

export default FirstLoginResetPasswordHero;
