import { sendSiteEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const business = String(body.business ?? "").trim();
    const projectType = String(body.projectType ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !projectType || !budget || !message) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const text = [
      "New quote request from earlsdwaradigital.com",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      business ? `Business: ${business}` : null,
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await sendSiteEmail({
      subject: `Quote request — ${name}`,
      replyTo: email,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send your message right now.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
