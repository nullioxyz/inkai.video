interface ResolveMediaUrlOptions {
  allowRelative?: boolean;
  legacyBaseUrl?: string | null;
}

const HTTP_URL_PATTERN = /^https?:\/\//i;
const PROTOCOL_RELATIVE_PATTERN = /^\/\//;
const HOST_WITHOUT_SCHEME_PATTERN = /^((localhost|(\d{1,3}\.){3}\d{1,3}|[a-z0-9-]+(\.[a-z0-9-]+)+)(:\d+)?)(\/.*)?$/i;

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1']);

const resolveLegacyBaseUrl = (legacyBaseUrl?: string | null) => {
  if (legacyBaseUrl && legacyBaseUrl.trim() !== '') {
    return legacyBaseUrl.trim();
  }

  if (process.env.NEXT_PUBLIC_FRONTEND_URL && process.env.NEXT_PUBLIC_FRONTEND_URL.trim() !== '') {
    return process.env.NEXT_PUBLIC_FRONTEND_URL.trim();
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return null;
};

const ensureAbsoluteRelativePath = (value: string) => {
  if (value.startsWith('/')) {
    return value;
  }

  return `/${value}`;
};

const toPathWithQueryAndHash = (parsed: URL) => `${parsed.pathname}${parsed.search}${parsed.hash}`;

const shouldUseRelativeStorageUrl = (parsed: URL) => {
  if (!parsed.pathname.startsWith('/storage/')) {
    return false;
  }

  if (LOCAL_HOSTNAMES.has(parsed.hostname.toLowerCase())) {
    return true;
  }

  const configuredFrontend = process.env.NEXT_PUBLIC_FRONTEND_URL?.trim();
  if (!configuredFrontend) {
    return false;
  }

  try {
    const frontend = new URL(configuredFrontend);
    if (frontend.origin !== parsed.origin) {
      return false;
    }

    if (typeof window !== 'undefined' && window.location.origin !== parsed.origin) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
};

export const resolveMediaUrl = (value?: string | null, options: ResolveMediaUrlOptions = {}): string | null => {
  if (!value || value.trim() === '') {
    return null;
  }

  const normalized = value.trim();

  if (HTTP_URL_PATTERN.test(normalized)) {
    try {
      const parsed = new URL(normalized);
      if (shouldUseRelativeStorageUrl(parsed)) {
        return toPathWithQueryAndHash(parsed);
      }

      return normalized;
    } catch {
      return normalized;
    }
  }

  if (PROTOCOL_RELATIVE_PATTERN.test(normalized)) {
    return `https:${normalized}`;
  }

  if (HOST_WITHOUT_SCHEME_PATTERN.test(normalized)) {
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
    return `${protocol}//${normalized}`;
  }

  if (!options.allowRelative) {
    return null;
  }

  const baseUrl = resolveLegacyBaseUrl(options.legacyBaseUrl);
  if (!baseUrl) {
    return ensureAbsoluteRelativePath(normalized);
  }

  try {
    return new URL(normalized, baseUrl).toString();
  } catch {
    return null;
  }
};
