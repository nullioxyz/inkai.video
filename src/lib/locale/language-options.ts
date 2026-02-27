import { AppLocale } from '@/i18n/config';

export interface BackendLanguageOption {
  locale: AppLocale;
  id: number;
}

const parseEnvId = (value?: string): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const ENV_LANGUAGE_IDS: Record<AppLocale, number | null> = {
  en: parseEnvId(process.env.NEXT_PUBLIC_LANGUAGE_ID_EN),
  'pt-BR': parseEnvId(process.env.NEXT_PUBLIC_LANGUAGE_ID_PT_BR),
  it: parseEnvId(process.env.NEXT_PUBLIC_LANGUAGE_ID_IT),
};

export const getConfiguredBackendLanguageOptions = (): BackendLanguageOption[] => {
  const options: BackendLanguageOption[] = [];

  for (const locale of ['en', 'pt-BR', 'it'] as const) {
    const languageId = ENV_LANGUAGE_IDS[locale];
    if (!languageId) {
      continue;
    }

    options.push({ locale, id: languageId });
  }

  return options;
};

export const resolveLocaleByLanguageId = (languageId: number | null | undefined): AppLocale | null => {
  if (!languageId) {
    return null;
  }

  const option = getConfiguredBackendLanguageOptions().find((item) => item.id === languageId);
  return option?.locale ?? null;
};

export const resolveLanguageIdByLocale = (locale: AppLocale): number | null => {
  return ENV_LANGUAGE_IDS[locale];
};
