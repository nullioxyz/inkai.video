'use client';

import { ApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { useDashboard } from '@/context/dashboard-context';
import { useCallback, useState } from 'react';

export type PreferencesField = 'language_id' | 'theme_preference';
export type FieldErrors = Partial<Record<PreferencesField, string[]>>;

export interface UpdatePreferencesPayload {
  languageId?: number | null;
  themePreference?: 'light' | 'dark' | 'system' | null;
}

const isValidationPayload = (payload: unknown): payload is { errors?: Record<string, string[] | string> } => {
  return Boolean(payload && typeof payload === 'object');
};

export const parsePreferenceFieldErrors = (payload: unknown): FieldErrors => {
  if (!isValidationPayload(payload) || !payload.errors || typeof payload.errors !== 'object') {
    return {};
  }

  const next: FieldErrors = {};
  const supportedFields: PreferencesField[] = ['language_id', 'theme_preference'];

  for (const field of supportedFields) {
    const value = payload.errors[field];
    if (Array.isArray(value)) {
      next[field] = value.filter((item): item is string => typeof item === 'string');
    } else if (typeof value === 'string') {
      next[field] = [value];
    }
  }

  return next;
};

export const submitPreferencesRequest = async (
  updater: (payload: UpdatePreferencesPayload) => Promise<void>,
  payload: UpdatePreferencesPayload,
) => {
  try {
    await updater(payload);
    return {
      ok: true as const,
      error: null,
      fieldErrors: {} as FieldErrors,
    };
  } catch (cause) {
    const fieldErrors = cause instanceof ApiError && cause.status === 422 ? parsePreferenceFieldErrors(cause.payload) : {};
    return {
      ok: false as const,
      error: resolveApiErrorMessage(cause, ''),
      fieldErrors,
    };
  }
};

export const useUpdatePreferences = () => {
  const { updatePreferences } = useDashboard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const submit = useCallback(
    async (payload: UpdatePreferencesPayload) => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      setFieldErrors({});

      const result = await submitPreferencesRequest(updatePreferences, payload);
      if (result.ok) {
        setSuccess(true);
        setIsSubmitting(false);
        return { ok: true as const };
      }

      setFieldErrors(result.fieldErrors);
      setError(result.error);
      setIsSubmitting(false);
      return { ok: false as const };
    },
    [updatePreferences],
  );

  return {
    submit,
    isSubmitting,
    error,
    success,
    fieldErrors,
  };
};
