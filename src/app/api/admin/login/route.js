import { NextResponse } from 'next/server';

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
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (isLoginRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again after 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (_error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
