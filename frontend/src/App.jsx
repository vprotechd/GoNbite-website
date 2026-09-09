import { Helmet } from "react-helmet-async";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import WhyChooseUs from "./pages/WhyChooseUs";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Download from "./pages/Download";

const App = () => {
  return (
    <BrowserRouter>



      {/* Global SEO */}
      <Helmet>

        <title>
          GoNbite | Discover Great Food & Delicious Experiences
        </title>

        <meta
          name="description"
          content="GoNbite is a modern food platform helping food lovers discover delicious meals, explore new flavors and enjoy better food experiences."
        />

        <meta
          name="keywords"
          content="GoNbite, food delivery, food app, food ordering, restaurants, delicious food, food platform, food experiences"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="author"
          content="GoNbite"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="GoNbite | Discover Great Food"
        />

        <meta
          property="og:description"
          content="Discover delicious food, explore new flavors and enjoy better food experiences with GoNbite."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="GoNbite"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="GoNbite | Discover Great Food"
        />

        <meta
          name="twitter:description"
          content="Discover delicious food and better food experiences with GoNbite."
        />

      </Helmet>

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

        <Route path="/download" element={<Download />} />

      </Routes>

    </BrowserRouter>
  );
};

export default App;