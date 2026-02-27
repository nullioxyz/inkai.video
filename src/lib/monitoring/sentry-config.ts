export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN || '';

const toNumber = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const isSentryEnabled = Boolean(sentryDsn);

export const sentryEnvironment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development';

export const sentryTracesSampleRate = toNumber(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE, 0.1);

export const sentryReplaySessionSampleRate = toNumber(process.env.NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE, 0.0);

export const sentryReplayOnErrorSampleRate = toNumber(process.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE, 1.0);
