import { EmailNotConfiguredError } from "@/lib/api/form-security";
import { siteConfig } from "@/lib/data";
import { Resend } from "resend";

type SendEmailInput = {
  subject: string;
  replyTo?: string;
  text: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendSiteEmail({ subject, replyTo, text }: SendEmailInput) {
  const resend = getResendClient();
  if (!resend) {
    throw new EmailNotConfiguredError();
  }

  const to = process.env.CONTACT_TO ?? siteConfig.email;
  const from =
    process.env.RESEND_FROM ?? `Earlsdwara Digital <${siteConfig.email}>`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: replyTo || undefined,
    subject,
    text,
  });

  if (error) {
    throw error;
  }
}
