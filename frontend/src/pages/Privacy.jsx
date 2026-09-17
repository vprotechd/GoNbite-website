import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Leaf } from "lucide-react";

import food1 from "../assets/images/food1.jpg";

import "./LegalPages.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">

      {/* =========================
          HERO
      ========================== */}
      <section className="legal-hero">

        <div className="legal-container legal-hero-inner">

          {/* LEFT CONTENT */}
          <div className="legal-hero-content">

       

            <h1>
              Privacy Policy
            </h1>

            <p>
              Your privacy matters to us. This Privacy Policy explains
              how GoNbite collects, uses, protects, and handles your
              information when you use our website and services.
            </p>

            <div className="legal-date">
              <ShieldCheck size={17} />
              <span>Last Updated: September 2026</span>
            </div>

            {/* BACK BUTTON */}
            <Link to="/" className="back-home-btn">
              <ArrowLeft size={17} />
              <span>Back to Home</span>
            </Link>

          </div>


          {/* RIGHT FOOD IMAGE */}
          <div className="legal-hero-image">

            <div className="food-decoration food-decoration-one"></div>

            <div className="food-decoration food-decoration-two"></div>

            <div className="food-image-wrapper">

              <img
                src={food1}
                alt="Delicious food"
                className="legal-food-image"
              />

            </div>

            <div className="leaf-decoration">
              <Leaf size={45} strokeWidth={1.4} />
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTENT
      ========================== */}
      <section className="legal-content">

        <div className="legal-container legal-layout">

          {/* SIDEBAR */}
          <aside className="legal-sidebar">

            <h3>Quick Links</h3>

            <a href="#information">
              Information We Collect
            </a>

            <a href="#use">
              How We Use Information
            </a>

            <a href="#sharing">
              Information Sharing
            </a>

            <a href="#security">
              Data Security
            </a>

            <a href="#cookies">
              Cookies
            </a>

            <a href="#rights">
              Your Rights
            </a>

            <a href="#children">
              Children's Privacy
            </a>

            <a href="#changes">
              Changes to This Policy
            </a>

            <a href="#contact">
              Contact Us
            </a>

          </aside>


          {/* MAIN LEGAL CONTENT */}
          <article className="legal-card">

            {/* INFORMATION */}
            <section id="information">

              <h2>1. Information We Collect</h2>

              <p>
                When you use GoNbite, we may collect information that
                you provide directly to us, information generated through
                your use of our services, and certain technical information.
              </p>

              <h3>Personal Information</h3>

              <ul>
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Delivery address</li>
                <li>Account information</li>
                <li>Order and transaction information</li>
              </ul>

              <h3>Technical Information</h3>

              <p>
                We may collect information such as device type, browser
                information, IP address, operating system, and information
                about how you interact with our website.
              </p>

            </section>


            {/* USE */}
            <section id="use">

              <h2>2. How We Use Your Information</h2>

              <p>
                We may use collected information to:
              </p>

              <ul>
                <li>Process and manage food orders</li>
                <li>Provide delivery and customer support</li>
                <li>Manage your account</li>
                <li>Process payments and transactions</li>
                <li>Improve our website and services</li>
                <li>Send important service-related communications</li>
                <li>Prevent fraud and maintain platform security</li>
              </ul>

            </section>


            {/* SHARING */}
            <section id="sharing">

              <h2>3. Information Sharing</h2>

              <p>
                GoNbite may share relevant information with restaurants,
                delivery partners, payment providers, technology providers,
                and other service providers when necessary to provide our
                services.
              </p>

              <p>
                We do not sell your personal information for purposes
                unrelated to providing or improving our services.
              </p>

            </section>


            {/* SECURITY */}
            <section id="security">

              <h2>4. Data Security</h2>

              <p>
                We take reasonable technical and organizational measures
                to protect your information against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <p>
                However, no internet-based service can guarantee complete
                security of information transmitted or stored online.
              </p>

            </section>


            {/* COOKIES */}
            <section id="cookies">

              <h2>5. Cookies and Similar Technologies</h2>

              <p>
                GoNbite may use cookies and similar technologies to
                improve website functionality, understand website usage,
                remember preferences, and improve your experience.
              </p>

            </section>


            {/* RIGHTS */}
            <section id="rights">

              <h2>6. Your Rights</h2>

              <p>
                Depending on applicable law, you may have rights regarding
                your personal information, including requesting access,
                correction, or deletion of certain information.
              </p>

              <p>
                To make a privacy-related request, please contact us
                using the details below.
              </p>

            </section>


            {/* CHILDREN */}
            <section id="children">

              <h2>7. Children's Privacy</h2>

              <p>
                GoNbite's services are not intended to be used by children
                without appropriate parental or guardian involvement.
                We do not knowingly collect personal information from
                children in violation of applicable law.
              </p>

            </section>


            {/* CHANGES */}
            <section id="changes">

              <h2>8. Changes to This Policy</h2>

              <p>
                We may update this Privacy Policy from time to time.
                Any changes will be reflected on this page with an
                updated revision date.
              </p>

            </section>


            {/* CONTACT */}
            <section id="contact">

              <h2>9. Contact Us</h2>

              <p>
                If you have questions about this Privacy Policy or
                your personal information, contact GoNbite:
              </p>

              <div className="legal-contact">

                <div>
                  <strong>Email</strong>
                  <a href="mailto:support@gonbite.com">
                    support@gonbite.com
                  </a>
                </div>

                <div>
                  <strong>Website</strong>
                  <a
                    href="https://www.gonbite.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.gonbite.com
                  </a>
                </div>

              </div>

            </section>


            {/* BOTTOM TRUST BOX */}
            <div className="legal-trust-box">

              <Leaf size={22} />

              <span>
                Your trust means everything to us. We're committed
                to keeping your information safe.
              </span>

            </div>

          </article>

        </div>

      </section>

    </div>
  );
}