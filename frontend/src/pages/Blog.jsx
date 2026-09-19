import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Blog.css";

const momoSpots = [
  ["Mr. Momos","Phase 5","Special paneer and tandoori momos","₹119–₹219 for several six-piece options"],
  ["BIG MOMOS","Phase 3B2 / Sector 59","A momo-focused stop with late hours","Price varies by item"],
  ["Momos Junction","Phase 3B2 / Sector 60","Momos, Chinese and North Indian dishes","Around ₹400 for two"],
  ["Momopur","Phase 5 / Sector 59","Steam, fried, tandoori, Afghani and gravy styles","Several items start below ₹100"],
  ["Wow! Momo","CP67 / Sector 67","A familiar momo chain with multiple styles","Varies by menu"],
  ["Fusion momo By Call us Asian","Sector 69","Small-format Asian and momo specialist","Price varies by item"],
  ["Soulful Indo Chinese","Phase 3B2 / Sector 60","Indo-Chinese dishes with momo options","Around ₹200–₹400 for two"],
  ["Kalsang Cafe and Restaurant","Phase 3B2 / Sector 60","Chinese and Tibetan-style comfort food","Price varies by order"],
  ["Grild pizza momos & chaap junction","Phase 5 / Sector 59","Momos, pizza and chaap for late-night cravings","Price varies by order"],
  ["Brother's Snacks","Phase 3B2 / Sector 60","Small fast-food stop for quick evening bites","Around ₹1–₹200 for many items"]
];

const lateNight = [
  ["Khaira Dhaba","Phase 5 / Sector 59","24-hour listing"],
  ["Pizza Bites","Phase 5 / Sector 59","24-hour listing"],
  ["Gurh Laachi","Phase 3B2","24-hour listing"],
  ["Mr. Momos","Phase 5 / Sector 59","24-hour listing"],
  ["Big Momos","Phase 3B2 / Sector 59","Late-night hours"],
  ["Momopur","Phase 5 / Sector 59","Open around midnight; hours can vary"],
  ["Dumpling Hood","Jubilee Walk / Sector 70","Late-night hours"],
  ["Xero Degrees","Jubilee Walk / Sector 70","Open until around 1 AM"],
  ["BitesBee – A Food Nest","Bestech Business Tower area","Late-night hours on several days"],
  ["Sartaj Restaurant & Bar","Sector 74A / Airport Road","Open into the early morning"],
  ["Swagath Restaurant & Bar","Sector 79","Open around midnight"],
  ["Love's Bite","Jubilee Walk / Sector 70","24-hour listing"],
  ["King Chinese Bowl","Sector 68","Open into the early morning"],
  ["Dimsum Box Mohali","District One / Sector 68","Open into the early morning"],
  ["Grild pizza momos & chaap junction","Phase 5 / Sector 59","Late-night listing"]
];

const hiddenGems = [
  ["Soulful Indo Chinese","Phase 3B2 / Sector 60","A small local option for Indo-Chinese comfort food."],
  ["Fusion momo By Call us Asian","Sector 69","A compact momo and Asian-food stop worth exploring."],
  ["Brother's Snacks","Phase 3B2 / Sector 60","A small fast-food spot for straightforward evening bites."],
  ["Grild pizza momos & chaap junction","Phase 5 / Sector 59","A late-night combination of pizza, momos and chaap."],
  ["Momopur","Phase 5 / Sector 59","A broad momo menu covering steam, fried, tandoori and gravy styles."],
  ["Mr. Momos","Phase 5 / Sector 59","A momo specialist with a wide menu of vegetarian options."],
  ["Amigo's Café","Phase 3B2 / Sector 60","A casual fast-food café with a broad menu."],
  ["Plateplay","Sector 66 / Airport Road","An Asian-focused restaurant in a busy local area."],
  ["Nineteenth May","Sector 67","An independent restaurant near CP67 with North Indian, Chinese and Continental choices."],
  ["Mohali Rocks","Phase 11 / Sector 65","A local restaurant and party-hall option for group meals."]
];

const posts = {
  "best-momos-in-mohali-2026": {
    title: "The Ultimate Guide to the Best Momos in Mohali (2026 Edition)",
    intro: "Mohali has no shortage of dumplings, from classic steamed momos to tandoori, Afghani, gravy and experimental fillings. This guide is a practical starting point for exploring momo spots across the city.",
    items: momoSpots,
    type: "momos"
  },
  "late-night-food-places-in-mohali": {
    title: "15 Best Late-Night Food Places in Mohali You Need to Know",
    intro: "Late-night food availability changes quickly, but several Mohali listings currently show extended or overnight hours. Always confirm the kitchen and delivery status before travelling because restaurant hours can change.",
    items: lateNight,
    type: "late"
  },
  "hidden-restaurant-gems-in-mohali": {
    title: "A Foodie's Guide to Mohali's Hidden Restaurant Gems",
    intro: "The most interesting food discoveries are not always the loudest names online. Here are ten local places and smaller-format restaurants worth putting on your food-discovery list.",
    items: hiddenGems,
    type: "gems"
  }
};

const Blog = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : null;

  if (post) {
    return (
      <>
        <Navbar />
        <main className="blog-page">
          <article className="blog-article">
            <Link to="/blog" className="blog-back">← All GoNbite Guides</Link>
            <span className="blog-kicker">GONBITE FOOD GUIDE / MOHALI / 2026</span>
            <h1>{post.title}</h1>
            <p className="blog-intro">{post.intro}</p>
            <div className="blog-note">Food prices, opening hours and availability can change. Check with the restaurant before visiting or ordering.</div>
            <div className="blog-items">
              {post.items.map((item, i) => (
                <section className="blog-item" key={item[0] + item[1]}>
                  <span>0{i + 1}</span>
                  <div>
                    <h2>{item[0]}</h2>
                    <strong>{item[1]}</strong>
                    <p>{item[2]}</p>
                    {item[3] && <small>{item[3]}</small>}
                  </div>
                </section>
              ))}
            </div>
            <section className="blog-cta">
              <h2>Craving these right now?</h2>
              <p>GoNbite is launching soon in Mohali to bring local food closer to your doorstep. Join the waitlist for early access and the planned ₹100 first-order offer.</p>
              <Link to="/early-access">Join GoNbite Early Access →</Link>
            </section>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <section className="blog-index">
          <span className="blog-kicker">THE GONBITE FOOD JOURNAL</span>
          <h1>Mohali food, local stories and things worth trying.</h1>
          <p>We’re publishing practical local food guides before launch so you can discover more of Mohali’s restaurants, cafés and late-night options.</p>
          <div className="blog-grid">
            {Object.entries(posts).map(([slug, post], i) => (
              <Link to={`/blog/${slug}`} className="blog-card" key={slug}>
                <span>0{i + 1}</span>
                <small>MOHALI / 2026</small>
                <h2>{post.title}</h2>
                <p>{post.intro}</p>
                <strong>Read guide →</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
