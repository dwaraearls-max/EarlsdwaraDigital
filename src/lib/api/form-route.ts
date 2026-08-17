import {
  checkRateLimit,
  isHoneypotTripped,
  toPublicFormError,
} from "@/lib/api/form-security";
import { NextResponse } from "next/server";

type FormRouteOptions = {
  endpoint: string;
  fallbackError: string;
  handle: (body: Record<string, unknown>) => Promise<void>;
};

export async function handleFormPost(request: Request, options: FormRouteOptions) {
  const rateLimit = checkRateLimit(request, options.endpoint);
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (isHoneypotTripped(body)) {
      return NextResponse.json({ ok: true });
    }

    await options.handle(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const { message, status } = toPublicFormError(error, options.fallbackError);
    return NextResponse.json({ error: message }, { status });
  }
}
