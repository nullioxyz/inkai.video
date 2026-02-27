'use client';

import { InstitutionalContent, institutionalApi } from '@/lib/api/public-content';
import { resolveApiErrorMessage } from '@/lib/api/client';
import { useCallback, useEffect, useState } from 'react';
import { useApiRequestLocale } from './useApiRequestLocale';

export const useInstitutionalList = () => {
  const { acceptLanguage, token } = useApiRequestLocale();
  const [data, setData] = useState<InstitutionalContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await institutionalApi.list(acceptLanguage, token);
      setData(response);
    } catch (cause) {
      setError(resolveApiErrorMessage(cause, 'Unable to load institutional content.'));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [acceptLanguage, token]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
