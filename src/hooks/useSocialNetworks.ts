'use client';

import { resolveApiErrorMessage } from '@/lib/api/client';
import { SocialNetworkItem, socialApi } from '@/lib/api/public-content';
import { useCallback, useEffect, useState } from 'react';
import { useApiRequestLocale } from './useApiRequestLocale';

export const useSocialNetworks = () => {
  const { acceptLanguage, token } = useApiRequestLocale();
  const [data, setData] = useState<SocialNetworkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await socialApi.list(acceptLanguage, token);
      setData(response);
    } catch (cause) {
      setError(resolveApiErrorMessage(cause, 'Unable to load social networks.'));
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
