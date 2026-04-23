import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// Simple in-memory rate limiting (Note: resets on serverless restart)
const logLimitMap = new Map();

function isLoginRateLimited(ip) {
  const now = Date.now();
  const limit = 5; // 5 attempts
  const windowMs = 15 * 60 * 1000; // 15 mins

  if (!logLimitMap.has(ip)) {
    logLimitMap.set(ip, [now]);
    return false;
  }

  const timestamps = logLimitMap.get(ip).filter(t => now - t < windowMs);
  if (timestamps.length >= limit) {
    return true;
  }

  timestamps.push(now);
  logLimitMap.set(ip, timestamps);
  return false;
}

export async function POST(request) {
  const ip =
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'

  if (isLoginRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again after 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await request.json()

    const validUser = username === process.env.ADMIN_USERNAME
    const validPass = password === process.env.ADMIN_PASSWORD

    if (!validUser || !validPass) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(SECRET)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })
    // Remove the old insecure cookie if it exists
    response.cookies.delete('admin_session')
    return response
  } catch (_error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
