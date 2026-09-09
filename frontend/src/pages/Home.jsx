import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  MapPin,
  ChevronDown,
  Zap,
  ShieldCheck,
  Heart,
  Search,
  ShoppingBag,
  Smile,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food1 from "../assets/images/food1.jpg";
import food2 from "../assets/images/food2.jpg";
import food3 from "../assets/images/food3.jpg";
import food4 from "../assets/images/food4.jpg";
import food5 from "../assets/images/food5.jpg";

import "./Home.css";

const heroImages = [food1, food2, food3, food4, food5];

const foodNames = [
  "Delicious Burgers",
  "Fresh & Tasty Meals",
  "Your Favorite Pizza",
  "Authentic Indian Food",
  "Sweet Cravings",
];

const categories = [
  {
    title: "Burgers",
    image: food1,
    description: "Juicy, cheesy & irresistible",
  },
  {
    title: "Pizza",
    image: food2,
    description: "Freshly baked happiness",
  },
  {
    title: "Indian Food",
    image: food3,
    description: "Authentic flavors & spices",
  },
  {
    title: "Healthy Meals",
    image: food4,
    description: "Fresh, nutritious & tasty",
  },
  {
    title: "Desserts",
    image: food5,
    description: "Sweet moments made better",
  },
  {
    title: "Fast Food",
    image: food1,
    description: "Quick bites, big flavors",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    text: "Get your favorite meals delivered quickly while they are fresh and delicious.",
  },
  {
    icon: ShieldCheck,
    title: "Fresh & Reliable",
    text: "Enjoy quality food from trusted restaurants with reliable delivery.",
  },
  {
    icon: Heart,
    title: "Made For You",
    text: "Discover food that matches your cravings, mood and favorite flavors.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose",
    text: "Explore restaurants and discover something delicious.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Order",
    text: "Pick your favorites and place your order in just a few taps.",
  },
  {
    number: "03",
    icon: Smile,
    title: "Enjoy",
    text: "Sit back, relax and enjoy your meal at your doorstep.",
  },
];

const categoryContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryItem = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <div className="home">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
{/* =====================================================
    HERO SECTION
===================================================== */}

<section className="hero">

  {/* Background Food Image */}
  <div className="hero-background">
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={currentImage}
        src={heroImages[currentImage]}
        alt={foodNames[currentImage]}
        className="hero-food-image"

        initial={{
          opacity: 0,
          scale: 1.02,
        }}

        animate={{
          opacity: 1,
          scale: 1.08,
        }}

        exit={{
          opacity: 0,
          scale: 1.03,
        }}

        transition={{
          opacity: {
            duration: 0.4,
            ease: "easeOut",
          },

          scale: {
            duration: 5,
            ease: "linear",
          },
        }}
      />
    </AnimatePresence>
  </div>


  {/* Very Light Overlay */}
  <div className="hero-overlay"></div>


  {/* Subtle decorative glow */}
  <div className="hero-glow hero-glow-one"></div>
  <div className="hero-glow hero-glow-two"></div>


  {/* Hero Content */}
  <motion.div
    className="hero-content"

    initial="hidden"
    animate="visible"

    variants={{
      hidden: {},

      visible: {
        transition: {
          staggerChildren: 0.12,
        },
      },
    }}
  >

    {/* Badge */}
    <motion.div
      className="hero-badge"

      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.6,
          },
        },
      }}
    >
      <span className="badge-dot"></span>

      Your cravings, delivered
    </motion.div>


    {/* Heading */}
    <motion.h1
      variants={{
        hidden: {
          opacity: 0,
          y: 25,
        },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.7,
          },
        },
      }}
    >
      Good Food.
      <br />

      <span>Good Mood.</span>
    </motion.h1>


    {/* Description */}
    <motion.p
      className="hero-description"

      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.6,
          },
        },
      }}
    >
      Discover delicious food from your favorite restaurants
      and get it delivered straight to your doorstep.
    </motion.p>


    {/* Buttons */}
    <motion.div
      className="hero-buttons"

      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.6,
          },
        },
      }}
    >

      <Link
        to="/about"
        className="primary-btn"
      >
        Explore GoNbite

        <ArrowRight size={19} />
      </Link>


      <Link
        to="/how-it-works"
        className="secondary-btn"
      >
        <span className="play-icon">
          <Play
            size={14}
            fill="currentColor"
          />
        </span>

        How It Works
      </Link>

    </motion.div>


    {/* Location */}
    <motion.div
      className="hero-location"

      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },

        visible: {
          opacity: 1,
          y: 0,

          transition: {
            duration: 0.6,
          },
        },
      }}
    >

      <div className="location-icon">
        <MapPin size={20} />
      </div>

      <div className="location-text">

        <span>
          Delivering happiness
        </span>

        <strong>
          Right to your doorstep
        </strong>

      </div>

      <ChevronDown
        size={18}
        className="location-arrow"
      />

    </motion.div>

  </motion.div>


  {/* Slider Indicators */}
  <div className="hero-indicators">

    {heroImages.map((_, index) => (

      <button
        key={index}

        className={`indicator ${
          currentImage === index
            ? "active"
            : ""
        }`}

        onClick={() =>
          setCurrentImage(index)
        }

        aria-label={`Show food image ${index + 1}`}
      />

    ))}

  </div>


  {/* Food Name */}
  <div className="hero-food-name">

    <AnimatePresence
      initial={false}
      mode="wait"
    >

      <motion.span
        key={foodNames[currentImage]}

        initial={{
          opacity: 0,
          y: 8,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
          y: -8,
        }}

        transition={{
          duration: 0.3,
        }}
      >
        {foodNames[currentImage]}
      </motion.span>

    </AnimatePresence>

  </div>


 

