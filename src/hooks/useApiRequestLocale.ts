'use client';

import { useLocale } from '@/context/LocaleContext';
import { getStoredAuthToken } from '@/lib/auth-session';
import { resolveApiLocale } from '@/lib/locale/resolve-api-locale';
import { useMemo } from 'react';

export const useApiRequestLocale = () => {
  const { locale } = useLocale();

  return useMemo(() => {
    const token = getStoredAuthToken();
    const browserLocale = typeof navigator !== 'undefined' ? navigator.language : null;

    return {
      token,
      acceptLanguage: resolveApiLocale({
        isAuthenticated: Boolean(token),
        frontendLocale: locale,
        browserLocale,
      }),
    };
  }, [locale]);
};
