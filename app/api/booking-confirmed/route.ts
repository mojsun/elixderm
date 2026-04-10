import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import clientConfig from '@/sanity/config/client-config'

const sanityClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

interface BookingPayload {
  guestName: string
  guestEmail: string
  eventTitle: string
  eventStart: string  // ISO string
  secret: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingPayload = await request.json()
    const { guestName, guestEmail, eventTitle, eventStart, secret } = body

    // Verify shared secret
    if (secret !== process.env.BOOKING_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!guestEmail) {
      return NextResponse.json({ error: 'Missing guestEmail' }, { status: 400 })
    }

    const confirmedAt = new Date().toISOString()
    const eventDate = new Date(eventStart).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    // ── Find contact by email ──────────────────────────────────────────────
    const contact = await sanityClient.fetch(
      `*[_type == "contact" && email == $email][0]{ _id, name, email, company }`,
      { email: guestEmail }
    )

    // ── Update chatSession if one is linked ────────────────────────────────
    if (contact?._id) {
      const session = await sanityClient.fetch(
        `*[_type == "chatSession" && contactId == $contactId][0]{ _id }`,
        { contactId: contact._id }
      )
      if (session?._id) {
        await sanityClient.patch(session._id).set({
          bookingConfirmed: true,
          bookingConfirmedAt: confirmedAt,
        }).commit()
      }
    }

    // ── Send emails via Resend ─────────────────────────────────────────────
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const firstName = guestName?.split(' ')[0] ?? 'there'
    const companyLine = contact?.company ? ` from ${contact.company}` : ''

    // Email to the user
    await resend.emails.send({
      from: 'Elixderm Team <hello@elixderm.com>',
      to: [guestEmail],
      subject: 'Your Discovery Call is Confirmed — Elixderm',
      html: userEmailTemplate(firstName, eventDate, eventTitle),
    })

    // Email to the team
    await resend.emails.send({
      from: 'Elixderm Bookings <hello@elixderm.com>',
      to: ['hello@elixderm.com'],
      subject: `Discovery Call Booked — ${guestName}${companyLine}`,
      html: teamEmailTemplate(guestName, guestEmail, eventTitle, eventDate, contact),
      replyTo: guestEmail,
    })

    console.log(`Booking confirmed for ${guestEmail} at ${eventStart}`)

    return NextResponse.json({ success: true, matched: !!contact }, { status: 200 })

  } catch (error: unknown) {
    console.error('Booking confirmed API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── Email Templates ────────────────────────────────────────────────────────

function userEmailTemplate(firstName: string, eventDate: string, eventTitle: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Call is Confirmed</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 20px; margin: 0; }
    .container { max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #10b981, #059669); padding: 40px 32px; text-align: center; color: white; }
    .header h1 { margin: 0 0 8px; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 15px; opacity: 0.9; }
    .body { padding: 36px 32px; }
    .body p { color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
    .callout { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px 20px; margin: 24px 0; }
    .callout p { margin: 0; color: #065f46; font-size: 14px; font-weight: 500; }
    .callout strong { display: block; font-size: 16px; color: #064e3b; margin-bottom: 4px; }
    .footer { background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 0; color: #9ca3af; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Elixderm</h1>
      <p>Your call is confirmed</p>
    </div>
    <div class="body">
      <p>Hi ${firstName},</p>
      <p>Your Discovery Call with the Elixderm team is confirmed. We're looking forward to learning more about your project and exploring how we can help bring your product to life.</p>
      <div class="callout">
        <strong>${eventTitle}</strong>
        <p>${eventDate}</p>
      </div>
      <p>You'll receive a Google Calendar invite shortly with the call details.</p>
      <p style="font-size:15px;font-weight:700;color:#111827;margin:28px 0 12px;">To prepare for the call, please complete these two steps:</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;vertical-align:top;">
            <div style="font-size:13px;font-weight:700;color:#059669;margin-bottom:6px;">STEP 1</div>
            <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:6px;">Sign the Confidentiality Agreement</div>
            <div style="font-size:13px;color:#6b7280;margin-bottom:12px;">Download, sign, and email the signed copy back to hello@elixderm.com.</div>
            <a href="https://www.elixderm.com/nda.pdf" style="display:inline-block;background:linear-gradient(135deg,#10b981,#059669);color:white;text-decoration:none;padding:9px 18px;border-radius:7px;font-size:13px;font-weight:600;">Download NDA</a>
          </td>
        </tr>
        <tr><td style="height:12px;"></td></tr>
        <tr>
          <td style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;vertical-align:top;">
            <div style="font-size:13px;font-weight:700;color:#059669;margin-bottom:6px;">STEP 2</div>
            <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:6px;">Complete Your Product Development Brief</div>
            <div style="font-size:13px;color:#6b7280;margin-bottom:12px;">This short form helps our team prepare for your consultation. It takes about 5–10 minutes.</div>
            <a href="https://www.elixderm.com/product-brief" style="display:inline-block;background:linear-gradient(135deg,#10b981,#059669);color:white;text-decoration:none;padding:9px 18px;border-radius:7px;font-size:13px;font-weight:600;">Fill Out Brief</a>
          </td>
        </tr>
      </table>
      <p>If you have any questions in the meantime, feel free to reply to this email.</p>
      <p>See you soon,<br><strong>The Elixderm Team</strong></p>
    </div>
    <div class="footer">
      <p>Elixderm Manufacturing Platform &mdash; <a href="https://www.elixderm.com" style="color: #10b981;">elixderm.com</a></p>
    </div>
  </div>
</body>
</html>`
}

function teamEmailTemplate(
  guestName: string,
  guestEmail: string,
  eventTitle: string,
  eventDate: string,
  contact: { name?: string; company?: string } | null
) {
  const companyLine = contact?.company
    ? `<p style="margin:6px 0;color:#374151;font-size:14px;"><strong>Company:</strong> ${contact.company}</p>`
    : ''
  const sanityNote = contact
    ? `<p style="margin:16px 0 0;font-size:13px;color:#6b7280;">✅ Matched to a contact record in Sanity CMS.</p>`
    : `<p style="margin:16px 0 0;font-size:13px;color:#d97706;">⚠️ No matching contact found in Sanity for this email.</p>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Discovery Call Booked</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 20px; margin: 0; }
    .container { max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #10b981, #059669); padding: 36px 32px; text-align: center; color: white; }
    .header h1 { margin: 0 0 6px; font-size: 24px; font-weight: 700; }
    .header p { margin: 0; font-size: 14px; opacity: 0.9; }
    .body { padding: 32px; }
    .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px; }
    .card p { margin: 6px 0; color: #374151; font-size: 14px; }
    .card p strong { color: #111827; }
    .callout { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px 20px; }
    .callout p { margin: 0; color: #065f46; font-size: 14px; }
    .callout strong { display: block; font-size: 15px; color: #064e3b; margin-bottom: 4px; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 0; color: #9ca3af; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Discovery Call Booked</h1>
      <p>Someone just scheduled time with you</p>
    </div>
    <div class="body">
      <div class="card">
        <p><strong>Name:</strong> ${guestName}</p>
        <p><strong>Email:</strong> <a href="mailto:${guestEmail}" style="color:#10b981;">${guestEmail}</a></p>
        ${companyLine}
      </div>
      <div class="callout">
        <strong>${eventTitle}</strong>
        <p>${eventDate}</p>
      </div>
      ${sanityNote}
    </div>
    <div class="footer">
      <p>Sent automatically when a Discovery Call is detected on your Google Calendar.</p>
    </div>
  </div>
</body>
</html>`
}
