import nodemailer from "nodemailer";
import { config } from "../config.js";

const smtpConfigured = Boolean(
  config.smtp.host && config.smtp.user && config.smtp.pass
);

const resendConfigured = Boolean(config.resend.apiKey);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
  : null;

function buildMessage({ to, name, token }) {
  const verifyUrl = `${config.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;

  return {
    from: config.emailFrom,
    to,
    subject: "Verify your GoNbite email address",
    text: `Hi ${name},\n\nVerify your GoNbite account here:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nGoNbite`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:35px;color:#34271f"><h1 style="color:#ff6b35">GoNbite</h1><h2>Verify your email</h2><p>Hi ${name}, please verify your email address to activate your account.</p><p><a href="${verifyUrl}" style="display:inline-block;background:#ff6b35;color:#fff;text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:700">Verify email</a></p><p style="color:#777;font-size:13px">This link expires in 24 hours.</p></div>`,
  };
}

async function sendWithResend(message) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.resend.apiKey}`,
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email API failed (${response.status}): ${body}`);
  }

  return response.json();
}

async function sendWithSmtp(message) {
  if (!transporter) {
    throw new Error("No email provider is configured.");
  }

  return transporter.sendMail(message);
}

export async function sendVerificationEmail({ to, name, token }) {
  const message = buildMessage({ to, name, token });

  // Resend uses HTTPS, so it works on Render plans where outbound SMTP
  // ports are unavailable. SMTP remains supported as a local/paid fallback.
  if (resendConfigured) {
    return sendWithResend(message);
  }

  if (smtpConfigured) {
    try {
      return await sendWithSmtp(message);
    } catch (error) {
      console.error("[email] SMTP send failed:", error?.code || error?.message || error);
      throw error;
    }
  }

  throw new Error("No email provider is configured.");
}


export async function sendPasswordResetEmail({ to, name, token }) {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const message = {
    from: config.emailFrom,
    to,
    subject: "Reset your GoNbite password",
    text: `Hi ${name},\n\nReset your GoNbite password here:\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request a password reset, you can ignore this email.\n\nGoNbite`,
    html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:35px;color:#34271f"><h1 style="color:#ff6b35">GoNbite</h1><h2>Reset your password</h2><p>Hi ${name}, use the button below to create a new password for your GoNbite account.</p><p><a href="${resetUrl}" style="display:inline-block;background:#ff6b35;color:#fff;text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:700">Reset password</a></p><p style="color:#777;font-size:13px">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p></div>`,
  };

  if (resendConfigured) {
    return sendWithResend(message);
  }

  if (smtpConfigured) {
    return sendWithSmtp(message);
  }

  throw new Error("No email provider is configured.");
}
