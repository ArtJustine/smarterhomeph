import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(10).max(40),
  subject: z.string().trim().min(5).max(200),
  message: z.string().trim().min(10).max(5000),
})

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 })
  }

  let parsed
  try {
    parsed = schema.safeParse(await req.json())
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const { name, email, phone, subject, message } = parsed.data
  const to = process.env.CONTACT_TO || "info@smarterhomephilippines.com"
  const from = process.env.CONTACT_FROM || "Smarter Home PH <noreply@smarterhomephilippines.com>"

  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${esc(name)}<br>
    <strong>Email:</strong> ${esc(email)}<br>
    <strong>Phone:</strong> ${esc(phone)}<br>
    <strong>Subject:</strong> ${esc(subject)}</p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
  `
  const text = `New website inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Smarter Home PH] ${subject}`,
      html,
      text,
    }),
  })

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text())
    return NextResponse.json({ error: "Could not send" }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
