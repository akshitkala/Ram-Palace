import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Collect all owner emails, filter empty strings
const OWNER_EMAILS = [
  process.env.OWNER_EMAIL_1,
  process.env.OWNER_EMAIL_2,
  process.env.OWNER_EMAIL_3,
].filter(Boolean);

export async function POST(req) {
  try {
    const { name, email, phone, message } =
      await req.json();

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
      subject: `New Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport"
            content="width=device-width" />
        </head>
        <body style="margin:0;padding:0;
          background:#FAF7F2;
          font-family:'Helvetica Neue',
          Arial,sans-serif;">

          <table width="100%" cellpadding="0"
            cellspacing="0"
            style="background:#FAF7F2;
            padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560"
                  cellpadding="0" cellspacing="0"
                  style="background:#ffffff;
                  border:1px solid #E8E0D0;">

                  <!-- Header -->
                  <tr>
                    <td style="background:#1C1C1E;
                      padding:32px 40px;
                      text-align:center;">
                      <p style="margin:0;
                        font-size:11px;
                        letter-spacing:4px;
                        text-transform:uppercase;
                        color:#C9A84C;
                        font-weight:400;">
                        Basti Ram Palace
                      </p>
                      <h1 style="margin:8px 0 0;
                        font-size:22px;
                        font-weight:300;
                        color:#FAF7F2;
                        letter-spacing:1px;">
                        New Enquiry Received
                      </h1>
                    </td>
                  </tr>

                  <!-- Gold hairline -->
                  <tr>
                    <td style="height:2px;
                      background:#C9A84C;" />
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">

                      <!-- Fields -->
                      <table width="100%"
                        cellpadding="0"
                        cellspacing="0">

                        <tr>
                          <td style="padding-bottom:20px;
                            border-bottom:1px solid #E8E0D0;">
                            <p style="margin:0 0 4px;
                              font-size:10px;
                              letter-spacing:2px;
                              text-transform:uppercase;
                              color:#A99686;">
                              Name
                            </p>
                            <p style="margin:0;
                              font-size:16px;
                              color:#1C1C1E;
                              font-weight:500;">
                              ${name}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:20px 0;
                            border-bottom:1px solid #E8E0D0;">
                            <p style="margin:0 0 4px;
                              font-size:10px;
                              letter-spacing:2px;
                              text-transform:uppercase;
                              color:#A99686;">
                              Phone
                            </p>
                            <a href="tel:${phone}"
                              style="margin:0;
                              font-size:16px;
                              color:#C9A84C;
                              text-decoration:none;
                              font-weight:500;">
                              ${phone}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:20px 0;
                            border-bottom:1px solid #E8E0D0;">
                            <p style="margin:0 0 4px;
                              font-size:10px;
                              letter-spacing:2px;
                              text-transform:uppercase;
                              color:#A99686;">
                              Email
                            </p>
                            <a href="mailto:${email}"
                              style="margin:0;
                              font-size:16px;
                              color:#C9A84C;
                              text-decoration:none;
                              font-weight:500;">
                              ${email}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:20px 0 0;">
                            <p style="margin:0 0 4px;
                              font-size:10px;
                              letter-spacing:2px;
                              text-transform:uppercase;
                              color:#A99686;">
                              Message
                            </p>
                            <p style="margin:0;
                              font-size:15px;
                              color:#1C1C1E;
                              line-height:1.6;">
                              ${message
                                ? message.replace(
                                    /\n/g, "<br/>"
                                  )
                                : "<em style='color:#A99686'>No message provided.</em>"
                              }
                            </p>
                          </td>
                        </tr>

                      </table>

                      <!-- Reply CTA -->
                      <table width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        style="margin-top:32px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}"
                              style="display:inline-block;
                              background:#C9A84C;
                              color:#1C1C1E;
                              font-size:11px;
                              letter-spacing:3px;
                              text-transform:uppercase;
                              text-decoration:none;
                              padding:14px 32px;
                              font-weight:600;">
                              Reply to ${name} →
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#F2EDE4;
                      padding:20px 40px;
                      text-align:center;
                      border-top:1px solid #E8E0D0;">
                      <p style="margin:0;
                        font-size:11px;
                        color:#A99686;
                        letter-spacing:1px;">
                        Basti Ram Palace ·
                        IMT Manesar, Gurugram
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // ── 2. Confirmation email to the user ──
    await resend.emails.send({
      from:    `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to:      [email],
      subject: `We've received your enquiry — Basti Ram Palace`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport"
            content="width=device-width" />
        </head>
        <body style="margin:0;padding:0;
          background:#FAF7F2;
          font-family:'Helvetica Neue',
          Arial,sans-serif;">

          <table width="100%" cellpadding="0"
            cellspacing="0"
            style="background:#FAF7F2;
            padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560"
                  cellpadding="0" cellspacing="0"
                  style="background:#ffffff;
                  border:1px solid #E8E0D0;">

                  <!-- Header -->
                  <tr>
                    <td style="background:#1C1C1E;
                      padding:32px 40px;
                      text-align:center;">
                      <p style="margin:0;
                        font-size:11px;
                        letter-spacing:4px;
                        text-transform:uppercase;
                        color:#C9A84C;">
                        Basti Ram Palace
                      </p>
                      <h1 style="margin:8px 0 0;
                        font-size:22px;
                        font-weight:300;
                        color:#FAF7F2;
                        letter-spacing:1px;">
                        Thank You, ${name}
                      </h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="height:2px;
                      background:#C9A84C;" />
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;
                      text-align:center;">
                      <p style="margin:0 0 16px;
                        font-size:15px;
                        color:#1C1C1E;
                        line-height:1.7;">
                        We've received your enquiry
                        and our team will get back
                        to you within
                        <strong>24 hours</strong>.
                      </p>
                      <p style="margin:0 0 32px;
                        font-size:14px;
                        color:#6B5E4E;
                        line-height:1.7;">
                        If you need to reach us
                        immediately, call us at
                        <a href="tel:+918800190003"
                          style="color:#C9A84C;
                          text-decoration:none;">
                          +91 88001 90003
                        </a>
                      </p>

                      <!-- Divider -->
                      <table width="100%"
                        cellpadding="0"
                        cellspacing="0">
                        <tr>
                          <td style="height:1px;
                            background:#E8E0D0;" />
                        </tr>
                      </table>

                      <p style="margin:24px 0 0;
                        font-size:12px;
                        color:#A99686;
                        letter-spacing:1px;">
                        Basti Ram Palace ·
                        IMT Manesar, Gurugram
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
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
