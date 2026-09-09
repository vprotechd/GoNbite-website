import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  Utensils,
  Smartphone,
  Users,
  Sparkles,
  Code2,
  Rocket,
  MapPin,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food1 from "../assets/images/food7.jpg";
import food3 from "../assets/images/food8.jpg";
import food4 from "../assets/images/food10.jpg";
import food5 from "../assets/images/food9.jpg";

import "./About.css";

const values = [
  {
    number: "01",
    icon: Utensils,
    title: "Good Food",
    text: "We put delicious food at the center of everything we build.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Simple Experience",
    text: "Finding and enjoying food should feel natural, quick and effortless.",
  },
  {
    number: "03",
    icon: Users,
    title: "People First",
    text: "We create experiences around real people and their everyday cravings.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Made With Care",
    text: "Every detail matters when we are creating something people use every day.",
  },
];

function About() {
  return (
    <div className="about-page">

      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-grid">

          <motion.div
            className="about-hero-left"
            initial={{ opacity: 0, x: -45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >

            <div className="about-kicker">
              <span>01</span>
              <div></div>
              ABOUT GONBITE
            </div>

            <h1>
              More than
              <br />
              <span>just food.</span>
            </h1>

            <p>
              GoNbite is built around a simple belief:
              finding something delicious should be an
              enjoyable part of your day.
            </p>

            <Link
              to="/how-it-works"
              className="about-hero-link"
            >
              Discover our story
              <ArrowUpRight size={18} />
            </Link>

          </motion.div>


          <motion.div
            className="about-hero-right"
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
          >

            <div className="hero-image-frame">
              <img
                src={food1}
                alt="Delicious food from GoNbite"
              />
            </div>

            <div className="hero-image-caption">
              <span>GONBITE / 2026</span>
              <p>
                Good food has a way of turning
                ordinary moments into memories.
              </p>
            </div>

          </motion.div>

        </div>


        <div className="hero-bottom-line">
          <span>DISCOVER</span>
          <span>CHOOSE</span>
          <span>ENJOY</span>
          <span className="hero-scroll-text">
            SCROLL TO EXPLORE ↓
          </span>
        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="about-introduction">

        <div className="intro-number">
          02
        </div>

        <motion.div
          className="intro-main"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <span className="editorial-label">
            THE IDEA
          </span>

          <h2>
            We wanted to make
            <br />
            <em>food discovery</em>
            <br />
            feel different.
          </h2>

        </motion.div>


        <motion.div
          className="intro-copy"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
        >

          <p>
            GoNbite started with a simple thought —
            people should spend less time searching
            and more time enjoying.
          </p>

          <p>
            From everyday meals to those unexpected
            cravings, food is part of how we connect,
            celebrate and create memories.
          </p>

          <p>
            We are building a food experience that
            brings those moments closer.
          </p>

        </motion.div>

      </section>


      {/* =====================================================
          STORY
      ===================================================== */}

      <section className="about-story">

        <div className="story-header">

          <div className="story-header-number">
            03
          </div>

          <div>
            <span className="editorial-label">
              OUR STORY
            </span>

            <h2>
              Built around
              <br />
              <em>real moments.</em>
            </h2>
          </div>

        </div>


        <div className="story-content">

          <motion.div
            className="story-image"
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
          >

            <img
              src={food3}
              alt="GoNbite food experience"
            />

            <span>
              FOOD / PEOPLE / MOMENTS
            </span>

          </motion.div>


          <motion.div
            className="story-text"
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
          >

            <div className="story-line"></div>

            <h3>
              It starts with
              <br />
              a craving.
            </h3>

            <p>
              Maybe it is lunch between meetings.
              Maybe it is dinner with friends.
              Maybe you simply want to try something
              new.
            </p>

            <p>
              Whatever the reason, GoNbite makes
              discovering food feel simple and
              enjoyable.
            </p>

            <div className="story-signature">
              <Heart size={17} />
              <span>
                Created for food lovers
              </span>
            </div>

          </motion.div>

        </div>


        <div className="story-statements">

          <div>
            <strong>01</strong>
            <span>Find something delicious.</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Make it part of your day.</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Create a moment worth remembering.</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">

        <div className="values-title-block">

          <div className="values-number">
            04
          </div>

          <div>

            <span className="editorial-label">
              WHAT MATTERS
            </span>

            <h2>
              The things
              <br />
              <em>we care about.</em>
            </h2>

          </div>

        </div>


        <div className="values-list">

          {values.map((value, index) => {

            const Icon = value.icon;

            return (
              <motion.div
                className="value-item"
                key={value.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
              >

                <div className="value-number">
                  {value.number}
                </div>

                <div className="value-icon">
                  <Icon size={20} />
                </div>

                <div className="value-info">
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>

                <ArrowUpRight className="value-arrow" size={20} />

              </motion.div>
            );

          })}

        </div>

      </section>


      {/* =====================================================
          FOOD IMAGE
      ===================================================== */}

      <section className="about-food-section">

        <div className="food-section-heading">

          <span>
            05 / THE EXPERIENCE
          </span>

          <h2>
            Food has a way
            <br />
            of bringing us <em>together.</em>
          </h2>

        </div>


        <motion.div
          className="food-editorial-image"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
          }}
        >

          <img
            src={food4}
            alt="GoNbite food"
          />

          <div className="food-image-word">
            GONBITE
          </div>

        </motion.div>

      </section>


      {/* =====================================================
          TECHNOLOGY PARTNER
      ===================================================== */}

      <section className="about-partner">

        <div className="partner-heading">

          <span className="editorial-label">
            06 / TECHNOLOGY
          </span>

          <h2>
            Food meets
            <br />
            <em>technology.</em>
          </h2>

        </div>


        <div className="partner-grid">

          <motion.div
            className="partner-image"
            initial={{
              opacity: 0,
              x: -45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <img
              src={food5}
              alt="Technology powering GoNbite"
            />

            <div className="partner-image-label">
              <Rocket size={17} />
              <span>
                BUILT TO MOVE IDEAS FORWARD
              </span>
            </div>

          </motion.div>


          <motion.div
            className="partner-information"
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="partner-small-label">
              <Code2 size={16} />
              TECHNOLOGY PARTNER
            </div>

            <h3>
              Powered by
              <br />
              <span>VProTech Digital.</span>
            </h3>

            <p>
              Behind GoNbite is technology designed
              and developed with a focus on performance,
              usability and modern digital experiences.
            </p>


            <div className="partner-checks">

              <div>
                <Check size={16} />
                <span>Modern digital architecture</span>
              </div>

              <div>
                <Check size={16} />
                <span>Scalable technology solutions</span>
              </div>

              <div>
                <Check size={16} />
                <span>User-focused experiences</span>
              </div>

            </div>


            <div className="partner-location">

              <MapPin size={17} />

              <div>
                <span>Technology partner</span>
                <strong>
                  VProTech Digital · Mohali
                </strong>
              </div>

            </div>


            <Link
              to="/contact"
              className="partner-link"
            >
              Connect with us
              <ArrowUpRight size={18} />
            </Link>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          FINAL MESSAGE
      ===================================================== */}

      <section className="about-final">

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <span>
            THIS IS GONBITE
          </span>

          <h2>
            Good food.
            <br />
            Good people.
            <br />
            <em>Good moments.</em>
          </h2>

       

        </motion.div>

      </section>


      <Footer />

    </div>
  );
}

export default About;