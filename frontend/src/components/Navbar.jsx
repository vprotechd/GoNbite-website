import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

import logo from "../assets/images/gonbite-logo.jpeg";

import "./Navbar.css";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Why GoNbite",
    path: "/why-choose-us",
  },
  {
    name: "How It Works",
    path: "/how-it-works",
  },
  {
    name: "Contact",
    path: "/contact",
  },
   
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="GoNbite"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="navbar-links">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                location.pathname === link.path
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* DESKTOP ORDER BUTTON */}
        <Link
          to="/download"
          className="navbar-order-btn"
        >
          Download Now
          <ArrowRight size={17} />
        </Link>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="navbar-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`navbar-mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >

        <nav>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={
                location.pathname === link.path
                  ? "mobile-nav-link active"
                  : "mobile-nav-link"
              }
            >
              {link.name}
            </Link>
          ))}

        </nav>

        <Link
          to="/download"
          className="mobile-order-btn"
          onClick={closeMenu}
        >
          Download Now
          <ArrowRight size={17} />
        </Link>

      </div>

    </header>
  );
}

export default Navbar;