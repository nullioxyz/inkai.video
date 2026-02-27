export type ApiLocale = 'en' | 'pt-BR' | 'it';

const ACCEPTED_LOCALES: readonly ApiLocale[] = ['en', 'pt-BR', 'it'] as const;

const parseLanguageTag = (value?: string | null): string => {
  if (!value) {
    return '';
  }

  return value.split(',')[0]?.trim().toLowerCase() ?? '';
};

export const normalizeApiLocale = (value?: string | null): ApiLocale => {
  const normalized = parseLanguageTag(value);

  if (normalized.startsWith('pt')) {
    return 'pt-BR';
  }

  if (normalized.startsWith('it')) {
    return 'it';
  }

  return 'en';
};

interface ResolveApiLocaleOptions {
  isAuthenticated?: boolean;
  frontendLocale?: string | null;
  browserLocale?: string | null;
  acceptLanguageHeader?: string | null;
}

export const resolveApiLocale = ({
  isAuthenticated = false,
  frontendLocale,
  browserLocale,
  acceptLanguageHeader,
}: ResolveApiLocaleOptions): ApiLocale => {
  if (isAuthenticated && frontendLocale) {
    return normalizeApiLocale(frontendLocale);
  }

  if (frontendLocale) {
    return normalizeApiLocale(frontendLocale);
  }

  if (browserLocale) {
    return normalizeApiLocale(browserLocale);
  }

  if (acceptLanguageHeader) {
    return normalizeApiLocale(acceptLanguageHeader);
  }

  return 'en';
};

export const isApiLocale = (value: string): value is ApiLocale => {
  return (ACCEPTED_LOCALES as readonly string[]).includes(value);
};
