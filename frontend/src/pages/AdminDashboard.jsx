

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Bold,
//   ExternalLink,
//   Heading2,
//   Heading3,
//   Italic,
//   Link as LinkIcon,
//   List,
//   ListOrdered,
//   LogOut,

//   RefreshCw,
//   Trash2,
//   Underline,
//   Upload,
// } from "lucide-react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { API, useAuth } from "../context/AuthContext";
// import "./AdminDashboard.css";

// const emptyForm = {
//   title: "",
//   excerpt: "",
//   content: "<p>Start writing your story here...</p>",
//   category: "Food & Dining",
//   coverImage: "",
//   coverImageAlt: "",
//   metaTitle: "",
//   metaDescription: "",
//   tags: "",
//   status: "draft",
// };

// const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// const maxImageSize = 5 * 1024 * 1024;

// function htmlToPlainText(html) {
//   const div = document.createElement("div");
//   div.innerHTML = html;
//   return div.textContent?.replace(/\s+/g, " ").trim() || "";
// }

// export default function AdminDashboard() {
//   const { token, user, logout } = useAuth();
//   const navigate = useNavigate();
//   const editorRef = useRef(null);
//   const fileRef = useRef(null);

//   const [posts, setPosts] = useState([]);
//   const [form, setForm] = useState(emptyForm);
//   const [editing, setEditing] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };

//   const loadPosts = async () => {
//     try {
//       setError("");
//       const response = await fetch(`${API}/blogs/admin/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 401 || response.status === 403) {
//         logout();
//         navigate("/login");
//         return;
//       }

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Unable to load blogs.");
//       setPosts(data.blogs || []);
//     } catch (err) {
//       const message = err.message || "Unable to load blog posts.";
//       setError(message);
//       showToast(message, "error");
//     }
//   };

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== form.content) {
//       editorRef.current.innerHTML = form.content || "<p></p>";
//     }
//   }, [editing]);

//   const published = useMemo(
//     () => posts.filter((post) => post.status === "published").length,
//     [posts]
//   );

//   const resetMessages = () => {
//     setMessage("");
//     setError("");
//   };

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });

//     window.setTimeout(() => {
//       setToast(null);
//     }, 3500);
//   };

//   const updateForm = (key, value) => {
//     resetMessages();
//     setForm((previous) => ({ ...previous, [key]: value }));
//   };

//   const applyFormat = (command, value = null) => {
//     editorRef.current?.focus();
//     document.execCommand(command, false, value);
//     const html = editorRef.current?.innerHTML || "";
//     setForm((previous) => ({ ...previous, content: html }));
//   };

//   const setHeading = (level) => {
//     applyFormat("formatBlock", `<${level}>`);
//   };

//   const addLink = () => {
//     editorRef.current?.focus();
//     const url = window.prompt("Enter the link URL:", "https://");
//     if (!url) return;

//     const cleanUrl = url.trim();
//     if (!/^(https?:\/\/|mailto:|\/|#)/i.test(cleanUrl)) {
//       const message = "Please enter a valid https://, http://, mailto:, / or # link.";
//       setError(message);
//       showToast(message, "error");
//       return;
//     }

//     document.execCommand("createLink", false, cleanUrl);
//     const html = editorRef.current?.innerHTML || "";
//     setForm((previous) => ({ ...previous, content: html }));
//   };

//   const handleEditorInput = (event) => {
//     // React may clear event.currentTarget before the functional state
//     // updater runs. Capture the HTML synchronously first.
//     const content = event.currentTarget?.innerHTML || "";

//     setForm((previous) => ({
//       ...previous,
//       content,
//     }));
//     setError("");
//     setMessage("");
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     event.target.value = "";

//     if (!file) return;

//     if (!allowedImageTypes.includes(file.type)) {
//       const message = "Please upload a JPG, PNG, WEBP or GIF image.";
//       setError(message);
//       showToast(message, "error");
//       return;
//     }

//     if (file.size > maxImageSize) {
//       const message = "Image size must be 5 MB or smaller.";
//       setError(message);
//       showToast(message, "error");
//       return;
//     }

//     setImageLoading(true);
//     setError("");

//     const reader = new FileReader();
//     reader.onload = () => {
//       setForm((previous) => ({
//         ...previous,
//         coverImage: String(reader.result || ""),
//       }));
//       setImageLoading(false);
//     };
//     reader.onerror = () => {
//       const message = "Unable to read the selected image.";
//       setError(message);
//       showToast(message, "error");
//       setImageLoading(false);
//     };
//     reader.readAsDataURL(file);
//   };

//   const save = async (event) => {
//     event.preventDefault();
//     resetMessages();
//     setLoading(true);

//     try {
//       const content = editorRef.current?.innerHTML || form.content || "";
//       const textContent = htmlToPlainText(content);

//       if (!textContent) {
//         throw new Error("Please add some article content.");
//       }

//       if (!form.coverImage) {
//         throw new Error("Please upload a cover image for this blog.");
//       }

