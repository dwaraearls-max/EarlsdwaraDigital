import { sendSiteEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = String(body.email ?? "").trim();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const text = [
      "New newsletter signup from earlsdwaradigital.com",
      "",
      `Email: ${email}`,
    ].join("\n");

    await sendSiteEmail({
      subject: `Newsletter signup — ${email}`,
      replyTo: email,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to subscribe right now.";
    const status = message.includes("not configured") ? 503 : 503;
    return NextResponse.json({ error: message }, { status });
  }
}
