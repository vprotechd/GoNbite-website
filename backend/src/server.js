import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

import { config } from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import waitlistRoutes from "./routes/waitlistRoutes.js";

import Blog from "./models/Blog.js";

const app = express();

app.set("trust proxy", 1);

/* =========================================================
   SECURITY
========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...config.corsOrigins,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman / server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);

      return callback(new Error("CORS origin denied"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "8mb",
  })
);

/* =========================================================
   RATE LIMIT
========================================================= */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "GoNbite API",
    time: new Date().toISOString(),
  });
});

/* =========================================================
   API ROUTES
========================================================= */

app.use("/api/auth", authRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/waitlist", waitlistRoutes);

/* =========================================================
   SITEMAP
========================================================= */

app.get("/sitemap.xml", async (_req, res) => {
  try {
    const blogs = await Blog.find({
      status: "published",
    })
      .select("slug updatedAt")
      .sort({ updatedAt: -1 })
      .lean();

    const baseUrl =
      config.frontendUrl || "http://localhost:5173";

    const staticUrls = [
      "/",
      "/about",
      "/why-choose-us",
      "/blogs",
    ];

    const blogUrls = blogs.map(
      (blog) => `/blogs/${blog.slug}`
    );

    const urls = [...staticUrls, ...blogUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res
      .type("application/xml")
      .send(xml);
  } catch (error) {
    console.error("Sitemap error:", error);

    res.status(500).json({
      message: "Unable to generate sitemap.",
    });
  }
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((err, _req, res, _next) => {
  console.error("Server error:", err);

  if (err.message === "CORS origin denied") {
    return res.status(403).json({
      message: "CORS origin denied.",
    });
  }

  res.status(500).json({
    message: "Internal server error.",
  });
});

/* =========================================================
   MONGODB + SERVER
========================================================= */

mongoose
  .connect(config.mongo)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(config.port, "0.0.0.0", () => {
      console.log(
        `GoNbite API running on http://localhost:${config.port}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  });