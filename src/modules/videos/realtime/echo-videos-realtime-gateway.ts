import { BackendJobResponse } from '@/lib/api/dashboard';
import { DailyGenerationQuota, RealtimeUnsubscribe, VideosRealtimeGateway } from '../domain/contracts';

type EchoLike = {
  private: (channel: string) => {
    listen: (event: string, callback: (payload: unknown) => void) => unknown;
    stopListening: (event: string) => unknown;
  };
  leave: (channel: string) => unknown;
  disconnect: () => unknown;
};

interface JobUpdatedPayload {
  job?: BackendJobResponse;
}

interface GenerationLimitAlertPayload {
  quota?: DailyGenerationQuota;
}

const buildAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});

export const createEchoVideosRealtimeGateway = (): VideosRealtimeGateway => {
  return {
    subscribeToUserJobs: async ({ token, userId, onJobUpdated, onGenerationLimitAlert, onError }) => {
      const socketHost = process.env.NEXT_PUBLIC_IAVIDEO_WS_HOST ?? '127.0.0.1';
      const socketPort = process.env.NEXT_PUBLIC_IAVIDEO_WS_PORT ?? '6001';
      const socketScheme = process.env.NEXT_PUBLIC_IAVIDEO_WS_SCHEME ?? 'http';
      const socketEnabled = (process.env.NEXT_PUBLIC_IAVIDEO_WS_ENABLED ?? 'true') === 'true';
      const apiBaseUrl = process.env.NEXT_PUBLIC_IAVIDEO_API_URL ?? 'http://127.0.0.1:8000';

      if (!socketEnabled) {
        return () => {};
      }

      try {
        const [{ default: Echo }, { io }] = await Promise.all([import('laravel-echo'), import('socket.io-client')]);

        const echo = new Echo({
          broadcaster: 'socket.io',
          client: io(`${socketScheme}://${socketHost}:${socketPort}`, {
            transports: ['websocket'],
          }),
          authEndpoint: `${apiBaseUrl}/api/broadcasting/auth`,
          auth: {
            headers: buildAuthHeaders(token),
          },
        }) as unknown as EchoLike;

        const channelName = `user.${userId}`;
        const eventNames = ['.user-job-updated-broadcast', 'user-job-updated-broadcast'];
        const quotaEventNames = ['.user-generation-limit-alert-broadcast', 'user-generation-limit-alert-broadcast'];
        const onPayload = (payload: unknown) => {
          const typed = payload as JobUpdatedPayload;
          if (typed?.job) {
            onJobUpdated(typed.job);
          }
        };
        const onQuotaPayload = (payload: unknown) => {
          const typed = payload as GenerationLimitAlertPayload;
          if (typed?.quota && onGenerationLimitAlert) {
            onGenerationLimitAlert(typed.quota);
          }
        };

        eventNames.forEach((eventName) => {
          echo.private(channelName).listen(eventName, onPayload);
        });
        quotaEventNames.forEach((eventName) => {
          echo.private(channelName).listen(eventName, onQuotaPayload);
        });

        const unsubscribe: RealtimeUnsubscribe = () => {
          eventNames.forEach((eventName) => {
            echo.private(channelName).stopListening(eventName);
          });
          quotaEventNames.forEach((eventName) => {
            echo.private(channelName).stopListening(eventName);
          });
          echo.leave(channelName);
          echo.disconnect();
        };

        return unsubscribe;
      } catch (error) {
        onError?.(error);
        return () => {};
      }
    },
  };
};
