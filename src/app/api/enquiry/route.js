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
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
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

    // ── Basic validation ──
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── 1. Email to venue owners ──
    await resend.emails.send({
      from:    `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to:      OWNER_EMAILS,
      subject: `New Enquiry from ${name} — ${eventType || 'Event'}`,
      html: enquiryNotificationHtml({
        name,
        email,
        phone,
        message,
        eventType: eventType || 'Not specified',
        guestCount,
        eventDate
      }),
    });

    // ── 2. Confirmation email to the user ──
    await resend.emails.send({
      from:    `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to:      [email],
      subject: `We've received your enquiry — Basti Ram Palace`,
      html: enquiryConfirmationHtml({
        name,
        eventType: eventType || 'Event',
        eventDate
      }),
    });

    return NextResponse.json(
      { success: true },
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
