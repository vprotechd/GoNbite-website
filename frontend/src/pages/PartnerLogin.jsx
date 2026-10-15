
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  UserRound,
  ArrowRight,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import PartnerWithUs from "./PartnerWithUs";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export default function PartnerLogin() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const value = identifier.trim();

    if (!value) {
      setError("Enter your registered mobile number or Partner ID.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/partners/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: value }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to request a login code."
        );
      }

      if (!data.loginChallengeId) {
        throw new Error(
          "The server did not return a login challenge ID."
        );
      }

      sessionStorage.setItem(
        "gonbitePartnerLoginChallengeId",
        data.loginChallengeId
      );

      navigate("/partner/verify-login", {
        state: {
          loginChallengeId: data.loginChallengeId,
          maskedEmail: data.maskedEmail || "",
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
      <main className="partner-login-page">
        <section className="partner-login-card">
        <div className="partner-login-header">
          <div>
            <span className="partner-login-eyebrow">
              GONBITE PARTNER NETWORK
            </span>
            <h1>Login</h1>
          </div>

          <Link
            to="/partner-with-us"
            className="partner-login-close"
            aria-label="Close login"
          >
            <X size={25} />
          </Link>
        </div>

        <p className="partner-login-description">
          Welcome back! Sign in to manage your GoNbite partnership.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="partner-identifier">
            Mobile number or Partner ID
          </label>

          <div className="partner-login-input">
            <UserRound size={19} />

            <input
              id="partner-identifier"
              type="text"
              autoComplete="username"
              placeholder="Mobile number or Partner ID"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                if (error) setError("");
              }}
              maxLength={100}
              required
            />
          </div>

          {error && (
            <p className="partner-login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="partner-login-submit"
            disabled={loading || !identifier.trim()}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={19}
                  className="partner-login-spinner"
                />
                Sending code...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={19} />
              </>
            )}
          </button>

          <p className="partner-login-security">
            <ShieldCheck size={15} />
            Secure login with email verification
          </p>
        </form>

        <div className="partner-login-divider">
          <span>New to GoNbite?</span>
        </div>

        <Link
          to="/partner-with-us"
          className="partner-login-register"
        >
          Become a partner
          <ArrowRight size={17} />
        </Link>

        <p className="partner-login-footer">
          © {new Date().getFullYear()} GoNbite. All rights reserved.
        </p>
        </section>

        <style>{`
        .partner-login-page {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow-y: auto;
          padding: 35px 16px;
          background: transparent;
          color: #272727;
        }

        .partner-login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 530px;
          margin: auto;
          padding: clamp(24px, 5vw, 36px);
          border: 1px solid #eeeeee;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 24px 80px #00000035;
          animation: partner-login-appear .3s ease-out;
        }

        .partner-login-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .partner-login-eyebrow {
          display: block;
          margin-bottom: 8px;
          color: #e87524;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .partner-login-header h1 {
          margin: 0;
          color: #333;
          font-size: clamp(32px, 5vw, 42px);
          font-weight: 500;
          letter-spacing: -1px;
        }

        .partner-login-close {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          margin: -4px -7px 0 0;
          border-radius: 50%;
          color: #222;
          text-decoration: none;
          transition: background .2s, color .2s;
        }

        .partner-login-close:hover {
          background: #fff0e5;
          color: #e87524;
        }

        .partner-login-description {
          margin: 15px 0 27px;
          color: #777;
          font-size: 13px;
          line-height: 1.8;
        }

        .partner-login-card form {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .partner-login-card form > label {
          color: #454545;
          font-size: 12px;
          font-weight: 700;
        }

        .partner-login-input {
          display: flex;
          align-items: center;
          gap: 11px;
          min-height: 53px;
          padding: 0 15px;
          border: 1px solid #d7d7d7;
          border-radius: 8px;
          background: #fff;
          color: #999;
          transition: border-color .2s, box-shadow .2s;
        }

        .partner-login-input:focus-within {
          border-color: #e87524;
          box-shadow: 0 0 0 3px #e875241c;
        }

        .partner-login-input svg {
          flex-shrink: 0;
        }

        .partner-login-input input {
          width: 100%;
          min-width: 0;
          padding: 14px 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #333;
          font-family: inherit;
          font-size: 14px;
        }

        .partner-login-input input::placeholder {
          color: #aaa;
        }

        .partner-login-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 53px;
          margin-top: 8px;
          padding: 14px 18px;
          border: 0;
          border-radius: 8px;
          background: #e87524;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s, transform .2s;
        }

        .partner-login-submit:hover:not(:disabled) {
          background: #cf5d15;
          transform: translateY(-1px);
        }

        .partner-login-submit:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .partner-login-submit:focus-visible,
        .partner-login-close:focus-visible,
        .partner-login-register:focus-visible {
          outline: 3px solid #e8752466;
          outline-offset: 3px;
        }

        .partner-login-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin: 7px 0 0;
          color: #777;
          font-size: 11px;
        }

        .partner-login-security svg {
          color: #229b68;
        }

        .partner-login-error {
          margin: 2px 0;
          padding: 11px 12px;
          border: 1px solid #f2cccc;
          border-radius: 7px;
          background: #fff1f1;
          color: #b42318;
          font-size: 12px;
          line-height: 1.6;
        }

        .partner-login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 27px 0 17px;
          color: #888;
          font-size: 12px;
        }

        .partner-login-divider::before,
        .partner-login-divider::after {
          flex: 1;
          height: 1px;
          background: #e7e7e7;
          content: "";
        }

        .partner-login-register {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 49px;
          padding: 12px;
          border: 1px solid #dedede;
          border-radius: 8px;
          color: #e87524;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: background .2s, border-color .2s;
        }

        .partner-login-register:hover {
          border-color: #e87524;
          background: #fff8f2;
        }

        .partner-login-footer {
          margin: 22px 0 0;
          padding-top: 17px;
          border-top: 1px solid #eee;
          color: #999;
          font-size: 10px;
          text-align: center;
        }

        .partner-login-spinner {
          animation: partner-login-spin 1s linear infinite;
        }

        @keyframes partner-login-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes partner-login-appear {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 520px) {
          .partner-login-page {
            padding: 20px 12px;
          }

          .partner-login-card {
            padding: 25px 20px;
          }

          .partner-login-description {
            margin-bottom: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-login-card,
          .partner-login-card * {
            animation: none !important;
            transition: none !important;
          }
        }
        `}</style>
      </main>
    </>
  );
}
