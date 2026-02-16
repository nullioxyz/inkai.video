'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { FormEvent, useState } from 'react';

const AccountPageContent = () => {
  const { t } = useLocale();
  const [name, setName] = useState('Rafael');
  const [email, setEmail] = useState('rafael@inkai.ai');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button type="submit" className="btn-md-v2 btn-secondary-v2 h-10 rounded-[10px] px-4 text-tagline-2 font-medium">
              {t('account.save')}
            </button>
            <button
              type="button"
              className="btn-md-v2 h-10 rounded-[10px] border border-ns-red px-4 text-tagline-2 font-medium text-ns-red">
              {t('account.delete')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AccountPageContent;
