export interface QuotaPollingFallbackParams {
  token: string | null;
  realtimeConnected: boolean;
  selectedVideoId: string | null;
}

export const shouldPollQuotaFallback = ({ token, realtimeConnected, selectedVideoId }: QuotaPollingFallbackParams): boolean => {
  if (!token) {
    return false;
  }

  if (realtimeConnected) {
    return false;
  }

  // Poll only while user is in generation/create surface.
  return selectedVideoId === null;
};
