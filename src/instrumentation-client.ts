import * as Sentry from '@sentry/nextjs';
import {
  isSentryEnabled,
  sentryDsn,
  sentryEnvironment,
  sentryReplayOnErrorSampleRate,
  sentryReplaySessionSampleRate,
  sentryTracesSampleRate,
} from '@/lib/monitoring/sentry-config';

if (isSentryEnabled) {
  Sentry.init({
    dsn: sentryDsn,
    environment: sentryEnvironment,

    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: sentryTracesSampleRate,
    enableLogs: process.env.NODE_ENV !== 'production',
    replaysSessionSampleRate: sentryReplaySessionSampleRate,
    replaysOnErrorSampleRate: sentryReplayOnErrorSampleRate,
    sendDefaultPii: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
