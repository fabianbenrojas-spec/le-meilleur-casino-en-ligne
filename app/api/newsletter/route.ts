import { type NextRequest, NextResponse } from 'next/server'

// Plug in a list provider here (Mailchimp, ConvertKit, Brevo, etc.)
// Set NEWSLETTER_API_KEY + NEWSLETTER_LIST_ID in Vercel env vars to activate.
const MAILCHIMP_API_KEY = process.env['MAILCHIMP_API_KEY']
const MAILCHIMP_LIST_ID = process.env['MAILCHIMP_LIST_ID']
const MAILCHIMP_DC = process.env['MAILCHIMP_DC'] ?? 'us1' // e.g. "us1", "eu5"

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

  const email = typeof body['email'] === 'string' ? body['email'].trim().toLowerCase() : ''
  const locale = typeof body['locale'] === 'string' ? body['locale'] : 'fr'

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'email_invalid' }, { status: 422 })
  }

  if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
    // Mailchimp Members API
    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending', // double opt-in — required for RGPD
        merge_fields: { LOCALE: locale },
        tags: ['website', locale],
      }),
    })

    const data = (await res.json()) as { title?: string }

    // 400 with "Member Exists" = already subscribed — treat as success
    if (!res.ok && data.title !== 'Member Exists') {
      console.error('Mailchimp error', data)
      return NextResponse.json({ error: 'subscribe_failed' }, { status: 502 })
    }
  } else {
    // Dev fallback
    console.log('[newsletter subscribe]', { email, locale })
  }

  return NextResponse.json({ success: true })
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
