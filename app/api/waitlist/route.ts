import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const data = (body ?? {}) as { email?: unknown; company?: unknown };
  const email = typeof data.email === "string" ? data.email.trim() : "";
  // Honeypot: bots preenchem "company". Respondemos ok sem registrar.
  const honeypot = typeof data.company === "string" ? data.company : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 422 }
    );
  }

  // Sem banco: apenas log estruturado (apareceria nos logs da Vercel).
  console.log(
    JSON.stringify({
      event: "waitlist_signup",
      email,
      at: new Date().toISOString(),
    })
  );

  return NextResponse.json({ ok: true });
}
