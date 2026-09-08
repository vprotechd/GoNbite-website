import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingBag,
  MapPin,
  Bike,
  ArrowRight,
  CheckCircle2,
  Smartphone,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food1 from "../assets/images/food14.jpeg";
import food2 from "../assets/images/food15.jpg";
import food3 from "../assets/images/food16.jpg";
import food4 from "../assets/images/food17.jpg";
import food5 from "../assets/images/food18.jpg";

import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Find something you love",
    text: "Open GoNbite and explore restaurants, cuisines and dishes that match your mood.",
    icon: Search,
    image: food1,
    tag: "EXPLORE",
  },
  {
    number: "02",
    title: "Build your perfect order",
    text: "Pick your favorites, customize your meal and add everything you are craving to your basket.",
    icon: ShoppingBag,
    image: food2,
    tag: "CHOOSE",
  },
  {
    number: "03",
    title: "Tell us where to go",
    text: "Add your delivery location and check your order details before placing your order.",
    icon: MapPin,
    image: food3,
    tag: "CONFIRM",
  },
  {
    number: "04",
    title: "Sit back. We're on the way.",
    text: "Once your order is confirmed, your food makes its way from the restaurant to your doorstep.",
    icon: Bike,
    image: food4,
    tag: "DELIVER",
  },
];

const HowItWorks = () => {
  return (
    <>
      <Navbar />

      <main className="how-page">

        {/* HERO */}
        <section className="how-hero">
          <div className="how-hero-left">

            <motion.div
              className="how-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span></span>
              HOW GONBITE WORKS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              From craving
              <br />
              to <i>doorstep.</i>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Great food shouldn't come with complicated steps.
              GoNbite keeps the entire experience simple, from
              choosing your meal to taking the first bite.
            </motion.p>

            <motion.div
              className="how-scroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowRight size={17} />
            </motion.div>

          </div>

          <motion.div
            className="how-hero-art"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="hero-food-circle">
              <img src={food5} alt="GoNbite food" />
            </div>

            <div className="hero-order-card">
              <div className="mini-check">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <strong>Order confirmed</strong>
                <small>Your food is being prepared</small>
              </div>
            </div>

            <div className="hero-small-circle">
              <Smartphone size={23} />
            </div>
          </motion.div>
        </section>


        {/* QUICK INTRO */}
        <section className="how-intro">
          <div className="how-intro-number">01 — 04</div>

          <div>
            <h2>
              Four simple steps.
              <br />
              <span>One delicious destination.</span>
            </h2>

            <p>
              No complicated process. No unnecessary waiting around.
              Just choose, order, relax and enjoy.
            </p>
          </div>
        </section>


        {/* JOURNEY */}
        <section className="journey-section">

          <div className="journey-line">
            <div className="journey-line-progress"></div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const reverse = index % 2 !== 0;

            return (
              <motion.article
                className={`journey-step ${
                  reverse ? "journey-reverse" : ""
                }`}
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                }}
              >

                <div className="journey-number">
                  {step.number}
                </div>

                <div className="journey-image">
                  <img src={step.image} alt={step.title} />

                  <div className="journey-tag">
                    {step.tag}
                  </div>
                </div>

                <div className="journey-content">

                  <div className="journey-icon">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <span className="journey-small">
                    STEP {step.number}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>

                  <div className="journey-arrow">
                    <ArrowRight size={18} />
                  </div>

                </div>

              </motion.article>
            );
          })}

        </section>


        {/* ORDER EXPERIENCE */}
        <section className="order-experience">

          <div className="experience-copy">
            <span className="experience-label">
              THE GONBITE EXPERIENCE
            </span>

            <h2>
              Everything you need.
              <br />
              <i>Nothing you don't.</i>
            </h2>

            <p>
              We want ordering food to feel as natural as thinking
              about what you want to eat. That's why every part of
              GoNbite is designed to keep you moving toward the
              best part — your meal.
            </p>

            <div className="experience-points">

              <div>
                <CheckCircle2 size={19} />
                <span>Easy restaurant discovery</span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Simple ordering experience</span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Convenient doorstep delivery</span>
              </div>

            </div>
          </div>

          <div className="phone-showcase">

            <div className="phone-frame">

              <div className="phone-top">
                <span>9:41</span>
                <span>● ● ●</span>
              </div>

              <div className="phone-title">
                <small>Good evening 👋</small>
                <strong>What are you craving?</strong>
              </div>

              <div className="phone-food">
                <img src={food1} alt="Food" />
                <div>
                  <strong>Today's pick</strong>
                  <span>Something delicious</span>
                </div>
              </div>

              <div className="phone-items">
                <div>
                  <span></span>
                  <div>
                    <strong>Fresh meal</strong>
                    <small>Ready to order</small>
                  </div>
                  <b>+</b>
                </div>

                <div>
                  <span></span>
                  <div>
                    <strong>Your favorite</strong>
                    <small>Order again</small>
                  </div>
                  <b>+</b>
                </div>
              </div>

              <button className="phone-button">
                Explore food
                <ArrowRight size={16} />
              </button>

            </div>

          </div>
        </section>


        {/* CTA */}
        <section className="how-final-cta">

          <div className="cta-ring ring-one"></div>
          <div className="cta-ring ring-two"></div>

          <div className="how-final-content">

            <span>THAT'S IT.</span>

            <h2>
              Now all that's
              <br />
              left is the
              <i> first bite.</i>
            </h2>

            <button>
              Start exploring GoNbite
              <ArrowRight size={19} />
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default HowItWorks;