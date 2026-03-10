import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { enquiryNotificationHtml } from '@/lib/emails/enquiryNotification';
import { enquiryConfirmationHtml } from '@/lib/emails/enquiryConfirmation';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      eventType,
      guestCount,
      eventDate,
      message,
    } = body;

    if (!name || !email || !phone || !eventType || !eventDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ownerEmails = [
      process.env.OWNER_EMAIL_1,
      process.env.OWNER_EMAIL_2,
      process.env.OWNER_EMAIL_3,
    ].filter(Boolean);

    if (ownerEmails.length === 0) {
      console.error('No owner emails configured');
      return NextResponse.json(
        { error: 'Email not configured' },
        { status: 500 }
      );
    }

    await Promise.all([
      resend.emails.send({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: ownerEmails,
        subject: `New Enquiry: ${eventType} — ${name}`,
        html: enquiryNotificationHtml({
          name,
          email,
          phone,
          eventType,
          guestCount,
          eventDate,
          message,
        }),
      }),
      resend.emails.send({
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: [email],
        replyTo: ownerEmails[0],
        subject:
          "We've received your enquiry — Basti Ram Palace",
        html: enquiryConfirmationHtml({
          name,
          eventType,
          eventDate,
        }),
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Enquiry API error:', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
