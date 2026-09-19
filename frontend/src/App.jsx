import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyChooseUs from "./pages/WhyChooseUs";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Download from "./pages/Download";
import PrivacyPolicy from "./pages/Privacy";
import TermsAndConditions from "./pages/Terms";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const seoByPath = {
  "/": {
    title: "GoNbite | Food Delivery & Online Food Ordering in Mohali",
    description: "Discover local food and convenient online ordering with GoNbite. Explore restaurants, cuisines and food delivery in Mohali.",
  },
  "/about": {
    title: "About GoNbite | Food Delivery Platform in Mohali",
    description: "Learn about GoNbite and our mission to make discovering and ordering food from local restaurants in Mohali simple.",
  },
  "/why-choose-us": {
    title: "Why Choose GoNbite | Food Delivery in Mohali",
    description: "Explore the features and food ordering experience GoNbite is building for customers and local restaurants in Mohali.",
  },
  "/how-it-works": {
    title: "How GoNbite Works | Order Food Online",
    description: "See how GoNbite helps customers discover restaurants, choose meals and place food orders with ease.",
  },
  "/contact": {
    title: "Contact GoNbite | Food Delivery Support",
    description: "Contact GoNbite for support, restaurant partnerships, business enquiries and food delivery information.",
  },
  "/download": {
    title: "Download GoNbite | Food Delivery App",
    description: "Get GoNbite and discover a convenient way to explore restaurants and food in Mohali.",
  },
  "/blogs": {
    title: "GoNbite Blog | Food, Restaurants & Local Dining",
    description: "Read GoNbite articles about food, restaurants, local dining, ordering tips, offers and the food scene in Mohali.",
  },
  "/login": { title: "Login | GoNbite", description: "Log in to your GoNbite account." },
  "/register": { title: "Create Your GoNbite Account", description: "Create a GoNbite account and verify your email to get started." },
  "/verify-email": { title: "Verify Email | GoNbite", description: "Verify your email address for your GoNbite account." },
  "/admin/login": { title: "Admin Login | GoNbite", description: "GoNbite administration portal." },
  "/admin/register": { title: "Admin Registration | GoNbite", description: "Secure GoNbite administrator registration." },
  "/privacy-policy": { title: "Privacy Policy | GoNbite", description: "Read the GoNbite Privacy Policy." },
  "/terms-and-conditions": { title: "Terms & Conditions | GoNbite", description: "Read the GoNbite Terms & Conditions." },
};

function SiteSEO() {
  const { pathname: path } = useLocation();
  const isBlogDetail = path.startsWith("/blogs/") && path !== "/blogs";
  const seo = seoByPath[path] || (isBlogDetail ? seoByPath["/blogs"] : seoByPath["/"]);
  const canonical = `https://www.gonbite.com${path === "/" ? "/" : path.replace(/\/+$/, "")}`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={path.startsWith("/admin") || ["/login","/register","/verify-email"].includes(path) ? "noindex, nofollow" : "index, follow"} />
      <meta name="author" content="GoNbite" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={isBlogDetail ? "article" : "website"} />
      <meta property="og:site_name" content="GoNbite" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content="https://www.gonbite.com/gonbite-icon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://www.gonbite.com/gonbite-icon.png" />
    </Helmet>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteSEO />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
