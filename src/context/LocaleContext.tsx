'use client';

import { LOCALE_COOKIE_NAME, SUPPORTED_LOCALES, type AppLocale, getIntlLocale } from '@/i18n/config';
import { MessageKey, getMessages } from '@/i18n/messages';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface LocaleContextValue {
  locale: AppLocale;
  intlLocale: string;
  setLocale: (locale: AppLocale) => void;
  t: (key: MessageKey, vars?: Record<string, string>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale: AppLocale;
}

const replaceVariables = (message: string, vars?: Record<string, string>) => {
  if (!vars) {
    return message;
  }

  return Object.entries(vars).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, value);
  }, message);
};

export const LocaleProvider = ({ children, initialLocale }: LocaleProviderProps) => {
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);

  const setLocale = (nextLocale: AppLocale) => {
    if (!SUPPORTED_LOCALES.includes(nextLocale)) {
      return;
    }

    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  const value = useMemo<LocaleContextValue>(() => {
    const currentMessages = getMessages(locale);

    return {
      locale,
      intlLocale: getIntlLocale(locale),
      setLocale,
      t: (key, vars) => replaceVariables(currentMessages[key], vars),
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
};
