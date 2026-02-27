import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@public': './public',
    },
  },
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_IAVIDEO_API_URL?.trim() || process.env.IAVIDEO_API_URL?.trim();
    if (!apiBaseUrl) {
      return [];
    }

    const normalizedBase = apiBaseUrl.replace(/\/+$/, '');

    return [
      {
        source: '/storage/:path*',
        destination: `${normalizedBase}/storage/:path*`,
      },
    ];
  },
  images: {
    unoptimized: true,
    qualities: [25, 50, 75, 100],
  },
};

const hasSentryBuildCredentials = Boolean(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT);

const sentryWrappedConfig = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  automaticVercelMonitors: true,
  disableLogger: true,
});

export default hasSentryBuildCredentials ? sentryWrappedConfig : nextConfig;
