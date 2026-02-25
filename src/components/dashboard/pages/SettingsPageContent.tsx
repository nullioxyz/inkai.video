'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeOption = 'system' | 'light' | 'dark';

const SettingsPageContent = () => {
  const { t } = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme: ThemeOption = mounted ? ((theme as ThemeOption | undefined) ?? 'light') : 'light';

  return (
    <section className="space-y-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-8">
        <div className="w-full text-center">
          <PageSectionHeader title={t('settings.title')} description={t('settings.description')} />
        </div>

        <div className="w-full divide-y divide-stroke-3/80 dark:divide-stroke-7/80">
          <div className="space-y-3 pb-5">
            <p className="text-tagline-2 text-secondary dark:text-accent font-medium">{t('locale.label')}</p>
            <LocaleSwitcher compact fullWidth />
          </div>

          <div className="space-y-3 py-5">
            <label htmlFor="settings-theme" className="text-tagline-2 text-secondary dark:text-accent font-medium">
              {t('settings.theme')}
            </label>
            <select
              id="settings-theme"
              value={selectedTheme}
              onChange={(event) => setTheme(event.target.value as ThemeOption)}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 text-secondary dark:text-accent h-11 w-full rounded-[10px] border px-4 outline-none transition focus:border-primary-400">
              <option value="system">{t('settings.theme.system')}</option>
              <option value="light">{t('settings.theme.light')}</option>
              <option value="dark">{t('settings.theme.dark')}</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageContent;
