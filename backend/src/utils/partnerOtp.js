
import { Resend } from "resend";
import { randomInt, createHash } from "node:crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export function hashOtp(otp) {
  return createHash("sha256")
    .update(`${process.env.PARTNER_OTP_PEPPER}:${otp}`)
    .digest("hex");
}

export async function sendPartnerOtp(email, otp, purpose) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.RESEND_FROM ||
    !process.env.PARTNER_OTP_PEPPER
  ) {
    throw new Error("Partner email configuration is incomplete.");
  }

  const subject =
    purpose === "registration"
      ? "Verify your GoNbite partner registration"
      : "Your GoNbite login verification code";

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: [email],
    subject,
    text: `Your GoNbite verification code is ${otp}. It expires in 10 minutes. Never share this code.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px">
        <h2>Welcome to GoNbite Partners</h2>
        <p>Use the code below to ${
          purpose === "registration" ? "verify your email" : "sign in"
        }.</p>
        <p style="font-size:32px;font-weight:bold;letter-spacing:8px">
          ${otp}
        </p>
        <p>This code expires in 10 minutes. Never share it with anyone.</p>
        <p>If you did not request this code, ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend delivery error:", error);
    throw new Error("Unable to send verification email.");
  }

  return data;
}
