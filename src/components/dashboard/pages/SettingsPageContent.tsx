'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type CleanupDays = '7' | '5' | '3' | '1';
type ThemeOption = 'system' | 'light' | 'dark';

const SettingsPageContent = () => {
  const { t } = useLocale();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [cleanupDays, setCleanupDays] = useState<CleanupDays>('7');

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

          <div className="space-y-3 py-5">
            <p className="text-tagline-2 text-secondary dark:text-accent font-medium">{t('settings.notifications')}</p>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span className="text-tagline-2 text-secondary/70 dark:text-accent/70">{t('settings.notifications.label')}</span>
              <span
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationsEnabled ? 'bg-secondary dark:bg-accent' : 'bg-background-10 dark:bg-background-7'
                }`}>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(event) => setNotificationsEnabled(event.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    notificationsEnabled ? 'translate-x-5 dark:bg-secondary' : 'translate-x-0.5 dark:bg-accent'
                  }`}
                />
              </span>
            </label>
          </div>

          <div className="space-y-3 pt-5">
            <p className="text-tagline-2 text-secondary dark:text-accent font-medium">{t('settings.cleanup')}</p>
            <div className="flex flex-wrap gap-2">
              {(['7', '5', '3', '1'] as CleanupDays[]).map((days) => {
                const isActive = cleanupDays === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setCleanupDays(days)}
                    className={`text-tagline-2 rounded-[10px] border px-4 py-2 font-medium transition ${
                      isActive
                        ? 'bg-secondary border-stroke-7 text-accent shadow-1'
                        : 'bg-background-2 dark:bg-background-7 border-stroke-3 dark:border-stroke-7 text-secondary/70 dark:text-accent/70 hover:border-stroke-4 dark:hover:border-stroke-6 hover:bg-background-4 dark:hover:bg-background-8 hover:text-secondary dark:hover:text-accent'
                    }`}>
                    {days} {days === '1' ? t('settings.day.one') : t('settings.day.other')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageContent;
