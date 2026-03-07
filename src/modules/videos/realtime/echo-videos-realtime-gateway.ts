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

interface SessionLoggedOutPayload {
  reason?: string;
  logged_out_at?: string;
  type?: string;
}

const buildAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});

const normalizeWsAuthEndpoint = (apiBaseUrl: string, endpoint?: string): string => {
  const fallback = '/api/broadcasting/auth';
  const raw = endpoint?.trim() || fallback;

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw;
  }

  const normalizedBase = apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
  return `${normalizedBase}${normalizedPath}`;
};

export const createEchoVideosRealtimeGateway = (): VideosRealtimeGateway => {
  return {
    subscribeToUserJobs: async ({ token, userId, onJobUpdated, onGenerationLimitAlert, onSessionLoggedOut, onError }) => {
      const socketHost = process.env.NEXT_PUBLIC_IAVIDEO_WS_HOST ?? '127.0.0.1';
      const socketPort = process.env.NEXT_PUBLIC_IAVIDEO_WS_PORT ?? '6001';
      const socketScheme = process.env.NEXT_PUBLIC_IAVIDEO_WS_SCHEME ?? 'http';
      const socketEnabled = (process.env.NEXT_PUBLIC_IAVIDEO_WS_ENABLED ?? 'true') === 'true';
      const apiBaseUrl = process.env.NEXT_PUBLIC_IAVIDEO_API_URL ?? 'http://127.0.0.1:8000';
      const socketAuthEndpoint = normalizeWsAuthEndpoint(apiBaseUrl, process.env.NEXT_PUBLIC_IAVIDEO_WS_AUTH_ENDPOINT);
      const socketDebugEnabled = (process.env.NEXT_PUBLIC_IAVIDEO_WS_DEBUG ?? 'false') === 'true';

      if (!socketEnabled) {
        return () => {};
      }

      try {
        const [{ default: Echo }, { io }] = await Promise.all([import('laravel-echo'), import('socket.io-client')]);

        const echo = new Echo({
          broadcaster: 'socket.io',
          client: io(`${socketScheme}://${socketHost}:${socketPort}`, {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
          }),
          authEndpoint: socketAuthEndpoint,
          auth: {
            headers: buildAuthHeaders(token),
          },
        }) as unknown as EchoLike;

        const echoSocket = (echo as unknown as { connector?: { socket?: { on: (eventName: string, callback: (...args: unknown[]) => void) => void } } })
          .connector?.socket;
        echoSocket?.on?.('connect_error', (error: unknown) => {
          if (socketDebugEnabled) {
            // eslint-disable-next-line no-console
            console.error('Echo connect_error', error);
          }
          onError?.(error);
        });
        echoSocket?.on?.('error', (error: unknown) => {
          if (socketDebugEnabled) {
            // eslint-disable-next-line no-console
            console.error('Echo error', error);
          }
          onError?.(error);
        });

        const channelName = `user.${userId}`;
        const eventNames = ['.user-job-updated-broadcast', 'user-job-updated-broadcast'];
        const quotaEventNames = ['.user-generation-limit-alert-broadcast', 'user-generation-limit-alert-broadcast'];
        const sessionLoggedOutEventNames = ['.session-logged-out', 'session-logged-out', '.user-session-logged-out-broadcast', 'user-session-logged-out-broadcast'];
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
        const onSessionLoggedOutPayload = (payload: unknown) => {
          const typed = payload as SessionLoggedOutPayload;
          onSessionLoggedOut?.(typed);
        };

        eventNames.forEach((eventName) => {
          echo.private(channelName).listen(eventName, onPayload);
        });
        quotaEventNames.forEach((eventName) => {
          echo.private(channelName).listen(eventName, onQuotaPayload);
        });
        sessionLoggedOutEventNames.forEach((eventName) => {
          echo.private(channelName).listen(eventName, onSessionLoggedOutPayload);
        });

        const unsubscribe: RealtimeUnsubscribe = () => {
          eventNames.forEach((eventName) => {
            echo.private(channelName).stopListening(eventName);
          });
          quotaEventNames.forEach((eventName) => {
            echo.private(channelName).stopListening(eventName);
          });
          sessionLoggedOutEventNames.forEach((eventName) => {
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
