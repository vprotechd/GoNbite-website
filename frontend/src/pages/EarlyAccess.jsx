import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Smartphone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";
import "./EarlyAccess.css";

const faqs = [
  {
    q: "When is GoNbite launching?",
    a: "GoNbite is in the final stages of preparation and testing for its Mohali launch. We are using the pre-launch period to prepare the app experience, restaurant partnerships and local delivery operations before opening the service more widely. We will publish the confirmed launch date through our website and early-access updates. Joining the waitlist is the simplest way to receive that announcement without having to keep checking the site. It also gives us a better idea of where our first customers are located across Mohali. The exact date may depend on final testing and launch readiness, so we recommend treating the waitlist as the source for the latest GoNbite launch update."
  },
  {
    q: "Is GoNbite available in my area?",
    a: "The initial GoNbite rollout is planned for Mohali, with the delivery network being prepared across multiple sectors and phases. Planned launch coverage includes areas such as Sector 17, Sector 22, Sector 35, Phase 7, Phase 11 and the JLPL Industrial Area, along with 50+ other neighbourhoods as the network expands. Coverage can change during launch preparation because restaurant availability and delivery operations vary by area. When you join the waitlist, tell us your sector or phase so we can understand where early users are waiting for GoNbite. We will use launch communications to share the latest coverage information when ordering opens."
  },
  {
    q: "How much is the early-access discount?",
    a: "Early waitlist members are planned to receive ₹100 off their first GoNbite order after launch, subject to the final offer terms published when the service goes live. The waitlist offer is designed to thank the people who supported GoNbite before launch. If additional launch promotions are available, they may be communicated separately through the website, email or other official GoNbite channels. We recommend keeping the mobile number and email address you use for the waitlist active so you can receive launch information. Any minimum order value, expiry date, eligible restaurants or other redemption conditions will be shown clearly with the final offer."
  },
  {
    q: "Will there be a delivery fee?",
    a: "GoNbite plans to keep delivery fees competitive for customers in Mohali. Final delivery pricing can vary by distance, restaurant, order conditions and launch offers, so the exact amount will be shown before an order is confirmed. Early-access members are also planned to receive free delivery on their first three orders, subject to the final terms of the launch promotion. We will publish the applicable conditions when ordering becomes available. Our goal is to make the total ordering experience transparent, so customers can see relevant fees and discounts before paying. Joining the waitlist does not itself create an order or payment obligation."
  },
  {
    q: "What happens after I join the waitlist?",
    a: "After you submit the waitlist form, your details are recorded on the device running this pre-launch website experience. The production waitlist can later be connected to GoNbite’s customer database, CRM or notification service so launch messages can be sent automatically. The information requested is your name, mobile number, email address and Mohali area, which helps organize early access by neighbourhood. When the live waitlist system is connected, the intended journey is simple: receive a launch notification, access the app or store listing, sign in, place your first order and apply the applicable early-user offer. Until that connection is enabled, this website form should be treated as a front-end registration experience rather than an SMS subscription."
  },
  {
    q: "Will GoNbite have voice ordering and visual food search?",
    a: "Yes, these are part of the technology experience GoNbite is preparing. Voice ordering is intended to make food discovery and ordering easier when typing is inconvenient: customers will be able to speak naturally and use the result to build an order. The planned visual-search feature is designed around a simple idea: if you see a dish you like, you can use an image to help find a matching food item or restaurant in the GoNbite network. Both experiences depend on the final app implementation, restaurant catalogue and launch readiness. We will introduce these capabilities as they become available rather than presenting unfinished functionality as already live."
  }
];

const EarlyAccess = () => (
  <>
    <Navbar />
    <main className="early-access-page">
      <section className="early-hero">
        <div className="early-hero-copy">
          <span className="early-kicker">EARLY ACCESS / MOHALI</span>
          <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>Get Early Access to GoNbite – Mohali's Newest Food Delivery App</motion.h1>
          <p>The app stores aren't ready for us yet, but you can be. Sign up for early access and be among the first people to place an order when GoNbite goes live.</p>
          <div className="early-points">
            <span><CheckCircle2 size={18}/> ₹100 off your first order</span>
            <span><CheckCircle2 size={18}/> Launch updates for your area</span>
            <span><CheckCircle2 size={18}/> Priority early-access communication</span>
          </div>
        </div>
        <div className="early-form-card">
          <span className="early-kicker">JOIN THE WAITLIST</span>
          <h2>Be the First to Order</h2>
          <p>Tell us where you are in Mohali and we’ll keep you updated as launch gets closer.</p>
          <WaitlistForm />
        </div>
      </section>

      <section className="early-steps">
        <div><span>01</span><MapPin/><h3>Enter your details</h3><p>Enter your name, mobile number, email and Mohali area below.</p></div>
        <div><span>02</span><CheckCircle2/><h3>Join early access</h3><p>Your pre-launch request is recorded so the launch journey can be connected to the live waitlist system.</p></div>
        <div><span>03</span><Smartphone/><h3>Get the launch update</h3><p>When GoNbite is live, official launch communication will tell you where to download and how to order.</p></div>
        <div><span>04</span><ArrowRight/><h3>Order your favourite food</h3><p>Open GoNbite, discover local food and use your eligible early-user offer.</p></div>
      </section>

      <section className="faq-section">
        <div className="faq-heading"><span className="early-kicker">PRE-LAUNCH FAQ</span><h2>Questions Mohali food lovers are already asking.</h2></div>
        <div className="faq-list">
          {faqs.map((item, index) => <details key={item.q}><summary><span>0{index+1}</span>{item.q}</summary><p>{item.a}</p></details>)}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default EarlyAccess;
