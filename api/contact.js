// api/contact.js — Vercel Node.js serverless function
// Runs on the server only. SMTP credentials NEVER reach the browser.
import nodemailer from 'nodemailer';

// ─── Very lightweight in-memory rate limiter ────────────────────────────────
// Vercel functions are stateless between cold-starts, but this still throttles
// within a single warm instance and deters rapid-fire bursts.
const rateMap = new Map(); // ip → { count, windowStart }
const RATE_LIMIT = 5;       // max requests per window
const WINDOW_MS  = 60_000;  // 1-minute sliding window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

// ─── Sanitise a string: strip HTML/control chars, collapse whitespace ────────
function sanitise(raw, maxLen) {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/<[^>]*>/g, '')           // strip tags
    .replace(/[\x00-\x08\x0B\x0E-\x1F\x7F]/g, '') // strip control chars
    .trim()
    .slice(0, maxLen);
}

// ─── Server-side validation ──────────────────────────────────────────────────
function validate({ name, email, phone, message }) {
  const errors = {};

  // Name
  const nameClean = sanitise(name, 120);
  if (!nameClean) {
    errors.name = 'Full name is required.';
  } else if (!/^[a-zA-Z\s'\-.]{2,60}$/.test(nameClean)) {
    errors.name = 'Name contains invalid characters.';
  }

  // Email
  const emailClean = sanitise(email, 254);
  if (!emailClean) {
    errors.email = 'Email address is required.';
  } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(emailClean)) {
    errors.email = 'Invalid email address.';
  }

  // Phone — optional but validated when present
  const phoneRaw  = sanitise(phone, 30);
  const phoneDigits = phoneRaw.replace(/[\s\-\(\)+]/g, '');
  if (phoneRaw) {
    if (!/^[0-9]{7,15}$/.test(phoneDigits)) {
      errors.phone = 'Invalid phone number.';
    } else if (/^(\d)\1{9,}$/.test(phoneDigits) || phoneDigits === '1234567890') {
      errors.phone = 'Phone number looks invalid.';
    }
  }

  // Message
  const msgClean = sanitise(message, 4000);
  if (!msgClean) {
    errors.message = 'Message is required.';
  } else if (msgClean.length < 10) {
    errors.message = 'Message is too short (minimum 10 characters).';
  }

  return {
    errors,
    clean: { name: nameClean, email: emailClean, phone: phoneDigits, message: msgClean },
    valid: Object.keys(errors).length === 0,
  };
}

// ─── Basic anti-spam heuristics ─────────────────────────────────────────────
function looksLikeSpam({ name, message }) {
  const spamPatterns = [
    /https?:\/\//i,          // URLs in name/message suspicious when in name
    /\bviagra\b/i,
    /\bcasino\b/i,
    /\bloan\b.*\boffer\b/i,
    /\bcrypto\b.*\binvest\b/i,
  ];
  // Flag if name contains a URL
  if (/https?:\/\//.test(name)) return true;
  // Flag if body matches multiple spam patterns
  const hits = spamPatterns.filter(p => p.test(message)).length;
  return hits >= 2;
}

export default async function handler(req, res) {
  // CORS headers — tighten origin in production if desired
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only POST is accepted
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  // ── Rate limiting ──────────────────────────────────────────────────────────
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'object' && req.body !== null ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const { name = '', email = '', phone = '', message = '' } = body;

  // ── Validate ───────────────────────────────────────────────────────────────
  const { valid, errors, clean } = validate({ name, email, phone, message });
  if (!valid) {
    return res.status(422).json({ error: 'Validation failed.', fields: errors });
  }

  // ── Spam check ─────────────────────────────────────────────────────────────
  if (looksLikeSpam(clean)) {
    // Silently accept to avoid tipping off spammers
    return res.status(200).json({ ok: true });
  }

  // ── Env vars ───────────────────────────────────────────────────────────────
  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('[contact] Missing environment variables: SMTP_USER / SMTP_PASS / CONTACT_TO');
    return res.status(500).json({ error: 'Server configuration error. Please try again later.' });
  }

  // ── Build transporter ──────────────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,          // TLS on port 465
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,     // Gmail App Password — NOT your account password
    },
  });

  // ── Compose email ──────────────────────────────────────────────────────────
  const phoneDisplay = clean.phone ? `+${clean.phone}` : '(not provided)';
  const subject = `NuttyBitez Enquiry from ${clean.name}`;

  const htmlBody = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#1a0e0a;color:#f5ead5;padding:32px;border-radius:12px;border:1px solid #c79a4a44;">
      <h2 style="margin:0 0 4px;font-size:22px;color:#c79a4a;">New Enquiry — NuttyBitez</h2>
      <p style="margin:0 0 24px;font-size:12px;color:#c79a4a88;letter-spacing:.12em;text-transform:uppercase;">Contact Form Submission</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#c79a4a88;width:100px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;font-weight:bold;">${clean.name}</td></tr>
        <tr><td style="padding:8px 0;color:#c79a4a88;vertical-align:top;">Email</td>
            <td style="padding:8px 0;">${clean.email}</td></tr>
        <tr><td style="padding:8px 0;color:#c79a4a88;vertical-align:top;">Phone</td>
            <td style="padding:8px 0;">${phoneDisplay}</td></tr>
        <tr><td style="padding:8px 0;color:#c79a4a88;vertical-align:top;">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap;">${clean.message}</td></tr>
      </table>
      <p style="margin-top:32px;font-size:11px;color:#c79a4a44;">Sent via nuttybitez.com contact form</p>
    </div>
  `;

  const textBody = [
    `NuttyBitez — New Enquiry`,
    ``,
    `Name:    ${clean.name}`,
    `Email:   ${clean.email}`,
    `Phone:   ${phoneDisplay}`,
    ``,
    `Message:`,
    clean.message,
    ``,
    `Sent via nuttybitez.com contact form`,
  ].join('\n');

  // ── Send ────────────────────────────────────────────────────────────────────
  try {
    await transporter.sendMail({
      from: `"NuttyBitez" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${clean.name}" <${clean.email}>`,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Log the real error server-side only — never expose SMTP details to client
    console.error('[contact] sendMail failed:', err.message);
    return res.status(500).json({
      error: 'Failed to send your message. Please try WhatsApp or email us directly.',
    });
  }
};
