import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  MessageCircle,
  Users,
  BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
    Youtube,
  ArrowUpRight,
  Heart,
  ArrowRight,
} from "lucide-react";

import logo from "../assets/images/gonbite-logo.jpeg";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* =====================================================
          TOP CTA
      ===================================================== */}

      <div className="footer-cta-wrapper">

        <div className="footer-cta">

          <div className="footer-cta-glow"></div>

          <div className="footer-cta-content">

            <div className="footer-cta-text">

              <span className="footer-cta-label">
                READY TO BITE?
              </span>

              <h2>
                Your next favorite
                <br />
                meal is waiting.
              </h2>

              <p>
                Discover delicious food, explore new flavors
                and make every craving worth it with GoNbite.
              </p>

            </div>

            <Link
              to="/contact"
              className="footer-cta-button"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-main">

        <div className="footer-container">


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              <img
                src={logo}
                alt="GoNbite"
              />
            </Link>


            <p className="footer-description">
              Good food. Good mood.
              <br />
              Great experiences.
            </p>


            <p className="footer-brand-text">
              GoNbite brings food lovers and delicious
              meals together through a simple, modern
              digital experience.
            </p>


            {/* Social icons */}

            <div className="footer-socials">

              <a
                href="https://www.instagram.com/gonbite/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Globe size={17} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594057297851"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Users size={17} />
              </a>

              <a
                href="https://x.com/OfficialGoNbite"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <MessageCircle size={17} />
              </a>

              <a
                href="https://www.linkedin.com/in/gonbite-627b13434/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness size={17} />
              </a>



  {/* YouTube */}
  <a
    href="https://www.youtube.com/@Go_N_bite"
    target="_blank"
    rel="noreferrer"
    aria-label="YouTube"
  >
    <Youtube size={17} />
  </a>

            </div>

          </div>


          {/* =================================================
              COMPANY
          ================================================= */}

          <div className="footer-column">

            <h3>
              Company
            </h3>

            <ul>

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about">
                  About GoNbite
                </Link>
              </li>

              <li>
                <Link to="/why-choose-us">
                  Why GoNbite
                </Link>
              </li>

              <li>
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>


        


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="footer-column footer-contact-column">

            <h3>
              Get In Touch
            </h3>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <Mail size={16} />
              </div>

              <div>
                <span>
                  Email
                </span>

                <a href="mailto:info.gonbite@gmail.com">
                  info.gonbite@gmail.com
                </a>
              </div>

            </div>


 {/* Phone 1 */}
<div className="footer-contact-item">
  <div className="footer-contact-icon">
    <Phone size={16} />
  </div>

  <div className="footer-contact-info">
    <span>Phone</span>

    <a href="tel:+916283409048">
      +91 6283409048
    </a>
  </div>
</div>


{/* Phone 2 */}
<div className="footer-contact-item">
  <div className="footer-contact-icon">
    <Phone size={16} />
  </div>

  <div className="footer-contact-info">
    <span>Phone</span>

    <a href="tel:+918146759497">
      +91 8146759497
    </a>
  </div>
</div>


            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <MapPin size={16} />
              </div>

              <div>
                <span>
                  Location
                </span>

                <p>
                  Mohali, Punjab, India
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            APP PROMO
        =================================================== */}

        <div className="footer-app-wrapper">

          <div className="footer-app-content">

            <div className="footer-app-icon">
              <span>G</span>
            </div>

            <div>

              <span className="footer-app-small">
                COMING SOON
              </span>

              <h3>
                GoNbite on your phone.
              </h3>

              <p>
                Your cravings, always within reach.
              </p>

            </div>

          </div>


          <div className="footer-app-buttons">

            <div className="footer-store-button">

              <div className="store-symbol">
                
              </div>

              <div>
                <small>
                  Coming soon on
                </small>

                <strong>
                  App Store
                </strong>
              </div>

            </div>


            <div className="footer-store-button">

              <div className="store-symbol play-symbol">
                ▶
              </div>

              <div>
                <small>
                  Coming soon on
                </small>

                <strong>
                  Google Play
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="footer-bottom">

          <div className="footer-copyright">

            © {currentYear} GoNbite.
            All rights reserved.

          </div>


          <div className="footer-powered">

            <span>
              Made with
            </span>

            <Heart
              size={13}
              fill="currentColor"
            />

            <span>
              by
            </span>

            <strong>
              VProTech Digital
            </strong>

            <span>
              · Mohali
            </span>

          </div>


          <div className="footer-legal">

            <Link to="/privacy">
              Privacy
            </Link>

            <Link to="/terms">
              Terms
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================================
          LARGE BACKGROUND TEXT
      ===================================================== */}

      <div className="footer-background-word">
        GoNbite
      </div>

    </footer>
  );
};

export default Footer;