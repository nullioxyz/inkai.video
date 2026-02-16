export const SUPPORTED_LOCALES = ['en', 'pt-BR', 'it'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'en';

export const LOCALE_COOKIE_NAME = 'inkai-locale';

export const isSupportedLocale = (value: string): value is AppLocale => {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
};

export const getIntlLocale = (locale: AppLocale) => {
  if (locale === 'pt-BR') {
    return 'pt-BR';
  }
  if (locale === 'it') {
    return 'it-IT';
  }
  return 'en-US';
};
