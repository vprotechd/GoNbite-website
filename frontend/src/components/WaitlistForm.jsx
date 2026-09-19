import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import "./WaitlistForm.css";

const WaitlistForm = ({ compact = false }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const entry = Object.fromEntries(form.entries());
    const existing = JSON.parse(localStorage.getItem("gonbiteWaitlist") || "[]");
    localStorage.setItem("gonbiteWaitlist", JSON.stringify([...existing, {
      ...entry,
      createdAt: new Date().toISOString(),
    }]));
    setSubmitted(true);
    event.currentTarget.reset();
  };

  if (submitted) {
    return (
      <div className={`waitlist-success ${compact ? "compact" : ""}`}>
        <CheckCircle2 size={28} />
        <div>
          <strong>You’re on the GoNbite waitlist!</strong>
          <p>We’ll keep your early-access request saved on this device.</p>
        </div>
      </div>
    );
  }

  return (
    <form className={`waitlist-form ${compact ? "compact" : ""}`} onSubmit={handleSubmit}>
      <div className="waitlist-fields">
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Your name" required />
        </label>
        <label>
          <span>Mobile Number</span>
          <input name="mobile" type="tel" inputMode="tel" placeholder="+91 XXXXX XXXXX" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Mohali Area</span>
          <input name="area" type="text" placeholder="Sector / Phase" required />
        </label>
      </div>
      <button type="submit">
        Join the Waitlist
        <ArrowRight size={18} />
      </button>
      <small>
        By joining, you agree to receive launch and early-access updates from GoNbite.
      </small>
    </form>
  );
};

export default WaitlistForm;
