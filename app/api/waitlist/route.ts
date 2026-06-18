import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Recibe el email de la waitlist y lo reenvía al destino configurado.
 *
 * Configura UNA variable de entorno en Vercel (Settings → Environment Variables):
 *
 *   WAITLIST_ENDPOINT = <URL a la que POSTear el lead>
 *
 * Puede ser cualquiera de:
 *   - Un webhook de Make.com / Zapier (lo más rápido: crea un webhook que lo
 *     mande a una hoja, Airtable, o te lo notifique por email).
 *   - Un endpoint propio en api.ragfly.ai.
 *   - Una "Edge Function" / REST de Supabase que inserte en una tabla.
 *
 * El payload que enviamos es JSON: { email, company, source, ts }.
 *
 * Si WAITLIST_ENDPOINT no está configurada, el lead se registra en el log del
 * servidor (visible en los logs de Vercel) y la respuesta sigue siendo OK, para
 * no romper la UX. Configura el endpoint antes de hacer outreach de verdad.
 */
export async function POST(req: Request) {
  let body: { email?: string; company?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const email = (body.email || '').trim()
  const company = (body.company || '').trim()
  const source = (body.source || 'site').trim()

  // honeypot: si viene relleno, es un bot. Fingimos éxito y descartamos.
  if (company) return NextResponse.json({ ok: true })

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
  }

  const payload = { email, source, ts: new Date().toISOString() }
  const endpoint = process.env.WAITLIST_ENDPOINT

  if (!endpoint) {
    console.warn('[waitlist] WAITLIST_ENDPOINT no configurada. Lead recibido:', payload)
    return NextResponse.json({ ok: true, stored: false })
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[waitlist] endpoint respondió', res.status)
      return NextResponse.json({ ok: false, error: 'forward_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true, stored: true })
  } catch (err) {
    console.error('[waitlist] error al reenviar', err)
    return NextResponse.json({ ok: false, error: 'forward_error' }, { status: 502 })
  }
}
