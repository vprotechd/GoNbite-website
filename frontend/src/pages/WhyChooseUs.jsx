import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  ShieldCheck,
  MapPin,
  Heart,
  Sparkles,
  Utensils,
  Smartphone,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food1 from "../assets/images/food11.jpg";
import food2 from "../assets/images/food12.jpg";
import food3 from "../assets/images/food13.jpg";
import food4 from "../assets/images/food15.jpg";
import food5 from "../assets/images/food19.jpg";

import "./WhyChooseUs.css";

const benefits = [
  {
    number: "01",
    title: "Food that feels worth ordering",
    text: "We focus on making the everyday food-ordering experience simpler, quicker and more enjoyable.",
    icon: Utensils,
  },
  {
    number: "02",
    title: "Less waiting. More eating.",
    text: "Smart ordering and delivery flow helps take the unnecessary waiting out of your meal.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "A place you can trust",
    text: "From discovering a restaurant to receiving your meal, every step is designed around a dependable experience.",
    icon: ShieldCheck,
  },
];

const values = [
  {
    title: "Made for real cravings",
    text: "Whether it is a quick lunch, late-night craving or weekend feast, GoNbite is built around how people actually eat.",
    image: food1,
  },
  {
    title: "Your food, your way",
    text: "Discover different cuisines, explore new places and order what sounds good to you.",
    image: food2,
  },
  {
    title: "Local food, closer to you",
    text: "We believe great food does not always need to come from far away. Good restaurants can be right around the corner.",
    image: food3,
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <Navbar />

      <main className="why-page">

        {/* HERO */}
        <section className="why-hero">
          <div className="why-hero-copy">
            <motion.span
              className="why-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              THE GONBITE DIFFERENCE
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Why settle for
              <br />
              <span>ordinary food?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              GoNbite is made for people who care about good food,
              easy ordering and getting their cravings exactly when
              they want them.
            </motion.p>

            <motion.div
              className="why-hero-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span>Discover the difference</span>
              <ArrowUpRight size={19} />
            </motion.div>
          </div>

          <motion.div
            className="why-hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="hero-photo-main">
              <img src={food4} alt="Delicious food from GoNbite" />
            </div>

            <div className="hero-floating-card">
              <span className="floating-icon">
                <Heart size={17} fill="currentColor" />
              </span>

              <div>
                <strong>Made for cravings</strong>
                <small>Every order, every time</small>
              </div>
            </div>

            <div className="hero-circle-text">
              <span>GOOD FOOD</span>
              <span>•</span>
              <span>GOOD MOOD</span>
            </div>
          </motion.div>
        </section>


        {/* INTRO */}
        <section className="why-intro">
          <div className="why-intro-label">
            <span>01</span>
            <span>WHY GONBITE</span>
          </div>

          <div className="why-intro-content">
            <h2>
              Food delivery should
              <em> feel easy.</em>
            </h2>

            <p>
              Finding something delicious should not feel like work.
              GoNbite brings restaurants, meals and hungry people
              together through a simple experience designed around
              one thing — enjoying your food.
            </p>
          </div>
        </section>


        {/* BENEFITS */}
        <section className="benefits-section">
          <div className="benefits-heading">
            <span>WHAT MAKES US DIFFERENT</span>
            <h2>The little things<br />make the difference.</h2>
          </div>

          <div className="benefits-list">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  className="benefit-row"
                  key={item.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                  }}
                >
                  <div className="benefit-number">
                    {item.number}
                  </div>

                  <div className="benefit-icon">
                    <Icon size={25} strokeWidth={1.7} />
                  </div>

                  <div className="benefit-content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  <ArrowUpRight
                    className="benefit-arrow"
                    size={23}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* IMAGE STORY */}
        <section className="values-section">
          <div className="values-top">
            <div>
              <span>02 — THE EXPERIENCE</span>
              <h2>
                More than
                <br />
                <i>just a delivery.</i>
              </h2>
            </div>

            <p>
              We are building GoNbite around the moments that happen
              before, during and after the first bite.
            </p>
          </div>

          <div className="values-grid">
            {values.map((item, index) => (
              <motion.article
                className={`value-card value-card-${index + 1}`}
                key={item.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
              >
                <div className="value-image">
                  <img src={item.image} alt={item.title} />

                  <div className="value-index">
                    0{index + 1}
                  </div>
                </div>

                <div className="value-text">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>


        {/* NUMBERS */}
        <section className="numbers-section">
          <div className="numbers-intro">
            <Sparkles size={23} />
            <span>BUILT AROUND YOU</span>
          </div>

          <div className="numbers-grid">
            <div>
              <strong>01</strong>
              <span>Simple experience</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Cravings don't follow a clock</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>Reasons to try something new</span>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="why-cta">
          <div className="why-cta-shape"></div>

          <div className="why-cta-content">
            <span>READY WHEN YOU ARE</span>

            <h2>
              Your next
              <br />
              <i>favorite meal</i>
              <br />
              is waiting.
            </h2>

            <button>
              <span>Explore GoNbite</span>
              <ArrowUpRight size={20} />
            </button>
          </div>

          <div className="cta-food">
            <img src={food5} alt="GoNbite meal" />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default WhyChooseUs;