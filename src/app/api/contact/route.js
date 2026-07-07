import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Input sanitiser ──────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '').slice(0, 2000);
}

// Helper for CORS headers
function getCorsHeaders() {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: getCorsHeaders(),
  });
}

// ── POST /api/contact ─────────────────────────────────────
export async function POST(request) {
  const corsHeaders = getCorsHeaders();
  const sendResponse = (data, status) => {
    return NextResponse.json(data, { status, headers: corsHeaders });
  };

  try {
    const body = await request.json();

    const name     = sanitize(body.name);
    const email    = sanitize(body.email);
    const phone    = sanitize(body.phone    || '');
    const interest = sanitize(body.interest || body.subject || '');
    const message  = sanitize(body.message  || '');

    // ── Validation ──
    if (!name)
      return sendResponse({ error: 'Full name is required.' }, 400);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return sendResponse({ error: 'A valid email is required.' }, 400);
    if (!message)
      return sendResponse({ error: 'Message cannot be empty.' }, 400);

    // Phone — required, valid characters, 7–15 digits
    if (!phone)
      return sendResponse({ error: 'Phone number is required.' }, 400);
    if (!/^\+?[\d\s\-().]+$/.test(phone))
      return sendResponse({ error: 'Phone number can only contain digits, spaces, +, -, ( or ).' }, 400);
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7)
      return sendResponse({ error: 'Phone number is too short (minimum 7 digits).' }, 400);
    if (digits.length > 15)
      return sendResponse({ error: 'Phone number is too long (maximum 15 digits).' }, 400);

    // ── Nodemailer transport ──
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT),
      secure: false,          // STARTTLS on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── Email to admin ──
    await transporter.sendMail({
      from:    `"Trust Real Estate Website" <${process.env.SMTP_USER}>`,
      to:      process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Enquiry — ${name}${interest ? ` | ${interest}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;color:#D4CEC4;border:1px solid rgba(201,168,76,0.2);border-radius:4px;overflow:hidden;">
          <div style="background:#0A0A0A;padding:28px 32px;border-bottom:2px solid #C9A84C;">
            <h2 style="margin:0;font-size:22px;color:#C9A84C;letter-spacing:4px;font-weight:400;">TRUST REAL ESTATE</h2>
            <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;color:#8A8278;text-transform:uppercase;">New Contact Enquiry</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
               <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);width:140px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8A8278;">Full Name</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:15px;color:#F5F0E8;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8A8278;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:15px;color:#F5F0E8;"><a href="mailto:${email}" style="color:#C9A84C;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8A8278;">Phone</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:15px;color:#F5F0E8;"><a href="tel:${phone}" style="color:#C9A84C;">${phone}</a></td>
              </tr>` : ''}
              ${interest ? `<tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8A8278;">Interested In</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.1);font-size:15px;color:#E8C97A;">${interest}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:12px 0;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8A8278;vertical-align:top;">Message</td>
                <td style="padding:12px 0;font-size:15px;color:#F5F0E8;line-height:1.8;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background:#0A0A0A;padding:20px 32px;border-top:1px solid rgba(201,168,76,0.1);">
            <p style="margin:0;font-size:11px;color:#8A8278;">Sent from Trust Real Estate website — reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
    });

    // ── Auto-reply to sender ──
    await transporter.sendMail({
      from:    `"Trust Real Estate" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: 'We received your enquiry — Trust Real Estate',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;color:#D4CEC4;border:1px solid rgba(201,168,76,0.2);border-radius:4px;overflow:hidden;">
          <div style="background:#0A0A0A;padding:28px 32px;border-bottom:2px solid #C9A84C;">
            <h2 style="margin:0;font-size:22px;color:#C9A84C;letter-spacing:4px;font-weight:400;">TRUST REAL ESTATE</h2>
          </div>
          <div style="padding:32px;">
            <p style="font-size:16px;color:#F5F0E8;margin:0 0 16px;">Dear ${name},</p>
            <p style="font-size:14px;line-height:1.8;color:#D4CEC4;margin:0 0 16px;">Thank you for reaching out to Trust Real Estate. We have received your enquiry and one of our advisors will be in touch with you within 24 hours.</p>
            <p style="font-size:14px;line-height:1.8;color:#D4CEC4;margin:0 0 24px;">In the meantime, you can reach us directly at <a href="tel:+923177255555" style="color:#C9A84C;">+92 317 725 5555</a>.</p>
            <p style="font-size:13px;color:#8A8278;margin:0;">Warm regards,<br /><strong style="color:#C9A84C;">Trust Real Estate Marketing</strong><br />Sahiwal, Punjab, Pakistan</p>
          </div>
        </div>
      `,
    });

    return sendResponse({ success: true, message: 'Enquiry sent successfully.' }, 200);

  } catch (err) {
    console.error('[/api/contact]', err);
    return sendResponse({ error: 'Failed to send email. Please try again or contact us directly.' }, 500);
  }
}
