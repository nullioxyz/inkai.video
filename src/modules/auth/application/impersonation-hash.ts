const IMPERSONATION_HASH_PATTERN = /^[a-f0-9]{64}$/i;

export const normalizeImpersonationHash = (value?: string | null): string | null => {
  const normalized = value?.trim() ?? '';
  if (!normalized) {
    return null;
  }

  return IMPERSONATION_HASH_PATTERN.test(normalized) ? normalized : null;
};
