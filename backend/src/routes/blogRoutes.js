import { Router } from "express";

import {
  getPublishedBlogs,
  getBlogBySlug,
  getAdminBlogs,
  getAdminBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} from "../controllers/blogController.js";

import {
  requireAuth,
  requireAdmin,
} from "../middleware/auth.js";

const router = Router();

/* =========================================================
   ADMIN BLOG ROUTES
   IMPORTANT:
   These must come BEFORE /:slug
========================================================= */

/*
  Get all blogs for admin
  GET /api/blogs/admin/all
*/
router.get(
  "/admin/all",
  requireAuth,
  requireAdmin,
  getAdminBlogs
);

/*
  Get one blog by ID for admin
  GET /api/blogs/admin/:id
*/
router.get(
  "/admin/:id",
  requireAuth,
  requireAdmin,
  getAdminBlogById
);

/*
  Create blog
  POST /api/blogs
*/
router.post(
  "/",
  requireAuth,
  requireAdmin,
  createBlog
);

/*
  Update blog
  PUT /api/blogs/:id
*/
router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  updateBlog
);

/*
  Delete blog
  DELETE /api/blogs/:id
*/
router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  deleteBlog
);

/*
  Publish blog
  PATCH /api/blogs/:id/publish
*/
router.patch(
  "/:id/publish",
  requireAuth,
  requireAdmin,
  publishBlog
);

/*
  Unpublish blog
  PATCH /api/blogs/:id/unpublish
*/
router.patch(
  "/:id/unpublish",
  requireAuth,
  requireAdmin,
  unpublishBlog
);

/* =========================================================
   PUBLIC BLOG ROUTES
========================================================= */

/*
  Get published blogs
  GET /api/blogs
*/
router.get(
  "/",
  getPublishedBlogs
);

/*
  Get published blog by slug
  GET /api/blogs/:slug
*/
router.get(
  "/:slug",
  getBlogBySlug
);

export default router;