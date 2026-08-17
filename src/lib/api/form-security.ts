const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email not configured");
    this.name = "EmailNotConfiguredError";
  }
}

export class FormValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormValidationError";
  }
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < 500) return;

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

export function checkRateLimit(request: Request, endpoint: string) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const key = `${endpoint}:${getClientIp(request)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true as const };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { ok: false as const };
  }

  current.count += 1;
  return { ok: true as const };
}

export function isHoneypotTripped(body: Record<string, unknown>) {
  return String(body._hp ?? "").trim().length > 0;
}

export function toPublicFormError(error: unknown, fallbackMessage: string) {
  if (error instanceof FormValidationError) {
    return {
      message: error.message,
      status: 400,
    };
  }

  if (error instanceof EmailNotConfiguredError) {
    return {
      message: "Form submissions are temporarily unavailable. Please email us directly.",
      status: 503,
    };
  }

  return {
    message: fallbackMessage,
    status: 500,
  };
}
