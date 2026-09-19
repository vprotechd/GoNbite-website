import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      // index: true  ← removed
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same email from joining the waitlist multiple times
waitlistSchema.index(
  { email: 1 },
  { unique: true }
);

export default mongoose.model("Waitlist", waitlistSchema);