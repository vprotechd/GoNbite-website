import { Helmet } from "react-helmet-async";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyChooseUs from "./pages/WhyChooseUs";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Download from "./pages/Download";
import PrivacyPolicy from "./pages/Privacy";
import TermsAndConditions from "./pages/Terms";


const seoByPath = {

  "/": {
    title: "GoNbite | Food Delivery & Online Food Ordering in Mohali",
    description:
      "Order delicious food online from restaurants in Mohali with GoNbite. Discover local restaurants, explore your favorite cuisines and enjoy convenient food delivery.",
    keywords:
      "GoNbite, GoNbite Mohali, food delivery Mohali, food delivery in Mohali, online food ordering Mohali, food ordering app Mohali, restaurants in Mohali, order food online Mohali",
  },

  "/about": {
    title: "About GoNbite | Food Delivery App in Mohali",
    description:
      "Learn about GoNbite, a food delivery platform connecting food lovers with restaurants in Mohali for convenient online food ordering and delivery.",
    keywords:
      "about GoNbite, GoNbite food delivery, GoNbite Mohali, food delivery app Mohali, food ordering platform Mohali",
  },

  "/why-choose-us": {
    title: "Why Choose GoNbite | Food Delivery in Mohali",
    description:
      "Discover why GoNbite makes food ordering easier with simple ordering, local restaurants and a convenient food delivery experience in Mohali.",
    keywords:
      "why GoNbite, GoNbite benefits, food delivery Mohali, food ordering app Mohali, food delivery experience Mohali",
  },

  "/how-it-works": {
    title: "How GoNbite Works | Order Food Online in Mohali",
    description:
      "Learn how to discover restaurants, choose your favorite food, place an order and enjoy convenient food delivery with GoNbite.",
    keywords:
      "how GoNbite works, order food online Mohali, GoNbite food ordering, food delivery Mohali, restaurant ordering app Mohali",
  },

  "/contact": {
    title: "Contact GoNbite | Food Delivery Support",
    description:
      "Contact GoNbite for customer support, restaurant partnerships, business enquiries and information about our food delivery service in Mohali.",
    keywords:
      "contact GoNbite, GoNbite support, GoNbite Mohali, food delivery support, restaurant partnership Mohali",
  },

  "/download": {
    title: "Download GoNbite | Food Delivery App",
    description:
      "Download GoNbite and discover restaurants, order your favorite meals and enjoy a convenient food delivery experience.",
    keywords:
      "download GoNbite, GoNbite app, GoNbite food delivery app, food delivery app Mohali, food ordering app Mohali",
  },

  /* =========================
     PRIVACY POLICY
  ========================== */

  "/privacy-policy": {
    title: "Privacy Policy | GoNbite",
    description:
      "Read the GoNbite Privacy Policy to understand how we collect, use, protect and handle information when you use our website and services.",
    keywords:
      "GoNbite privacy policy, GoNbite data privacy, GoNbite personal information, GoNbite privacy",
  },

  /* =========================
     TERMS & CONDITIONS
  ========================== */

  "/terms-and-conditions": {
    title: "Terms & Conditions | GoNbite",
    description:
      "Read the GoNbite Terms & Conditions covering the use of our website and services, orders, payments, delivery, cancellations and user responsibilities.",
    keywords:
      "GoNbite terms and conditions, GoNbite terms, GoNbite user agreement, GoNbite food delivery terms",
  },

};


/* =========================================================
   SEO COMPONENT
========================================================= */

const SiteSEO = () => {

  const location = useLocation();

  const seo =
    seoByPath[location.pathname] || seoByPath["/"];


  /* IMPORTANT:
     Keep www consistent with sitemap
  */

  const canonicalUrl =
    `https://www.gonbite.com${
      location.pathname === "/"
        ? "/"
        : location.pathname
    }`;


  return (
    <Helmet>

      {/* BASIC SEO */}

      <title>
        {seo.title}
      </title>

      <meta
        name="description"
        content={seo.description}
      />

      <meta
        name="keywords"
        content={seo.keywords}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="author"
        content="GoNbite"
      />


      {/* CANONICAL */}

      <link
        rel="canonical"
        href={canonicalUrl}
      />


      {/* OPEN GRAPH */}

      <meta
        property="og:title"
        content={seo.title}
      />

      <meta
        property="og:description"
        content={seo.description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="GoNbite"
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />


      {/* TWITTER */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seo.title}
      />

      <meta
        name="twitter:description"
        content={seo.description}
      />

    </Helmet>
  );
};


/* =========================================================
   APP
========================================================= */

const App = () => {

  return (

    <BrowserRouter>

      <SiteSEO />

      <ScrollToTop />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/why-choose-us"
          element={<WhyChooseUs />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/download"
          element={<Download />}
        />

        {/* PRIVACY POLICY */}

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        {/* TERMS & CONDITIONS */}

        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />

      </Routes>

    </BrowserRouter>

  );
};


export default App;