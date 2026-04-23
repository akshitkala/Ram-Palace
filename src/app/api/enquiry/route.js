import { Resend } from "resend";
import { NextResponse } from "next/server";
import { enquiryNotificationHtml } from "@/lib/emails/enquiryNotification";
import { enquiryConfirmationHtml } from "@/lib/emails/enquiryConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (Note: limited in serverless/lambdas)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const limit = 3; // 3 requests
  const windowMs = 10 * 60 * 1000; // 10 minutes

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return false;
  }

  const timestamps = rateLimitMap.get(ip).filter(t => now - t < windowMs);
  if (timestamps.length >= limit) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

// Collect all owner emails, filter empty strings
const OWNER_EMAILS = [
  process.env.OWNER_EMAIL_1,
  process.env.OWNER_EMAIL_2,
  process.env.OWNER_EMAIL_3,
].filter(Boolean);

export async function POST(req) {
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again after 10 minutes." },
      { status: 429 }
    );
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      message,
      eventType,
      guestCount,
      eventDate
    } = await req.json();

    const missing = []
    if (!name?.trim()) missing.push('name')
    if (!phone?.trim()) missing.push('phone')
    if (!eventType?.trim()) missing.push('eventType')

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email address." },
          { status: 400 }
        );
      }
    }

    // Improved phone validation to handle country code 91
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 10-digit Indian phone number.' },
        { status: 400 }
      )
    }

    // ── 1. Email to venue owners ──
    const ownerEmailResult = await resend.emails.send({
      from:    `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to:      OWNER_EMAILS,
      subject: `New Enquiry from ${name} — ${eventType || 'Event'}`,
      html: enquiryNotificationHtml({
        name,
        email: email || 'Not provided',
        phone,
        message,
        eventType: eventType || 'Not specified',
        guestCount,
        eventDate
      }),
    });

    if (ownerEmailResult.error) {
      console.error('[Enquiry] Resend owner notification failed:', ownerEmailResult.error)
      return NextResponse.json(
        { success: false, message: 'Failed to send enquiry. Please try again or call us directly.' },
        { status: 500 }
      )
    }

    // ── 2. Confirmation email to the user (Skip if no email provided) ──
    if (email && email.trim()) {
      const userEmailResult = await resend.emails.send({
        from:    `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to:      [email],
        subject: `We've received your enquiry — Basti Ram Palace`,
        html: enquiryConfirmationHtml({
          name,
          eventType: eventType || 'Event',
          eventDate
        }),
      });

      if (userEmailResult.error) {
        console.warn('[Enquiry] Resend user confirmation failed:', userEmailResult.error)
      }
    }

    return NextResponse.json(
      { success: true, id: ownerEmailResult.data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error("[Enquiry API] Error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry." },
      { status: 500 }
    );
  }
}
