export interface LoginRequestContext {
  language?: string | null;
  countryCode?: string | null;
  region?: string | null;
  city?: string | null;
  timezone?: string | null;
}

const COUNTRY_CODE_PATTERN = /[-_]([a-z]{2}|\d{3})$/i;

const normalizeCountryCode = (value?: string | null): string | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  if (!normalized) {
    return null;
  }

  return normalized;
};

export const resolveCountryCodeFromLanguage = (language?: string | null): string | null => {
  if (!language) {
    return null;
  }

  const match = language.trim().match(COUNTRY_CODE_PATTERN);
  if (!match?.[1]) {
    return null;
  }

  return normalizeCountryCode(match[1]);
};

export const resolveBrowserLoginContext = (): LoginRequestContext => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {};
  }

  const language = navigator.language || navigator.languages?.[0] || null;
  const countryCode = resolveCountryCodeFromLanguage(language);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;

  return {
    language,
    countryCode,
    timezone,
  };
};

export const buildLoginRequestHeaders = (context: LoginRequestContext): HeadersInit => {
  const headers: Record<string, string> = {};

  if (context.language) {
    headers['Accept-Language'] = context.language;
  }
  if (context.countryCode) {
    headers['X-Country-Code'] = context.countryCode;
  }
  if (context.region) {
    headers['X-Region'] = context.region;
  }
  if (context.city) {
    headers['X-City'] = context.city;
  }
  if (context.timezone) {
    headers['X-Timezone'] = context.timezone;
  }

  return headers;
};
