
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  Check,
  LogIn,
  Store,
  TrendingUp,
  
  ShieldCheck,
  Clock3,
  UsersRound,
  Headset,
} from "lucide-react";
import partnerLogo from "../assets/images/food logo2-Photoroom.png";
import partnerBackground from "../assets/partner.jpg";
import Footer from "../components/Footer";


const restaurantBenefits = [
  "Reach more customers",
  "Grow your online orders",
  "Manage your partnership",
];

const deliveryBenefits = [
  "Flexible delivery opportunities",
  "Partner account access",
  "Track your application",
];

export default function PartnerWithUs() {
  return (
    <main className="gonbite-partner-page">
      {/* Hero section */}
      <section className="gp-hero">
        <div
          className="gp-food-background"
          style={{ backgroundImage: `url(${partnerBackground})` }}
        />
        <div className="gp-hero-overlay" />

        <header className="gp-header">
          <Link to="/" className="gp-logo">
            <img
              src={partnerLogo}
              alt="GoNbite Partner Network"
              className="gp-logo-image"
            />
          </Link>

          <Link to="/partner/login" className="gp-login">
            <LogIn size={17} />
            Partner Login
          </Link>
        </header>

        <div className="gp-hero-content">
          <span className="gp-eyebrow">
            YOUR GROWTH. OUR PARTNERSHIP.
          </span>

          <h1>
            Partner with GoNbite and
            <br className="gp-desktop-break" /> grow your business
          </h1>

          <div className="gp-title-underline" />

          <p className="gp-hero-description">
            More opportunities, more connections, and more ways to grow.
          </p>

          <div className="gp-hero-actions">
            <Link
              to="/partner/register/restaurant"
              className="gp-hero-button gp-restaurant-button"
            >
              <Store size={24} strokeWidth={2.5} />
              <span>Register Your Restaurant</span>
              <ArrowRight size={19} />
            </Link>

            <Link
              to="/partner/register/delivery"
              className="gp-hero-button gp-delivery-button"
            >
              <Bike size={25} strokeWidth={2.5} />
              <span>Become a Delivery Partner</span>
              <ArrowRight size={19} />
            </Link>
          </div>

          <div className="gp-trust-row">
            <span>
              <ShieldCheck size={15} />
              Trusted partnership
            </span>
            <i />
            <span>
              <TrendingUp size={15} />
              Built for growth
            </span>
          </div>
        </div>
      </section>

     {/* Why partner with GoNbite */}
<section className="gp-why-section">
  <div className="gp-why-heading">
    <span />
    <h2>Why should you partner with GoNbite?</h2>
    <span />
  </div>

  <div className="gp-why-grid">
    <article className="gp-why-item">
      <div className="gp-why-icon">
        <UsersRound size={48} strokeWidth={2} />
      </div>

      <h3>Attract More Customers</h3>

      <p>
        Help more people discover your business and explore
        your offerings through GoNbite.
      </p>
    </article>

    <article className="gp-why-item">
      <div className="gp-why-icon">
        <Bike size={48} strokeWidth={2} />
      </div>

      <h3>Convenient Food Delivery</h3>

      <p>
        Connect your restaurant with delivery partners and
        make food ordering more convenient for customers.
      </p>
    </article>

    <article className="gp-why-item">
      <div className="gp-why-icon">
        <Headset size={48} strokeWidth={2} />
      </div>

      <h3>Dedicated Partner Support</h3>

      <p>
        Get guidance during registration and support as you
        begin your partnership with GoNbite.
      </p>
    </article>
  </div>
</section>

      {/* Page styles */}
      <style>{`
        .gonbite-partner-page {
          --gp-orange: #f36c12;
          --gp-green: #009f83;
          --gp-ink: #182130;
          --gp-muted: #748093;

          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #fff;
          color: var(--gp-ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .gonbite-partner-page *,
        .gonbite-partner-page *::before,
        .gonbite-partner-page *::after {
          box-sizing: border-box;
        }

        .gonbite-partner-page a {
          -webkit-tap-highlight-color: transparent;
        }

        /* Hero background image */

        .gp-hero {
          position: relative;
          min-height: 610px;
          isolation: isolate;
          overflow: hidden;
          background: #171717;
          color: white;
        }

        .gp-food-background {
          position: absolute;
          z-index: -2;
          inset: 0;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          transform: scale(1.015);
        }

        .gp-hero-overlay {
          position: absolute;
          z-index: -1;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(8, 8, 8, .48) 0%,
              rgba(8, 8, 8, .65) 48%,
              rgba(8, 8, 8, .84) 100%
            ),
            radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, .05) 0%,
              rgba(0, 0, 0, .3) 100%
            );
        }

        /* Header and logo */

        .gp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: min(1240px, calc(100% - 64px));
          margin: 0 auto;
          padding-top: 25px;
        }

        .gp-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .gp-logo-image {
          display: block;
          width: 190px;
          max-width: 100%;
          height: 65px;
          object-fit: contain;
          object-position: left center;
        }

        .gp-login {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 46px;
          padding: 0 21px;
          border: 1px solid rgba(255, 255, 255, .85);
          border-radius: 30px;
          background: rgba(20, 20, 20, .35);
          color: #fff;
          font-size: 13px;
          font-weight: 750;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition: background .2s, transform .2s;
        }

        .gp-login:hover {
          background: rgba(255, 255, 255, .16);
          transform: translateY(-2px);
        }

        /* Hero text and buttons */

        .gp-hero-content {
          width: min(1050px, calc(100% - 36px));
          margin: 0 auto;
          padding: 83px 0 125px;
          text-align: center;
        }

        .gp-eyebrow {
          display: inline-block;
          margin-bottom: 15px;
          color: #ffc49c;
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 3px;
        }

        .gp-hero-content h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(37px, 5.3vw, 66px);
          font-weight: 850;
          line-height: 1.15;
          letter-spacing: -2.2px;
          text-shadow: 0 3px 22px #0005;
        }

        .gp-title-underline {
          width: 105px;
          height: 5px;
          margin: 21px auto 15px;
          border-radius: 100%;
          background: var(--gp-orange);
          transform: rotate(-2deg);
        }

        .gp-hero-description {
          margin: 0 auto;
          color: rgba(255, 255, 255, .85);
          font-size: 14px;
          line-height: 1.8;
        }

        .gp-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 31px;
        }

        .gp-hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          min-height: 62px;
          padding: 0 25px;
          border: 1px solid transparent;
          border-radius: 15px;
          color: white;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 10px 30px #0002;
          transition: transform .22s, box-shadow .22s, filter .22s;
        }

        .gp-hero-button span {
          white-space: nowrap;
        }

        .gp-hero-button:hover {
          transform: translateY(-3px);
          filter: brightness(1.07);
          box-shadow: 0 15px 35px #0003;
        }

        .gp-restaurant-button {
          background: linear-gradient(110deg, #ff791b, #f05b06);
        }

        .gp-delivery-button {
          background: linear-gradient(110deg, #08b79a, #00947b);
        }

        .gp-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 24px;
          color: rgba(255, 255, 255, .82);
          font-size: 11px;
        }

        .gp-trust-row span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .gp-trust-row svg {
          color: #ffc095;
        }

        .gp-trust-row i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff8c42;
        }

        /* Main white panel */

        .gp-start-section {
          position: relative;
          z-index: 2;
          width: min(1240px, calc(100% - 64px));
          margin: -48px auto 0;
          padding: 33px 38px 0;
          border: 1px solid #f0ede9;
          border-bottom: 0;
          border-radius: 25px 25px 0 0;
          background: #fff;
          box-shadow: 0 -10px 40px #00000009;
        }

        .gp-section-heading {
          margin-bottom: 26px;
          text-align: center;
        }

        .gp-section-eyebrow {
          display: block;
          margin-bottom: 6px;
          color: #d96921;
          font-size: 9px;
          font-weight: 850;
          letter-spacing: 2px;
        }

        .gp-section-heading h2 {
          margin: 0;
          color: #182130;
          font-size: clamp(26px, 3vw, 35px);
          font-weight: 850;
          letter-spacing: -1px;
        }

        .gp-section-heading p {
          margin: 7px 0 0;
          color: var(--gp-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        /* Partner cards */

        .gp-partner-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .gp-partner-card {
          position: relative;
          isolation: isolate;
          min-width: 0;
          padding: 23px;
          overflow: hidden;
          border: 1px solid;
          border-radius: 17px;
          transition: transform .25s, box-shadow .25s;
        }

        .gp-partner-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 35px #00000009;
        }

        .gp-card-restaurant {
          border-color: #ffe0ce;
          background: linear-gradient(135deg, #fffaf6, #fff5ed);
        }

        .gp-card-delivery {
          border-color: #d3f0e9;
          background: linear-gradient(135deg, #f7fcfa, #eff9f6);
        }

        .gp-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          gap: 19px;
        }

        .gp-card-icon {
          display: grid;
          place-items: center;
          width: 77px;
          height: 77px;
          flex-shrink: 0;
          border-radius: 25px;
        }

        .gp-orange-icon {
          background: #ffeadc;
          color: #f36c12;
        }

        .gp-green-icon {
          background: #dcf4ed;
          color: #009f83;
        }

        .gp-card-content {
          min-width: 0;
          padding-top: 2px;
        }

        .gp-card-tag {
          display: block;
          margin-bottom: 7px;
          color: #998779;
          font-size: 8px;
          font-weight: 850;
          letter-spacing: 1.1px;
        }

        .gp-card-content h3 {
          margin: 0;
          color: #182130;
          font-size: 18px;
          font-weight: 850;
          letter-spacing: -.45px;
        }

        .gp-card-content p {
          max-width: 300px;
          margin: 7px 0 0;
          color: #738093;
          font-size: 12px;
          line-height: 1.75;
        }

        .gp-benefit-list {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 9px;
          margin: 20px 0 21px;
          padding: 0;
          list-style: none;
        }

        .gp-benefit-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #596678;
          font-size: 11px;
          line-height: 1.5;
        }

        .gp-benefit-check {
          display: grid;
          place-items: center;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          border-radius: 50%;
          color: #fff;
        }

        .gp-orange-check {
          background: #f36c12;
        }

        .gp-green-check {
          background: #009f83;
        }

        .gp-card-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 15px;
          border-top: 1px solid #0000000a;
        }

        .gp-learn-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .gp-orange-link {
          color: #e85e0a;
        }

        .gp-green-link {
          color: #008f76;
        }

        .gp-learn-link svg {
          transition: transform .2s;
        }

        .gp-learn-link:hover svg {
          transform: translateX(4px);
        }

        .gp-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 37px;
          padding: 0 13px;
          border-radius: 9px;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          text-decoration: none;
          transition: transform .2s, filter .2s;
        }

        .gp-card-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.07);
        }

        .gp-orange-cta {
          background: #f36c12;
        }

        .gp-green-cta {
          background: #009f83;
        }

        .gp-card-decoration {
          position: absolute;
          z-index: -1;
          right: -15px;
          bottom: -55px;
          width: 120px;
          height: 120px;
          border: 18px solid;
          border-radius: 65% 0 65% 0;
          opacity: .12;
          transform: rotate(-35deg);
        }

        .gp-decoration-orange {
          border-color: #f36c12;
        }

        .gp-decoration-green {
          border-color: #009f83;
        }

        /* Benefits strip */

        .gp-bottom-strip {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 20px;
          margin-top: 27px;
          padding: 19px 22px;
          border: 1px solid #f0ebe5;
          border-radius: 15px;
          background: #fffdfa;
        }

        .gp-bottom-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 0;
        }

        .gp-bottom-icon {
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #fff0e4;
          color: #e87524;
        }

        .gp-bottom-item strong {
          display: block;
          color: #352c24;
          font-size: 11px;
          font-weight: 800;
        }

        .gp-bottom-item p {
          margin: 4px 0 0;
          color: #8a8077;
          font-size: 9px;
          line-height: 1.6;
        }

        .gp-bottom-divider {
          width: 1px;
          height: 32px;
          background: #eee5dc;
        }

        /* Footer */

        .gp-footer {
          padding: 31px 10px 24px;
          text-align: center;
        }

        .gp-footer-logo {
          color: #29231e;
          font-size: 21px;
          font-weight: 950;
          letter-spacing: -1px;
          text-decoration: none;
        }

        .gp-footer-logo span {
          color: #ff7928;
        }

        .gp-footer > p {
          margin: 6px 0 12px;
          color: #82776d;
          font-size: 11px;
        }

        .gp-footer-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #c6b7aa;
        }

        .gp-footer-links a {
          color: #766b60;
          font-size: 10px;
          text-decoration: none;
        }

        .gp-footer-links a:hover {
          color: #e87524;
        }

        .gp-footer > small {
          color: #a79c92;
          font-size: 9px;
        }

        /* Tablet */

        @media (min-width: 1500px) {
          .gp-hero {
            min-height: 660px;
          }

          .gp-hero-content {
            padding-top: 90px;
            padding-bottom: 135px;
          }
        }

        @media (max-width: 850px) {
          .gp-hero {
            min-height: 590px;
          }

          .gp-hero-content {
            padding-top: 90px;
            padding-bottom: 120px;
          }

          .gp-hero-content h1 {
            font-size: clamp(36px, 6vw, 51px);
          }

          .gp-start-section {
            width: calc(100% - 30px);
            padding: 30px 22px 0;
          }

          .gp-partner-grid {
            gap: 14px;
          }

          .gp-partner-card {
            padding: 18px;
          }

          .gp-card-top {
            gap: 13px;
          }

          .gp-card-icon {
            width: 57px;
            height: 57px;
            border-radius: 18px;
          }

          .gp-card-icon svg {
            width: 33px;
            height: 33px;
          }

          .gp-card-content h3 {
            font-size: 16px;
          }

          .gp-bottom-strip {
            gap: 10px;
            padding: 16px 10px;
          }

          .gp-bottom-item {
            gap: 7px;
          }

          .gp-bottom-icon {
            width: 32px;
            height: 32px;
          }
        }

        /* Mobile */

        @media (max-width: 600px) {
          .gp-hero {
            min-height: auto;
          }

          .gp-header {
            width: calc(100% - 34px);
            padding-top: 21px;
          }

          .gp-logo-image {
            width: 145px;
            height: 52px;
          }

          .gp-login {
            min-height: 39px;
            gap: 6px;
            padding: 0 12px;
            font-size: 11px;
          }

          .gp-login svg {
            width: 15px;
          }

          .gp-hero-content {
            width: calc(100% - 32px);
            padding: 76px 0 95px;
          }

          .gp-eyebrow {
            font-size: 8px;
            letter-spacing: 2px;
          }

          .gp-hero-content h1 {
            font-size: clamp(32px, 8.5vw, 43px);
            letter-spacing: -1.4px;
          }

          .gp-desktop-break {
            display: none;
          }

          .gp-title-underline {
            margin: 17px auto 13px;
          }

          .gp-hero-description {
            max-width: 330px;
            font-size: 12px;
          }

          .gp-hero-actions {
            flex-direction: column;
            gap: 12px;
            margin-top: 26px;
          }

          .gp-hero-button {
            width: 100%;
            max-width: 365px;
            min-height: 55px;
            padding: 0 16px;
            border-radius: 12px;
            font-size: 12px;
          }

          .gp-hero-button span {
            flex: 1;
            text-align: left;
          }

          .gp-trust-row {
            flex-wrap: wrap;
            gap: 9px;
            margin-top: 20px;
            font-size: 9px;
          }

          .gp-start-section {
            width: calc(100% - 20px);
            margin-top: -31px;
            padding: 26px 14px 0;
            border-radius: 21px 21px 0 0;
          }

          .gp-section-heading {
            margin-bottom: 21px;
          }

          .gp-section-heading h2 {
            font-size: 25px;
          }

          .gp-section-heading p {
            font-size: 11px;
          }

          .gp-partner-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .gp-partner-card {
            padding: 20px;
          }

          .gp-card-icon {
            width: 62px;
            height: 62px;
          }

          .gp-card-content h3 {
            font-size: 17px;
          }

          .gp-card-content p {
            font-size: 11px;
          }

          .gp-benefit-list {
            margin: 19px 0;
          }

          .gp-benefit-list li {
            font-size: 11px;
          }

          .gp-bottom-strip {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-top: 20px;
            padding: 18px;
          }

          .gp-bottom-item {
            justify-content: flex-start;
          }

          .gp-bottom-divider {
            width: 100%;
            height: 1px;
          }

          .gp-footer {
            padding-top: 26px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gonbite-partner-page *,
          .gonbite-partner-page *::before,
          .gonbite-partner-page *::after {
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }


    
.gp-why-section {
  width: 100%;
  padding: 54px 5% 65px;
  background: #ffffff;
  font-family: inherit;
}

.gp-why-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  max-width: 1530px;
  margin: 0 auto 68px;
}

.gp-why-line {
  flex: 1;
  max-width: 230px;
  height: 1px;
  background: #aeb8ca;
}

.gp-why-heading h2 {
  margin: 0;
  color: #080808;
  font-family: inherit;
  font-size: clamp(26px, 3.1vw, 46px);
  font-weight: 750;
  line-height: 1.25;
  letter-spacing: -1px;
  text-align: center;
}

.gp-why-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 55px;
  max-width: 1400px;
  margin: 0 auto;
}

.gp-why-item {
  min-width: 0;
  padding: 0 12px;
  text-align: center;
}

.gp-why-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  margin-bottom: 42px;
  color: #3478f6;
}

.gp-why-item h3 {
  max-width: 340px;
  margin: 0 auto 20px;
  color: #3f526f;
  font-family: inherit;
  font-size: clamp(22px, 2vw, 35px);
  font-weight: 500;
  line-height: 1.4;
}

.gp-why-item p {
  max-width: 370px;
  margin: 0 auto;
  color: #526784;
  font-family: inherit;
  font-size: clamp(15px, 1.35vw, 23px);
  font-weight: 400;
  line-height: 1.65;
}

/* Tablet */
@media (max-width: 850px) {
  .gp-why-section {
    padding: 45px 25px 50px;
  }

  .gp-why-heading {
    gap: 18px;
    margin-bottom: 48px;
  }

  .gp-why-heading h2 {
    font-size: clamp(24px, 4vw, 32px);
    letter-spacing: -0.5px;
  }

  .gp-why-grid {
    gap: 25px;
  }

  .gp-why-icon {
    margin-bottom: 25px;
  }

  .gp-why-item h3 {
    font-size: 21px;
  }

  .gp-why-item p {
    font-size: 15px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .gp-why-section {
    padding: 38px 22px 45px;
  }

  .gp-why-heading {
    gap: 12px;
    margin-bottom: 40px;
  }

  .gp-why-line {
    max-width: 35px;
  }

  .gp-why-heading h2 {
    font-size: 25px;
    line-height: 1.35;
  }

  .gp-why-grid {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .gp-why-item {
    padding: 0 8px;
  }

  .gp-why-icon {
    min-height: 60px;
    margin-bottom: 18px;
  }

  .gp-why-icon svg {
    width: 42px;
    height: 42px;
  }

  .gp-why-item h3 {
    margin-bottom: 10px;
    font-size: 23px;
  }

  .gp-why-item p {
    max-width: 340px;
    font-size: 15px;
    line-height: 1.7;
  }
}

      `}</style>
      <Footer />
    </main>
    
  );
}
