import { handleFormPost } from "@/lib/api/form-route";
import { FormValidationError } from "@/lib/api/form-security";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  return handleFormPost(request, {
    endpoint: "newsletter",
    fallbackError: "Unable to subscribe right now. Please try again later.",
    handle: async (body) => {
      const email = String(body.email ?? "").trim();

      if (!email) {
        throw new FormValidationError("Email is required.");
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
    },
  });
}
