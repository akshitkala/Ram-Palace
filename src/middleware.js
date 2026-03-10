import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow login page and login API through
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login'
  ) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get('admin_session');
  if (session?.value !== 'authenticated') {
    return NextResponse.redirect(
      new URL('/admin/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
