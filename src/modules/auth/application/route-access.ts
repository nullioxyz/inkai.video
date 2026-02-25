export interface RouteAccessInput {
  pathname: string;
  hasToken: boolean;
}

export interface RouteAccessResult {
  redirectTo: '/login' | '/dashboard' | null;
  noIndex: boolean;
}

const isInternalPath = (pathname: string): boolean => {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/first-login');
};

const isAuthEntryPath = (pathname: string): boolean => {
  return pathname === '/login' || pathname.startsWith('/auth/');
};

export const resolveRouteAccess = ({ pathname, hasToken }: RouteAccessInput): RouteAccessResult => {
  if (isAuthEntryPath(pathname) && hasToken) {
    return {
      redirectTo: '/dashboard',
      noIndex: true,
    };
  }

  if (isInternalPath(pathname) && !hasToken) {
    return {
      redirectTo: '/login',
      noIndex: true,
    };
  }

  return {
    redirectTo: null,
    noIndex: isInternalPath(pathname) || isAuthEntryPath(pathname),
  };
};
