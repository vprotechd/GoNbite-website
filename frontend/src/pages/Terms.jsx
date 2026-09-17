import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Leaf } from "lucide-react";

import food1 from "../assets/images/food1.jpg";

import "./LegalPages.css";

export default function TermsAndConditions() {
  return (
    <div className="legal-page">

      {/* =========================
          HERO
      ========================== */}
      <section className="legal-hero">

        <div className="legal-container legal-hero-inner">

          {/* LEFT */}
          <div className="legal-hero-content">

         

            <h1>
              Terms & Conditions
            </h1>

            <p>
              These Terms & Conditions explain the rules and conditions
              that apply when you access or use GoNbite's website and
              services.
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

            <a href="#acceptance">
              Acceptance of Terms
            </a>

            <a href="#services">
              Our Services
            </a>

            <a href="#accounts">
              User Accounts
            </a>

            <a href="#orders">
              Orders & Payments
            </a>

            <a href="#delivery">
              Delivery
            </a>

            <a href="#cancellation">
              Cancellation & Refunds
            </a>

            <a href="#restaurant">
              Restaurant Information
            </a>

            <a href="#responsibilities">
              User Responsibilities
            </a>

            <a href="#intellectual">
              Intellectual Property
            </a>

            <a href="#availability">
              Service Availability
            </a>

            <a href="#changes">
              Changes to These Terms
            </a>

            <a href="#contact">
              Contact Us
            </a>

          </aside>


          {/* CONTENT */}
          <article className="legal-card">

            <section id="acceptance">

              <h2>1. Acceptance of Terms</h2>

              <p>
                By accessing or using GoNbite's website, application,
                or services, you agree to comply with these Terms &
                Conditions. If you do not agree with these terms,
                please do not use our services.
              </p>

            </section>


            <section id="services">

              <h2>2. GoNbite Services</h2>

              <p>
                GoNbite provides a platform that allows customers to
                discover food options, place orders, and receive food
                through available delivery services.
              </p>

              <p>
                Restaurant availability, menus, prices, delivery areas,
                delivery times, and other information may vary.
              </p>

            </section>


            <section id="accounts">

              <h2>3. User Accounts</h2>

              <p>
                Some GoNbite services may require you to create an
                account. You are responsible for providing accurate
                information and keeping your account credentials secure.
              </p>

              <p>
                You should notify GoNbite if you believe that your
                account has been accessed without authorization.
              </p>

            </section>


            <section id="orders">

              <h2>4. Orders & Payments</h2>

              <p>
                When you place an order through GoNbite, you agree to
                provide accurate order and delivery information.
              </p>

              <p>
                Prices, applicable taxes, delivery charges, discounts,
                and other charges will be displayed where applicable
                before completing an order.
              </p>

              <p>
                An order may be subject to restaurant acceptance
                and availability.
              </p>

            </section>


            <section id="delivery">

              <h2>5. Delivery</h2>

              <p>
                Estimated delivery times are provided for convenience
                and may vary because of restaurant preparation times,
                traffic, weather, location, demand, or other circumstances.
              </p>

              <p>
                Customers are responsible for providing an accurate
                and accessible delivery address.
              </p>

            </section>


            <section id="cancellation">

              <h2>6. Cancellation & Refunds</h2>

              <p>
                Cancellation and refund eligibility may depend on the
                status of an order, restaurant policies, payment method,
                and other applicable conditions.
              </p>

              <p>
                If you experience an issue with an order, please contact
                GoNbite support as soon as possible.
              </p>

            </section>


            <section id="restaurant">

              <h2>7. Restaurant Information</h2>

              <p>
                Restaurants may be responsible for their menus, food
                descriptions, pricing, preparation, quality, and
                availability.
              </p>

              <p>
                Information displayed on the platform may be provided
                or updated by restaurants.
              </p>

            </section>


            <section id="responsibilities">

              <h2>8. User Responsibilities</h2>

              <p>
                You agree not to:
              </p>

              <ul>
                <li>Use GoNbite for unlawful purposes</li>
                <li>Provide false or misleading information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the operation of the platform</li>
                <li>Abuse promotional offers or payment systems</li>
                <li>Use the service to harm other users or businesses</li>
              </ul>

            </section>


            <section id="intellectual">

              <h2>9. Intellectual Property</h2>

              <p>
                GoNbite's website, branding, logos, graphics, content,
                software, and other materials may be protected by
                applicable intellectual property laws.
              </p>

              <p>
                You may not reproduce, modify, distribute, or commercially
                exploit GoNbite materials without appropriate authorization.
              </p>

            </section>


            <section id="availability">

              <h2>10. Service Availability</h2>

              <p>
                We may temporarily modify, suspend, or discontinue parts
                of the service for maintenance, security, technical issues,
                or other operational reasons.
              </p>

            </section>


            <section id="changes">

              <h2>11. Changes to These Terms</h2>

              <p>
                GoNbite may update these Terms & Conditions from time
                to time. Updated terms will be posted on this page with
                a revised effective date.
              </p>

            </section>


            <section id="contact">

              <h2>12. Contact Us</h2>

              <p>
                For questions regarding these Terms & Conditions,
                contact GoNbite:
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


            {/* TRUST BOX */}
            <div className="legal-trust-box">

              <Leaf size={22} />

              <span>
                For a better GoNbite experience, please read and
                follow these terms carefully.
              </span>

            </div>

          </article>

        </div>

      </section>

    </div>
  );
}