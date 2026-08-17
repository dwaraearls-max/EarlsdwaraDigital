import { sendSiteEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const service = String(body.service ?? "").trim();
    const date = String(body.date ?? "").trim();
    const time = String(body.time ?? "").trim();

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const text = [
      "New consultation booking from earlsdwaradigital.com",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Date: ${date}`,
      `Time: ${time}`,
    ].join("\n");

    await sendSiteEmail({
      subject: `Booking request — ${name} (${date} ${time})`,
      replyTo: email,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send your booking right now.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
