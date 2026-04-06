import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /brp-portal-login routes
  if (!pathname.startsWith('/brp-portal-login')) {
    return NextResponse.next();
  }

  // Allow login page and login API through
  if (
    pathname === '/brp-portal-login/login' ||
    pathname === '/api/admin/login'
  ) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get('admin_session');
  if (session?.value !== 'authenticated') {
    return NextResponse.redirect(
      new URL('/brp-portal-login/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/brp-portal-login/:path*'],
};
