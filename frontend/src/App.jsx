import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import WhyChooseUs from "./pages/WhyChooseUs";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Download from "./pages/Download";

const App = () => {
  return (
    <BrowserRouter>

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