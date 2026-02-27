'use client';

import PageSectionHeader from '@/components/page-header/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { useDashboard } from '@/context/dashboard-context';
import { useUpdatePreferences } from '@/hooks/useUpdatePreferences';
import { AppLocale } from '@/i18n/config';
import { getConfiguredBackendLanguageOptions, resolveLocaleByLanguageId } from '@/lib/locale/language-options';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import SettingsSection from './sections/SettingsSection';
import SettingsThemeSelect, { type ThemeOption } from './sections/SettingsThemeSelect';

const SettingsPageContent = () => {
  const { t, setLocale } = useLocale();
  const { setTheme } = useTheme();
  const { userLanguageId, themePreference } = useDashboard();
  const { submit, isSubmitting, error, success, fieldErrors } = useUpdatePreferences();
  const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(null);
  const [selectedThemePreference, setSelectedThemePreference] = useState<ThemeOption>('system');

  useEffect(() => {
    setSelectedLanguageId(userLanguageId);
  }, [userLanguageId]);

  useEffect(() => {
    setSelectedThemePreference(themePreference);
  }, [themePreference]);

  const languageOptions = useMemo(() => getConfiguredBackendLanguageOptions(), []);
  const selectedLanguageHasOption = selectedLanguageId ? languageOptions.some((item) => item.id === selectedLanguageId) : true;
  const canPersistLanguage = languageOptions.length > 0 || selectedLanguageHasOption;

  const handleSavePreferences = async () => {
    const result = await submit({
      languageId: selectedLanguageId ?? null,
      themePreference: selectedThemePreference,
    });

    if (!result.ok) {
      return;
    }

    setTheme(selectedThemePreference);
    const localeFromId = resolveLocaleByLanguageId(selectedLanguageId);
    if (localeFromId) {
      setLocale(localeFromId);
      return;
    }

    if (selectedLanguageId === null) {
      setLocale('en' as AppLocale);
    }
  };

  return (
    <section className="space-y-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-8">
        <div className="w-full text-center">
          <PageSectionHeader title={t('settings.title')} description={t('settings.description')} />
        </div>

        <div className="w-full divide-y divide-stroke-3/80 dark:divide-stroke-7/80">
          <SettingsSection title={t('settings.languagePreference')} className="pb-5">
            <label className="sr-only" htmlFor="settings-language">
              {t('settings.languagePreference')}
            </label>
            <select
              id="settings-language"
              value={selectedLanguageId ?? ''}
              disabled={!canPersistLanguage || isSubmitting}
              onChange={(event) => {
                const nextValue = event.target.value;
                setSelectedLanguageId(nextValue ? Number(nextValue) : null);
              }}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/40 dark:bg-background-7/40 h-11 w-full rounded-[10px] border px-4 text-secondary outline-none transition focus:border-primary-400 dark:text-accent">
              <option value="">{t('settings.languageAuto')}</option>
              {languageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {t(`locale.${option.locale}` as const)}
                </option>
              ))}
              {selectedLanguageId && !selectedLanguageHasOption && <option value={selectedLanguageId}>#{selectedLanguageId}</option>}
            </select>
            <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('settings.languagePreference.help')}</p>
            {!canPersistLanguage && (
              <p className="text-tagline-3 text-ns-red">{t('settings.languagePreference.unavailable')}</p>
            )}
            {fieldErrors.language_id?.[0] && (
              <p className="text-tagline-3 text-ns-red">
                {t('settings.fieldErrorPrefix')} {fieldErrors.language_id[0]}
              </p>
            )}
          </SettingsSection>

          <SettingsSection title={t('settings.theme')} className="py-5">
            <SettingsThemeSelect
              value={selectedThemePreference}
              onChange={(nextTheme) => setSelectedThemePreference(nextTheme)}
              labels={{
                fieldLabel: t('settings.theme'),
                system: t('settings.theme.system'),
                light: t('settings.theme.light'),
                dark: t('settings.theme.dark'),
              }}
            />
            {fieldErrors.theme_preference?.[0] && (
              <p className="text-tagline-3 text-ns-red">
                {t('settings.fieldErrorPrefix')} {fieldErrors.theme_preference[0]}
              </p>
            )}
          </SettingsSection>

          <SettingsSection title="" className="pt-5">
            <button
              type="button"
              onClick={handleSavePreferences}
              disabled={isSubmitting}
              className="bg-background-4 dark:bg-background-7 text-secondary dark:text-accent hover:bg-background-5 dark:hover:bg-background-6 h-11 w-full rounded-[10px] px-4 transition disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? t('settings.savingPreferences') : t('settings.savePreferences')}
            </button>
            {success && <p className="text-tagline-3 text-ns-green">{t('settings.preferencesSaved')}</p>}
            {error && <p className="text-tagline-3 text-ns-red">{error || t('settings.preferencesError')}</p>}
          </SettingsSection>
        </div>
      </div>
    </section>
  );
};

export default SettingsPageContent;
