
import express from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import crypto from "node:crypto";

import PartnerApplication from "../models/PartnerApplication.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  generateOtp,
  hashOtp,
  sendPartnerOtp,
} from "../utils/partnerOtp.js";

const router = express.Router();

const partnerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many applications. Please try again later.",
  },
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many OTP requests. Please try again later.",
  },
});

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const OTP_RESEND_WAIT_MS = 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeOtpMatch(submittedOtp, storedHash) {
  if (
    typeof submittedOtp !== "string" ||
    !/^\d{6}$/.test(submittedOtp) ||
    typeof storedHash !== "string" ||
    !/^[a-f0-9]{64}$/i.test(storedHash)
  ) {
    return false;
  }

  const submittedHash = Buffer.from(hashOtp(submittedOtp), "hex");
  const expectedHash = Buffer.from(storedHash, "hex");

  return (
    submittedHash.length === expectedHash.length &&
    crypto.timingSafeEqual(submittedHash, expectedHash)
  );
}

function clearOtp(application) {
  application.otpHash = undefined;
  application.otpExpiresAt = undefined;
  application.otpSentAt = undefined;
  application.otpAttempts = 0;
  application.otpPurpose = undefined;
}

async function sendRegistrationOtp(application) {
  const otp = generateOtp();

  application.otpHash = hashOtp(otp);
  application.otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
  application.otpSentAt = new Date();
  application.otpAttempts = 0;
  application.otpPurpose = "registration";

  await application.save();

  try {
    await sendPartnerOtp(
      application.email,
      otp,
      "registration"
    );
  } catch (error) {
    clearOtp(application);
    await application.save();
    throw error;
  }
}

/* =========================================
   REGISTER PARTNER
   POST /api/partners
========================================= */

