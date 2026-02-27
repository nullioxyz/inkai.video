'use client';

import { ApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { ContactCreatePayload, contactsApi } from '@/lib/api/public-content';
import { useCallback, useState } from 'react';
import { useApiRequestLocale } from './useApiRequestLocale';

type ContactField = keyof ContactCreatePayload;

type ContactFieldErrors = Partial<Record<ContactField, string[]>>;

const isValidationPayload = (payload: unknown): payload is { errors?: Record<string, string[] | string> } => {
  return Boolean(payload && typeof payload === 'object');
};

const normalizeFieldErrors = (payload: unknown): ContactFieldErrors => {
  if (!isValidationPayload(payload) || !payload.errors || typeof payload.errors !== 'object') {
    return {};
  }

  const next: ContactFieldErrors = {};

  const supportedFields: ContactField[] = ['name', 'email', 'phone', 'message'];

  for (const field of supportedFields) {
    const entry = payload.errors[field];
    if (Array.isArray(entry)) {
      next[field] = entry.filter((item): item is string => typeof item === 'string');
    } else if (typeof entry === 'string') {
      next[field] = [entry];
    }
  }

  return next;
};

export const useCreateContact = () => {
  const { acceptLanguage, token } = useApiRequestLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const submit = useCallback(
    async (payload: ContactCreatePayload) => {
      setIsSubmitting(true);
      setError(null);
      setFieldErrors({});
      setSuccessId(null);

      try {
        const result = await contactsApi.create(payload, acceptLanguage, token);
        setSuccessId(result.id);

        return { ok: true as const, id: result.id };
      } catch (cause) {
        if (cause instanceof ApiError && cause.status === 422) {
          const parsedFieldErrors = normalizeFieldErrors(cause.payload);
          setFieldErrors(parsedFieldErrors);
          setError(resolveApiErrorMessage(cause, 'Please review the highlighted fields.'));
        } else {
          setError(resolveApiErrorMessage(cause, 'Unable to send message right now.'));
        }

        return { ok: false as const };
      } finally {
        setIsSubmitting(false);
      }
    },
    [acceptLanguage, token],
  );

  return {
    submit,
    isSubmitting,
    successId,
    error,
    fieldErrors,
  };
};
