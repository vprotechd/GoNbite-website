import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API } from "../context/AuthContext";
import "./Blogs.css";

function legacyTextToHtml(content = "") {
  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split(/\n+/)
    .filter((line) => line.trim())
    .map((line) => `<p>${line.trim()}</p>`)
    .join("");
}

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch(`${API}/blogs/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Blog not found.");
        return data;
      })
      .then((data) => {
        if (active) setPost(data.blog);
      })
      .catch((err) => {
        if (active) setError(err.message || "Unable to load this story.");
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="article-wrap">
          <h1>Story not found</h1>
          <p>{error}</p>
          <Link className="article-back" to="/blogs">← Back to blogs</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="article-wrap"><p>Loading story…</p></div>
        <Footer />
      </>
    );
  }

  const articleHtml = post.content?.trim().startsWith("<")
    ? post.content
    : legacyTextToHtml(post.content || "");

  const canonical = `https://www.gonbite.com/blogs/${post.slug}`;

  return (
    <div className="article-page">
      <Helmet>
        <title>{post.metaTitle || `${post.title} | GoNbite`}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <Navbar />

      <article className="article-wrap">
        <Link className="article-back" to="/blogs">← Back to all stories</Link>
        <div className="article-top">
          {post.category || "GoNbite Journal"} · {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>

        {post.coverImage && (
          <img
            className="article-cover"
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
          />
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: articleHtml }}
        />
      </article>

      <Footer />
    </div>
  );
}