router.post("/", partnerLimiter, async (req, res) => {
  try {
    const {
      type,
      name,
      phone,
      email,
      city,
      vehicle,
      restaurant,
      address,
      fssai,
    } = req.body ?? {};

    if (!["delivery", "restaurant"].includes(type)) {
      return res.status(400).json({
        message: "Invalid partner type.",
      });
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 100 ||
      typeof phone !== "string" ||
      !/^[+\d\s()-]{7,20}$/.test(phone.trim()) ||
      typeof city !== "string" ||
      !city.trim() ||
      city.trim().length > 100
    ) {
      return res.status(400).json({
        message: "Please check your name, phone and city.",
      });
    }

    if (
      typeof email !== "string" ||
      email.trim().length > 254 ||
      !emailPattern.test(email.trim())
    ) {
      return res.status(400).json({
        message: "A valid email address is required for OTP verification.",
      });
    }

    if (
      type === "delivery" &&
      !["bicycle", "motorcycle", "scooter", "other"].includes(vehicle)
    ) {
      return res.status(400).json({
        message: "Please select a valid vehicle type.",
      });
    }

    if (
      type === "restaurant" &&
      (
        typeof restaurant !== "string" ||
        !restaurant.trim() ||
        restaurant.trim().length > 150 ||
        typeof address !== "string" ||
        !address.trim() ||
        address.trim().length > 500 ||
        typeof fssai !== "string" ||
        !fssai.trim() ||
        fssai.trim().length > 50
      )
    ) {
      return res.status(400).json({
        message: "Please complete all restaurant details.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    const existing = await PartnerApplication.findOne({
      type,
      $or: [
        { email: normalizedEmail },
        { phone: normalizedPhone },
      ],
    });

    if (existing) {
      return res.status(409).json({
        message:
          "An application with this email or phone already exists for this partner type. Please contact support if you need help.",
      });
    }

    const application = await PartnerApplication.create({
      type,
      name: name.trim(),
      phone: normalizedPhone,
      email: normalizedEmail,
      city: city.trim(),
      vehicle: type === "delivery" ? vehicle : "",
      restaurant: type === "restaurant" ? restaurant.trim() : "",
      address: type === "restaurant" ? address.trim() : "",
      fssai: type === "restaurant" ? fssai.trim() : "",
      status: "pending",
      emailVerified: false,
    });

    try {
      await sendRegistrationOtp(application);
    } catch (error) {
      console.error("Registration OTP email error:", error);

      return res.status(502).json({
        message:
          "Your application was saved, but the verification email could not be sent. Use the resend OTP option to try again.",
        applicationId: application._id,
      });
    }

    return res.status(201).json({
      message: "Application received. Please verify your email using the OTP we sent.",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Partner application error:", error);

    return res.status(500).json({
      message: "Unable to submit your application.",
    });
  }
});

/* =========================================
   VERIFY REGISTRATION OTP
   POST /api/partners/verify-registration
========================================= */

router.post(
  "/verify-registration",
  otpLimiter,
  async (req, res) => {
    try {
      const { applicationId, otp } = req.body ?? {};

      if (
        !mongoose.isValidObjectId(applicationId) ||
        typeof otp !== "string" ||
        !/^\d{6}$/.test(otp)
      ) {
        return res.status(400).json({
          message: "Please provide a valid application ID and six-digit OTP.",
        });
      }

      const application = await PartnerApplication.findById(applicationId)
        .select(
          "+otpHash +otpExpiresAt +otpAttempts +otpPurpose +otpSentAt"
        );

      if (!application) {
        return res.status(404).json({
          message: "Application not found.",
        });
      }

      if (application.emailVerified) {
        return res.status(200).json({
          message: "Email has already been verified.",
          status: application.status,
        });
      }

      if (application.otpPurpose !== "registration") {
        return res.status(400).json({
          message: "No active registration OTP. Please request a new code.",
        });
      }

      if ((application.otpAttempts ?? 0) >= MAX_OTP_ATTEMPTS) {
        clearOtp(application);
        await application.save();

        return res.status(429).json({
          message: "Too many incorrect attempts. Please request a new OTP.",
        });
      }

      if (
        !application.otpExpiresAt ||
        application.otpExpiresAt.getTime() <= Date.now()
      ) {
        clearOtp(application);
        await application.save();

        return res.status(400).json({
          message: "OTP expired. Please request a new one.",
        });
      }

      if (!safeOtpMatch(otp, application.otpHash)) {
        application.otpAttempts = (application.otpAttempts ?? 0) + 1;
        await application.save();

        return res.status(400).json({
          message: "Incorrect OTP.",
          attemptsRemaining: Math.max(
            0,
            MAX_OTP_ATTEMPTS - application.otpAttempts
          ),
        });
      }

      application.emailVerified = true;
      clearOtp(application);
      await application.save();

      return res.status(200).json({
        message: "Email verified successfully. Your application is awaiting admin approval.",
        status: application.status,
      });
    } catch (error) {
      console.error("Registration OTP verification error:", error);

      return res.status(500).json({
        message: "Unable to verify email.",
      });
    }
  }
);

/* =========================================
   RESEND REGISTRATION OTP
   POST /api/partners/resend-registration-otp
========================================= */

router.post(
  "/resend-registration-otp",
  otpLimiter,
  async (req, res) => {
    try {
      const { applicationId } = req.body ?? {};

      if (!mongoose.isValidObjectId(applicationId)) {
        return res.status(400).json({
          message: "A valid application ID is required.",
        });
      }

      const application = await PartnerApplication.findById(applicationId)
        .select(
          "+otpHash +otpExpiresAt +otpAttempts +otpPurpose +otpSentAt"
        );

      if (!application) {
        return res.status(404).json({
          message: "Application not found.",
        });
      }

      if (application.emailVerified) {
        return res.status(400).json({
          message: "This email has already been verified.",
        });
      }

      if (application.status !== "pending") {
        return res.status(400).json({
          message: "This application is no longer pending.",
        });
      }

      if (
        application.otpSentAt &&
        Date.now() - application.otpSentAt.getTime() <
          OTP_RESEND_WAIT_MS
      ) {
        return res.status(429).json({
          message: "Please wait 60 seconds before requesting another OTP.",
        });
      }

      try {
        await sendRegistrationOtp(application);
      } catch (error) {
        console.error("Resend registration OTP error:", error);

        return res.status(502).json({
          message: "Unable to send OTP. Please try again later.",
        });
      }

      return res.status(200).json({
        message: "A new verification OTP has been sent.",
      });
    } catch (error) {
      console.error("Resend registration OTP error:", error);

      return res.status(500).json({
        message: "Unable to resend OTP.",
      });
    }
  }
);

/* =========================================
   APPROVE PARTNER
   PATCH /api/partners/:id/approve
========================================= */

async function approvePartner(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid partner application ID.",
      });
    }

    const application = await PartnerApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        message: "Partner application not found.",
      });
    }

    if (!application.emailVerified) {
      return res.status(400).json({
        message: "Partner email must be verified before approval.",
      });
    }

    if (application.status === "rejected") {
      return res.status(400).json({
        message: "A rejected application cannot be approved.",
      });
    }

    if (application.status === "approved") {
      return res.status(200).json({
        message: "Application is already approved.",
        partnerId: application.partnerId,
      });
    }

    const prefix =
      application.type === "restaurant" ? "GBR" : "GBD";

    let partnerId;
    let attempts = 0;

    do {
      partnerId = `${prefix}-${crypto.randomBytes(4)
        .toString("hex")
        .toUpperCase()}`;
      attempts++;
    } while (
      (await PartnerApplication.exists({ partnerId })) &&
      attempts < 5
    );

    if (await PartnerApplication.exists({ partnerId })) {
      return res.status(503).json({
        message: "Could not generate a unique partner ID. Try again.",
      });
    }

    application.partnerId = partnerId;
    application.status = "approved";

    await application.save();

    return res.status(200).json({
      message: "Partner application approved successfully.",
      partnerId: application.partnerId,
      status: application.status,
    });
  } catch (error) {
    console.error("Partner approval error:", error);

    return res.status(500).json({
      message: "Unable to approve partner application.",
    });
  }
}

router.patch(
  "/:id/approve",
  requireAuth,
  requireAdmin,
  approvePartner
);

export default router;