//       const payload = {
//         ...form,
//         content,
//         tags: form.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       };

//       const url = editing ? `${API}/blogs/${editing}` : `${API}/blogs`;
//       const response = await fetch(url, {
//         method: editing ? "PUT" : "POST",
//         headers,
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Unable to save blog.");

//       if (form.status === "published") {
//         showToast(
//           editing
//             ? "Blog updated and published successfully."
//             : "Blog published successfully."
//         );
//       } else {
//         showToast(
//           editing
//             ? "Blog updated successfully."
//             : "Blog saved as draft successfully."
//         );
//       }

//       setMessage("");
//       setForm(emptyForm);
//       setEditing(null);
//       if (editorRef.current) editorRef.current.innerHTML = emptyForm.content;
//       await loadPosts();
//     } catch (err) {
//       const message = err.message || "Unable to save blog.";
//       setError(message);
//       showToast(message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const edit = (post) => {
//     resetMessages();
//     setEditing(post._id);
//     setForm({
//       title: post.title || "",
//       excerpt: post.excerpt || "",
//       content: post.content?.trim().startsWith("<")
//         ? post.content
//         : `<p>${(post.content || "").replace(/\n+/g, "</p><p>")}</p>`,
//       category: post.category || "Food & Dining",
//       coverImage: post.coverImage || "",
//       coverImageAlt: post.coverImageAlt || "",
//       metaTitle: post.metaTitle || "",
//       metaDescription: post.metaDescription || "",
//       tags: (post.tags || []).join(", "),
//       status: post.status || "draft",
//     });

//     showToast("Blog is ready for editing.", "info");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const remove = async (id) => {
//     try {
//       resetMessages();

//       const response = await fetch(`${API}/blogs/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Unable to delete blog.");
//       }

//       showToast("Blog deleted successfully.");
//       await loadPosts();
//     } catch (err) {
//       const message = err.message || "Unable to delete blog.";
//       setError(message);
//       showToast(message, "error");
//     } finally {
//       setDeleteTarget(null);
//     }
//   };

//   const cancelEditing = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     resetMessages();
//     if (editorRef.current) editorRef.current.innerHTML = emptyForm.content;
//   };

//   const signOut = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="admin-page">
//       {toast && (
//         <div className={`admin-toast ${toast.type}`} role="status">
//           <div className="admin-toast-icon">
//             {toast.type === "error" ? "!" : toast.type === "info" ? "i" : "✓"}
//           </div>

//           <div className="admin-toast-content">
//             <strong>
//               {toast.type === "error"
//                 ? "Something went wrong"
//                 : toast.type === "info"
//                 ? "Edit mode"
//                 : "Success"}
//             </strong>
//             <span>{toast.message}</span>
//           </div>

