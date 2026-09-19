import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    // ================================
    // BASIC BLOG INFORMATION
    // ================================

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },

    content: {
      type: String,
      required: true,
    },

    // ================================
    // CATEGORY & TAGS
    // ================================

    category: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "Food & Dining",
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    // ================================
    // COVER IMAGE
    // ================================

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    coverImageAlt: {
      type: String,
      trim: true,
      maxlength: 180,
      default: "",
    },

    // ================================
    // SEO
    // ================================

    metaTitle: {
      type: String,
      trim: true,
      maxlength: 65,
      default: "",
    },

    metaDescription: {
      type: String,
      trim: true,
      maxlength: 170,
      default: "",
    },

    // ================================
    // PUBLICATION STATUS
    // ================================

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // ================================
    // AUTHOR
    // ================================

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// AUTOMATIC PUBLICATION DATE
// ======================================

blogSchema.pre("save", function (next) {
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  if (this.status === "draft") {
    this.publishedAt = null;
  }

  next();
});

export default mongoose.model("Blog", blogSchema);