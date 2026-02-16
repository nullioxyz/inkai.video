import { AppLocale, DEFAULT_LOCALE, isSupportedLocale } from './config';

export const resolveLocale = (value: string | undefined): AppLocale => {
  if (!value) {
    return DEFAULT_LOCALE;
  }
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
};
