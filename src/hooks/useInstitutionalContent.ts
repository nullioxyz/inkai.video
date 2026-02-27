'use client';

import { ApiError, resolveApiErrorMessage } from '@/lib/api/client';
import { InstitutionalContent, institutionalApi } from '@/lib/api/public-content';
import { useCallback, useEffect, useState } from 'react';
import { useApiRequestLocale } from './useApiRequestLocale';

export const useInstitutionalContent = (slug: string) => {
  const { acceptLanguage, token } = useApiRequestLocale();
  const [data, setData] = useState<InstitutionalContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const response = await institutionalApi.show(slug, acceptLanguage, token);
      setData(response);
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 404) {
        setIsNotFound(true);
        setData(null);
      } else {
        setError(resolveApiErrorMessage(cause, 'Unable to load institutional content.'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [acceptLanguage, slug, token]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isNotFound,
    error,
    refetch: fetchData,
  };
};
