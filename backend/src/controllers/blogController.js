import Blog from "../models/Blog.js";

/* =========================================================
   HELPER: CREATE SEO-FRIENDLY SLUG
========================================================= */

const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* =========================================================
   HELPER: MAKE UNIQUE SLUG
========================================================= */

const makeUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = createSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const existingBlog = await Blog.findOne(query);

    if (!existingBlog) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
};

/* =========================================================
   RICH CONTENT SANITIZER
   Keeps only the formatting needed by the blog editor.
========================================================= */

const sanitizeRichContent = (html = "") => {
  let clean = String(html)
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[^>]*>/gi, "");

  const allowed = new Set(["p", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "ul", "ol", "li", "br", "a"]);

  clean = clean.replace(/<([a-z0-9]+)([^>]*)>/gi, (full, tagName, attrs) => {
    const tag = String(tagName).toLowerCase();
    if (!allowed.has(tag)) return "";

    if (tag === "br") return "<br>";

    if (tag !== "a") return `<${tag}>`;

    const hrefMatch = String(attrs).match(/href\s*=\s*["']([^"']+)["']/i);
    const href = hrefMatch?.[1]?.trim() || "#";
    const safeHref = /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : "#";

    return `<a href="${safeHref.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer">`;
  });

  clean = clean.replace(/<\/(?!p>|h2>|h3>|h4>|strong>|b>|em>|i>|u>|ul>|ol>|li>|a>)[^>]+>/gi, "");
  return clean.trim();
};

const validateCoverImage = (coverImage) => {
  if (!coverImage) return true;
  if (!String(coverImage).startsWith("data:image/")) return false;
  return String(coverImage).length <= 7 * 1024 * 1024;
};

/* =========================================================
   GET ALL PUBLISHED BLOGS
   PUBLIC
   GET /api/blogs
========================================================= */

export const getPublishedBlogs = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 9, 1),
      50
    );

    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const category = req.query.category?.trim();

    const filter = {
      status: "published",
    };

    /* Search */
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* Category */
    if (category) {
      filter.category = category;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name")
        .sort({
          publishedAt: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage:
          page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get published blogs error:", error);

    res.status(500).json({
      message: "Unable to load blogs.",
    });
  }
};

/* =========================================================
   GET SINGLE BLOG BY SLUG
   PUBLIC
   GET /api/blogs/:slug
========================================================= */

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      status: "published",
    })
      .populate("author", "name")
      .lean();

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.json({
      blog,
    });
  } catch (error) {
    console.error("Get blog error:", error);

    res.status(500).json({
      message: "Unable to load blog.",
    });
  }
};

/* =========================================================
   GET ALL BLOGS FOR ADMIN
   ADMIN ONLY
   GET /api/blogs/admin/all
========================================================= */

export const getAdminBlogs = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      100
    );

    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const status = req.query.status?.trim();
    const category = req.query.category?.trim();

    const filter = {};

    /* Search */
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /* Status */
    if (
      status &&
      ["draft", "published"].includes(status)
    ) {
      filter.status = status;
    }

    /* Category */
    if (category) {
      filter.category = category;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name email")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Blog.countDocuments(filter),
    ]);

    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get admin blogs error:", error);

    res.status(500).json({
      message: "Unable to load admin blogs.",
    });
  }
};

/* =========================================================
   GET SINGLE BLOG FOR ADMIN
   ADMIN ONLY
   GET /api/blogs/admin/:id
========================================================= */

export const getAdminBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("author", "name email")
      .lean();

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.json({
      blog,
    });
  } catch (error) {
    console.error("Get admin blog error:", error);

    res.status(500).json({
      message: "Unable to load blog.",
    });
  }
};

/* =========================================================
   CREATE BLOG
   ADMIN ONLY
   POST /api/blogs
========================================================= */

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      coverImageAlt,
      metaTitle,
      metaDescription,
      status,
    } = req.body;

    /* Required fields */
    if (!title?.trim()) {
      return res.status(400).json({
        message: "Blog title is required.",
      });
    }

    if (!excerpt?.trim()) {
      return res.status(400).json({
        message: "Blog excerpt is required.",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        message: "Blog content is required.",
      });
    }

    if (!validateCoverImage(coverImage)) {
      return res.status(400).json({
        message: "Cover image must be an uploaded image and must be 5 MB or smaller.",
      });
    }

    /* Validate status */
    const blogStatus =
      status === "published"
        ? "published"
        : "draft";

    /* Generate unique slug */
    const slug = await makeUniqueSlug(title);

    /* Clean tags */
    const cleanTags = Array.isArray(tags)
      ? [
          ...new Set(
            tags
              .map((tag) =>
                String(tag).trim()
              )
              .filter(Boolean)
          ),
        ]
      : [];

    const blog = await Blog.create({
      title: title.trim(),

      slug,

      excerpt: excerpt.trim(),

      content: sanitizeRichContent(content),

      category:
        category?.trim() ||
        "Food & Dining",

      tags: cleanTags,

      coverImage:
        coverImage?.trim() || "",

      coverImageAlt:
        coverImageAlt?.trim() || "",

      metaTitle:
        metaTitle?.trim() || "",

      metaDescription:
        metaDescription?.trim() || "",

      status: blogStatus,

      publishedAt:
        blogStatus === "published"
          ? new Date()
          : null,

      // Comes from authenticated admin
      author: req.user._id,
    });

    const populatedBlog =
      await Blog.findById(blog._id)
        .populate("author", "name email");

    res.status(201).json({
      message:
        blogStatus === "published"
          ? "Blog published successfully."
          : "Blog saved as draft.",

      blog: populatedBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    res.status(500).json({
      message: "Unable to create blog.",
    });
  }
};

