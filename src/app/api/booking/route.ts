import { handleFormPost } from "@/lib/api/form-route";
import { FormValidationError } from "@/lib/api/form-security";
import { sendSiteEmail } from "@/lib/email";

export async function POST(request: Request) {
  return handleFormPost(request, {
    endpoint: "booking",
    fallbackError: "Unable to send your booking right now. Please try again later.",
    handle: async (body) => {
      const name = String(body.name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const service = String(body.service ?? "").trim();
      const date = String(body.date ?? "").trim();
      const time = String(body.time ?? "").trim();

      if (!name || !email || !service || !date || !time) {
        throw new FormValidationError("Please fill in all required fields.");
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
    },
  });
}
