export type FormSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitForm(
  endpoint: string,
  payload: Record<string, string>,
): Promise<FormSubmitResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      return { ok: false, error: data?.error ?? "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}
