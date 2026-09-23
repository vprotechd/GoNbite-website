import { Router } from "express";

import {
  register,
  adminRegister,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  login,
  adminLogin,
  getMe,
   getRegisteredUsers
} from "../controllers/authController.js";

import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);

router.post("/admin/register", adminRegister);

router.post("/verify-email", verifyEmail);

router.post(
  "/resend-verification",
  resendVerification
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/login", login);

router.post("/admin/login", adminLogin);

router.get("/me", requireAuth, getMe);

router.get(
  "/registered-users",
  requireAuth,
  requireAdmin,
  getRegisteredUsers
);

export default router;