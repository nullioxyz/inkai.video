import { LOCALE_COOKIE_NAME } from '@/i18n/config';
import { cookies, headers } from 'next/headers';
import { ApiLocale, resolveApiLocale } from './resolve-api-locale';

export const resolveServerApiLocale = async (): Promise<ApiLocale> => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  return resolveApiLocale({
    frontendLocale: cookieStore.get(LOCALE_COOKIE_NAME)?.value,
    acceptLanguageHeader: headerStore.get('accept-language'),
  });
};
