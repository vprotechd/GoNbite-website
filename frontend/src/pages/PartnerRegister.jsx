
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { X, LoaderCircle, Store, Bike } from "lucide-react";
import PartnerWithUs from "./PartnerWithUs";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export default function PartnerRegister() {
  const { type } = useParams();
  const navigate = useNavigate();

  const isRestaurant = type === "restaurant";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    restaurant: "",
    address: "",
    fssai: "",
    vehicle: "motorcycle",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!["restaurant", "delivery"].includes(type)) {
      setError("Please select a valid partner type.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    const payload = {
      type,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      acceptedTerms: true,
      termsVersion: "1.0",
      termsAcceptedAt: new Date().toISOString(),
      ...(isRestaurant
        ? {
            restaurant: form.restaurant.trim(),
            address: form.address.trim(),
            fssai: form.fssai.trim(),
          }
        : {
            vehicle: form.vehicle,
          }),
    };

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (data.applicationId) {
        sessionStorage.setItem(
          "gonbitePartnerApplicationId",
          data.applicationId
        );
        
        sessionStorage.setItem("gonbitePartnerEmail", payload.email);
        sessionStorage.setItem("gonbitePartnerType", type);
      }

      if (!response.ok && !data.applicationId) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      if (!data.applicationId) {
        throw new Error("The server did not return an application ID.");
      }

      navigate("/partner/verify-email", {
        state: {
          applicationId: data.applicationId,
          email: payload.email,
          emailFailed: !response.ok,
        },
      });
    } catch (err) {
      setError(
        err.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div aria-hidden="true" inert>
        <PartnerWithUs />
      </div>
    <main className="signup-page">
      <section
        className="signup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
      >
        <button
          type="button"
          className="signup-close"
          onClick={() => navigate("/partner-with-us")}
          aria-label="Close registration"
        >
          <X size={27} />
        </button>

        <div className="signup-heading">
          <div className={`signup-icon ${isRestaurant ? "restaurant" : "delivery"}`}>
            {isRestaurant ? <Store size={25} /> : <Bike size={25} />}
          </div>

          <h1 id="signup-title">Sign up</h1>
          <p>
            {isRestaurant
              ? "Register your restaurant with GoNbite"
              : "Join the GoNbite delivery partner network"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={updateField}
            autoComplete="name"
            maxLength={100}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            maxLength={254}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={updateField}
            autoComplete="tel"
            maxLength={20}
            required
          />

          <input
            name="city"
            type="text"
            placeholder="City"
            value={form.city}
            onChange={updateField}
            autoComplete="address-level2"
            maxLength={100}
            required
          />

          {isRestaurant ? (
            <>
              <input
                name="restaurant"
                type="text"
                placeholder="Restaurant Name"
                value={form.restaurant}
                onChange={updateField}
                maxLength={150}
                required
              />

              <input
                name="address"
                type="text"
                placeholder="Restaurant Address"
                value={form.address}
                onChange={updateField}
                maxLength={500}
                required
              />

              <input
                name="fssai"
                type="text"
                placeholder="FSSAI Registration Number"
                value={form.fssai}
                onChange={updateField}
                maxLength={50}
                required
              />
            </>
          ) : (
            <select
              name="vehicle"
              value={form.vehicle}
              onChange={updateField}
              required
              aria-label="Vehicle type"
            >
              <option value="motorcycle">Motorcycle</option>
              <option value="scooter">Scooter</option>
              <option value="bicycle">Bicycle</option>
              <option value="other">Other</option>
            </select>
          )}

          <label className="signup-consent">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              required
            />
            <span>
              I agree to GoNbite&apos;s{" "}
              <Link
                to="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms &amp; Conditions
              </Link>
              ,{" "}
              <Link
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {error && (
            <p className="signup-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="signup-submit"
            type="submit"
            disabled={loading || !acceptedTerms}
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="signup-spinner" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <div className="signup-divider">
          <span>or</span>
        </div>

        <Link className="signup-back-button" to="/partner-with-us">
          Explore partner opportunities
        </Link>

        <div className="signup-footer">
          Already have an account?{" "}
          <Link to="/partner/login">Login</Link>
        </div>
      </section>

      <style>{`
        .signup-page {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow-y: auto;
          padding: 30px 16px;
          background: transparent;
          font-family: inherit;
        }

        .signup-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 510px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          padding: 30px 36px 26px;
          border-radius: 12px;
          background: #fff;
          color: #333;
          box-shadow: 0 24px 80px #00000035;
        }

        .signup-close {
          position: absolute;
          top: 22px;
          right: 23px;
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #222;
          cursor: pointer;
        }

        .signup-close:hover {
          background: #f5f5f5;
        }

        .signup-heading {
          margin-bottom: 24px;
          padding-right: 35px;
        }

        .signup-icon {
          display: none;
          place-items: center;
          width: 44px;
          height: 44px;
          margin-bottom: 12px;
          border-radius: 12px;
        }

        .signup-icon.restaurant {
          background: #fff0e5;
          color: #ed6b19;
        }

        .signup-icon.delivery {
          background: #e5f8f2;
          color: #009b78;
        }

        .signup-heading h1 {
          margin: 0;
          color: #505050;
          font-size: 34px;
          font-weight: 500;
          letter-spacing: -1px;
        }

        .signup-heading p {
          margin: 8px 0 0;
          color: #777;
          font-size: 13px;
          line-height: 1.6;
        }

        .signup-card form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .signup-card form > input,
        .signup-card form > select {
          box-sizing: border-box;
          width: 100%;
          min-height: 52px;
          padding: 13px 16px;
          border: 1px solid #d3d3d3;
          border-radius: 9px;
          outline: none;
          background: white;
          color: #333;
          font-family: inherit;
          font-size: 15px;
          transition: border-color .2s, box-shadow .2s;
        }

        .signup-card form > input::placeholder {
          color: #aaa;
        }

        .signup-card form > input:focus,
        .signup-card form > select:focus {
          border-color: #e87524;
          box-shadow: 0 0 0 3px #e875241c;
        }

        .signup-consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 4px 0;
          color: #777;
          font-size: 12px;
          line-height: 1.7;
          cursor: pointer;
        }

        .signup-consent input {
          width: 19px;
          height: 19px;
          flex-shrink: 0;
          margin: 2px 0 0;
          accent-color: #e87524;
          cursor: pointer;
        }

        .signup-consent a,
        .signup-footer a {
          color: #e84c5b;
          text-decoration: none;
        }

        .signup-consent a:hover,
        .signup-footer a:hover {
          text-decoration: underline;
        }

        .signup-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 52px;
          padding: 13px 16px;
          border: none;
          border-radius: 9px;
          background: #e87524;
          color: white;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }

        .signup-submit:hover:not(:disabled) {
          background: #d96317;
          transform: translateY(-1px);
        }

        .signup-submit:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .signup-error {
          margin: 0;
          padding: 11px 13px;
          border-radius: 8px;
          background: #fff0f0;
          color: #b42318;
          font-size: 12px;
          line-height: 1.6;
        }

        .signup-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 25px 0;
          color: #777;
          font-size: 16px;
        }

        .signup-divider::before,
        .signup-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e7e7e7;
        }

        .signup-back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 12px;
          border: 1px solid #dedede;
          border-radius: 8px;
          color: #444;
          text-align: center;
          text-decoration: none;
          font-size: 14px;
          transition: background .2s;
        }

        .signup-back-button:hover {
          background: #fafafa;
        }

        .signup-footer {
          margin-top: 25px;
          padding-top: 21px;
          border-top: 1px solid #e8e8e8;
          color: #555;
          font-size: 14px;
          line-height: 1.6;
        }

        .signup-spinner {
          animation: signup-rotate 1s linear infinite;
        }

        @keyframes signup-rotate {
          to { transform: rotate(360deg); }
        }

        @media (min-width: 521px) {
          .signup-icon {
            display: grid;
          }
        }

        @media (max-width: 520px) {
          .signup-page {
            align-items: flex-start;
            padding: 16px 10px;
          }

          .signup-card {
            max-height: calc(100vh - 32px);
            padding: 25px 20px 22px;
            border-radius: 12px;
          }

          .signup-heading {
            margin-bottom: 20px;
          }

          .signup-heading h1 {
            font-size: 30px;
          }

          .signup-card form {
            gap: 11px;
          }

          .signup-card form > input,
          .signup-card form > select {
            min-height: 48px;
            font-size: 14px;
          }

          .signup-divider {
            margin: 20px 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signup-spinner {
            animation: none;
          }
        }
      `}</style>
    </main>
    </>
  );
}
