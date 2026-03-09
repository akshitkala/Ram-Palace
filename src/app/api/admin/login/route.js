import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (password === process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true, token: process.env.ADMIN_PASSWORD });
    } else {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
