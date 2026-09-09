import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Globe,
  MapPin,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food4 from "../assets/images/food4.jpg";

import "./Contact.css";

const Contact = () => {
  const contactItems = [
    {
      number: "01",
      icon: Mail,
      label: "EMAIL",
      value: "support@gonbite.com",
      href: "mailto:support@gonbite.com",
    },
    {
      number: "02",
      icon: Phone,
      label: "PHONE",
      value: "+91 6283409048",
      href: "tel:+916283409048",
    },
    {
      number: "03",
      icon: Phone,
      label: "PHONE",
      value: "+91 8146759497",
      href: "tel:+918146759497",
    },
   {
  number: "04",
  icon: Globe,
  label: "Address",
  value: "SCF-116 A, Second Floor, Phase 5, Industrial Area, Sector 58, Sahibzada Ajit Singh Nagar, Punjab 160055",
  href: "https://www.google.com/maps/search/?api=1&query=VProTech+Digital+Mohali+Punjab+India",
  external: true,
},
  ];

  return (
    <>
      <Navbar />

      <main className="contact-page">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="contact-hero">

          <div className="contact-hero-container">

            <motion.div
              className="contact-hero-text"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              <div className="contact-label">
                <span>CONTACT</span>
                <div></div>
                <span>GONBITE</span>
              </div>

              <h1>
                Let's talk
                <br />
                <em>food.</em>
              </h1>

              <p>
                Have a question, an idea, a partnership opportunity,
                or simply want to connect with us?
                We'd love to hear from you.
              </p>

              <div className="contact-place">

                <MapPin size={18} />

                <div>
                  <small>BASED IN</small>
                  <strong>Mohali, Punjab, India</strong>
                </div>

              </div>

            </motion.div>


            <motion.div
              className="contact-hero-photo"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div className="contact-photo-frame">
                <img
                  src={food4}
                  alt="GoNbite food"
                />
              </div>

              <div className="contact-photo-tag">
                GOOD FOOD
                <span>×</span>
                GOOD MOOD
              </div>

            </motion.div>

          </div>

        </section>


        {/* =====================================================
            CONTACT DETAILS
        ===================================================== */}

        <section className="contact-list-section">

          <div className="contact-list-container">

            <div className="contact-list-title">

              <span className="contact-section-number">
                01
              </span>

              <div>

                <small>GET IN TOUCH</small>

                <h2>
                  We're here
                  <br />
                  <em>to help.</em>
                </h2>

              </div>

            </div>


            <div className="contact-list">

              {contactItems.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.value}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={
                      item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="contact-list-item"
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                  >

                    <span className="contact-item-number">
                      {item.number}
                    </span>

                    <span className="contact-item-icon">
                      <Icon size={20} />
                    </span>

                    <span className="contact-item-content">
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                    </span>

                    <span className="contact-item-arrow">
                      <ArrowUpRight size={21} />
                    </span>

                  </motion.a>
                );
              })}

            </div>

          </div>

        </section>


        {/* =====================================================
            LOCATION
        ===================================================== */}

        <section className="contact-location-section">

          <div className="location-container">

            <div className="location-number">
              02
            </div>

            <div className="location-main">

              <small>OUR LOCATION</small>

              <h2>
                From <em>Mohali,</em>
                <br />
                with love.
              </h2>

              <p>
                GoNbite is proudly based in Mohali, Punjab.
                This is where our journey begins as we work
                towards creating a better food experience.
              </p>

              <div className="location-address">

                <MapPin size={19} />

                <span>
                  Mohali, Punjab, India
                </span>

              </div>

            </div>


            <div className="location-side">

              <div className="location-card">

                <span>GONBITE</span>

                <h3>
                  GOOD FOOD
                  <br />
                  GOOD MOOD
                </h3>

                <div className="location-card-line"></div>

                <small>
                  FOOD • PEOPLE • COMMUNITY
                </small>

              </div>

            </div>

          </div>

        </section>


      

      </main>

      <Footer />
    </>
  );
};

export default Contact;