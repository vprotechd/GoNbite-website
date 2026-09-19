import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { config } from "../config.js";
import {
  createVerificationToken,
  hashToken,
} from "../utils/tokens.js";
import { sendVerificationEmail } from "../utils/email.js";

const emailOk = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const makeJwt = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    config.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
};

/* --------------------------------
   CREATE USER
-------------------------------- */

const createUser = async ({
  name,
  email,
  password,
  role = "user",
}) => {
  if (!name || name.trim().length < 2) {
    throw new Error("Please enter your name.");
  }

  if (!email || !emailOk(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password || password.length < 8) {
    throw new Error(
      "Password must be at least 8 characters."
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const exists = await User.findOne({
    email: normalizedEmail,
  });

  if (exists) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const verificationToken = createVerificationToken();

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role,

    isEmailVerified: false,

    emailVerificationTokenHash:
      hashToken(verificationToken),

    emailVerificationExpires: new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ),
  });

  await sendVerificationEmail({
    to: user.email,
    name: user.name,
    token: verificationToken,
  });

  return user;
};

/* --------------------------------
   USER REGISTER
-------------------------------- */

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      message:
        "Account created. Check your email for the verification link.",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/* --------------------------------
   ADMIN REGISTER
-------------------------------- */

export const adminRegister = async (req, res) => {
  try {
    const { adminKey } = req.body;

    if (
      !config.adminKey ||
      adminKey !== config.adminKey
    ) {
      return res.status(403).json({
        message:
          "Invalid administrator registration key.",
      });
    }

    const user = await createUser({
      ...req.body,
      role: "admin",
    });

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = null;
    user.emailVerificationExpires = null;

    await user.save();

    res.status(201).json({
      message:
        "Administrator created. You can now sign in.",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/* --------------------------------
   VERIFY EMAIL
-------------------------------- */

const completeEmailVerification = async (token, res) => {
  if (!token || typeof token !== "string") {
    return res.status(400).json({
      message: "Verification token is required.",
    });
  }

  const user = await User.findOne({
    emailVerificationTokenHash: hashToken(token),
    emailVerificationExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "This verification link is invalid or expired.",
    });
  }

  user.isEmailVerified = true;
  user.emailVerificationTokenHash = null;
  user.emailVerificationExpires = null;

  await user.save();

  return res.json({
    message: "Email verified successfully.",
  });
};

/*
 * IMPORTANT: verification is completed with POST, not GET.
 * Email security scanners can prefetch/crawl links in messages.
 * A state-changing verification action must not be triggered by a
 * simple GET request because that can consume a single-use token
 * before the real user clicks it.
 */
export const verifyEmail = async (req, res) => {
  try {
    return await completeEmailVerification(req.body?.token, res);
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      message: "Unable to verify email.",
    });
  }
};

/* --------------------------------
   RESEND VERIFICATION
-------------------------------- */
export const resendVerification = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();

    if (!email) {
      return res.status(400).json({
        message: "Email address is required.",
      });
    }

    const user = await User.findOne({
      email,
    });

    // Don't reveal whether an account exists
    if (!user || user.isEmailVerified) {
      return res.json({
        message:
          "If the account exists and needs verification, a new email has been sent.",
      });
    }

    const token = createVerificationToken();

    user.emailVerificationTokenHash =
      hashToken(token);

    user.emailVerificationExpires = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await user.save();

    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      token,
    });

    return res.json({
      message:
        "If the account exists and needs verification, a new email has been sent.",
    });
  } catch (error) {
    console.error(
      "Resend verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to resend verification email.",
    });
  }
};

/* --------------------------------
   LOGIN
-------------------------------- */

const loginUser = async (
  req,
  res,
  adminOnly = false
) => {
  try {
    const email = req.body.email
      ?.toLowerCase()
      .trim();

    const password = req.body.password || "";

    const user = await User.findOne({
      email,
    });

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.passwordHash
      ))
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (
      adminOnly &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        message:
          "Administrator access required.",
      });
    }

    if (
      !adminOnly &&
      !user.isEmailVerified
    ) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in.",
      });
    }

    user.lastLoginAt = new Date();

    await user.save();

    const token = makeJwt(user);

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to login.",
    });
  }
};

/* --------------------------------
   USER LOGIN
-------------------------------- */

export const login = (req, res) => {
  return loginUser(req, res, false);
};

/* --------------------------------
   ADMIN LOGIN
-------------------------------- */

export const adminLogin = (req, res) => {
  return loginUser(req, res, true);
};

/* --------------------------------
   CURRENT USER
-------------------------------- */

export const getMe = (req, res) => {
  res.json({
    user: req.user,
  });
};