</section>

      {/* =====================================================
          FOOD CATEGORIES SECTION
      ===================================================== */}

      <section className="food-categories-section">

        <div className="categories-container">

          <motion.div
            className="categories-heading"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="section-eyebrow">
              <span></span>
              EXPLORE THE FLAVORS
            </div>

            <h2>
              Everything You Crave,
              <br />
              <span>One Place.</span>
            </h2>

            <p>
              From comfort food to healthy favorites, discover
              delicious choices made for every mood and every craving.
            </p>

          </motion.div>

          <motion.div
            className="food-category-grid"
            variants={categoryContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
          >

            {categories.map((category, index) => (
              <motion.div
                className="food-category-card"
                key={category.title}
                variants={categoryItem}
                whileHover={{
                  y: -10,
                }}
              >

                <div className="category-image">

                  <img
                    src={category.image}
                    alt={category.title}
                  />

                  <div className="category-image-overlay"></div>

                  <span className="category-number">
                    0{index + 1}
                  </span>

                  <motion.div
                    className="category-arrow"
                    whileHover={{
                      rotate: 45,
                    }}
                  >
                    <ArrowRight size={19} />
                  </motion.div>

                </div>

                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

              </motion.div>
            ))}

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          WHY GONBITE SECTION
      ===================================================== */}

      <section className="why-section">

        <div className="why-decoration why-decoration-one"></div>
        <div className="why-decoration why-decoration-two"></div>

        <div className="why-container">

          {/* Image */}
          <motion.div
            className="why-image-wrapper"
            initial={{
              opacity: 0,
              x: -70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >

            <div className="why-image-card">

              <img
                src={food4}
                alt="Delicious GoNbite food"
              />

            </div>

            <motion.div
              className="why-floating-card"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <div className="floating-check">
                <Heart
                  size={20}
                  fill="currentColor"
                />
              </div>

              <div>
                <strong>Loved by foodies</strong>
                <span>Made for every craving</span>
              </div>

            </motion.div>

          </motion.div>

          {/* Content */}
          <motion.div
            className="why-content"
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          >

            <div className="section-eyebrow">
              <span></span>
              WHY GONBITE
            </div>

            <h2>
              More Than Food.
              <br />
              <span>It’s a Better Way to Eat.</span>
            </h2>

            <p className="why-description">
              GoNbite brings great food, trusted restaurants and
              convenient delivery together in one simple experience.
              Whether you are hungry for a quick bite or planning
              your next big meal, we make every order easier.
            </p>

            <div className="feature-list">

              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    className="feature-card"
                    key={feature.title}
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
                      delay: index * 0.12,
                      duration: 0.6,
                    }}
                    whileHover={{
                      x: 8,
                    }}
                  >

                    <div className="feature-icon">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>

                  </motion.div>
                );
              })}

            </div>

            <Link
              to="/why-choose-us"
              className="why-button"
            >
              Discover GoNbite
              <ArrowRight size={18} />
            </Link>

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS SECTION
      ===================================================== */}

      <section className="how-section">

        <div className="how-bg-circle how-circle-one"></div>
        <div className="how-bg-circle how-circle-two"></div>

        <div className="how-container">

          <motion.div
            className="how-heading"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="section-eyebrow section-eyebrow-light">
              <span></span>
              HOW IT WORKS
            </div>

            <h2>
              Your next favorite meal
              <br />
              is just <span>a few taps away.</span>
            </h2>

            <p>
              Simple, quick and delicious. GoNbite makes ordering
              your favorite food easier than ever.
            </p>

          </motion.div>

          {/* Steps */}
          <div className="steps-grid">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  className="step-card"
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.7,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >

                  <div className="step-top">

                    <span>{step.number}</span>

                    <div className="step-icon">
                      <Icon size={24} />
                    </div>

                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>

                  {index !== steps.length - 1 && (
                    <div className="step-line"></div>
                  )}

                </motion.div>
              );
            })}

          </div>

          {/* CTA */}
          <motion.div
            className="how-cta"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >

            <div>
              <span>READY WHEN YOU ARE</span>

              <h3>
                Let’s make your next meal unforgettable.
              </h3>
            </div>

            <Link
              to="/contact"
              className="how-cta-button"
            >
              Get Started
              <ArrowRight size={19} />
            </Link>

          </motion.div>

        </div>

      </section>

      <Footer />

    </div>
    
  );
  
}

export default Home;