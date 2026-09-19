import dotenv from "dotenv";

dotenv.config();

const required = [
  "MONGODB_URI",
  "JWT_SECRET",
  "FRONTEND_URL",
  "ADMIN_REGISTRATION_KEY",
];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[config] Missing ${key}`);
  }
}

export const config = {
  port: Number(process.env.PORT || 5000),

  // MongoDB URL comes ONLY from .env
  mongo: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,

  frontendUrl: (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")[0]
    .trim()
    .replace(/\/$/, ""),

  corsOrigins: (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((url) => url.trim().replace(/\/$/, ""))
    .filter(Boolean),

  adminKey: process.env.ADMIN_REGISTRATION_KEY || "",

  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),

    secure:
      String(process.env.SMTP_SECURE).toLowerCase() === "true",

    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,

    from:
      process.env.EMAIL_FROM ||
      process.env.SMTP_USER,
  },
};