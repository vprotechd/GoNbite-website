
import mongoose from "mongoose";

const partnerApplicationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["delivery", "restaurant"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    vehicle: {
      type: String,
      enum: ["bicycle", "motorcycle", "scooter", "other", ""],
      default: "",
    },
    restaurant: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    fssai: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    // Email verification
    emailVerified: {
      type: Boolean,
      default: false,
    },
    otpHash: {
      type: String,
      select: false,
    },
    otpExpiresAt: {
      type: Date,
      select: false,
    },
    otpSentAt: {
      type: Date,
      select: false,
    },
    otpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    otpPurpose: {
      type: String,
      enum: ["registration", "login"],
      select: false,
    },

    // Partner account
    partnerId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

partnerApplicationSchema.index({ email: 1, type: 1 });
partnerApplicationSchema.index({ phone: 1, type: 1 });

export default mongoose.model(
  "PartnerApplication",
  partnerApplicationSchema
);
