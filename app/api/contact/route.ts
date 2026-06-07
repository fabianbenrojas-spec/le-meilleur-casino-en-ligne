import { type NextRequest, NextResponse } from 'next/server'

// Plug in a real email provider here (e.g. Resend, SendGrid, Postmark)
// Set RESEND_API_KEY + CONTACT_EMAIL in Vercel env vars to activate sending.
const RESEND_API_KEY = process.env['RESEND_API_KEY']
const CONTACT_EMAIL = process.env['CONTACT_EMAIL'] ?? 'contact@le-meilleur-casino-en-ligne.fr'
const ALLOWED_TOPICS = [
  'correction',
  'signalement',
  'partenariat',
  'rgpd',
  'report',
  'partnership',
  'gdpr',
  'other',
  'autre',
]

function sanitise(s: unknown, max = 500): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max).replace(/[<>]/g, '')
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = sanitise(body['name'], 100)
  const email = sanitise(body['email'], 200)
  const topic = sanitise(body['topic'], 50)
  const message = sanitise(body['message'])

  // Validation
  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'name_required' }, { status: 422 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'email_invalid' }, { status: 422 })
  }
  if (!topic || !ALLOWED_TOPICS.includes(topic)) {
    return NextResponse.json({ error: 'topic_required' }, { status: 422 })
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: 'message_too_short' }, { status: 422 })
  }

  // Rate limiting: basic IP check (Vercel adds CF-Connecting-IP or x-forwarded-for)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  void ip // placeholder — add Redis rate-limiting here for production

  if (RESEND_API_KEY) {
    // Send via Resend (https://resend.com/docs/api-reference/emails/send-email)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@le-meilleur-casino-en-ligne.fr',
        to: CONTACT_EMAIL,
        reply_to: email,
        subject: `[Contact] ${topic} — ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nSujet: ${topic}\n\n${message}`,
      }),
    })

    if (!res.ok) {
      console.error('Resend error', await res.text())
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
  } else {
    // Dev fallback — log to console
    console.log('[contact form]', { name, email, topic, message: message.slice(0, 80) })
  }

  return NextResponse.json({ success: true })
}

// Block all other methods
export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
