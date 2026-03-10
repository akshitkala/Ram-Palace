export function enquiryNotificationHtml({
  name,
  email,
  phone,
  eventType,
  guestCount,
  eventDate,
  message,
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAF7F2;
  font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#FAF7F2;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0"
  style="background:#fff;border:1px solid #E8E0D0;
  max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:#1C1C1E;padding:32px 40px;
    text-align:center;">
    <p style="margin:0 0 8px;color:#C9A84C;font-size:10px;
      letter-spacing:4px;text-transform:uppercase;
      font-weight:600;">Basti Ram Palace</p>
    <h1 style="margin:0;color:#fff;font-family:Georgia,serif;
      font-size:26px;font-weight:400;">
      New Enquiry Received</h1>
  </td></tr>

  <!-- Alert strip -->
  <tr><td style="background:#C9A84C;padding:10px 40px;
    text-align:center;">
    <p style="margin:0;color:#1C1C1E;font-size:11px;
      letter-spacing:2px;text-transform:uppercase;
      font-weight:700;">Action Required — Reply Within 24 Hours
    </p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;color:#6B5E4E;font-size:14px;
      line-height:1.7;">
      A new event enquiry was submitted via the website.
    </p>

    <!-- Details -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #E8E0D0;">
      ${[
        ['Full Name', name],
        [
          'Email',
          `<a href="mailto:${email}" 
          style="color:#C9A84C;">${email}</a>`,
        ],
        [
          'Phone',
          `<a href="tel:${phone}" 
          style="color:#C9A84C;">${phone}</a>`,
        ],
        ['Event Type', eventType],
        ['Guest Count', guestCount || 'Not specified'],
        [
          'Event Date',
          eventDate
            ? new Date(eventDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Not specified',
        ],
      ]
        .map(
          ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? '#FAF7F2' : '#fff'}">
        <td style="padding:12px 20px;
          border-bottom:1px solid #E8E0D0;
          color:#A99686;font-size:10px;letter-spacing:2px;
          text-transform:uppercase;font-weight:600;width:35%;">
          ${label}</td>
        <td style="padding:12px 20px;
          border-bottom:1px solid #E8E0D0;
          color:#1C1C1E;font-size:14px;">${value}</td>
      </tr>`
        )
        .join('')}
      <!-- Message -->
      <tr style="background:#FAF7F2;">
        <td style="padding:12px 20px;color:#A99686;
          font-size:10px;letter-spacing:2px;
          text-transform:uppercase;font-weight:600;
          vertical-align:top;width:35%;">Message</td>
        <td style="padding:12px 20px;color:#1C1C1E;
          font-size:14px;line-height:1.7;">
          ${message || 'No additional message.'}</td>
      </tr>
    </table>

    <!-- Reply CTA -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="margin-top:28px;">
    <tr><td align="center">
      <a href="mailto:${email}?subject=Re: Your Enquiry — Basti Ram Palace"
        style="display:inline-block;background:#C9A84C;
        color:#1C1C1E;font-size:11px;font-weight:700;
        letter-spacing:2px;text-transform:uppercase;
        padding:14px 32px;text-decoration:none;">
        Reply to ${name}
      </a>
    </td></tr></table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1C1C1E;padding:18px 40px;
    text-align:center;">
    <p style="margin:0;color:#5C4E3A;font-size:10px;
      letter-spacing:2px;text-transform:uppercase;">
      Basti Ram Palace · Civil Lines, Basti, UP — 272001
    </p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}
