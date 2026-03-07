import { ApiError, isAuthApiError } from '@/lib/api/client';

interface ShouldRedirectToLoginArgs {
  isHydrated: boolean;
  token: string | null;
  sessionExpired: boolean;
}

export const shouldRedirectToLogin = ({ isHydrated, token, sessionExpired }: ShouldRedirectToLoginArgs): boolean => {
  return isHydrated && !token && !sessionExpired;
};

export const isSessionExpiredError = (error: unknown): boolean => {
  if (isAuthApiError(error)) {
    return true;
  }

  if (error instanceof ApiError) {
    if (error.status === 419) {
      return true;
    }

    const message = `${error.message}`.toLowerCase();
    if (
      message.includes('unauthorized') ||
      message.includes('unauthenticated') ||
      message.includes('token expired') ||
      message.includes('session expired')
    ) {
      return true;
    }

    if (error.payload && typeof error.payload === 'object' && 'message' in error.payload) {
      const payloadMessage = `${(error.payload as { message?: unknown }).message ?? ''}`.toLowerCase();
      if (
        payloadMessage.includes('unauthorized') ||
        payloadMessage.includes('unauthenticated') ||
        payloadMessage.includes('token expired') ||
        payloadMessage.includes('session expired')
      ) {
        return true;
      }
    }
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('unauthorized') ||
      message.includes('unauthenticated') ||
      message.includes('token expired') ||
      message.includes('session expired')
    );
  }

  return false;
};
