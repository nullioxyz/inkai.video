'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { validatePasswordResetInput } from '@/modules/auth/application/password-reset';
import { FormEvent, useEffect, useState } from 'react';

interface AccountPageContentProps {
  initialName: string;
  initialEmail: string;
  mustResetPassword: boolean;
  onResetPassword: (currentPassword: string, newPassword: string, confirmation: string) => Promise<void>;
}

const AccountPageContent = ({ initialName, initialEmail, mustResetPassword, onResetPassword }: AccountPageContentProps) => {
  const { t } = useLocale();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    const validation = validatePasswordResetInput(currentPassword, newPassword, confirmPassword);
    if (validation) {
      setError(validation);
      return;
    }

    setSaving(true);
    try {
      await onResetPassword(currentPassword, newPassword, confirmPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(t('account.passwordResetSuccess'));
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : t('account.passwordResetError');
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-8">
        <div className="w-full text-center">
          <PageSectionHeader title={t('account.title')} description={t('account.description')} />
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <label htmlFor="account-name" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
              {t('account.name')}
            </label>
            <input
              id="account-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="account-email" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
              {t('account.email')}
            </label>
            <input
              id="account-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="account-current-password"
              className="text-tagline-2 text-secondary dark:text-accent block font-medium">
              {t('account.currentPassword')}
            </label>
            <input
              id="account-current-password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="account-new-password" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
              {t('account.newPassword')}
            </label>
            <input
              id="account-new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="account-confirm-password" className="text-tagline-2 text-secondary dark:text-accent block font-medium">
              {t('account.confirmPassword')}
            </label>
            <input
              id="account-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400"
            />
          </div>

          {mustResetPassword ? (
              <p className="text-tagline-3 text-secondary/65 dark:text-accent/65">
              {t('account.mustResetPasswordHint')}
            </p>
          ) : null}
          {error ? <p className="text-tagline-2 text-ns-red">{error}</p> : null}
          {success ? <p className="text-tagline-2 text-green-600 dark:text-green-400">{success}</p> : null}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="btn-md-v2 btn-secondary-v2 h-10 rounded-[10px] px-4 text-tagline-2 font-medium disabled:cursor-not-allowed disabled:opacity-60">
              {t('account.save')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountPageContent;
