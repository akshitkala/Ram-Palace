import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const isAdminRoute =
    pathname.startsWith('/brp-portal-login') &&
    !pathname.startsWith('/brp-portal-login/login')

  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/brp-portal-login/login', request.url))
    }
    try {
      await jwtVerify(token, SECRET)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/brp-portal-login/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/brp-portal-login/:path*'],
}
