import * as Sentry from '@sentry/nextjs';
import { isSentryEnabled, sentryDsn, sentryEnvironment, sentryTracesSampleRate } from '@/lib/monitoring/sentry-config';

if (isSentryEnabled) {
  Sentry.init({
    dsn: sentryDsn,
    environment: sentryEnvironment,
    tracesSampleRate: sentryTracesSampleRate,
    enableLogs: process.env.NODE_ENV !== 'production',
    sendDefaultPii: false,
  });
}