/* =========================================================
   UPDATE BLOG
   ADMIN ONLY
   PUT /api/blogs/:id
========================================================= */

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      coverImageAlt,
      metaTitle,
      metaDescription,
      status,
    } = req.body;

    /* -------------------------
       TITLE
    ------------------------- */

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: "Blog title is required.",
        });
      }

      /*
       * Regenerate slug when title changes
       */
      if (
        title.trim().toLowerCase() !==
        blog.title.trim().toLowerCase()
      ) {
        blog.slug =
          await makeUniqueSlug(
            title,
            blog._id
          );
      }

      blog.title = title.trim();
    }

    /* -------------------------
       EXCERPT
    ------------------------- */

    if (excerpt !== undefined) {
      if (!excerpt.trim()) {
        return res.status(400).json({
          message:
            "Blog excerpt is required.",
        });
      }

      blog.excerpt = excerpt.trim();
    }

    /* -------------------------
       CONTENT
    ------------------------- */

    if (content !== undefined) {
      if (!content.trim()) {
        return res.status(400).json({
          message:
            "Blog content is required.",
        });
      }

      blog.content = sanitizeRichContent(content);
    }

    /* -------------------------
       CATEGORY
    ------------------------- */

    if (category !== undefined) {
      blog.category =
        category.trim() ||
        "Food & Dining";
    }

    /* -------------------------
       TAGS
    ------------------------- */

    if (tags !== undefined) {
      blog.tags = Array.isArray(tags)
        ? [
            ...new Set(
              tags
                .map((tag) =>
                  String(tag).trim()
                )
                .filter(Boolean)
            ),
          ]
        : [];
    }

    /* -------------------------
       IMAGE
    ------------------------- */

    if (coverImage !== undefined) {
      if (!validateCoverImage(coverImage)) {
        return res.status(400).json({
          message: "Cover image must be an uploaded image and must be 5 MB or smaller.",
        });
      }
      blog.coverImage = coverImage?.trim() || "";
    }

    if (coverImageAlt !== undefined) {
      blog.coverImageAlt =
        coverImageAlt.trim();
    }

    /* -------------------------
       SEO
    ------------------------- */

    if (metaTitle !== undefined) {
      blog.metaTitle =
        metaTitle.trim();
    }

    if (
      metaDescription !== undefined
    ) {
      blog.metaDescription =
        metaDescription.trim();
    }

    /* -------------------------
       STATUS
    ------------------------- */

    if (status !== undefined) {
      if (
        !["draft", "published"].includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid blog status.",
        });
      }

      /*
       * Draft → Published
       */
      if (
        status === "published" &&
        blog.status !== "published"
      ) {
        blog.publishedAt = new Date();
      }

      /*
       * Published → Draft
       */
      if (
        status === "draft"
      ) {
        blog.publishedAt = null;
      }

      blog.status = status;
    }

    await blog.save();

    const updatedBlog =
      await Blog.findById(blog._id)
        .populate("author", "name email");

    res.json({
      message:
        blog.status === "published"
          ? "Blog updated and published successfully."
          : "Blog updated successfully.",

      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    res.status(500).json({
      message: "Unable to update blog.",
    });
  }
};

/* =========================================================
   DELETE BLOG
   ADMIN ONLY
   DELETE /api/blogs/:id
========================================================= */

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog =
      await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    res.json({
      message:
        "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      message: "Unable to delete blog.",
    });
  }
};

/* =========================================================
   PUBLISH BLOG
   ADMIN ONLY
   PATCH /api/blogs/:id/publish
========================================================= */

export const publishBlog = async (
  req,
  res
) => {
  try {
    const blog =
      await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    blog.status = "published";
    blog.publishedAt = new Date();

    await blog.save();

    res.json({
      message:
        "Blog published successfully.",
      blog,
    });
  } catch (error) {
    console.error(
      "Publish blog error:",
      error
    );

    res.status(500).json({
      message:
        "Unable to publish blog.",
    });
  }
};

/* =========================================================
   UNPUBLISH BLOG
   ADMIN ONLY
   PATCH /api/blogs/:id/unpublish
========================================================= */

export const unpublishBlog = async (
  req,
  res
) => {
  try {
    const blog =
      await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    blog.status = "draft";
    blog.publishedAt = null;

    await blog.save();

    res.json({
      message:
        "Blog moved to draft.",
      blog,
    });
  } catch (error) {
    console.error(
      "Unpublish blog error:",
      error
    );

    res.status(500).json({
      message:
        "Unable to move blog to draft.",
    });
  }
};