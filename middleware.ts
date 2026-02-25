import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_KEY } from './src/lib/auth-constants';
import { resolveRouteAccess } from './src/modules/auth/application/route-access';

const applyNoIndex = (response: NextResponse) => {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const access = resolveRouteAccess({
    pathname: request.nextUrl.pathname,
    hasToken: Boolean(token),
  });

  if (access.redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = access.redirectTo;
    url.search = '';
    return applyNoIndex(NextResponse.redirect(url));
  }

  const response = NextResponse.next();
  return access.noIndex ? applyNoIndex(response) : response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/first-login/:path*', '/login', '/auth/:path*'],
};
