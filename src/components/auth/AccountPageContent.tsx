'use client';

import PageSectionHeader from '@/components/page-header/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { validatePasswordResetInput } from '@/modules/auth/application/password-reset';
import { FormEvent, useEffect, useState } from 'react';
import AccountFeedback from './account/AccountFeedback';
import AccountInputField from './account/AccountInputField';
import AccountSubmitButton from './account/AccountSubmitButton';

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
          <AccountInputField id="account-name" label={t('account.name')} type="text" value={name} onChange={setName} />

          <AccountInputField id="account-email" label={t('account.email')} type="email" value={email} onChange={setEmail} />

          <AccountInputField
            id="account-current-password"
            label={t('account.currentPassword')}
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />

          <AccountInputField
            id="account-new-password"
            label={t('account.newPassword')}
            type="password"
            value={newPassword}
            onChange={setNewPassword}
          />

          <AccountInputField
            id="account-confirm-password"
            label={t('account.confirmPassword')}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <AccountFeedback
            mustResetHint={mustResetPassword ? t('account.mustResetPasswordHint') : null}
            error={error}
            success={success}
          />

          <AccountSubmitButton label={t('account.save')} disabled={saving} />
        </form>
      </div>
    </section>
  );
};

export default AccountPageContent;
