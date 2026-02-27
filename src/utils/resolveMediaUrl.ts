interface ResolveMediaUrlOptions {
  enableLegacyRelativeFallback?: boolean;
  legacyBaseUrl?: string | null;
}

const resolveLegacyBaseUrl = (legacyBaseUrl?: string | null) => {
  if (legacyBaseUrl && legacyBaseUrl.trim() !== '') {
    return legacyBaseUrl.trim();
  }

  if (process.env.NEXT_PUBLIC_FRONTEND_URL && process.env.NEXT_PUBLIC_FRONTEND_URL.trim() !== '') {
    return process.env.NEXT_PUBLIC_FRONTEND_URL.trim();
  }

  return false;
};

export const resolveMediaUrl = (value?: string | null, options: ResolveMediaUrlOptions = {}): string | null => {
  if (!value || value.trim() === '') {
    return null;
  }

  const normalized = value.trim();

  if (!options.enableLegacyRelativeFallback) {
    return normalized;
  }

  const baseUrl = resolveLegacyBaseUrl(options.legacyBaseUrl);
  if (!baseUrl) {
    return normalized;
  }

  try {
    return new URL(normalized, baseUrl).toString();
  } catch {
    return normalized;
  }
};