//           <button
//             type="button"
//             className="admin-toast-close"
//             onClick={() => setToast(null)}
//             aria-label="Close notification"
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {deleteTarget && (
//         <div
//           className="admin-confirm-overlay"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="delete-confirm-title"
//         >
//           <div className="admin-confirm-modal">
//             <div className="admin-confirm-icon">
//               <Trash2 size={20} />
//             </div>

//             <h3 id="delete-confirm-title">Delete blog post?</h3>

//             <p>
//               This action cannot be undone.
//               {deleteTarget.title ? (
//                 <>
//                   <br />
//                   <strong>{deleteTarget.title}</strong>
//                 </>
//               ) : null}
//             </p>

//             <div className="admin-confirm-actions">
//               <button
//                 type="button"
//                 className="admin-small"
//                 onClick={() => setDeleteTarget(null)}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 className="admin-small danger"
//                 onClick={() => remove(deleteTarget._id)}
//               >
//                 <Trash2 size={14} />
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Navbar />

//       <main className="admin-shell">
//         <div className="admin-head">
//           <div>
//             <div className="admin-badge">ADMIN WORKSPACE</div>
//             <h1>
//               Content <span style={{ color: "#ff6b35" }}>Studio.</span>
//             </h1>
//             <p>
//               Welcome, {user?.name || "Administrator"}. Create and manage GoNbite stories without touching the codebase.
//             </p>
//           </div>

//           <button className="admin-logout" onClick={signOut} type="button">
//             <LogOut size={15} /> Sign out
//           </button>
//         </div>

//         <div className="admin-stats">
//           <div className="admin-stat">
//             <small>Total posts</small>
//             <strong>{posts.length}</strong>
//           </div>
//           <div className="admin-stat">
//             <small>Published</small>
//             <strong>{published}</strong>
//           </div>
//           <div className="admin-stat">
//             <small>Drafts</small>
//             <strong>{posts.length - published}</strong>
//           </div>
//         </div>

//         <div className="admin-layout">
//           <section className="admin-panel">
//             <div className="admin-panel-title">
//               <div>
//                 <span className="admin-section-label">BLOG EDITOR</span>
//                 <h2>{editing ? "Edit story" : "Create a story"}</h2>
//               </div>
//               {editing && <span className="admin-editing">Editing</span>}
//             </div>

//             {(message || error) && (
//               <div className={error ? "form-error" : "form-success"}>
//                 {error || message}
//               </div>
//             )}

//             <form className="admin-form" onSubmit={save}>
//               <div className="form-field">
//                 <label htmlFor="blog-title">Blog title</label>
//                 <input
//                   id="blog-title"
//                   required
//                   value={form.title}
//                   onChange={(event) => updateForm("title", event.target.value)}
//                   placeholder="Enter an SEO-friendly blog title"
//                 />
//               </div>

//               <div className="form-field">
//                 <label htmlFor="blog-excerpt">Excerpt</label>
//                 <textarea
//                   id="blog-excerpt"
//                   required
//                   rows="3"
//                   maxLength="320"
//                   value={form.excerpt}
//                   onChange={(event) => updateForm("excerpt", event.target.value)}
//                   placeholder="Short summary shown on the blog listing"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-field">
//                   <label htmlFor="blog-category">Category</label>
//                   <select
//                     id="blog-category"
//                     value={form.category}
//                     onChange={(event) => updateForm("category", event.target.value)}
//                   >
//                     <option>Food & Dining</option>
//                     <option>Mohali Food Guide</option>
//                     <option>Restaurant Insights</option>
//                     <option>Ordering Tips</option>
//                     <option>GoNbite News</option>
//                   </select>
//                 </div>

//                 <div className="form-field">
//                   <label htmlFor="blog-status">Status</label>
//                   <select
//                     id="blog-status"
//                     value={form.status}
//                     onChange={(event) => updateForm("status", event.target.value)}
//                   >
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-field">
//                 <label>Cover image</label>
//                 <div className="image-upload-box">
//                   {form.coverImage ? (
//                     <div className="image-preview-wrap">
//                       <img src={form.coverImage} alt="Blog cover preview" className="admin-image-preview" />
//                       <div className="image-upload-actions">
//                         <button type="button" className="admin-small" onClick={() => fileRef.current?.click()}>
//                           <Upload size={14} /> Replace image
//                         </button>
//                         <button
//                           type="button"
//                           className="admin-small danger"
//                           onClick={() => updateForm("coverImage", "")}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button type="button" className="upload-placeholder" onClick={() => fileRef.current?.click()}>
//                       <Upload size={25} />
//                       <strong>{imageLoading ? "Reading image…" : "Upload cover image"}</strong>
//                       <span>JPG, PNG, WEBP or GIF · Maximum 5 MB</span>
//                     </button>
//                   )}
//                   <input
//                     ref={fileRef}
//                     type="file"
//                     accept="image/jpeg,image/png,image/webp,image/gif"
//                     hidden
//                     onChange={handleImageUpload}
//                   />
//                 </div>
//               </div>

//               <div className="form-field">
//                 <label htmlFor="blog-image-alt">Image alt text</label>
//                 <input
//                   id="blog-image-alt"
//                   maxLength="180"
//                   value={form.coverImageAlt}
//                   onChange={(event) => updateForm("coverImageAlt", event.target.value)}
//                   placeholder="Describe the cover image for accessibility and SEO"
//                 />
//               </div>

//               <div className="form-field">
//                 <label>Article content</label>
//                 <div className="rich-editor">
//                   <div className="editor-toolbar" aria-label="Blog formatting toolbar">
//                     <button type="button" title="Heading 2" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading("h2")}>
//                       <Heading2 size={17} />
//                     </button>
//                     <button type="button" title="Heading 3" onMouseDown={(e) => e.preventDefault()} onClick={() => setHeading("h3")}>
//                       <Heading3 size={17} />
//                     </button>
//                     <span className="toolbar-divider" />
//                     <button type="button" title="Bold" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("bold")}>
//                       <Bold size={17} />
//                     </button>
//                     <button type="button" title="Italic" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("italic")}>
//                       <Italic size={17} />
//                     </button>
//                     <button type="button" title="Underline" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("underline")}>
//                       <Underline size={17} />
//                     </button>
//                     <span className="toolbar-divider" />
//                     <button type="button" title="Bullet list" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("insertUnorderedList")}>
//                       <List size={17} />
//                     </button>
//                     <button type="button" title="Numbered list" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("insertOrderedList")}>
//                       <ListOrdered size={17} />
//                     </button>
//                     <button type="button" title="Add link" onMouseDown={(e) => e.preventDefault()} onClick={addLink}>
//                       <LinkIcon size={17} />
//                     </button>
//                   </div>

//                   <div
//                     ref={editorRef}
//                     className="rich-editor-area"
//                     contentEditable
//                     suppressContentEditableWarning
//                     onInput={handleEditorInput}
//                     onBlur={handleEditorInput}
//                     role="textbox"
//                     aria-label="Blog article content"
//                   />
//                 </div>
//                 <small className="editor-help">
//                   Select text before clicking the link button. Use H2/H3 for headings, lists for structured content, and the formatting buttons for emphasis.
//                 </small>
//               </div>

//               <div className="form-field">
//                 <label htmlFor="blog-tags">Tags <small>(comma separated)</small></label>
//                 <input
//                   id="blog-tags"
//                   value={form.tags}
//                   onChange={(event) => updateForm("tags", event.target.value)}
//                   placeholder="Mohali, food guide, restaurants"
//                 />
//               </div>

//               <div className="admin-seo-box">
//                 <div className="admin-section-label">SEARCH ENGINE OPTIMIZATION</div>
//                 <div className="form-field">
//                   <label htmlFor="meta-title">SEO title</label>
//                   <input
//                     id="meta-title"
//                     maxLength="65"
//                     value={form.metaTitle}
//                     onChange={(event) => updateForm("metaTitle", event.target.value)}
//                     placeholder="Optional SEO title"
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label htmlFor="meta-description">SEO description</label>
//                   <textarea
//                     id="meta-description"
//                     maxLength="170"
//                     rows="3"
//                     value={form.metaDescription}
//                     onChange={(event) => updateForm("metaDescription", event.target.value)}
//                     placeholder="Optional meta description"
//                   />
//                 </div>
//               </div>

//               <div className="admin-form-actions">
//                 <button className="form-submit" disabled={loading || imageLoading} type="submit">
//                   {loading ? "Saving…" : editing ? "Update blog" : "Save blog"}
//                 </button>
//                 {editing && (
//                   <button type="button" className="admin-small cancel-btn" onClick={cancelEditing}>
//                     Cancel editing
//                   </button>
//                 )}
//               </div>
//             </form>
//           </section>

//           <section className="admin-panel">
//             <div className="admin-library-head">
//               <div>
//                 <span className="admin-section-label">CONTENT LIBRARY</span>
//                 <h2>All blog posts</h2>
//               </div>
//               <button className="admin-small" onClick={loadPosts} type="button" title="Refresh">
//                 <RefreshCw size={14} />
//               </button>
//             </div>

//             <div className="admin-list">
//               {posts.length ? (
//                 posts.map((post) => (
//                   <div className="admin-post" key={post._id}>
//                     <img src={post.coverImage || "/gonbite-icon.png"} alt={post.coverImageAlt || ""} />
//                     <div className="admin-post-info">
//                       <h3>{post.title}</h3>
//                       <p>
//                         <span className={`status-pill ${post.status}`}>{post.status}</span>
//                         <span> · {post.category}</span>
//                         <span> · {new Date(post.createdAt).toLocaleDateString()}</span>
//                       </p>
//                     </div>
//                     <div className="admin-actions">
//                       <button className="admin-small" onClick={() => edit(post)} type="button">Edit</button>
//                       {post.status === "published" && (
//                         <a className="admin-small" href={`/blogs/${post.slug}`} target="_blank" rel="noreferrer" title="Open blog">
//                           <ExternalLink size={13} />
//                         </a>
//                       )}
//                       <button
//                         className="admin-small danger"
//                         onClick={() => setDeleteTarget(post)}
//                         type="button"
//                         title="Delete"
//                       >
//                         <Trash2 size={13} />
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="blog-empty">No posts yet. Create your first story.</div>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bold,
  ExternalLink,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  LogOut,
  RefreshCw,
  Trash2,
  Underline,
  Upload,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "<p>Start writing your story here...</p>",
  category: "Food & Dining",
  coverImage: "",
  coverImageAlt: "",
  metaTitle: "",
  metaDescription: "",
  tags: "",
  status: "draft",
};

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const maxImageSize = 5 * 1024 * 1024;

function htmlToPlainText(html) {
  const div = document.createElement("div");
  div.innerHTML = html;

  return div.textContent?.replace(/\s+/g, " ").trim() || "";
}

function formatUserDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const fileRef = useRef(null);

  // =========================================================
  // BLOG STATES
  // =========================================================

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  // =========================================================
  // USER STATES
  // =========================================================

  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  // =========================================================
  // GENERAL STATES
  // =========================================================

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // =========================================================
  // TOAST
  // =========================================================

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // =========================================================
  // RESET MESSAGES
  // =========================================================

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  // =========================================================
  // LOAD BLOG POSTS
  // =========================================================

  const loadPosts = async () => {
    try {
      setError("");

      const response = await fetch(`${API}/blogs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load blogs.");
      }

      setPosts(data.blogs || []);
    } catch (err) {
      const message = err.message || "Unable to load blog posts.";

      setError(message);
      showToast(message, "error");
    }
  };

  // =========================================================
  // LOAD REGISTERED USERS
  // =========================================================

  const loadUsers = async () => {
    try {
      const response = await fetch(`${API}/users/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load users.");
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      const message =
        err.message || "Unable to load registered users.";

      setError(message);
      showToast(message, "error");
    }
  };

  // =========================================================
  // LOAD DATA ON PAGE LOAD
  // =========================================================

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  // =========================================================
  // EDITOR SYNC
  // =========================================================

  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.innerHTML !== form.content
    ) {
      editorRef.current.innerHTML =
        form.content || "<p></p>";
    }
  }, [editing]);

  // =========================================================
  // BLOG STATS
  // =========================================================

  const published = useMemo(
    () =>
      posts.filter(
        (post) => post.status === "published"
      ).length,
    [posts]
  );

  const drafts = posts.length - published;

  // =========================================================
  // USER SEARCH
  // =========================================================

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((currentUser) => {
      const name = currentUser.name || "";
      const email = currentUser.email || "";

      return `${name} ${email}`
        .toLowerCase()
        .includes(query);
    });
  }, [users, userSearch]);

  // =========================================================
  // FORM UPDATE
  // =========================================================

  const updateForm = (key, value) => {
    resetMessages();

    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // =========================================================
  // EDITOR FORMATTING
  // =========================================================

  const applyFormat = (command, value = null) => {
    editorRef.current?.focus();

    document.execCommand(command, false, value);

    const html =
      editorRef.current?.innerHTML || "";

    setForm((previous) => ({
      ...previous,
      content: html,
    }));
  };

  const setHeading = (level) => {
    applyFormat("formatBlock", `<${level}>`);
  };

  // =========================================================
  // ADD LINK
  // =========================================================

  const addLink = () => {
    editorRef.current?.focus();

    const url = window.prompt(
      "Enter the link URL:",
      "https://"
    );

    if (!url) return;

    const cleanUrl = url.trim();

    if (
      !/^(https?:\/\/|mailto:|\/|#)/i.test(
        cleanUrl
      )
    ) {
      const message =
        "Please enter a valid https://, http://, mailto:, / or # link.";

      setError(message);
      showToast(message, "error");

      return;
    }

    document.execCommand(
      "createLink",
      false,
      cleanUrl
    );

    const html =
      editorRef.current?.innerHTML || "";

    setForm((previous) => ({
      ...previous,
      content: html,
    }));
  };

  // =========================================================
  // EDITOR INPUT
  // =========================================================

  const handleEditorInput = (event) => {
    const content =
      event.currentTarget?.innerHTML || "";

    setForm((previous) => ({
      ...previous,
      content,
    }));

    setError("");
    setMessage("");
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!allowedImageTypes.includes(file.type)) {
      const message =
        "Please upload a JPG, PNG, WEBP or GIF image.";

      setError(message);
      showToast(message, "error");

      return;
    }

    if (file.size > maxImageSize) {
      const message =
        "Image size must be 5 MB or smaller.";

      setError(message);
      showToast(message, "error");

      return;
    }

    setImageLoading(true);
    setError("");

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        coverImage: String(reader.result || ""),
      }));

      setImageLoading(false);
    };

    reader.onerror = () => {
      const message =
        "Unable to read the selected image.";

      setError(message);
      showToast(message, "error");

      setImageLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // SAVE BLOG
  // =========================================================

  const save = async (event) => {
    event.preventDefault();

    resetMessages();
    setLoading(true);

    try {
      const content =
        editorRef.current?.innerHTML ||
        form.content ||
        "";

      const textContent =
        htmlToPlainText(content);

      if (!textContent) {
        throw new Error(
          "Please add some article content."
        );
      }

      if (!form.coverImage) {
        throw new Error(
          "Please upload a cover image for this blog."
        );
      }

      const payload = {
        ...form,
        content,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const url = editing
        ? `${API}/blogs/${editing}`
        : `${API}/blogs`;

      const response = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save blog."
        );
      }

      if (form.status === "published") {
        showToast(
          editing
            ? "Blog updated and published successfully."
            : "Blog published successfully."
        );
      } else {
        showToast(
          editing
            ? "Blog updated successfully."
            : "Blog saved as draft successfully."
        );
      }

      setMessage("");

      setForm(emptyForm);
      setEditing(null);

      if (editorRef.current) {
        editorRef.current.innerHTML =
          emptyForm.content;
      }

      await loadPosts();
    } catch (err) {
      const message =
        err.message || "Unable to save blog.";

      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT BLOG
  // =========================================================

  const edit = (post) => {
    resetMessages();

    setEditing(post._id);

    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content?.trim().startsWith("<")
        ? post.content
        : `<p>${(post.content || "").replace(
            /\n+/g,
            "</p><p>"
          )}</p>`,
      category:
        post.category || "Food & Dining",
      coverImage: post.coverImage || "",
      coverImageAlt: post.coverImageAlt || "",
      metaTitle: post.metaTitle || "",
      metaDescription:
        post.metaDescription || "",
      tags: (post.tags || []).join(", "),
      status: post.status || "draft",
    });

    showToast(
      "Blog is ready for editing.",
      "info"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE BLOG
  // =========================================================

  const remove = async (id) => {
    try {
      resetMessages();

      const response = await fetch(
        `${API}/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete blog."
        );
      }

      showToast("Blog deleted successfully.");

      await loadPosts();
    } catch (err) {
      const message =
        err.message || "Unable to delete blog.";

      setError(message);
      showToast(message, "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // =========================================================
  // CANCEL EDITING
  // =========================================================

  const cancelEditing = () => {
    setEditing(null);
    setForm(emptyForm);
    resetMessages();

    if (editorRef.current) {
      editorRef.current.innerHTML =
        emptyForm.content;
    }
  };

  // =========================================================
  // SIGN OUT
  // =========================================================

  const signOut = () => {
    logout();
    navigate("/");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="admin-page">

      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div
          className={`admin-toast ${toast.type}`}
          role="status"
        >
          <div className="admin-toast-icon">
            {toast.type === "error"
              ? "!"
              : toast.type === "info"
              ? "i"
              : "✓"}
          </div>

          <div className="admin-toast-content">
            <strong>
              {toast.type === "error"
                ? "Something went wrong"
                : toast.type === "info"
                ? "Edit mode"
                : "Success"}
            </strong>

            <span>{toast.message}</span>
          </div>

          <button
            type="button"
            className="admin-toast-close"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
      ====================================================== */}

      {deleteTarget && (
        <div
          className="admin-confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
        >
          <div className="admin-confirm-modal">

            <div className="admin-confirm-icon">
              <Trash2 size={20} />
            </div>

            <h3 id="delete-confirm-title">
              Delete blog post?
            </h3>

            <p>
              This action cannot be undone.

              {deleteTarget.title ? (
                <>
                  <br />
                  <strong>
                    {deleteTarget.title}
                  </strong>
                </>
              ) : null}
            </p>

            <div className="admin-confirm-actions">

              <button
                type="button"
                className="admin-small"
                onClick={() =>
                  setDeleteTarget(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-small danger"
                onClick={() =>
                  remove(deleteTarget._id)
                }
              >
                <Trash2 size={14} />
                Delete
              </button>

            </div>
          </div>
        </div>
      )}

      <Navbar />

      <main className="admin-shell">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="admin-head">

          <div>
            <div className="admin-badge">
              ADMIN WORKSPACE
            </div>

            <h1>
              Content{" "}
              <span style={{ color: "#ff6b35" }}>
                Studio.
              </span>
            </h1>

            <p>
              Welcome,{" "}
              {user?.name || "Administrator"}.
              Create and manage GoNbite stories
              without touching the codebase.
            </p>
          </div>

          <button
            className="admin-logout"
            onClick={signOut}
            type="button"
          >
            <LogOut size={15} />
            Sign out
          </button>

        </div>

        {/* ===================================================
            DASHBOARD STATS
        ==================================================== */}

        <div className="admin-stats">

          <div className="admin-stat">
            <small>Total posts</small>
            <strong>{posts.length}</strong>
          </div>

          <div className="admin-stat">
            <small>Published</small>
            <strong>{published}</strong>
          </div>

          <div className="admin-stat">
            <small>Drafts</small>
            <strong>{drafts}</strong>
          </div>

          <div className="admin-stat">
            <small>Registered users</small>
            <strong>{users.length}</strong>
          </div>

        </div>

        {/* ===================================================
            REGISTERED USERS
        ==================================================== */}

        <section className="admin-users-panel">

          <div className="admin-users-head">

            <div>
              <span className="admin-section-label">
                USER MANAGEMENT
              </span>

              <h2>
                Registered users{" "}
                <span>{users.length}</span>
              </h2>
            </div>

            <button
              className="admin-small"
              onClick={loadUsers}
              type="button"
              title="Refresh users"
            >
              <RefreshCw size={14} />
              Refresh
            </button>

          </div>

          {/* USER SEARCH */}

          <div className="admin-users-toolbar">

            <input
              type="search"
              value={userSearch}
              onChange={(event) =>
                setUserSearch(event.target.value)
              }
              placeholder="Search users by name or email..."
              aria-label="Search registered users"
            />

          </div>

          {/* USERS LIST */}

          <div className="admin-users-list">

            {filteredUsers.length > 0 ? (
              filteredUsers.map((currentUser) => {

                const displayName =
                  currentUser.name?.trim() ||
                  currentUser.email
                    ?.split("@")[0] ||
                  "User";

                const initials =
                  displayName
                    .charAt(0)
                    .toUpperCase();

                return (
                  <div
                    className="admin-user-row"
                    key={currentUser._id}
                  >

                    {/* AVATAR */}

                    <div className="admin-user-avatar">
                      {initials}
                    </div>

                    {/* USER DETAILS */}

                    <div className="admin-user-info">

                      <h3>{displayName}</h3>

                      <p>
                        {currentUser.email ||
                          "No email available"}
                      </p>

                    </div>

                    {/* USER DATE */}

                    <div className="admin-user-date">

                      <small>
                        Registered
                      </small>

                      <span>
                        {formatUserDate(
                          currentUser.createdAt
                        )}
                      </span>

                    </div>

                    {/* VERIFICATION */}

                    <div
                      className={`admin-user-status ${
                        currentUser.isEmailVerified
                          ? "verified"
                          : "pending"
                      }`}
                    >
                      {currentUser.isEmailVerified
                        ? "Verified"
                        : "Pending"}
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="admin-users-empty">

                {userSearch.trim() ? (
                  <>
                    No users found for{" "}
                    <strong>
                      "{userSearch}"
                    </strong>
                    .
                  </>
                ) : (
                  "No registered users yet."
                )}

              </div>
            )}

          </div>

        </section>

        {/* ===================================================
            BLOG LAYOUT
        ==================================================== */}

        <div className="admin-layout">

          {/* =================================================
              BLOG EDITOR
          ================================================== */}

          <section className="admin-panel">

            <div className="admin-panel-title">

              <div>
                <span className="admin-section-label">
                  BLOG EDITOR
                </span>

                <h2>
                  {editing
                    ? "Edit story"
                    : "Create a story"}
                </h2>
              </div>

              {editing && (
                <span className="admin-editing">
                  Editing
                </span>
              )}

            </div>

            {(message || error) && (
              <div
                className={
                  error
                    ? "form-error"
                    : "form-success"
                }
              >
                {error || message}
              </div>
            )}

            <form
              className="admin-form"
              onSubmit={save}
            >

              {/* BLOG TITLE */}

              <div className="form-field">

                <label htmlFor="blog-title">
                  Blog title
                </label>

                <input
                  id="blog-title"
                  required
                  value={form.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="Enter an SEO-friendly blog title"
                />

              </div>

              {/* EXCERPT */}

              <div className="form-field">

                <label htmlFor="blog-excerpt">
                  Excerpt
                </label>

                <textarea
                  id="blog-excerpt"
                  required
                  rows="3"
                  maxLength="320"
                  value={form.excerpt}
                  onChange={(event) =>
                    updateForm(
                      "excerpt",
                      event.target.value
                    )
                  }
                  placeholder="Short summary shown on the blog listing"
                />

              </div>

              {/* CATEGORY + STATUS */}

              <div className="form-row">

                <div className="form-field">

                  <label htmlFor="blog-category">
                    Category
                  </label>

                  <select
                    id="blog-category"
                    value={form.category}
                    onChange={(event) =>
                      updateForm(
                        "category",
                        event.target.value
                      )
                    }
                  >
                    <option>
                      Food & Dining
                    </option>

                    <option>
                      Mohali Food Guide
                    </option>

                    <option>
                      Restaurant Insights
                    </option>

                    <option>
                      Ordering Tips
                    </option>

                    <option>
                      GoNbite News
                    </option>
                  </select>

                </div>

                <div className="form-field">

                  <label htmlFor="blog-status">
                    Status
                  </label>

                  <select
                    id="blog-status"
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>
                  </select>

                </div>

              </div>

              {/* COVER IMAGE */}

              <div className="form-field">

                <label>
                  Cover image
                </label>

                <div className="image-upload-box">

                  {form.coverImage ? (

                    <div className="image-preview-wrap">

                      <img
                        src={form.coverImage}
                        alt="Blog cover preview"
                        className="admin-image-preview"
                      />

                      <div className="image-upload-actions">

                        <button
                          type="button"
                          className="admin-small"
                          onClick={() =>
                            fileRef.current?.click()
                          }
                        >
                          <Upload size={14} />
                          Replace image
                        </button>

                        <button
                          type="button"
                          className="admin-small danger"
                          onClick={() =>
                            updateForm(
                              "coverImage",
                              ""
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  ) : (

                    <button
                      type="button"
                      className="upload-placeholder"
                      onClick={() =>
                        fileRef.current?.click()
                      }
                    >
                      <Upload size={25} />

                      <strong>
                        {imageLoading
                          ? "Reading image…"
                          : "Upload cover image"}
                      </strong>

                      <span>
                        JPG, PNG, WEBP or GIF ·
                        Maximum 5 MB
                      </span>
                    </button>

                  )}

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    hidden
                    onChange={
                      handleImageUpload
                    }
                  />

                </div>

              </div>

              {/* ALT TEXT */}

              <div className="form-field">

                <label htmlFor="blog-image-alt">
                  Image alt text
                </label>

                <input
                  id="blog-image-alt"
                  maxLength="180"
                  value={form.coverImageAlt}
                  onChange={(event) =>
                    updateForm(
                      "coverImageAlt",
                      event.target.value
                    )
                  }
                  placeholder="Describe the cover image for accessibility and SEO"
                />

              </div>

              {/* ARTICLE EDITOR */}

              <div className="form-field">

                <label>
                  Article content
                </label>

                <div className="rich-editor">

                  <div
                    className="editor-toolbar"
                    aria-label="Blog formatting toolbar"
                  >

                    <button
                      type="button"
                      title="Heading 2"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        setHeading("h2")
                      }
                    >
                      <Heading2 size={17} />
                    </button>

                    <button
                      type="button"
                      title="Heading 3"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        setHeading("h3")
                      }
                    >
                      <Heading3 size={17} />
                    </button>

                    <span className="toolbar-divider" />

                    <button
                      type="button"
                      title="Bold"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        applyFormat("bold")
                      }
                    >
                      <Bold size={17} />
                    </button>

                    <button
                      type="button"
                      title="Italic"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        applyFormat("italic")
                      }
                    >
                      <Italic size={17} />
                    </button>

                    <button
                      type="button"
                      title="Underline"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        applyFormat("underline")
                      }
                    >
                      <Underline size={17} />
                    </button>

                    <span className="toolbar-divider" />

                    <button
                      type="button"
                      title="Bullet list"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        applyFormat(
                          "insertUnorderedList"
                        )
                      }
                    >
                      <List size={17} />
                    </button>

                    <button
                      type="button"
                      title="Numbered list"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        applyFormat(
                          "insertOrderedList"
                        )
                      }
                    >
                      <ListOrdered size={17} />
                    </button>

                    <button
                      type="button"
                      title="Add link"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={addLink}
                    >
                      <LinkIcon size={17} />
                    </button>

                  </div>

                  <div
                    ref={editorRef}
                    className="rich-editor-area"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={
                      handleEditorInput
                    }
                    onBlur={
                      handleEditorInput
                    }
                    role="textbox"
                    aria-label="Blog article content"
                  />

                </div>

                <small className="editor-help">
                  Select text before clicking the
                  link button. Use H2/H3 for headings,
                  lists for structured content, and
                  the formatting buttons for emphasis.
                </small>

              </div>

              {/* TAGS */}

              <div className="form-field">

                <label htmlFor="blog-tags">
                  Tags{" "}
                  <small>
                    (comma separated)
                  </small>
                </label>

                <input
                  id="blog-tags"
                  value={form.tags}
                  onChange={(event) =>
                    updateForm(
                      "tags",
                      event.target.value
                    )
                  }
                  placeholder="Mohali, food guide, restaurants"
                />

              </div>

              {/* SEO */}

              <div className="admin-seo-box">

                <div className="admin-section-label">
                  SEARCH ENGINE OPTIMIZATION
                </div>

                <div className="form-field">

                  <label htmlFor="meta-title">
                    SEO title
                  </label>

                  <input
                    id="meta-title"
                    maxLength="65"
                    value={form.metaTitle}
                    onChange={(event) =>
                      updateForm(
                        "metaTitle",
                        event.target.value
                      )
                    }
                    placeholder="Optional SEO title"
                  />

                </div>

                <div className="form-field">

                  <label htmlFor="meta-description">
                    SEO description
                  </label>

                  <textarea
                    id="meta-description"
                    maxLength="170"
                    rows="3"
                    value={form.metaDescription}
                    onChange={(event) =>
                      updateForm(
                        "metaDescription",
                        event.target.value
                      )
                    }
                    placeholder="Optional meta description"
                  />

                </div>

              </div>

              {/* FORM ACTIONS */}

              <div className="admin-form-actions">

                <button
                  className="form-submit"
                  disabled={
                    loading || imageLoading
                  }
                  type="submit"
                >
                  {loading
                    ? "Saving…"
                    : editing
                    ? "Update blog"
                    : "Save blog"}
                </button>

                {editing && (
                  <button
                    type="button"
                    className="admin-small cancel-btn"
                    onClick={cancelEditing}
                  >
                    Cancel editing
                  </button>
                )}

              </div>

            </form>

          </section>

          {/* =================================================
              CONTENT LIBRARY
          ================================================== */}

          <section className="admin-panel">

            <div className="admin-library-head">

              <div>

                <span className="admin-section-label">
                  CONTENT LIBRARY
                </span>

                <h2>
                  All blog posts
                </h2>

              </div>

              <button
                className="admin-small"
                onClick={loadPosts}
                type="button"
                title="Refresh"
              >
                <RefreshCw size={14} />
              </button>

            </div>

            <div className="admin-list">

              {posts.length ? (

                posts.map((post) => (

                  <div
                    className="admin-post"
                    key={post._id}
                  >

                    <img
                      src={
                        post.coverImage ||
                        "/gonbite-icon.png"
                      }
                      alt={
                        post.coverImageAlt || ""
                      }
                    />

                    <div className="admin-post-info">

                      <h3>
                        {post.title}
                      </h3>

                      <p>

                        <span
                          className={`status-pill ${post.status}`}
                        >
                          {post.status}
                        </span>

                        <span>
                          {" "}
                          · {post.category}
                        </span>

                        <span>
                          {" "}
                          ·{" "}
                          {new Date(
                            post.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </p>

                    </div>

                    <div className="admin-actions">

                      <button
                        className="admin-small"
                        onClick={() =>
                          edit(post)
                        }
                        type="button"
                      >
                        Edit
                      </button>

                      {post.status ===
                        "published" && (
                        <a
                          className="admin-small"
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Open blog"
                        >
                          <ExternalLink
                            size={13}
                          />
                        </a>
                      )}

                      <button
                        className="admin-small danger"
                        onClick={() =>
                          setDeleteTarget(post)
                        }
                        type="button"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="blog-empty">
                  No posts yet. Create your
                  first story.
                </div>

              )}

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}