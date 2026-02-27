'use client';

import { useDashboard } from '@/context/dashboard-context';

export const useJobsQuota = () => {
  const { quota, quotaError, refreshQuota, realtimeConnected } = useDashboard();

  return {
    quota,
    quotaError,
    realtimeConnected,
    nearLimit: Boolean(quota?.near_limit),
    limitReached: Boolean(quota?.limit_reached),
    refreshQuota,
  };
};
