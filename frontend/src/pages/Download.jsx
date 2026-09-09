import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Apple,
  Play,
  ArrowUpRight,
  QrCode,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import food1 from "../assets/images/food1.jpg";
import food2 from "../assets/images/food2.jpg";
import food3 from "../assets/images/food3.jpg";

import "./Download.css";

const Download = () => {
  // Change this later to your real Play Store / App Store URL
  const downloadUrl = "https://gonbite.com/download";

  return (
    <>
      <Navbar />

      <main className="download-page">

        {/* =====================================================
            DOWNLOAD HERO
        ===================================================== */}

        <section className="download-hero">

          <div className="download-hero-container">

            {/* ================= LEFT CONTENT ================= */}

            <motion.div
              className="download-hero-content"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              <div className="download-label">
                
              </div>

              <h1>
                Your next
                <br />
                <em>favorite bite</em>
                <br />
                is waiting.
              </h1>

              <p>
                Discover delicious food, explore local restaurants,
                place your order and enjoy your favorite meals —
                all from the GoNbite app.
              </p>


              {/* ================= DOWNLOAD AREA ================= */}

              <div className="download-action-area">

                {/* QR CODE */}

                <motion.div
                  className="download-qr-box"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                >

                  <div className="qr-wrapper">

                    <QRCodeSVG
                      value={downloadUrl}
                      size={145}
                      bgColor="#ffffff"
                      fgColor="#241914"
                      level="H"
                    />

                  </div>

                  <div className="qr-content">

                    <div className="qr-icon">
                      <QrCode size={16} />
                    </div>

                    <div>
                      <strong>Scan to download</strong>
                      <span>Open with your phone camera</span>
                    </div>

                  </div>

                </motion.div>


                {/* STORE BUTTONS */}

                <div className="download-stores">

                  {/* GOOGLE PLAY */}

                  <a
                    href="#"
                    className="download-store-button"
                    onClick={(e) => e.preventDefault()}
                  >

                    <span className="store-icon">
                      <Play
                        size={22}
                        fill="currentColor"
                      />
                    </span>

                    <span className="store-text">
                      <small>GET IT ON</small>
                      <strong>Google Play</strong>
                    </span>

                    <ArrowUpRight size={18} />

                  </a>


                  {/* APP STORE */}

                  <a
                    href="#"
                    className="download-store-button"
                    onClick={(e) => e.preventDefault()}
                  >

                    <span className="store-icon">
                      <Apple
                        size={24}
                        fill="currentColor"
                      />
                    </span>

                    <span className="store-text">
                      <small>DOWNLOAD ON THE</small>
                      <strong>App Store</strong>
                    </span>

                    <ArrowUpRight size={18} />

                  </a>

                </div>

              </div>


              <div className="download-note">

                <Smartphone size={17} />

                <span>
                  Available soon on Android & iOS
                </span>

              </div>

            </motion.div>


            {/* ================= RIGHT VISUAL ================= */}

            <motion.div
              className="download-visual"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
              }}
            >

              <div className="visual-background"></div>


              {/* MAIN PHONE */}

              <div className="phone-mockup">

                <div className="phone-speaker"></div>

                <div className="phone-screen">

                  <div className="app-status">
                    <span>9:41</span>
                    <span>● ● ●</span>
                  </div>

                  <div className="app-header">

                    <div>
                      <small>Good evening 👋</small>

                      <h3>
                        What are you
                        <br />
                        craving?
                      </h3>
                    </div>

                    <div className="app-avatar">
                      G
                    </div>

                  </div>


                  <div className="app-search">
                    <span>
                      Search for food...
                    </span>

                    <span>⌕</span>
                  </div>


                  <div className="app-featured">

                    <img
                      src={food3}
                      alt="Featured food"
                    />

                    <div className="featured-overlay">

                      <small>
                        GONBITE PICK
                      </small>

                      <strong>
                        Something delicious
                      </strong>

                    </div>

                  </div>


                  <div className="app-section-title">

                    <strong>
                      Popular near you
                    </strong>

                    <span>
                      See all
                    </span>

                  </div>


                  <div className="app-mini-list">

                    <div className="app-mini-item">

                      <div className="mini-food">
                        <img
                          src={food1}
                          alt=""
                        />
                      </div>

                      <div>
                        <strong>
                          Fresh & tasty
                        </strong>

                        <small>
                          Ready to order
                        </small>
                      </div>

                      <b>+</b>

                    </div>


                    <div className="app-mini-item">

                      <div className="mini-food">
                        <img
                          src={food2}
                          alt=""
                        />
                      </div>

                      <div>
                        <strong>
                          Your favorites
                        </strong>

                        <small>
                          Order again
                        </small>
                      </div>

                      <b>+</b>

                    </div>

                  </div>


                  <button className="app-button">
                    Explore food
                    <ArrowUpRight size={14} />
                  </button>

                </div>

              </div>


              {/* FLOATING DOWNLOAD CARD */}

              <motion.div
                className="download-floating-card"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                }}
              >

                <div className="floating-icon">
                  <Smartphone size={18} />
                </div>

                <div>
                  <strong>
                    GoNbite App
                  </strong>

                  <small>
                    Food at your fingertips
                  </small>
                </div>

              </motion.div>


              {/* SMALL FOOD CARD */}

              <motion.div
                className="floating-food-card"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                }}
              >

                <img
                  src={food1}
                  alt="GoNbite food"
                />

                <span>
                  GOOD FOOD
                </span>

              </motion.div>

            </motion.div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Download;