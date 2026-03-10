export function enquiryConfirmationHtml({
  name,
  eventType,
  eventDate,
}) {
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

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
  <tr><td style="background:#1C1C1E;padding:40px;
    text-align:center;">
    <p style="margin:0 0 10px;color:#C9A84C;font-size:10px;
      letter-spacing:4px;text-transform:uppercase;
      font-weight:600;">Basti Ram Palace</p>
    <h1 style="margin:0;color:#fff;font-family:Georgia,serif;
      font-size:30px;font-weight:400;">
      Thank You, ${name}</h1>
    <p style="margin:10px 0 0;color:#C9A84C;
      font-family:Georgia,serif;font-style:italic;
      font-size:15px;">Your enquiry has been received.</p>
  </td></tr>

  <!-- Gold line -->
  <tr><td style="background:#C9A84C;height:2px;
    font-size:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr><td style="padding:40px;">
    <p style="margin:0 0 16px;color:#1C1C1E;font-size:15px;
      line-height:1.8;">Dear ${name},</p>
    <p style="margin:0 0 16px;color:#6B5E4E;font-size:14px;
      line-height:1.8;">
      Thank you for reaching out to Basti Ram Palace.
      We have received your enquiry for a
      <strong style="color:#1C1C1E;">${eventType}</strong>
      ${
        formattedDate
          ? `on <strong style="color:#1C1C1E;">
           ${formattedDate}</strong>`
          : ''
      }.
    </p>
    <p style="margin:0 0 28px;color:#6B5E4E;font-size:14px;
      line-height:1.8;">
      Our team will get back to you within
      <strong style="color:#1C1C1E;">24 hours</strong>.
    </p>

    <!-- What happens next -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:#FAF7F2;border:1px solid #E8E0D0;
      margin-bottom:28px;">
    <tr><td style="padding:24px 28px;">
      <p style="margin:0 0 14px;color:#C9A84C;font-size:9px;
        letter-spacing:3px;text-transform:uppercase;
        font-weight:700;">What Happens Next</p>
      ${[
        ['01', 'Our team reviews your enquiry'],
        ['02', 'We call you within 24 hours'],
        ['03', 'Site visit & venue walkthrough'],
        ['04', 'Custom proposal sent to you'],
      ]
        .map(
          ([n, t]) => `
      <p style="margin:0 0 10px;color:#6B5E4E;font-size:13px;
        line-height:1.6;">
        <span style="color:#C9A84C;font-weight:700;
          margin-right:8px;">${n}</span>${t}
      </p>`
        )
        .join('')}
    </td></tr></table>

    <!-- Contact -->
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #E8E0D0;">
    <tr><td style="padding:22px 28px;text-align:center;">
      <p style="margin:0 0 10px;color:#A99686;font-size:10px;
        letter-spacing:3px;text-transform:uppercase;">
        Reach Us Directly</p>
      <p style="margin:0 0 4px;color:#1C1C1E;font-size:15px;
        font-weight:600;">+91-8800190003</p>
      <p style="margin:0 0 6px;color:#6B5E4E;font-size:13px;">
        +91-9650211469 · +91-9810679550</p>
      <p style="margin:6px 0 0;color:#C9A84C;font-size:13px;">
        info@bastirampalace.com</p>
    </td></tr></table>

  </td></tr>

  <!-- Quote -->
  <tr><td style="padding:0 40px 32px;text-align:center;">
    <p style="margin:0;color:#A99686;font-size:13px;
      font-family:Georgia,serif;font-style:italic;">
      "Where Every Occasion Becomes a Memory"</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1C1C1E;padding:18px 40px;
    text-align:center;">
    <p style="margin:0;color:#5C4E3A;font-size:10px;
      letter-spacing:2px;text-transform:uppercase;">
      Civil Lines, Basti, Uttar Pradesh — 272001</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

