import { handleFormPost } from "@/lib/api/form-route";
import { FormValidationError } from "@/lib/api/form-security";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  return handleFormPost(request, {
    endpoint: "contact",
    fallbackError: "Unable to send your message right now. Please try again later.",
    handle: async (body) => {
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const phone = String(body.phone ?? "").trim();
      const business = String(body.business ?? "").trim();
      const projectType = String(body.projectType ?? "").trim();
      const budget = String(body.budget ?? "").trim();
      const message = String(body.message ?? "").trim();

      if (!name || !email || !projectType || !budget || !message) {
        throw new FormValidationError("Please fill in all required fields.");
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
    },
  });
}
