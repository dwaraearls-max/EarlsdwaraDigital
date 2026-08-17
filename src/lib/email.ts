import { siteConfig } from "@/lib/data";
import nodemailer from "nodemailer";

type SendEmailInput = {
  subject: string;
  replyTo?: string;
  text: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return { host, port, user, pass };
}

export function isEmailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendSiteEmail({ subject, replyTo, text }: SendEmailInput) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  const to = process.env.CONTACT_TO ?? siteConfig.email;
  const from = process.env.SMTP_FROM ?? smtp.user;

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: replyTo || undefined,
    subject,
    text,
  });
}
