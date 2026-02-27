'use client';

import PageSectionHeader from '@/components/page-header/PageSectionHeader';
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SettingsSection from './sections/SettingsSection';
import SettingsThemeSelect, { type ThemeOption } from './sections/SettingsThemeSelect';


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
          <SettingsSection title={t('locale.label')} className="pb-5">
            <LocaleSwitcher compact fullWidth />
          </SettingsSection>

          <SettingsSection title={t('settings.theme')} className="py-5">
            <SettingsThemeSelect
              value={selectedTheme}
              onChange={setTheme}
              labels={{
                fieldLabel: t('settings.theme'),
                system: t('settings.theme.system'),
                light: t('settings.theme.light'),
                dark: t('settings.theme.dark'),
              }}
            />
          </SettingsSection>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageContent;
